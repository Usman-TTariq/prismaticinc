import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import FinaxisHome from "./FinaxisHome";

/** Figma artboard width — layout is authored in px at this width. */
const FINAXIS_CANVAS_W = 1920;
const FINAXIS_FALLBACK_H = 8600;

export default function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    typeof window !== "undefined" ? Math.min(1, window.innerWidth / FINAXIS_CANVAS_W) : 1,
  );
  const [contentH, setContentH] = useState(FINAXIS_FALLBACK_H);

  useLayoutEffect(() => {
    const measureScale = () => {
      const vw =
        typeof window !== "undefined"
          ? Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth)
          : FINAXIS_CANVAS_W;
      setScale(Math.min(1, vw / FINAXIS_CANVAS_W));
    };

    measureScale();
    window.addEventListener("resize", measureScale);
    window.addEventListener("orientationchange", measureScale);
    return () => {
      window.removeEventListener("resize", measureScale);
      window.removeEventListener("orientationchange", measureScale);
    };
  }, []);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      const h = Math.max(el.scrollHeight, FINAXIS_FALLBACK_H);
      setContentH(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledW = FINAXIS_CANVAS_W * scale;
  const scaledH = contentH * scale;

  return (
    <div className="min-h-svh w-full overflow-x-hidden bg-[#f7f7f7] supports-[min-height:100dvh]:min-h-[100dvh]">
      <div className="mx-auto flex w-full max-w-full justify-center overflow-x-hidden" style={{ minHeight: scaledH }}>
        <div className="relative shrink-0" style={{ width: scaledW, height: scaledH }}>
          <div
            className="absolute top-0 left-0 will-change-transform"
            style={{
              width: FINAXIS_CANVAS_W,
              minHeight: contentH,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <motion.div
              ref={innerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[1920px] max-w-none touch-manipulation"
            >
              <FinaxisHome />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
