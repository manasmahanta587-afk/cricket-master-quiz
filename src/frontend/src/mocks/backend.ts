import type { backendInterface } from "../backend";
import { Difficulty } from "../backend";

export const mockBackend: backendInterface = {
  loginOrRegister: async (username) => ({
    bonusCoins: BigInt(50),
    isNewStreak: true,
    streakDay: BigInt(3),
    profile: {
      streak: BigInt(3),
      username,
      totalCoins: BigInt(350),
      lastLoginDay: BigInt(20240101),
    },
  }),

  getProfile: async (username) => ({
    streak: BigInt(3),
    username,
    totalCoins: BigInt(350),
    lastLoginDay: BigInt(20240101),
  }),

  getQuestions: async (_difficulty) => [
    {
      id: BigInt(1),
      correctIndex: BigInt(2),
      difficulty: Difficulty.Medium,
      text: "Which batsman holds the record for the most centuries in Test cricket?",
      category: "Records",
      options: ["Ricky Ponting", "Brian Lara", "Sachin Tendulkar", "Jacques Kallis"],
    },
    {
      id: BigInt(2),
      correctIndex: BigInt(0),
      difficulty: Difficulty.Easy,
      text: "Which team won the inaugural ICC T20 World Cup in 2007?",
      category: "World Cup",
      options: ["India", "Pakistan", "Australia", "England"],
    },
    {
      id: BigInt(3),
      correctIndex: BigInt(1),
      difficulty: Difficulty.Hard,
      text: "Who holds the record for the fastest century in ODI cricket?",
      category: "Records",
      options: ["Chris Gayle", "AB de Villiers", "Shahid Afridi", "Virat Kohli"],
    },
    {
      id: BigInt(4),
      correctIndex: BigInt(3),
      difficulty: Difficulty.Medium,
      text: "Which IPL team has won the most titles?",
      category: "IPL",
      options: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Mumbai Indians"],
    },
    {
      id: BigInt(5),
      correctIndex: BigInt(0),
      difficulty: Difficulty.Easy,
      text: "How many players are there in a cricket team?",
      category: "General",
      options: ["11", "10", "12", "9"],
    },
  ],

  checkAnswer: async (_questionId, selectedIndex, timeRemaining) => ({
    correctIndex: BigInt(2),
    correct: selectedIndex === BigInt(2),
    bonusCoins: timeRemaining > BigInt(15) ? BigInt(10) : BigInt(0),
    coinsAwarded: selectedIndex === BigInt(2) ? BigInt(25) : BigInt(0),
  }),

  awardQuizCoins: async (_username, _coins) => undefined,

  getLeaderboard: async () => [
    { rank: BigInt(1), username: "CricketKing", totalCoins: BigInt(1250), streak: BigInt(12) },
    { rank: BigInt(2), username: "IPLFanatic", totalCoins: BigInt(980), streak: BigInt(7) },
    { rank: BigInt(3), username: "SachinFan99", totalCoins: BigInt(870), streak: BigInt(5) },
    { rank: BigInt(4), username: "BoundaryHitter", totalCoins: BigInt(760), streak: BigInt(9) },
    { rank: BigInt(5), username: "SixMaster", totalCoins: BigInt(650), streak: BigInt(3) },
    { rank: BigInt(6), username: "PitchPerfect", totalCoins: BigInt(540), streak: BigInt(4) },
    { rank: BigInt(7), username: "WicketWizard", totalCoins: BigInt(480), streak: BigInt(2) },
    { rank: BigInt(8), username: "TestPlayer", totalCoins: BigInt(350), streak: BigInt(3) },
  ],
};
