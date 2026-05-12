import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboard, useProfile } from "@/hooks/useBackend";
import { useStore } from "@/store";
import type { LeaderboardEntry } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Flame, Trophy } from "lucide-react";
import { motion } from "motion/react";

const RANK_STYLES: Record<
  number,
  { badge: string; glow: string; icon: string }
> = {
  1: {
    badge: "bg-[oklch(0.7_0.15_80)] text-[oklch(0.12_0_0)]",
    glow: "shadow-[0_0_16px_oklch(0.7_0.15_80/0.5)]",
    icon: "🥇",
  },
  2: {
    badge: "bg-[oklch(0.75_0_0)] text-[oklch(0.12_0_0)]",
    glow: "shadow-[0_0_8px_oklch(0.75_0_0/0.3)]",
    icon: "🥈",
  },
  3: {
    badge: "bg-[oklch(0.6_0.12_50)] text-[oklch(0.95_0_0)]",
    glow: "shadow-[0_0_8px_oklch(0.6_0.12_50/0.4)]",
    icon: "🥉",
  },
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const { username } = useStore();
  const { data: entries = [], isLoading } = useLeaderboard();
  const { data: myProfile } = useProfile(username);

  // Find current user rank in list
  const myEntry = entries.find((e) => e.username === username);
  const userInTop = !!myEntry;

  // Top 50
  const topEntries = entries.slice(0, 50);

  return (
    <div
      data-ocid="leaderboard.page"
      className="flex-1 flex flex-col gap-4 pb-8"
    >
      {/* Page header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          data-ocid="leaderboard.back_button"
          onClick={() => navigate({ to: "/" })}
          className="touch-target text-muted-foreground hover:text-foreground transition-smooth -ml-1"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-xl text-foreground leading-tight">
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground text-xs font-body">
            Top players by total coins
          </p>
        </div>
        <Trophy className="w-5 h-5 text-primary" />
      </div>

      {/* My rank card if logged in */}
      {username && myProfile && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 flex items-center gap-3"
          style={{
            background: "oklch(0.7 0.15 80 / 0.08)",
            border: "1px solid oklch(0.7 0.15 80 / 0.35)",
          }}
          data-ocid="leaderboard.my_rank_card"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm bg-primary text-primary-foreground shrink-0">
            {myEntry ? `#${Number(myEntry.rank)}` : "–"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-base text-foreground truncate">
              {username} <span className="text-primary text-xs">(You)</span>
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono text-primary">
                🪙 {Number(myProfile.totalCoins).toLocaleString()}
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-accent" />
                {Number(myProfile.streak)}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard list */}
      <div data-ocid="leaderboard.list" className="flex flex-col gap-2">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : topEntries.length === 0 ? (
          <div
            data-ocid="leaderboard.empty_state"
            className="flex flex-col items-center gap-3 py-16 text-center"
          >
            <span className="text-5xl">🏏</span>
            <p className="font-display font-bold text-lg text-foreground">
              No players yet!
            </p>
            <p className="text-muted-foreground text-sm">
              Be the first to play and claim #1.
            </p>
            <button
              type="button"
              className="button-gold mt-2 px-8"
              onClick={() => navigate({ to: "/quiz" })}
            >
              Start Playing
            </button>
          </div>
        ) : (
          topEntries.map((entry, idx) => (
            <LeaderboardRow
              key={entry.username}
              entry={entry}
              index={idx}
              isCurrentUser={entry.username === username}
            />
          ))
        )}
      </div>

      {/* Current user out of top 50 */}
      {!userInTop && myEntry === undefined && username && myProfile && (
        <div className="mt-2">
          <div className="h-px bg-border mb-3" />
          <div className="text-center text-xs text-muted-foreground mb-2 font-mono">
            YOUR RANK
          </div>
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              background: "oklch(0.7 0.15 80 / 0.06)",
              border: "1px dashed oklch(0.7 0.15 80 / 0.3)",
            }}
            data-ocid="leaderboard.user_outside_top"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm bg-muted text-muted-foreground shrink-0">
              ...
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-base text-foreground truncate">
                {username} <span className="text-primary text-xs">(You)</span>
              </p>
              <span className="text-xs font-mono text-primary">
                🪙 {Number(myProfile.totalCoins).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardRow({
  entry,
  index,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  index: number;
  isCurrentUser: boolean;
}) {
  const rank = Number(entry.rank);
  const rankStyle = RANK_STYLES[rank];
  const ocid = `leaderboard.item.${index + 1}`;

  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.6), duration: 0.3 }}
      className={`rounded-xl px-4 py-3 flex items-center gap-3 border transition-smooth ${
        isCurrentUser
          ? "border-[oklch(0.7_0.15_80/0.5)] bg-[oklch(0.7_0.15_80/0.07)]"
          : "border-border bg-card"
      } ${rankStyle?.glow ?? ""}`}
    >
      {/* Rank badge */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm ${
          rankStyle ? rankStyle.badge : "bg-secondary text-secondary-foreground"
        }`}
      >
        {rankStyle ? rankStyle.icon : `#${rank}`}
      </div>

      {/* Username + streak */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p
            className={`font-display font-bold text-sm truncate ${
              isCurrentUser ? "text-primary" : "text-foreground"
            }`}
          >
            {entry.username}
          </p>
          {isCurrentUser && (
            <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/30 px-1 rounded shrink-0">
              YOU
            </span>
          )}
        </div>
        {Number(entry.streak) > 0 && (
          <div className="flex items-center gap-0.5 mt-0.5">
            <Flame className="w-3 h-3 text-accent" />
            <span className="text-xs font-mono text-muted-foreground">
              {Number(entry.streak)} day streak
            </span>
          </div>
        )}
      </div>

      {/* Coins */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base">🪙</span>
        <span
          className={`font-mono font-bold text-sm tabular-nums ${
            rank <= 3 ? "text-primary" : "text-foreground"
          }`}
        >
          {Number(entry.totalCoins).toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-2" data-ocid="leaderboard.loading_state">
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => (
        <div
          key={`skeleton-row-${id}`}
          className="rounded-xl px-4 py-3 flex items-center gap-3 border border-border bg-card"
        >
          <Skeleton className="w-9 h-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-2.5 w-16 rounded" />
          </div>
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      ))}
    </div>
  );
}
