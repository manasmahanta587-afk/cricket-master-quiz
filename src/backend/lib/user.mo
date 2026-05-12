import CommonTypes "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type UserProfilePublic = UserTypes.UserProfilePublic;
  public type LeaderboardEntry = UserTypes.LeaderboardEntry;
  public type LoginResult = UserTypes.LoginResult;

  /// Create a new user profile
  public func newProfile(username : CommonTypes.UserId) : UserProfile {
    {
      username;
      var totalCoins = 0;
      var streak = 0;
      var lastLoginDay = -1;
      var lastLoginTime = 0;
    };
  };

  /// Convert mutable internal profile to shared public type
  public func toPublic(profile : UserProfile) : UserProfilePublic {
    {
      username = profile.username;
      totalCoins = profile.totalCoins;
      streak = profile.streak;
      lastLoginDay = profile.lastLoginDay;
    };
  };

  /// Process login: update streak, award streak bonus, return result
  /// nowNs: current time in nanoseconds
  public func processLogin(
    profile : UserProfile,
    nowNs : Int
  ) : LoginResult {
    let dayNs : Int = 86_400_000_000_000;
    let todayDay : Int = nowNs / dayNs;
    let prevDay = profile.lastLoginDay;

    let (newStreak, isNewStreak) : (Nat, Bool) =
      if (prevDay < 0) {
        // first ever login
        (1, true)
      } else if (todayDay == prevDay) {
        // same day — no streak change, no bonus
        (profile.streak, false)
      } else if (todayDay == prevDay + 1) {
        // consecutive day
        (profile.streak + 1, true)
      } else {
        // missed a day — reset
        (1, true)
      };

    profile.streak := newStreak;
    profile.lastLoginDay := todayDay;
    profile.lastLoginTime := nowNs;

    let bonus = if (isNewStreak) { streakBonus(newStreak) } else { 0 };
    if (bonus > 0) { profile.totalCoins := profile.totalCoins + bonus };

    {
      streakDay = newStreak;
      bonusCoins = bonus;
      isNewStreak;
      profile = toPublic(profile);
    };
  };

  /// Award coins to a user profile
  public func awardCoins(profile : UserProfile, amount : CommonTypes.Coins) : () {
    profile.totalCoins := profile.totalCoins + amount;
  };

  /// Return streak bonus coins for a given streak day
  public func streakBonus(streakDay : Nat) : CommonTypes.Coins {
    if      (streakDay >= 14) { 500 }
    else if (streakDay >= 7)  { 100 }
    else if (streakDay >= 3)  { 20  }
    else if (streakDay >= 1)  { 5   }
    else                      { 0   };
  };

  /// Build top-50 leaderboard from user map
  public func buildLeaderboard(users : Map.Map<CommonTypes.UserId, UserProfile>) : [LeaderboardEntry] {
    let allUsers = users.entries();
    let profiles = List.fromIter<(CommonTypes.UserId, UserProfile)>(allUsers);
    let sorted = profiles.sort(func((_, a), (_, b)) {
      if (a.totalCoins > b.totalCoins) { #less }
      else if (a.totalCoins < b.totalCoins) { #greater }
      else { #equal }
    });
    let top50 = sorted.toArray();
    let limit = if (top50.size() > 50) { 50 } else { top50.size() };
    Array.tabulate<LeaderboardEntry>(limit, func(i) {
      let (_, profile) = top50[i];
      {
        rank = i + 1;
        username = profile.username;
        totalCoins = profile.totalCoins;
        streak = profile.streak;
      };
    });
  };
};
