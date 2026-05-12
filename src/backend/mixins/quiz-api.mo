import CommonTypes "../types/common";
import QuizTypes "../types/quiz";
import QuizLib "../lib/quiz";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (questions : List.List<QuizLib.Question>) {

  /// Get all questions for a difficulty level
  public query func getQuestions(difficulty : CommonTypes.Difficulty) : async [QuizTypes.Question] {
    QuizLib.getQuestionsByDifficulty(questions, difficulty);
  };

  /// Submit an answer; returns result with coins earned
  public query func checkAnswer(
    questionId : QuizTypes.QuestionId,
    selectedIndex : Nat,
    timeRemaining : Nat
  ) : async QuizTypes.AnswerResult {
    let found = questions.find(func(q : QuizLib.Question) : Bool { q.id == questionId });
    switch (found) {
      case (?q) { QuizLib.evaluateAnswer(q, selectedIndex, timeRemaining) };
      case null { Runtime.trap("Question not found: " # debug_show(questionId)) };
    };
  };
};
