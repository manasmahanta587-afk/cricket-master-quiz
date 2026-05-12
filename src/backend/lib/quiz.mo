import Debug "mo:core/Debug";
import CommonTypes "../types/common";
import QuizTypes "../types/quiz";
import List "mo:core/List";

module {
  public type Question = QuizTypes.Question;
  public type Difficulty = CommonTypes.Difficulty;
  public type AnswerResult = QuizTypes.AnswerResult;

  /// Return all questions for a given difficulty level
  public func getQuestionsByDifficulty(
    questions : List.List<Question>,
    difficulty : Difficulty
  ) : [Question] {
    questions.filter(func(q) { q.difficulty == difficulty }).toArray();
  };

  /// Evaluate an answer and compute coins awarded
  /// timeRemaining: seconds left on timer (0..30)
  public func evaluateAnswer(
    question : Question,
    selectedIndex : Nat,
    timeRemaining : Nat
  ) : AnswerResult {
    let correct = selectedIndex == question.correctIndex;
    let base = if (correct) { baseCoins(question.difficulty) } else { 0 };
    let bonus : Nat = if (correct and timeRemaining >= 5) { 5 } else { 0 };
    {
      correct;
      coinsAwarded = base;
      bonusCoins = bonus;
      correctIndex = question.correctIndex;
    };
  };

  /// Coins per correct answer by difficulty
  public func baseCoins(difficulty : Difficulty) : Nat {
    switch (difficulty) {
      case (#Easy) { 10 };
      case (#Medium) { 25 };
      case (#Hard) { 50 };
    };
  };

  /// Build the initial seed question list
  public func seedQuestions() : List.List<Question> {
    let qs : [Question] = [
      // ── EASY ──────────────────────────────────────────────────────────────
      { id = 1;  difficulty = #Easy;   category = "Players";   correctIndex = 0;
        text = "Who is known as the 'God of Cricket'?";
        options = ["Sachin Tendulkar", "Ricky Ponting", "Brian Lara", "Vivian Richards"] },
      { id = 2;  difficulty = #Easy;   category = "IPL";
        text = "Which IPL team is known as the 'Chennai Super Kings'?";
        correctIndex = 2;
        options = ["Mumbai Indians", "Kolkata Knight Riders", "Chennai Super Kings", "Delhi Capitals"] },
      { id = 3;  difficulty = #Easy;   category = "World Cup";
        text = "Which country won the first Cricket World Cup in 1975?";
        correctIndex = 3;
        options = ["England", "Australia", "India", "West Indies"] },
      { id = 4;  difficulty = #Easy;   category = "Records";
        text = "How many runs did Sachin Tendulkar score in Test cricket?";
        correctIndex = 1;
        options = ["13,000", "15,921", "11,953", "14,200"] },
      { id = 5;  difficulty = #Easy;   category = "Players";
        text = "Who is the captain of the Indian cricket team during the 2011 World Cup win?";
        correctIndex = 0;
        options = ["MS Dhoni", "Sourav Ganguly", "Virat Kohli", "Sachin Tendulkar"] },
      { id = 6;  difficulty = #Easy;   category = "IPL";
        text = "Which team has won the most IPL titles?";
        correctIndex = 0;
        options = ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Sunrisers Hyderabad"] },
      { id = 7;  difficulty = #Easy;   category = "Players";
        text = "Who is known as 'King Kohli'?";
        correctIndex = 1;
        options = ["Rohit Sharma", "Virat Kohli", "KL Rahul", "Shikhar Dhawan"] },
      { id = 8;  difficulty = #Easy;   category = "World Cup";
        text = "India won the ICC Cricket World Cup in which year?";
        correctIndex = 2;
        options = ["1999", "2003", "2011", "2015"] },
      { id = 9;  difficulty = #Easy;   category = "Records";
        text = "What is the maximum number of overs in a One Day International match per side?";
        correctIndex = 0;
        options = ["50", "40", "20", "60"] },
      { id = 10; difficulty = #Easy;   category = "Players";
        text = "Which bowler took the most wickets in a single IPL season?";
        correctIndex = 3;
        options = ["Lasith Malinga", "Dwayne Bravo", "Bhuvneshwar Kumar", "Harshal Patel"] },
      { id = 11; difficulty = #Easy;   category = "IPL";
        text = "IPL stands for?";
        correctIndex = 1;
        options = ["Indian Professional League", "Indian Premier League", "International Premier League", "India Power League"] },
      { id = 12; difficulty = #Easy;   category = "Players";
        text = "Who hit the famous six to win the 2011 World Cup final?";
        correctIndex = 0;
        options = ["MS Dhoni", "Yuvraj Singh", "Suresh Raina", "Gautam Gambhir"] },
      { id = 13; difficulty = #Easy;   category = "Records";
        text = "In cricket, how many balls make an over?";
        correctIndex = 2;
        options = ["4", "5", "6", "8"] },
      { id = 14; difficulty = #Easy;   category = "World Cup";
        text = "The 2019 ICC Cricket World Cup was held in which country?";
        correctIndex = 0;
        options = ["England", "India", "Australia", "South Africa"] },
      { id = 15; difficulty = #Easy;   category = "IPL";
        text = "Who is known as 'Thala' in the IPL?";
        correctIndex = 2;
        options = ["Rohit Sharma", "Virat Kohli", "MS Dhoni", "Suresh Raina"] },
      { id = 16; difficulty = #Easy;   category = "Players";
        text = "Which cricketer is nicknamed 'Hitman'?";
        correctIndex = 1;
        options = ["Virat Kohli", "Rohit Sharma", "Shubman Gill", "Hardik Pandya"] },
      { id = 17; difficulty = #Easy;   category = "Records";
        text = "A 'duck' in cricket means a batsman scores how many runs?";
        correctIndex = 0;
        options = ["0", "1", "4", "6"] },
      { id = 18; difficulty = #Easy;   category = "IPL";
        text = "Kolkata Knight Riders is co-owned by which Bollywood star?";
        correctIndex = 0;
        options = ["Shah Rukh Khan", "Amitabh Bachchan", "Salman Khan", "Akshay Kumar"] },
      { id = 19; difficulty = #Easy;   category = "Players";
        text = "Who was the first batsman to score 10,000 ODI runs?";
        correctIndex = 3;
        options = ["Ricky Ponting", "Brian Lara", "Jacques Kallis", "Sachin Tendulkar"] },
      { id = 20; difficulty = #Easy;   category = "World Cup";
        text = "How often is the ICC Cricket World Cup held?";
        correctIndex = 1;
        options = ["Every 2 years", "Every 4 years", "Every 3 years", "Every 5 years"] },
      // ── MEDIUM ────────────────────────────────────────────────────────────
      { id = 21; difficulty = #Medium; category = "Records";
        text = "Who holds the record for the highest individual score in Test cricket?";
        correctIndex = 2;
        options = ["Sachin Tendulkar", "Don Bradman", "Brian Lara", "Garfield Sobers"] },
      { id = 22; difficulty = #Medium; category = "IPL";
        text = "Who has hit the most sixes in IPL history?";
        correctIndex = 0;
        options = ["Chris Gayle", "AB de Villiers", "Rohit Sharma", "MS Dhoni"] },
      { id = 23; difficulty = #Medium; category = "World Cup";
        text = "Who was the highest run scorer in the 2003 ICC Cricket World Cup?";
        correctIndex = 1;
        options = ["Ricky Ponting", "Sachin Tendulkar", "Sourav Ganguly", "Brett Lee"] },
      { id = 24; difficulty = #Medium; category = "Players";
        text = "Who has taken the most wickets in Test cricket?";
        correctIndex = 3;
        options = ["Glenn McGrath", "Shane Warne", "Anil Kumble", "Muttiah Muralitharan"] },
      { id = 25; difficulty = #Medium; category = "IPL";
        text = "Which batsman scored the first century in IPL history?";
        correctIndex = 0;
        options = ["Brendon McCullum", "Matthew Hayden", "Adam Gilchrist", "Yusuf Pathan"] },
      { id = 26; difficulty = #Medium; category = "World Cup";
        text = "Which country hosted the 2011 Cricket World Cup?";
        correctIndex = 2;
        options = ["Australia", "England", "India, Sri Lanka & Bangladesh", "South Africa"] },
      { id = 27; difficulty = #Medium; category = "Players";
        text = "Who scored 400* not out in a Test match, the highest individual Test score?";
        correctIndex = 1;
        options = ["Garfield Sobers", "Brian Lara", "Len Hutton", "Matthew Hayden"] },
      { id = 28; difficulty = #Medium; category = "IPL";
        text = "How many teams participated in the first season of IPL (2008)?";
        correctIndex = 0;
        options = ["8", "9", "10", "6"] },
      { id = 29; difficulty = #Medium; category = "Records";
        text = "Who was the first bowler to take all 10 wickets in a Test innings?";
        correctIndex = 2;
        options = ["Jim Laker", "Muttiah Muralitharan", "Anil Kumble", "Shane Warne"] },
      { id = 30; difficulty = #Medium; category = "Players";
        text = "Which Indian cricketer has scored the most Test centuries?";
        correctIndex = 0;
        options = ["Sachin Tendulkar", "Rahul Dravid", "Sunil Gavaskar", "Virat Kohli"] },
      { id = 31; difficulty = #Medium; category = "World Cup";
        text = "Who won the 2007 ICC T20 World Cup?";
        correctIndex = 0;
        options = ["India", "Pakistan", "Sri Lanka", "Australia"] },
      { id = 32; difficulty = #Medium; category = "IPL";
        text = "Which player has won the most IPL Player of the Match awards?";
        correctIndex = 1;
        options = ["AB de Villiers", "Chris Gayle", "Rohit Sharma", "Yuvraj Singh"] },
      { id = 33; difficulty = #Medium; category = "Records";
        text = "What is the fastest century scored in ODI cricket (balls)?";
        correctIndex = 3;
        options = ["37", "36", "33", "31"] },
      { id = 34; difficulty = #Medium; category = "Players";
        text = "Who is the first Indian to take a Test hat-trick?";
        correctIndex = 2;
        options = ["Kapil Dev", "Zaheer Khan", "Harbhajan Singh", "Anil Kumble"] },
      { id = 35; difficulty = #Medium; category = "World Cup";
        text = "Australia has won how many Cricket World Cup titles?";
        correctIndex = 1;
        options = ["4", "5", "6", "3"] },
      { id = 36; difficulty = #Medium; category = "IPL";
        text = "Who scored the highest individual innings in IPL history?";
        correctIndex = 0;
        options = ["Chris Gayle", "AB de Villiers", "Virat Kohli", "Brendon McCullum"] },
      { id = 37; difficulty = #Medium; category = "Players";
        text = "Who was the first batsman to score a double century in ODIs?";
        correctIndex = 0;
        options = ["Sachin Tendulkar", "Virender Sehwag", "Rohit Sharma", "Martin Guptill"] },
      { id = 38; difficulty = #Medium; category = "Records";
        text = "Which bowler has taken the most wickets in ODI cricket?";
        correctIndex = 2;
        options = ["Wasim Akram", "Glenn McGrath", "Muttiah Muralitharan", "Waqar Younis"] },
      { id = 39; difficulty = #Medium; category = "IPL";
        text = "Which IPL franchise has never won the IPL title (as of 2023)?";
        correctIndex = 3;
        options = ["Rajasthan Royals", "Deccan Chargers", "Gujarat Titans", "Delhi Capitals"] },
      { id = 40; difficulty = #Medium; category = "World Cup";
        text = "Who took a hat-trick in the 1999 World Cup semi-final?";
        correctIndex = 1;
        options = ["Brett Lee", "Shoaib Akhtar", "Shane Warne", "Wasim Akram"] },
      // ── HARD ──────────────────────────────────────────────────────────────
      { id = 41; difficulty = #Hard;   category = "Records";
        text = "What is Don Bradman's Test batting average (to 2 decimal places)?";
        correctIndex = 0;
        options = ["99.94", "98.74", "100.12", "97.83"] },
      { id = 42; difficulty = #Hard;   category = "IPL";
        text = "Who was the most expensive player in the 2023 IPL mega auction?";
        correctIndex = 1;
        options = ["Ishan Kishan", "Sam Curran", "Nicholas Pooran", "Cameron Green"] },
      { id = 43; difficulty = #Hard;   category = "Players";
        text = "Who dismissed Sachin Tendulkar the most times in Test cricket?";
        correctIndex = 2;
        options = ["Glenn McGrath", "Shane Warne", "Muttiah Muralitharan", "James Anderson"] },
      { id = 44; difficulty = #Hard;   category = "World Cup";
        text = "Who scored 673 runs in the 1996 ICC World Cup, the most by any player?";
        correctIndex = 3;
        options = ["Aravinda de Silva", "Sanath Jayasuriya", "Ricky Ponting", "Sachin Tendulkar"] },
      { id = 45; difficulty = #Hard;   category = "Records";
        text = "Which Test match produced the highest ever team total of 952/6 declared?";
        correctIndex = 1;
        options = ["India vs Pakistan 2006", "Sri Lanka vs India 1997", "England vs Australia 1938", "Australia vs West Indies 1955"] },
      { id = 46; difficulty = #Hard;   category = "IPL";
        text = "What is the record for the highest partnership in IPL history?";
        correctIndex = 0;
        options = ["246", "233", "219", "228"] },
      { id = 47; difficulty = #Hard;   category = "Players";
        text = "Which player has appeared in the most Test matches in cricket history?";
        correctIndex = 0;
        options = ["Sachin Tendulkar", "Ricky Ponting", "Steve Waugh", "Alastair Cook"] },
      { id = 48; difficulty = #Hard;   category = "World Cup";
        text = "How many runs did Ricky Ponting score in the 2003 World Cup final against India?";
        correctIndex = 3;
        options = ["100", "112", "127", "140"] },
      { id = 49; difficulty = #Hard;   category = "Records";
        text = "Who took 9 wickets for 69 runs in a single Test innings, the second best figures?";
        correctIndex = 1;
        options = ["Jim Laker", "Muttiah Muralitharan", "Shane Warne", "Anil Kumble"] },
      { id = 50; difficulty = #Hard;   category = "IPL";
        text = "Which season saw the introduction of Decision Review System (DRS) in IPL?";
        correctIndex = 2;
        options = ["2015", "2017", "2018", "2019"] },
      { id = 51; difficulty = #Hard;   category = "Players";
        text = "How many Test centuries did Sunil Gavaskar score?";
        correctIndex = 1;
        options = ["29", "34", "40", "45"] },
      { id = 52; difficulty = #Hard;   category = "World Cup";
        text = "In the 1987 World Cup final, Australia beat England by how many runs?";
        correctIndex = 3;
        options = ["3", "5", "2", "7"] },
      { id = 53; difficulty = #Hard;   category = "Records";
        text = "The highest ODI team total of 481/6 was scored by which team?";
        correctIndex = 0;
        options = ["England", "Australia", "India", "South Africa"] },
      { id = 54; difficulty = #Hard;   category = "IPL";
        text = "Who hit 6 sixes in an over in the 2007 IPL (the only batter to do so)?";
        correctIndex = 2;
        options = ["Chris Gayle", "AB de Villiers", "Yuvraj Singh", "MS Dhoni"] },
      { id = 55; difficulty = #Hard;   category = "Players";
        text = "Who was the first cricketer to score a century on Test debut against every Test nation?";
        correctIndex = 1;
        options = ["Garfield Sobers", "Ricky Ponting", "Greg Chappell", "Martin Crowe"] },
      { id = 56; difficulty = #Hard;   category = "World Cup";
        text = "Which team was dismissed for the lowest total in World Cup history (36 runs)?";
        correctIndex = 3;
        options = ["Zimbabwe", "Bangladesh", "East Africa", "Canada"] },
      { id = 57; difficulty = #Hard;   category = "Records";
        text = "The fastest Test century (56 balls) is held by which player?";
        correctIndex = 0;
        options = ["Misbah-ul-Haq", "Viv Richards", "Jack Gregory", "Brendon McCullum"] },
      { id = 58; difficulty = #Hard;   category = "IPL";
        text = "Which bowler has the best bowling figures in a single IPL match (6/14)?";
        correctIndex = 2;
        options = ["Lasith Malinga", "Dwayne Bravo", "Sohail Tanvir", "Anil Kumble"] },
      { id = 59; difficulty = #Hard;   category = "Players";
        text = "Imran Khan was the first player to take 300 Test wickets and score how many Test runs?";
        correctIndex = 1;
        options = ["2,500", "3,807", "3,000", "4,100"] },
      { id = 60; difficulty = #Hard;   category = "Records";
        text = "Which pair holds the record for the highest Test partnership (624 runs)?";
        correctIndex = 0;
        options = ["Mahela Jayawardena & Kumar Sangakkara", "Don Bradman & Ponsford", "Sachin Tendulkar & VVS Laxman", "Brian Lara & Shivnarine Chanderpaul"] }
    ];
    List.fromArray<Question>(qs);
  };
};
