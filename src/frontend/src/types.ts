import type { Difficulty } from "@/backend";

export type { Difficulty };

export interface Question {
  id: bigint;
  text: string;
  options: string[];
  correctIndex: bigint;
  difficulty: Difficulty;
  category: string;
}

export interface AnswerResult {
  correct: boolean;
  coinsAwarded: bigint;
  bonusCoins: bigint;
  correctIndex: bigint;
}

export interface UserProfilePublic {
  username: string;
  totalCoins: bigint;
  streak: bigint;
  lastLoginDay: bigint;
}

export interface LoginResult {
  streakDay: bigint;
  bonusCoins: bigint;
  isNewStreak: boolean;
  profile: UserProfilePublic;
}

export interface LeaderboardEntry {
  rank: bigint;
  username: string;
  totalCoins: bigint;
  streak: bigint;
}

export interface QuizSession {
  questions: Question[];
  answers: (number | null)[];
  answerResults: (AnswerResult | null)[];
  currentIndex: number;
  totalCoins: bigint;
  startedAt: number;
}
