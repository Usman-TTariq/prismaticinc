import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Globe-style Y rotation. Plain CSS @keyframes often fail to show inside the scaled
 * desktop canvas (`transform: scale()` in App flattens nested 3D). Framer drives the
 * transform on this subtree so it actually animates.
 */
export function FinaxisWireframeGlobeSpin({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="size-full min-h-0 min-w-0">{children}</div>;
  }

  return (
    <div className="size-full min-h-0 min-w-0" style={{ perspective: 560 }}>
      <motion.div
        className="size-full min-h-0 min-w-0"
        style={{
          transformOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateX: 10, rotateY: 0 }}
        animate={{ rotateX: 10, rotateY: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
