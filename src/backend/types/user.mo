import CommonTypes "common";

module {
  public type UserProfile = {
    username : CommonTypes.UserId;
    var totalCoins : CommonTypes.Coins;
    var streak : Nat; // consecutive days
    var lastLoginDay : Int; // epoch day (nanoseconds / 86_400_000_000_000)
    var lastLoginTime : CommonTypes.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type UserProfilePublic = {
    username : CommonTypes.UserId;
    totalCoins : CommonTypes.Coins;
    streak : Nat;
    lastLoginDay : Int;
  };

  public type LeaderboardEntry = {
    rank : Nat;
    username : CommonTypes.UserId;
    totalCoins : CommonTypes.Coins;
    streak : Nat;
  };

  public type LoginResult = {
    streakDay : Nat;
    bonusCoins : CommonTypes.Coins;
    isNewStreak : Bool;
    profile : UserProfilePublic;
  };
};
