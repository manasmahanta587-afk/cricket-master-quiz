import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CoinDisplayProps {
  coins: bigint | number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function CoinDisplay({
  coins,
  size = "md",
  animate = true,
  className = "",
}: CoinDisplayProps) {
  const prevRef = useRef<bigint | number>(coins);
  const [showBurst, setShowBurst] = useState(false);
  const numCoins = typeof coins === "bigint" ? Number(coins) : coins;

  useEffect(() => {
    const prev =
      typeof prevRef.current === "bigint"
        ? Number(prevRef.current)
        : prevRef.current;
    if (animate && numCoins > prev) {
      setShowBurst(true);
      const t = setTimeout(() => setShowBurst(false), 800);
      return () => clearTimeout(t);
    }
    prevRef.current = coins;
  }, [coins, numCoins, animate]);

  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-1.5",
    lg: "text-xl gap-2",
  };

  const iconSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div
      data-ocid="coin_display"
      className={`relative flex items-center font-mono font-bold ${sizeClasses[size]} ${className}`}
    >
      <motion.span
        className={`${iconSize[size]}`}
        animate={
          showBurst ? { scale: [1, 1.5, 1], rotate: [0, 15, -15, 0] } : {}
        }
        transition={{ duration: 0.4 }}
      >
        🪙
      </motion.span>
      <AnimatePresence mode="wait">
        <motion.span
          key={numCoins}
          className="text-primary tabular-nums"
          initial={animate ? { y: -6, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {numCoins.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      {showBurst && (
        <motion.span
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary text-xs font-bold pointer-events-none"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          +coins!
        </motion.span>
      )}
    </div>
  );
}
