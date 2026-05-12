import { Difficulty } from "@/backend";
import { CoinDisplay } from "@/components/CoinDisplay";
import { StreakDisplay } from "@/components/StreakDisplay";
import { useStore } from "@/store";
import { Link, useRouterState } from "@tanstack/react-router";
import { Trophy, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { profile, soundEnabled, toggleSound, difficulty } = useStore();
  const routerState = useRouterState();
  const isQuizRoute = routerState.location.pathname === "/quiz";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {!isQuizRoute && (
        <header
          data-ocid="app_header"
          className="bg-card border-b border-border sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              data-ocid="header_logo_link"
              className="flex items-center gap-2 group"
            >
              <motion.span
                className="text-2xl"
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.4 }}
              >
                🏏
              </motion.span>
              <span className="font-display font-bold text-lg leading-tight">
                <span className="text-primary">Cricket</span>
                <span className="text-foreground"> Master</span>
              </span>
            </Link>

            {/* Right side: coins + streak + sound + leaderboard */}
            <div className="flex items-center gap-2">
              {profile && (
                <>
                  <CoinDisplay coins={profile.totalCoins} size="sm" />
                  <span className="w-px h-4 bg-border" />
                  <StreakDisplay streak={profile.streak} size="sm" />
                  <span className="w-px h-4 bg-border" />
                </>
              )}

              <button
                type="button"
                data-ocid="sound_toggle"
                onClick={toggleSound}
                className="touch-target text-muted-foreground hover:text-foreground transition-smooth"
                aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              <Link
                to="/leaderboard"
                data-ocid="nav_leaderboard_link"
                className="touch-target text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Leaderboard"
              >
                <Trophy className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Difficulty badge in header for quiz route */}
      {isQuizRoute && (
        <div
          data-ocid="quiz_header_bar"
          className="bg-card border-b border-border h-10 flex items-center justify-center"
        >
          <span className="badge-gold text-xs">{difficulty} Mode</span>
        </div>
      )}

      {/* Main content */}
      <main
        className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-4"
        data-ocid="main_content"
      >
        <motion.div
          key={routerState.location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      {!isQuizRoute && (
        <footer className="bg-card border-t border-border py-3">
          <div className="max-w-md mx-auto px-4 text-center">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-smooth"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

// Difficulty badge helper used across pages
export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colorMap: Record<Difficulty, string> = {
    [Difficulty.Easy]:
      "bg-emerald-900/40 text-emerald-400 border-emerald-700/50",
    [Difficulty.Medium]: "text-primary border-primary/50 bg-primary/10",
    [Difficulty.Hard]: "bg-accent/20 text-accent border-accent/50",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
        colorMap[difficulty]
      }`}
    >
      {difficulty}
    </span>
  );
}
