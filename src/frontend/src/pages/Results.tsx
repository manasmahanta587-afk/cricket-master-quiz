import { DifficultyBadge } from "@/components/Layout";
import { useAwardQuizCoins } from "@/hooks/useBackend";
import { useStore } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

const CONFETTI_COLORS = [
  "oklch(0.7 0.15 80)", // gold
  "oklch(0.55 0.22 25)", // red
  "oklch(0.65 0.18 120)", // green
  "oklch(0.68 0.2 65)", // orange
  "oklch(0.9 0 0)", // white
];

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function Results() {
  const navigate = useNavigate();
  const { session, difficulty, username } = useStore();
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Compute stats from session
  const totalCoins = session ? Number(session.totalCoins) : 0;
  const totalQuestions = session?.questions.length ?? 0;
  const correctCount =
    session?.answerResults.filter((r) => r?.correct).length ?? 0;
  const incorrectCount = totalQuestions - correctCount;
  const accuracy =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Streak bonus from last answer result (bonusCoins > 0 means streak bonus applied)
  const streakBonusEarned =
    session?.answerResults.reduce(
      (sum, r) => sum + (r ? Number(r.bonusCoins) : 0),
      0,
    ) ?? 0;

  const animatedCoins = useCountUp(totalCoins);
  const animatedAccuracy = useCountUp(accuracy, 1000);

  const isHighScore = accuracy >= 80;

  // Persist coins earned during quiz to the backend on mount
  const awardQuizCoins = useAwardQuizCoins();
  const hasAwarded = useRef(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally fire once on mount only
  useEffect(() => {
    if (hasAwarded.current) return;
    if (!session || !username || totalCoins <= 0) return;
    hasAwarded.current = true;
    awardQuizCoins.mutate({ username, coins: BigInt(totalCoins) });
  }, []);

  // Spawn confetti on high score
  useEffect(() => {
    if (!isHighScore) return;
    const spawned: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: particleIdRef.current++,
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 20,
      angle: Math.random() * 360,
      speed: 0.5 + Math.random() * 1.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 4 + Math.random() * 6,
    }));
    setParticles(spawned);
    const t = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(t);
  }, [isHighScore]);

  // Shield color based on accuracy
  const shieldGrade =
    accuracy >= 80 ? "gold" : accuracy >= 50 ? "silver" : "bronze";
  const shieldColors = {
    gold: {
      outer: "oklch(0.7 0.15 80)",
      inner: "oklch(0.82 0.18 85)",
      text: "oklch(0.12 0 0)",
    },
    silver: {
      outer: "oklch(0.7 0 0)",
      inner: "oklch(0.82 0 0)",
      text: "oklch(0.12 0 0)",
    },
    bronze: {
      outer: "oklch(0.55 0.1 50)",
      inner: "oklch(0.65 0.12 55)",
      text: "oklch(0.95 0 0)",
    },
  };
  const sc = shieldColors[shieldGrade];

  return (
    <div
      data-ocid="results.page"
      className="flex-1 flex flex-col items-center pt-4 pb-8 gap-6 relative overflow-hidden"
    >
      {/* Confetti layer */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-sm"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
              }}
              initial={{ opacity: 1, y: 0, rotate: 0 }}
              animate={{
                opacity: 0,
                y: 200 + Math.random() * 200,
                rotate: p.angle + 360,
                x: (Math.random() - 0.5) * 120,
              }}
              transition={{ duration: 2 + p.speed, ease: "easeIn" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Header label */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-1"
      >
        <p className="text-muted-foreground text-sm font-body">
          Session Complete
        </p>
        {difficulty && <DifficultyBadge difficulty={difficulty} />}
      </motion.div>

      {/* Gold Shield */}
      <motion.div
        data-ocid="results.score_shield"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="relative flex flex-col items-center"
      >
        {isHighScore && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0px #c9963a40",
                "0 0 40px #c9963a80",
                "0 0 0px #c9963a40",
              ],
            }}
            transition={{
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
        <svg
          width="160"
          height="180"
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          aria-label="Score badge"
        >
          <path
            d="M80 6L148 36V92C148 132 116 162 80 174C44 162 12 132 12 92V36L80 6Z"
            fill={sc.outer}
          />
          <path
            d="M80 18L138 44V92C138 126 110 152 80 162C50 152 22 126 22 92V44L80 18Z"
            fill={sc.inner}
          />
          <path
            d="M80 30L128 54V92C128 120 104 142 80 150C56 142 32 120 32 92V54L80 30Z"
            fill={sc.outer}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ top: 20 }}
        >
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: sc.text, opacity: 0.7 }}
          >
            Score
          </span>
          <motion.span
            className="font-display font-bold text-4xl leading-none"
            style={{ color: sc.text }}
          >
            {animatedCoins}
          </motion.span>
          <span
            className="text-xs font-mono mt-1"
            style={{ color: sc.text, opacity: 0.7 }}
          >
            coins
          </span>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="w-full grid grid-cols-3 gap-3"
      >
        <StatCard
          label="Correct"
          value={correctCount}
          emoji="✅"
          ocid="results.correct_count"
        />
        <StatCard
          label="Accuracy"
          value={`${animatedAccuracy}%`}
          emoji="🎯"
          ocid="results.accuracy"
          highlight={accuracy >= 80}
        />
        <StatCard
          label="Wrong"
          value={incorrectCount}
          emoji="❌"
          ocid="results.wrong_count"
        />
      </motion.div>

      {/* Streak info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between"
        data-ocid="results.streak_panel"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-foreground font-display font-bold text-base">
              {username ? `${username}'s Streak` : "Daily Streak"}
            </p>
            <p className="text-muted-foreground text-xs font-body">
              Keep playing daily to grow your streak!
            </p>
          </div>
        </div>
        {streakBonusEarned > 0 && (
          <div className="badge-gold text-xs">+{streakBonusEarned} bonus</div>
        )}
      </motion.div>

      {/* High score celebration */}
      <AnimatePresence>
        {isHighScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="w-full rounded-xl p-3 text-center"
            style={{
              background: "oklch(0.7 0.15 80 / 0.12)",
              border: "1px solid oklch(0.7 0.15 80 / 0.4)",
            }}
            data-ocid="results.high_score_banner"
          >
            <p className="text-primary font-display font-bold text-sm">
              🏆 Excellent! 80%+ accuracy — keep it up!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="w-full flex flex-col gap-3 mt-auto"
      >
        <button
          type="button"
          data-ocid="results.play_again_button"
          className="button-gold w-full text-base"
          onClick={() => navigate({ to: "/quiz" })}
        >
          🏏 Play Again
        </button>
        <button
          type="button"
          data-ocid="results.leaderboard_button"
          className="button-accent w-full text-base"
          onClick={() => navigate({ to: "/leaderboard" })}
        >
          🏆 View Leaderboard
        </button>
        <button
          type="button"
          data-ocid="results.home_button"
          className="w-full min-h-[48px] flex items-center justify-center text-muted-foreground text-sm font-body hover:text-foreground transition-smooth"
          onClick={() => navigate({ to: "/" })}
        >
          ← Back to Home
        </button>
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
  emoji,
  ocid,
  highlight = false,
}: {
  label: string;
  value: string | number;
  emoji: string;
  ocid: string;
  highlight?: boolean;
}) {
  return (
    <div
      data-ocid={ocid}
      className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1"
      style={
        highlight
          ? {
              borderColor: "oklch(0.7 0.15 80 / 0.6)",
              background: "oklch(0.7 0.15 80 / 0.06)",
            }
          : {}
      }
    >
      <span className="text-lg">{emoji}</span>
      <span className="font-display font-bold text-xl text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground text-xs font-body">{label}</span>
    </div>
  );
}
