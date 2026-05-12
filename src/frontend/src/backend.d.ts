import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = string;
export interface LeaderboardEntry {
    streak: bigint;
    username: UserId;
    rank: bigint;
    totalCoins: Coins;
}
export type QuestionId = bigint;
export interface LoginResult {
    bonusCoins: Coins;
    isNewStreak: boolean;
    streakDay: bigint;
    profile: UserProfilePublic;
}
export interface Question {
    id: QuestionId;
    correctIndex: bigint;
    difficulty: Difficulty;
    text: string;
    category: string;
    options: Array<string>;
}
export type Coins = bigint;
export interface UserProfilePublic {
    streak: bigint;
    username: UserId;
    totalCoins: Coins;
    lastLoginDay: bigint;
}
export interface AnswerResult {
    correctIndex: bigint;
    correct: boolean;
    bonusCoins: Coins;
    coinsAwarded: Coins;
}
export enum Difficulty {
    Easy = "Easy",
    Hard = "Hard",
    Medium = "Medium"
}
export interface backendInterface {
    awardQuizCoins(username: UserId, coins: Coins): Promise<void>;
    checkAnswer(questionId: QuestionId, selectedIndex: bigint, timeRemaining: bigint): Promise<AnswerResult>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getProfile(username: UserId): Promise<UserProfilePublic | null>;
    getQuestions(difficulty: Difficulty): Promise<Array<Question>>;
    loginOrRegister(username: UserId): Promise<LoginResult>;
}
