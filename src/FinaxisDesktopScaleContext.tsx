import { createContext } from "react";

/** `min(1, viewportWidth / 1920)` from App — used to align fixed chrome with the scaled artboard. */
export const FinaxisDesktopScaleContext = createContext(1);
