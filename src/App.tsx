import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { FinaxisDesktopScaleContext } from "./FinaxisDesktopScaleContext";
import FinaxisHome from "./FinaxisHome";
import FinaxisMobileHome from "./FinaxisMobileHome";

/** Figma artboard width — layout is authored in px at this width. */
const FINAXIS_CANVAS_W = 1920;
/** Only used before first layout measure; real height comes from scrollHeight. */
const FINAXIS_FALLBACK_H = 8190;

const LG_MEDIA = "(min-width: 1024px)";

function subscribeLgMatch(cb: () => void) {
  const mq = window.matchMedia(LG_MEDIA);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getLgMatchSnapshot() {
  return window.matchMedia(LG_MEDIA).matches;
}

/** SSR / prerender: assume desktop canvas until client measures viewport. */
function getLgMatchServerSnapshot() {
  return true;
}

function useIsDesktopLg() {
  return useSyncExternalStore(subscribeLgMatch, getLgMatchSnapshot, getLgMatchServerSnapshot);
}

export default function App() {
  const isDesktopLg = useIsDesktopLg();
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    typeof window !== "undefined" ? Math.min(1, window.innerWidth / FINAXIS_CANVAS_W) : 1,
  );
  const [contentH, setContentH] = useState(FINAXIS_FALLBACK_H);

  useLayoutEffect(() => {
    if (!isDesktopLg) return;
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
  }, [isDesktopLg]);

  useLayoutEffect(() => {
    if (!isDesktopLg) return;
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      const sh = el.scrollHeight;
      setContentH(sh > 0 ? sh : FINAXIS_FALLBACK_H);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isDesktopLg]);

  if (!isDesktopLg) {
    return (
      <div className="w-full overflow-x-clip bg-[#f7f7f7]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <FinaxisMobileHome />
        </motion.div>
      </div>
    );
  }

  const scaledW = FINAXIS_CANVAS_W * scale;
  const scaledH = contentH * scale;

  return (
    <FinaxisDesktopScaleContext.Provider value={scale}>
      <div className="w-full overflow-x-clip bg-[#f7f7f7]">
        <div className="mx-auto flex w-full max-w-full justify-center overflow-x-clip" style={{ minHeight: scaledH }}>
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
    </FinaxisDesktopScaleContext.Provider>
  );
}
