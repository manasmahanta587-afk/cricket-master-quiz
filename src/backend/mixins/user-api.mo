import CommonTypes "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  users : Map.Map<CommonTypes.UserId, UserLib.UserProfile>
) {

  /// Register or return existing profile; records login streak
  public func loginOrRegister(username : CommonTypes.UserId) : async UserTypes.LoginResult {
    let nowNs = Time.now();
    switch (users.get(username)) {
      case (?profile) {
        UserLib.processLogin(profile, nowNs);
      };
      case null {
        let profile = UserLib.newProfile(username);
        users.add(username, profile);
        UserLib.processLogin(profile, nowNs);
      };
    };
  };

  /// Get a user's public profile by username
  public query func getProfile(username : CommonTypes.UserId) : async ?UserTypes.UserProfilePublic {
    switch (users.get(username)) {
      case (?profile) { ?UserLib.toPublic(profile) };
      case null { null };
    };
  };

  /// Award coins to a user after completing a quiz question
  public func awardQuizCoins(username : CommonTypes.UserId, coins : CommonTypes.Coins) : async () {
    switch (users.get(username)) {
      case (?profile) { UserLib.awardCoins(profile, coins) };
      case null { };
    };
  };

  /// Get global top-50 leaderboard
  public query func getLeaderboard() : async [UserTypes.LeaderboardEntry] {
    UserLib.buildLeaderboard(users);
  };
};
