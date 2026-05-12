import List "mo:core/List";
import Map "mo:core/Map";
import QuizLib "lib/quiz";
import UserLib "lib/user";
import CommonTypes "types/common";
import QuizApiMixin "mixins/quiz-api";
import UserApiMixin "mixins/user-api";

actor {
  let questions = QuizLib.seedQuestions();
  let users = Map.empty<CommonTypes.UserId, UserLib.UserProfile>();

  include QuizApiMixin(questions);
  include UserApiMixin(users);
};
