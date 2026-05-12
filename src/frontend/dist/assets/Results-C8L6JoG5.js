import { a as useNavigate, u as useStore, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, b as DifficultyBadge } from "./index-CvZIVcv1.js";
import { c as useAwardQuizCoins } from "./useBackend-n4ovTmqO.js";
const CONFETTI_COLORS = [
  "oklch(0.7 0.15 80)",
  // gold
  "oklch(0.55 0.22 25)",
  // red
  "oklch(0.65 0.18 120)",
  // green
  "oklch(0.68 0.2 65)",
  // orange
  "oklch(0.9 0 0)"
  // white
];
function useCountUp(target, duration = 1400) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const step = (now) => {
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
function Results() {
  const navigate = useNavigate();
  const { session, difficulty, username } = useStore();
  const [particles, setParticles] = reactExports.useState([]);
  const particleIdRef = reactExports.useRef(0);
  const totalCoins = session ? Number(session.totalCoins) : 0;
  const totalQuestions = (session == null ? void 0 : session.questions.length) ?? 0;
  const correctCount = (session == null ? void 0 : session.answerResults.filter((r) => r == null ? void 0 : r.correct).length) ?? 0;
  const incorrectCount = totalQuestions - correctCount;
  const accuracy = totalQuestions > 0 ? Math.round(correctCount / totalQuestions * 100) : 0;
  const streakBonusEarned = (session == null ? void 0 : session.answerResults.reduce(
    (sum, r) => sum + (r ? Number(r.bonusCoins) : 0),
    0
  )) ?? 0;
  const animatedCoins = useCountUp(totalCoins);
  const animatedAccuracy = useCountUp(accuracy, 1e3);
  const isHighScore = accuracy >= 80;
  const awardQuizCoins = useAwardQuizCoins();
  const hasAwarded = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (hasAwarded.current) return;
    if (!session || !username || totalCoins <= 0) return;
    hasAwarded.current = true;
    awardQuizCoins.mutate({ username, coins: BigInt(totalCoins) });
  }, []);
  reactExports.useEffect(() => {
    if (!isHighScore) return;
    const spawned = Array.from({ length: 40 }, (_, i) => ({
      id: particleIdRef.current++,
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 20,
      angle: Math.random() * 360,
      speed: 0.5 + Math.random() * 1.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 4 + Math.random() * 6
    }));
    setParticles(spawned);
    const t = setTimeout(() => setParticles([]), 3e3);
    return () => clearTimeout(t);
  }, [isHighScore]);
  const shieldGrade = accuracy >= 80 ? "gold" : accuracy >= 50 ? "silver" : "bronze";
  const shieldColors = {
    gold: {
      outer: "oklch(0.7 0.15 80)",
      inner: "oklch(0.82 0.18 85)",
      text: "oklch(0.12 0 0)"
    },
    silver: {
      outer: "oklch(0.7 0 0)",
      inner: "oklch(0.82 0 0)",
      text: "oklch(0.12 0 0)"
    },
    bronze: {
      outer: "oklch(0.55 0.1 50)",
      inner: "oklch(0.65 0.12 55)",
      text: "oklch(0.95 0 0)"
    }
  };
  const sc = shieldColors[shieldGrade];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "results.page",
      className: "flex-1 flex flex-col items-center pt-4 pb-8 gap-6 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            "aria-hidden": true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute rounded-sm",
                style: {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: p.color
                },
                initial: { opacity: 1, y: 0, rotate: 0 },
                animate: {
                  opacity: 0,
                  y: 200 + Math.random() * 200,
                  rotate: p.angle + 360,
                  x: (Math.random() - 0.5) * 120
                },
                transition: { duration: 2 + p.speed, ease: "easeIn" }
              },
              p.id
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "flex flex-col items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: "Session Complete" }),
              difficulty && /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": "results.score_shield",
            initial: { scale: 0.6, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
            className: "relative flex flex-col items-center",
            children: [
              isHighScore && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-0 rounded-full",
                  animate: {
                    boxShadow: [
                      "0 0 0px #c9963a40",
                      "0 0 40px #c9963a80",
                      "0 0 0px #c9963a40"
                    ]
                  },
                  transition: {
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "160",
                  height: "180",
                  viewBox: "0 0 160 180",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": "true",
                  role: "img",
                  "aria-label": "Score badge",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M80 6L148 36V92C148 132 116 162 80 174C44 162 12 132 12 92V36L80 6Z",
                        fill: sc.outer
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M80 18L138 44V92C138 126 110 152 80 162C50 152 22 126 22 92V44L80 18Z",
                        fill: sc.inner
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M80 30L128 54V92C128 120 104 142 80 150C56 142 32 120 32 92V54L80 30Z",
                        fill: sc.outer
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center",
                  style: { top: 20 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-mono font-bold uppercase tracking-widest",
                        style: { color: sc.text, opacity: 0.7 },
                        children: "Score"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        className: "font-display font-bold text-4xl leading-none",
                        style: { color: sc.text },
                        children: animatedCoins
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-mono mt-1",
                        style: { color: sc.text, opacity: 0.7 },
                        children: "coins"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.35, duration: 0.4 },
            className: "w-full grid grid-cols-3 gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Correct",
                  value: correctCount,
                  emoji: "✅",
                  ocid: "results.correct_count"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Accuracy",
                  value: `${animatedAccuracy}%`,
                  emoji: "🎯",
                  ocid: "results.accuracy",
                  highlight: accuracy >= 80
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Wrong",
                  value: incorrectCount,
                  emoji: "❌",
                  ocid: "results.wrong_count"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5, duration: 0.4 },
            className: "w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between",
            "data-ocid": "results.streak_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🔥" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-bold text-base", children: username ? `${username}'s Streak` : "Daily Streak" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body", children: "Keep playing daily to grow your streak!" })
                ] })
              ] }),
              streakBonusEarned > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-gold text-xs", children: [
                "+",
                streakBonusEarned,
                " bonus"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isHighScore && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: { delay: 0.6, type: "spring" },
            className: "w-full rounded-xl p-3 text-center",
            style: {
              background: "oklch(0.7 0.15 80 / 0.12)",
              border: "1px solid oklch(0.7 0.15 80 / 0.4)"
            },
            "data-ocid": "results.high_score_banner",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-display font-bold text-sm", children: "🏆 Excellent! 80%+ accuracy — keep it up!" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65, duration: 0.4 },
            className: "w-full flex flex-col gap-3 mt-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "results.play_again_button",
                  className: "button-gold w-full text-base",
                  onClick: () => navigate({ to: "/quiz" }),
                  children: "🏏 Play Again"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "results.leaderboard_button",
                  className: "button-accent w-full text-base",
                  onClick: () => navigate({ to: "/leaderboard" }),
                  children: "🏆 View Leaderboard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "results.home_button",
                  className: "w-full min-h-[48px] flex items-center justify-center text-muted-foreground text-sm font-body hover:text-foreground transition-smooth",
                  onClick: () => navigate({ to: "/" }),
                  children: "← Back to Home"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function StatCard({
  label,
  value,
  emoji,
  ocid,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1",
      style: highlight ? {
        borderColor: "oklch(0.7 0.15 80 / 0.6)",
        background: "oklch(0.7 0.15 80 / 0.06)"
      } : {},
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-foreground tabular-nums", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-body", children: label })
      ]
    }
  );
}
export {
  Results as default
};
