import { createActor } from "@/backend";
import type {
  AnswerResult,
  Difficulty,
  LeaderboardEntry,
  LoginResult,
  Question,
  UserProfilePublic,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --- Queries ---

export function useLeaderboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useProfile(username: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfilePublic | null>({
    queryKey: ["profile", username],
    queryFn: async () => {
      if (!actor || !username) return null;
      return actor.getProfile(username);
    },
    enabled: !!actor && !isFetching && !!username,
    staleTime: 60_000,
  });
}

export function useQuestions(difficulty: Difficulty, enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Question[]>({
    queryKey: ["questions", difficulty],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestions(difficulty);
    },
    enabled: !!actor && !isFetching && enabled,
    staleTime: 5 * 60_000,
  });
}

// --- Mutations ---

export function useLoginOrRegister() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<LoginResult, Error, string>({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.loginOrRegister(username);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useCheckAnswer() {
  const { actor } = useActor(createActor);
  return useMutation<
    AnswerResult,
    Error,
    { questionId: bigint; selectedIndex: bigint; timeRemaining: bigint }
  >({
    mutationFn: async ({ questionId, selectedIndex, timeRemaining }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.checkAnswer(questionId, selectedIndex, timeRemaining);
    },
  });
}

export function useAwardQuizCoins() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { username: string; coins: bigint }>({
    mutationFn: async ({ username, coins }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.awardQuizCoins(username, coins);
    },
    onSuccess: (_data, { username }) => {
      qc.invalidateQueries({ queryKey: ["profile", username] });
      qc.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}
