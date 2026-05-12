import { motion } from "motion/react";

interface StreakDisplayProps {
  streak: bigint | number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StreakDisplay({
  streak,
  size = "md",
  className = "",
}: StreakDisplayProps) {
  const numStreak = typeof streak === "bigint" ? Number(streak) : streak;
  const isHot = numStreak >= 3;
  const isOnFire = numStreak >= 7;

  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-1.5",
    lg: "text-xl gap-2",
  };

  return (
    <div
      data-ocid="streak_display"
      className={`flex items-center font-mono font-bold ${sizeClasses[size]} ${className}`}
    >
      <motion.span
        animate={
          isOnFire
            ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
            : isHot
              ? { scale: [1, 1.1, 1] }
              : {}
        }
        transition={{
          duration: 1.2,
          repeat: isHot ? Number.POSITIVE_INFINITY : 0,
          repeatDelay: 1,
        }}
      >
        {isOnFire ? "🔥" : isHot ? "⚡" : "📅"}
      </motion.span>
      <span
        className={`tabular-nums ${
          isOnFire
            ? "text-accent"
            : isHot
              ? "text-primary"
              : "text-muted-foreground"
        }`}
      >
        {numStreak}
      </span>
      <span className="text-muted-foreground font-body font-normal text-xs">
        {numStreak === 1 ? "day" : "days"}
      </span>
    </div>
  );
}
