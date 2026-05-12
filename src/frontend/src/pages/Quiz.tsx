import { useCheckAnswer, useQuestions } from "@/hooks/useBackend";
import { useStore } from "@/store";
import type { AnswerResult, Question } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_TIME = 10;
const LETTERS = ["A", "B", "C", "D"];

// ── Coin Float ───────────────────────────────────────────────────────────────
function CoinFloat({ amount }: { amount: bigint }) {
  return (
    <div
      className="float-up pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 font-display font-bold text-lg"
      style={{ color: "oklch(0.7 0.15 80)" }}
      aria-live="polite"
    >
      <span>🪙</span>
      <span>+{amount.toString()}</span>
    </div>
  );
}

// ── Timer Bar ────────────────────────────────────────────────────────────────
function TimerBar({ timeLeft, total }: { timeLeft: number; total: number }) {
  const pct = (timeLeft / total) * 100;
  const warning = timeLeft <= 4;
  const danger = timeLeft <= 2;
  return (
    <div
      className="w-full h-2 rounded-full bg-secondary overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-linear ${
          danger ? "bg-accent" : warning ? "bg-orange-400" : "bg-primary"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Option Card ──────────────────────────────────────────────────────────────
interface OptionCardProps {
  letter: string;
  text: string;
  state: "idle" | "selected" | "correct" | "wrong" | "disabled";
  onClick: () => void;
  index: number;
  questionIndex: number;
}

function OptionCard({
  letter,
  text,
  state,
  onClick,
  index,
  questionIndex,
}: OptionCardProps) {
  const disabled =
    state === "correct" || state === "wrong" || state === "disabled";
  const cls = `option-card ${state !== "idle" && state !== "disabled" ? state : state === "disabled" ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      type="button"
      className={`${cls} w-full text-left flex items-center gap-3 min-h-[56px]`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-ocid={`quiz.option.${questionIndex + 1}.${index + 1}`}
    >
      <span
        className="option-letter shrink-0"
        style={
          state === "correct"
            ? { background: "oklch(0.6 0.2 145)", color: "oklch(0.12 0 0)" }
            : state === "wrong"
              ? { background: "oklch(0.55 0.22 25)", color: "oklch(0.95 0 0)" }
              : state === "selected"
                ? { background: "oklch(0.7 0.15 80)", color: "oklch(0.12 0 0)" }
                : undefined
        }
      >
        {letter}
      </span>
      <span className="text-sm font-body font-medium text-foreground flex-1 leading-snug">
        {text}
      </span>
      {state === "correct" && <span className="text-base">✅</span>}
      {state === "wrong" && <span className="text-base">❌</span>}
    </button>
  );
}

// ── Question Card ────────────────────────────────────────────────────────────
interface QuestionCardProps {
  question: Question;
  qIndex: number;
  total: number;
  timeLeft: number;
  optionStates: ("idle" | "selected" | "correct" | "wrong" | "disabled")[];
  onSelect: (idx: number) => void;
  showCoinFloat: bigint | null;
}

function QuestionCard({
  question,
  qIndex,
  total,
  optionStates,
  onSelect,
  showCoinFloat,
}: QuestionCardProps) {
  return (
    <div
      className="animate-slide-up w-full max-w-lg mx-auto flex flex-col gap-4"
      data-ocid="quiz.question_card"
    >
      {/* Category pill + question count */}
      <div className="flex items-center justify-between">
        <span className="badge-gold text-xs uppercase tracking-widest">
          {question.category}
        </span>
        <span className="text-muted-foreground text-xs font-mono">
          {qIndex + 1} / {total}
        </span>
      </div>

      {/* Question text */}
      <div className="bg-card rounded-xl p-5 border border-border relative overflow-hidden">
        <div
          className="absolute -right-4 -bottom-4 text-7xl opacity-5 pointer-events-none select-none"
          aria-hidden="true"
        >
          🏏
        </div>
        <h2 className="font-display text-xl font-bold text-foreground leading-snug relative z-10">
          {question.text}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 relative">
        {showCoinFloat !== null && <CoinFloat amount={showCoinFloat} />}
        {question.options.map((opt, i) => (
          <OptionCard
            key={`option-${opt}`}
            letter={LETTERS[i]}
            text={opt}
            state={optionStates[i]}
            onClick={() => onSelect(i)}
            index={i}
            questionIndex={qIndex}
          />
        ))}
      </div>
    </div>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────────────────────
function QuizSkeleton() {
  return (
    <div
      className="w-full max-w-lg mx-auto flex flex-col gap-4 animate-pulse"
      data-ocid="quiz.loading_state"
    >
      <div className="h-6 w-24 rounded-full bg-secondary" />
      <div className="bg-card rounded-xl p-5 h-28 border border-border" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-14 rounded-lg bg-secondary" />
      ))}
    </div>
  );
}

// ── Main Quiz Component ──────────────────────────────────────────────────────
export default function Quiz() {
  const navigate = useNavigate();
  const { difficulty, username, session, setSession, updateSession } =
    useStore();

  const { data: questions, isLoading } = useQuestions(difficulty, true);
  const checkAnswerMutation = useCheckAnswer();

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [optionStates, setOptionStates] = useState<
    ("idle" | "selected" | "correct" | "wrong" | "disabled")[]
  >(["idle", "idle", "idle", "idle"]);
  const [showCoinFloat, setShowCoinFloat] = useState<bigint | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeUpMsg, setTimeUpMsg] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnsweredRef = useRef(false);

  // Initialise session when questions load
  useEffect(() => {
    if (questions && questions.length > 0 && !session) {
      setSession({
        questions,
        answers: Array(questions.length).fill(null),
        answerResults: Array(questions.length).fill(null),
        currentIndex: 0,
        totalCoins: BigInt(0),
        startedAt: Date.now(),
      });
    }
  }, [questions, session, setSession]);

  // Reset per-question state when currentIndex changes
  useEffect(() => {
    if (!session) return;
    setTimeLeft(TOTAL_TIME);
    setOptionStates(["idle", "idle", "idle", "idle"]);
    setShowCoinFloat(null);
    setIsAnswered(false);
    isAnsweredRef.current = false;
    setTimeUpMsg(false);
  }, [session?.currentIndex, session]);

  // Advance to next question or results
  const advanceToNext = useCallback(() => {
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

  // Start/restart timer
  useEffect(() => {
    if (!session || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
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
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session?.currentIndex, session, isAnswered, advanceToNext]);

  const handleOptionSelect = useCallback(
    async (selectedIdx: number) => {
      if (!session || isAnsweredRef.current) return;
      const question = session.questions[session.currentIndex];
      if (!question) return;

      if (timerRef.current) clearInterval(timerRef.current);
      isAnsweredRef.current = true;
      setIsAnswered(true);

      // Mark selected immediately
      setOptionStates(
        ["disabled", "disabled", "disabled", "disabled"].map((_, i) =>
          i === selectedIdx ? "selected" : "disabled",
        ) as ("idle" | "selected" | "correct" | "wrong" | "disabled")[],
      );

      try {
        const result: AnswerResult = await checkAnswerMutation.mutateAsync({
          questionId: question.id,
          selectedIndex: BigInt(selectedIdx),
          timeRemaining: BigInt(timeLeft),
        });

        const correctIdx = Number(result.correctIndex);
        setOptionStates(
          [0, 1, 2, 3].map((i) => {
            if (i === correctIdx) return "correct";
            if (i === selectedIdx && !result.correct) return "wrong";
            return "disabled";
          }) as ("idle" | "selected" | "correct" | "wrong" | "disabled")[],
        );

        if (result.correct && result.coinsAwarded > BigInt(0)) {
          const total = result.coinsAwarded + result.bonusCoins;
          setShowCoinFloat(total);
          setTimeout(() => setShowCoinFloat(null), 1000);
        }

        const newAnswers = [...session.answers];
        newAnswers[session.currentIndex] = selectedIdx;
        const newResults = [...session.answerResults];
        newResults[session.currentIndex] = result;
        const newCoins =
          session.totalCoins + result.coinsAwarded + result.bonusCoins;
        updateSession({
          answers: newAnswers,
          answerResults: newResults,
          totalCoins: newCoins,
        });
      } catch {
        setOptionStates(["disabled", "disabled", "disabled", "disabled"]);
      }

      advanceToNext();
    },
    [session, timeLeft, checkAnswerMutation, updateSession, advanceToNext],
  );

  // ── Render ────────────────────────────────────────────────────────────────
  if (isLoading || !session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <QuizSkeleton />
      </div>
    );
  }

  const question = session.questions[session.currentIndex];
  if (!question) return null;

  const progress =
    ((session.currentIndex + 1) / session.questions.length) * 100;
  const totalCoinsStr = session.totalCoins.toString();

  return (
    <div className="flex-1 flex flex-col min-h-0 pb-6" data-ocid="quiz.page">
      {/* ── Top HUD ── */}
      <div
        className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex flex-col gap-2"
        data-ocid="quiz.hud"
      >
        {/* Row 1: progress count + timer digit + coins */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-xs font-mono">Q</span>
            <span className="font-display font-bold text-foreground text-sm">
              {session.currentIndex + 1}
              <span className="text-muted-foreground font-body font-normal">
                /{session.questions.length}
              </span>
            </span>
          </div>

          <div
            className={`font-mono font-bold text-lg tabular-nums transition-colors duration-300 ${
              timeLeft <= 2
                ? "text-accent"
                : timeLeft <= 4
                  ? "text-orange-400"
                  : "text-primary"
            }`}
            data-ocid="quiz.timer"
            aria-live="polite"
            aria-label={`${timeLeft} seconds remaining`}
          >
            {String(timeLeft).padStart(2, "0")}s
          </div>

          <div
            className="flex items-center gap-1.5"
            data-ocid="quiz.coins_display"
          >
            <span className="text-base">🪙</span>
            <span className="font-display font-bold text-primary text-sm tabular-nums">
              {totalCoinsStr}
            </span>
          </div>
        </div>

        {/* Row 2: overall progress bar */}
        <div
          className="w-full h-1 rounded-full bg-secondary overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Row 3: timer bar */}
        <TimerBar timeLeft={timeLeft} total={TOTAL_TIME} />

        {/* Time-up feedback */}
        {timeUpMsg && (
          <div
            className="animate-fade-in text-center text-accent text-xs font-bold font-mono tracking-widest uppercase"
            data-ocid="quiz.timeup_message"
            aria-live="assertive"
          >
            ⏰ Time up!
          </div>
        )}
      </div>

      {/* ── Question Area ── */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-6 overflow-y-auto">
        <QuestionCard
          key={session.currentIndex}
          question={question}
          qIndex={session.currentIndex}
          total={session.questions.length}
          timeLeft={timeLeft}
          optionStates={optionStates}
          onSelect={handleOptionSelect}
          showCoinFloat={showCoinFloat}
        />

        {/* Difficulty + username footer */}
        <div className="mt-6 flex items-center gap-2">
          <span className="badge-gold text-xs capitalize">
            {String(difficulty)} Mode
          </span>
          <span className="text-muted-foreground text-xs font-mono">
            • {username || "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
}
