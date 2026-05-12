import { c as createLucideIcon, j as jsxRuntimeExports, a as useNavigate, u as useStore, T as Trophy, m as motion } from "./index-CvZIVcv1.js";
import { a as cn, F as Flame } from "./utils-bGM6sAVA.js";
import { d as useLeaderboard, e as useProfile } from "./useBackend-n4ovTmqO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const RANK_STYLES = {
  1: {
    badge: "bg-[oklch(0.7_0.15_80)] text-[oklch(0.12_0_0)]",
    glow: "shadow-[0_0_16px_oklch(0.7_0.15_80/0.5)]",
    icon: "🥇"
  },
  2: {
    badge: "bg-[oklch(0.75_0_0)] text-[oklch(0.12_0_0)]",
    glow: "shadow-[0_0_8px_oklch(0.75_0_0/0.3)]",
    icon: "🥈"
  },
  3: {
    badge: "bg-[oklch(0.6_0.12_50)] text-[oklch(0.95_0_0)]",
    glow: "shadow-[0_0_8px_oklch(0.6_0.12_50/0.4)]",
    icon: "🥉"
  }
};
function Leaderboard() {
  const navigate = useNavigate();
  const { username } = useStore();
  const { data: entries = [], isLoading } = useLeaderboard();
  const { data: myProfile } = useProfile(username);
  const myEntry = entries.find((e) => e.username === username);
  const userInTop = !!myEntry;
  const topEntries = entries.slice(0, 50);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "leaderboard.page",
      className: "flex-1 flex flex-col gap-4 pb-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "leaderboard.back_button",
              onClick: () => navigate({ to: "/" }),
              className: "touch-target text-muted-foreground hover:text-foreground transition-smooth -ml-1",
              "aria-label": "Back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground leading-tight", children: "Global Leaderboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body", children: "Top players by total coins" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-primary" })
        ] }),
        username && myProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "rounded-xl p-4 flex items-center gap-3",
            style: {
              background: "oklch(0.7 0.15 80 / 0.08)",
              border: "1px solid oklch(0.7 0.15 80 / 0.35)"
            },
            "data-ocid": "leaderboard.my_rank_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm bg-primary text-primary-foreground shrink-0", children: myEntry ? `#${Number(myEntry.rank)}` : "–" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-base text-foreground truncate", children: [
                  username,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs", children: "(You)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary", children: [
                    "🪙 ",
                    Number(myProfile.totalCoins).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground flex items-center gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-accent" }),
                    Number(myProfile.streak)
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "leaderboard.list", className: "flex flex-col gap-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSkeleton, {}) : topEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "leaderboard.empty_state",
            className: "flex flex-col items-center gap-3 py-16 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🏏" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "No players yet!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Be the first to play and claim #1." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "button-gold mt-2 px-8",
                  onClick: () => navigate({ to: "/quiz" }),
                  children: "Start Playing"
                }
              )
            ]
          }
        ) : topEntries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeaderboardRow,
          {
            entry,
            index: idx,
            isCurrentUser: entry.username === username
          },
          entry.username
        )) }),
        !userInTop && myEntry === void 0 && username && myProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs text-muted-foreground mb-2 font-mono", children: "YOUR RANK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 flex items-center gap-3",
              style: {
                background: "oklch(0.7 0.15 80 / 0.06)",
                border: "1px dashed oklch(0.7 0.15 80 / 0.3)"
              },
              "data-ocid": "leaderboard.user_outside_top",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm bg-muted text-muted-foreground shrink-0", children: "..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-base text-foreground truncate", children: [
                    username,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs", children: "(You)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary", children: [
                    "🪙 ",
                    Number(myProfile.totalCoins).toLocaleString()
                  ] })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function LeaderboardRow({
  entry,
  index,
  isCurrentUser
}) {
  const rank = Number(entry.rank);
  const rankStyle = RANK_STYLES[rank];
  const ocid = `leaderboard.item.${index + 1}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": ocid,
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: Math.min(index * 0.04, 0.6), duration: 0.3 },
      className: `rounded-xl px-4 py-3 flex items-center gap-3 border transition-smooth ${isCurrentUser ? "border-[oklch(0.7_0.15_80/0.5)] bg-[oklch(0.7_0.15_80/0.07)]" : "border-border bg-card"} ${(rankStyle == null ? void 0 : rankStyle.glow) ?? ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm ${rankStyle ? rankStyle.badge : "bg-secondary text-secondary-foreground"}`,
            children: rankStyle ? rankStyle.icon : `#${rank}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `font-display font-bold text-sm truncate ${isCurrentUser ? "text-primary" : "text-foreground"}`,
                children: entry.username
              }
            ),
            isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary bg-primary/10 border border-primary/30 px-1 rounded shrink-0", children: "YOU" })
          ] }),
          Number(entry.streak) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
              Number(entry.streak),
              " day streak"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🪙" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-mono font-bold text-sm tabular-nums ${rank <= 3 ? "text-primary" : "text-foreground"}`,
              children: Number(entry.totalCoins).toLocaleString()
            }
          )
        ] })
      ]
    }
  );
}
function LeaderboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "leaderboard.loading_state", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl px-4 py-3 flex items-center gap-3 border border-border bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-16 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 rounded" })
      ]
    },
    `skeleton-row-${id}`
  )) });
}
export {
  Leaderboard as default
};
