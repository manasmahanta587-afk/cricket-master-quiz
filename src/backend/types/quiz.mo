import CommonTypes "common";

module {
  public type QuestionId = Nat;

  public type Question = {
    id : QuestionId;
    text : Text;
    options : [Text]; // always 4 options
    correctIndex : Nat; // 0-3
    difficulty : CommonTypes.Difficulty;
    category : Text; // e.g. "IPL", "World Cup", "Players", "Records"
  };

  public type AnswerResult = {
    correct : Bool;
    coinsAwarded : CommonTypes.Coins;
    bonusCoins : CommonTypes.Coins;
    correctIndex : Nat;
  };
};
