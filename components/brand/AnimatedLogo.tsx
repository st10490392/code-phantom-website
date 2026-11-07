"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

/**
 * Animated CodePhantom logo — used on the homepage hero.
 *
 * The emblem pulses with a slow breathing loop; the wordmark fades in
 * after the emblem settles. Reduced-motion users get a static version.
 */
export function AnimatedLogo({
  className,
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            "0 0 0 0 rgba(124, 58, 237, 0)",
            "0 0 0 8px rgba(124, 58, 237, 0.18)",
            "0 0 0 0 rgba(124, 58, 237, 0)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Logo className="!ring-0" size={size} showWordmark={false} />
      </motion.div>
    </motion.div>
  );
}

export default AnimatedLogo;