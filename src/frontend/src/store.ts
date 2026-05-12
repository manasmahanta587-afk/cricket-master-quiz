import { Difficulty } from "@/backend";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizSession, UserProfilePublic } from "./types";

interface AppState {
  // User identity
  username: string;
  setUsername: (name: string) => void;

  // Difficulty selection
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;

  // Current quiz session (not persisted)
  session: QuizSession | null;
  setSession: (s: QuizSession | null) => void;
  updateSession: (partial: Partial<QuizSession>) => void;

  // Profile cached from backend
  profile: UserProfilePublic | null;
  setProfile: (p: UserProfilePublic | null) => void;

  // Sound preference
  soundEnabled: boolean;
  toggleSound: () => void;
}

interface PersistedState {
  username: string;
  difficulty: Difficulty;
  soundEnabled: boolean;
  profile: UserProfilePublic | null;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),

      difficulty: Difficulty.Easy,
      setDifficulty: (d) => set({ difficulty: d }),

      session: null,
      setSession: (s) => set({ session: s }),
      updateSession: (partial) =>
        set((state) => ({
          session: state.session ? { ...state.session, ...partial } : null,
        })),

      profile: null,
      setProfile: (p) => set({ profile: p }),

      soundEnabled: true,
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: "cricket-master-storage",
      partialize: (state): PersistedState => ({
        username: state.username,
        difficulty: state.difficulty,
        soundEnabled: state.soundEnabled,
        profile: state.profile,
      }),
    },
  ),
);
