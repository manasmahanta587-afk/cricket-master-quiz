import { Difficulty } from "@/backend";
import { CoinDisplay } from "@/components/CoinDisplay";
import { StreakDisplay } from "@/components/StreakDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginOrRegister } from "@/hooks/useBackend";
import { useStore } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Flame, Star, Trophy, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const DIFFICULTY_CONFIG = [
  {
    key: Difficulty.Easy,
    label: "Easy",
    emoji: "🟢",
    coins: 10,
    desc: "Basic cricket facts",
    color: "border-green-600/50 bg-green-900/20 hover:border-green-500",
    selectedColor: "border-green-500 bg-green-900/40 ring-2 ring-green-500/30",
    badge: "text-green-400 bg-green-900/50",
    Icon: Star,
  },
  {
    key: Difficulty.Medium,
    label: "Medium",
    emoji: "🟡",
    coins: 25,
    desc: "IPL & World Cup history",
    color: "border-primary/40 bg-primary/5 hover:border-primary/70",
    selectedColor: "border-primary bg-primary/10 ring-2 ring-primary/30",
    badge: "text-primary bg-primary/20",
    Icon: Zap,
  },
  {
    key: Difficulty.Hard,
    label: "Hard",
    emoji: "🔴",
    coins: 50,
    desc: "Records & rare trivia",
    color: "border-accent/40 bg-accent/5 hover:border-accent/70",
    selectedColor: "border-accent bg-accent/15 ring-2 ring-accent/30",
    badge: "text-accent bg-accent/20",
    Icon: Flame,
  },
];

function UsernameForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useLoginOrRegister();
  const { setUsername, setProfile } = useStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    if (trimmed.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    setError("");
    mutate(trimmed, {
      onSuccess: (result) => {
        setUsername(trimmed);
        setProfile(result.profile);
      },
      onError: () => {
        setError("Failed to connect. Please try again.");
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-8 py-6"
    >
      {/* Logo / Hero */}
      <div className="flex flex-col items-center gap-3">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-7xl"
          style={{ filter: "drop-shadow(0 0 24px rgba(178,135,52,0.5))" }}
        >
          🏆
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="font-display font-bold text-4xl leading-tight">
            <span className="text-primary">Cricket</span>
            <br />
            <span className="text-foreground">Master</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-body">
            The ultimate cricket trivia challenge
          </p>
        </motion.div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xl">🏏</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Username form */}
      <motion.form
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
        data-ocid="username_form"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username-input"
            className="text-sm font-body font-semibold text-foreground"
          >
            Enter your player name
          </label>
          <Input
            id="username-input"
            data-ocid="username.input"
            type="text"
            placeholder="e.g. CricketFan99"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoFocus
            className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground text-base font-body"
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                data-ocid="username.field_error"
                className="text-accent text-xs mt-1 font-body"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          data-ocid="username.submit_button"
          disabled={isPending || name.trim().length < 2}
          className="h-12 w-full button-gold text-base font-display font-bold glow-gold disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin text-lg">🏏</span> Joining...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Start Playing <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </motion.form>

      {/* Features teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="grid grid-cols-3 gap-3 w-full text-center"
      >
        {[
          { icon: "🏅", label: "Earn Coins" },
          { icon: "🔥", label: "Daily Streak" },
          { icon: "🏆", label: "Leaderboard" },
        ].map((f) => (
          <div
            key={f.label}
            className="bg-card rounded-xl p-3 border border-border flex flex-col items-center gap-1"
          >
            <span className="text-2xl">{f.icon}</span>
            <span className="text-xs text-muted-foreground font-body">
              {f.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function HomeContent() {
  const navigate = useNavigate();
  const { profile, difficulty, setDifficulty } = useStore();
  const activeDiff =
    DIFFICULTY_CONFIG.find((d) => d.key === difficulty) ?? DIFFICULTY_CONFIG[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5 py-2"
    >
      {/* Player banner */}
      <motion.div
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        data-ocid="player_banner"
        className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.7 0.15 80 / 0.3), oklch(0.55 0.22 25 / 0.3))",
              border: "2px solid oklch(0.7 0.15 80 / 0.5)",
            }}
          >
            🧑‍🏏
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-body">Player</p>
            <p className="font-display font-bold text-lg text-foreground leading-tight truncate">
              {profile?.username}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {profile && <CoinDisplay coins={profile.totalCoins} size="sm" />}
          {profile && <StreakDisplay streak={profile.streak} size="sm" />}
        </div>
      </motion.div>

      {/* Streak bonus info */}
      <AnimatePresence>
        {profile && profile.streak > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            data-ocid="streak_bonus_banner"
            className="rounded-xl border border-accent/30 bg-accent/10 p-3 flex items-center gap-3"
          >
            <span className="text-2xl">🔥</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-semibold text-foreground">
                {profile.streak} day streak!
              </p>
              <p className="text-xs text-muted-foreground">
                Come back tomorrow for{" "}
                <span className="text-primary font-semibold">
                  +20 bonus coins!
                </span>
              </p>
            </div>
            <span className="badge-gold text-xs shrink-0">
              Day {profile.streak}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Difficulty selection */}
      <div data-ocid="difficulty_section">
        <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Select Difficulty
        </p>
        <div className="flex flex-col gap-2.5">
          {DIFFICULTY_CONFIG.map((diff, i) => {
            const isSelected = difficulty === diff.key;
            const { Icon } = diff;
            return (
              <motion.button
                key={diff.key}
                type="button"
                data-ocid={`difficulty.${diff.label.toLowerCase()}.toggle`}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                onClick={() => setDifficulty(diff.key)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-smooth flex items-center gap-4 ${
                  isSelected ? diff.selectedColor : diff.color
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-2xl">{diff.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-foreground">
                      {diff.label}
                    </span>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm text-primary"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    {diff.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      diff.badge
                    }`}
                  >
                    🪙 {diff.coins}/Q
                  </span>
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Start Quiz CTA */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex flex-col gap-3 pt-1 pb-2"
      >
        <Button
          type="button"
          data-ocid="start_quiz.primary_button"
          onClick={() => navigate({ to: "/quiz" })}
          className="h-14 w-full button-gold text-lg font-display font-bold glow-gold rounded-2xl"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">🏏</span>
            Start Quiz — {activeDiff.label}
            <ChevronRight className="w-5 h-5" />
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          data-ocid="nav_leaderboard.secondary_button"
          onClick={() => navigate({ to: "/leaderboard" })}
          className="h-12 w-full border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth rounded-xl"
        >
          <Trophy className="w-4 h-4 mr-2" />
          View Leaderboard
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { username } = useStore();
  const hasUser = username.trim().length > 0;

  return (
    <div data-ocid="home.page" className="flex flex-col flex-1">
      <AnimatePresence mode="wait">
        {!hasUser ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <UsernameForm />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            <HomeContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
