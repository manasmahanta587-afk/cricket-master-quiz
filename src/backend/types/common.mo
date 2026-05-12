module {
  public type UserId = Text; // username as identifier (no auth)
  public type Timestamp = Int; // nanoseconds since epoch (Time.now())
  public type Coins = Nat;
  public type Difficulty = { #Easy; #Medium; #Hard };
};
