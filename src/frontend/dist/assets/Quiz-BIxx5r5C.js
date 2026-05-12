import { a as useNavigate, u as useStore, r as reactExports, j as jsxRuntimeExports } from "./index-CvZIVcv1.js";
import { a as useQuestions, b as useCheckAnswer } from "./useBackend-n4ovTmqO.js";
const TOTAL_TIME = 10;
const LETTERS = ["A", "B", "C", "D"];
function CoinFloat({ amount }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "float-up pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 font-display font-bold text-lg",
      style: { color: "oklch(0.7 0.15 80)" },
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🪙" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "+",
          amount.toString()
        ] })
      ]
    }
  );
}
function TimerBar({ timeLeft, total }) {
  const pct = timeLeft / total * 100;
  const warning = timeLeft <= 4;
  const danger = timeLeft <= 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full h-2 rounded-full bg-secondary overflow-hidden",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full transition-all duration-1000 ease-linear ${danger ? "bg-accent" : warning ? "bg-orange-400" : "bg-primary"}`,
          style: { width: `${pct}%` }
        }
      )
    }
  );
}
function OptionCard({
  letter,
  text,
  state,
  onClick,
  index,
  questionIndex
}) {
  const disabled = state === "correct" || state === "wrong" || state === "disabled";
  const cls = `option-card ${state !== "idle" && state !== "disabled" ? state : state === "disabled" ? "opacity-50 cursor-not-allowed" : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `${cls} w-full text-left flex items-center gap-3 min-h-[56px]`,
      onClick: disabled ? void 0 : onClick,
      disabled,
      "data-ocid": `quiz.option.${questionIndex + 1}.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "option-letter shrink-0",
            style: state === "correct" ? { background: "oklch(0.6 0.2 145)", color: "oklch(0.12 0 0)" } : state === "wrong" ? { background: "oklch(0.55 0.22 25)", color: "oklch(0.95 0 0)" } : state === "selected" ? { background: "oklch(0.7 0.15 80)", color: "oklch(0.12 0 0)" } : void 0,
            children: letter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground flex-1 leading-snug", children: text }),
        state === "correct" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "✅" }),
        state === "wrong" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "❌" })
      ]
    }
  );
}
function QuestionCard({
  question,
  qIndex,
  total,
  optionStates,
  onSelect,
  showCoinFloat
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "animate-slide-up w-full max-w-lg mx-auto flex flex-col gap-4",
      "data-ocid": "quiz.question_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-gold text-xs uppercase tracking-widest", children: question.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-mono", children: [
            qIndex + 1,
            " / ",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-5 border border-border relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -right-4 -bottom-4 text-7xl opacity-5 pointer-events-none select-none",
              "aria-hidden": "true",
              children: "🏏"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground leading-snug relative z-10", children: question.text })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 relative", children: [
          showCoinFloat !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(CoinFloat, { amount: showCoinFloat }),
          question.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptionCard,
            {
              letter: LETTERS[i],
              text: opt,
              state: optionStates[i],
              onClick: () => onSelect(i),
              index: i,
              questionIndex: qIndex
            },
            `option-${opt}`
          ))
        ] })
      ]
    }
  );
}
function QuizSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full max-w-lg mx-auto flex flex-col gap-4 animate-pulse",
      "data-ocid": "quiz.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-24 rounded-full bg-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl p-5 h-28 border border-border" }),
        [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 rounded-lg bg-secondary" }, i))
      ]
    }
  );
}
function Quiz() {
  const navigate = useNavigate();
  const { difficulty, username, session, setSession, updateSession } = useStore();
  const { data: questions, isLoading } = useQuestions(difficulty, true);
  const checkAnswerMutation = useCheckAnswer();
  const [timeLeft, setTimeLeft] = reactExports.useState(TOTAL_TIME);
  const [optionStates, setOptionStates] = reactExports.useState(["idle", "idle", "idle", "idle"]);
  const [showCoinFloat, setShowCoinFloat] = reactExports.useState(null);
  const [isAnswered, setIsAnswered] = reactExports.useState(false);
  const [timeUpMsg, setTimeUpMsg] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const advanceRef = reactExports.useRef(null);
  const isAnsweredRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (questions && questions.length > 0 && !session) {
      setSession({
        questions,
        answers: Array(questions.length).fill(null),
        answerResults: Array(questions.length).fill(null),
        currentIndex: 0,
        totalCoins: BigInt(0),
        startedAt: Date.now()
      });
    }
  }, [questions, session, setSession]);
  reactExports.useEffect(() => {
    if (!session) return;
    setTimeLeft(TOTAL_TIME);
    setOptionStates(["idle", "idle", "idle", "idle"]);
    setShowCoinFloat(null);
    setIsAnswered(false);
    isAnsweredRef.current = false;
    setTimeUpMsg(false);
  }, [session == null ? void 0 : session.currentIndex, session]);
  const advanceToNext = reactExports.useCallback(() => {
    if (advanceRef.current) return;
    advanceRef.current = setTimeout(() => {
      advanceRef.current = null;
      const s = useStore.getState().session;
      if (!s) return;
      const nextIndex = s.currentIndex + 1;
      if (nextIndex >= s.questions.length) {
        navigate({ to: "/results" });
      } else {
        updateSession({ currentIndex: nextIndex });
      }
    }, 1500);
  }, [navigate, updateSession]);
  reactExports.useEffect(() => {
    if (!session || isAnswered) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!isAnsweredRef.current) {
            isAnsweredRef.current = true;
            setIsAnswered(true);
            setTimeUpMsg(true);
            setOptionStates(["disabled", "disabled", "disabled", "disabled"]);
            advanceToNext();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session == null ? void 0 : session.currentIndex, session, isAnswered, advanceToNext]);
  const handleOptionSelect = reactExports.useCallback(
    async (selectedIdx) => {
      if (!session || isAnsweredRef.current) return;
      const question2 = session.questions[session.currentIndex];
      if (!question2) return;
      if (timerRef.current) clearInterval(timerRef.current);
      isAnsweredRef.current = true;
      setIsAnswered(true);
      setOptionStates(
        ["disabled", "disabled", "disabled", "disabled"].map(
          (_, i) => i === selectedIdx ? "selected" : "disabled"
        )
      );
      try {
        const result = await checkAnswerMutation.mutateAsync({
          questionId: question2.id,
          selectedIndex: BigInt(selectedIdx),
          timeRemaining: BigInt(timeLeft)
        });
        const correctIdx = Number(result.correctIndex);
        setOptionStates(
          [0, 1, 2, 3].map((i) => {
            if (i === correctIdx) return "correct";
            if (i === selectedIdx && !result.correct) return "wrong";
            return "disabled";
          })
        );
        if (result.correct && result.coinsAwarded > BigInt(0)) {
          const total = result.coinsAwarded + result.bonusCoins;
          setShowCoinFloat(total);
          setTimeout(() => setShowCoinFloat(null), 1e3);
        }
        const newAnswers = [...session.answers];
        newAnswers[session.currentIndex] = selectedIdx;
        const newResults = [...session.answerResults];
        newResults[session.currentIndex] = result;
        const newCoins = session.totalCoins + result.coinsAwarded + result.bonusCoins;
        updateSession({
          answers: newAnswers,
          answerResults: newResults,
          totalCoins: newCoins
        });
      } catch {
        setOptionStates(["disabled", "disabled", "disabled", "disabled"]);
      }
      advanceToNext();
    },
    [session, timeLeft, checkAnswerMutation, updateSession, advanceToNext]
  );
  if (isLoading || !session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuizSkeleton, {}) });
  }
  const question = session.questions[session.currentIndex];
  if (!question) return null;
  const progress = (session.currentIndex + 1) / session.questions.length * 100;
  const totalCoinsStr = session.totalCoins.toString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-0 pb-6", "data-ocid": "quiz.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex flex-col gap-2",
        "data-ocid": "quiz.hud",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: "Q" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-sm", children: [
                session.currentIndex + 1,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-body font-normal", children: [
                  "/",
                  session.questions.length
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `font-mono font-bold text-lg tabular-nums transition-colors duration-300 ${timeLeft <= 2 ? "text-accent" : timeLeft <= 4 ? "text-orange-400" : "text-primary"}`,
                "data-ocid": "quiz.timer",
                "aria-live": "polite",
                "aria-label": `${timeLeft} seconds remaining`,
                children: [
                  String(timeLeft).padStart(2, "0"),
                  "s"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5",
                "data-ocid": "quiz.coins_display",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🪙" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm tabular-nums", children: totalCoinsStr })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-1 rounded-full bg-secondary overflow-hidden",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-primary transition-all duration-500 ease-out",
                  style: { width: `${progress}%` }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimerBar, { timeLeft, total: TOTAL_TIME }),
          timeUpMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "animate-fade-in text-center text-accent text-xs font-bold font-mono tracking-widest uppercase",
              "data-ocid": "quiz.timeup_message",
              "aria-live": "assertive",
              children: "⏰ Time up!"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-start px-4 pt-6 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuestionCard,
        {
          question,
          qIndex: session.currentIndex,
          total: session.questions.length,
          timeLeft,
          optionStates,
          onSelect: handleOptionSelect,
          showCoinFloat
        },
        session.currentIndex
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-gold text-xs capitalize", children: [
          String(difficulty),
          " Mode"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-mono", children: [
          "• ",
          username || "Guest"
        ] })
      ] })
    ] })
  ] });
}
export {
  Quiz as default
};
