import { motion } from "framer-motion";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AGENCY_IMG } from "./prismaAgencyAssets";
import { submitPrismatechLead } from "./submitPrismatechLead";

/** Figma prototype purple (screenshot ~#BC13FE) */
const accent = "#bc13fe";
const accentShadow = "rgba(188, 19, 254, 0.5)";
const font = "font-['Plus_Jakarta_Sans',ui-sans-serif,system-ui,sans-serif]";

function MerchantServicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="9" y="13" width="30" height="22" rx="3" stroke={accent} strokeWidth="1.85" />
      <path d="M15 23h18M15 29h10" stroke={accent} strokeWidth="1.85" strokeLinecap="round" />
      <path
        d="M33 26.5c1.5 0 2.5 1.2 2.5 2.5v.5h-5v-.5c0-1.3 1-2.5 2.5-2.5Z"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CORE_SERVICE_CARDS = [
  {
    key: "merchant",
    title: ["Merchant", "Services"] as const,
    description:
      "Accept payments easily with secure, fast, and reliable processing solutions designed for modern businesses.",
  },
  {
    key: "social",
    title: ["Social Media", "Marketing"] as const,
    description:
      "Grow your brand with strategic content, targeted campaigns, and consistent engagement across all major platforms.",
    iconUrl: AGENCY_IMG.serviceIcon,
  },
  {
    key: "content",
    title: ["Content", "Marketing"] as const,
    description:
      "Create impactful content that attracts, educates, and converts your audience into loyal customers.",
    iconUrl: AGENCY_IMG.serviceIcon1,
  },
  {
    key: "ppc",
    title: ["PPC", "Advertising"] as const,
    description:
      "Reach high-intent customers with optimized paid search and display campaigns that maximize ROI and scale.",
    iconUrl: AGENCY_IMG.serviceIcon2,
  },
] as const;

/** Core service card — compact layout (`w-[min(400px,…)]` below). */
const FIGMA_CORE_SERVICE_CARD = {
  height: 375,
  radius: 24,
  border: 1.15,
} as const;

/** Same delay as Finaxis home lead popup */
const AGENCY_LEAD_POPUP_DELAY_MS = 5 * 1000;

const PRISMATECH_PHONE_DISPLAY = "+1 707 439 8264";
const PRISMATECH_PHONE_TEL = "+17074398264";

export default function PrismaAgencyLanding() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [newsletterErr, setNewsletterErr] = useState("");

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);

  const servicesStripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = servicesStripRef.current;
    if (!el) return;

    const wheelDeltaY = (e: WheelEvent) => {
      if (e.deltaMode === 1) return e.deltaY * 16;
      if (e.deltaMode === 2) return e.deltaY * el.clientWidth;
      return e.deltaY;
    };

    /** Capture: wheel on card text/buttons was eaten by inner overflow-y; map vertical wheel → horizontal strip. */
    const onWheelCapture = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const dy = wheelDeltaY(e);
      if (dy === 0) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += dy;
    };
    el.addEventListener("wheel", onWheelCapture, { passive: false, capture: true });

    let dragStartX = 0;
    let dragScroll0 = 0;
    let dragging = false;
    const onDocMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = dragScroll0 - (e.clientX - dragStartX);
    };
    const onDocUp = () => {
      dragging = false;
      el.classList.remove("cursor-grabbing");
      document.removeEventListener("pointermove", onDocMove);
      document.removeEventListener("pointerup", onDocUp);
      document.removeEventListener("pointercancel", onDocUp);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const t = e.target as Element | null;
      if (t?.closest("button, a, input, textarea, select")) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      dragging = true;
      dragStartX = e.clientX;
      dragScroll0 = el.scrollLeft;
      el.classList.add("cursor-grabbing");
      document.addEventListener("pointermove", onDocMove);
      document.addEventListener("pointerup", onDocUp);
      document.addEventListener("pointercancel", onDocUp);
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      el.removeEventListener("wheel", onWheelCapture, { capture: true } as AddEventListenerOptions);
      el.removeEventListener("pointerdown", onPointerDown);
      onDocUp();
    };
  }, []);

  const dismissLeadPopup = useCallback(() => {
    setLeadModalOpen(false);
    setLeadSubmitted(false);
    setLeadSubmitError(null);
    setLeadForm({ name: "", email: "", phone: "", message: "" });
  }, []);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  const openLeadPopup = useCallback(() => {
    setMobileNavOpen(false);
    setLeadSubmitted(false);
    setLeadSubmitError(null);
    setLeadForm({ name: "", email: "", phone: "", message: "" });
    setLeadModalOpen(true);
  }, []);

  useEffect(() => {
    if (leadModalOpen) setMobileNavOpen(false);
  }, [leadModalOpen]);

  useEffect(() => {
    const id = window.setTimeout(() => setLeadModalOpen(true), AGENCY_LEAD_POPUP_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!leadModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissLeadPopup();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [leadModalOpen, dismissLeadPopup]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  /** Same-page #hash links — smooth scroll (CSS alone is flaky with doc overflow-x hidden). */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^=\"#\"]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (a.target && a.target !== "" && a.target !== "_self") return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = decodeURIComponent(href.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      history.pushState(null, "", href);
      setMobileNavOpen(false);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onLeadPopupSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadSubmitError(null);
    setLeadSubmitting(true);
    const result = await submitPrismatechLead({
      ...leadForm,
      source: "popup",
      message: leadForm.message.trim() || "Free consultation request (agency landing popup).",
    });
    setLeadSubmitting(false);
    if (result.ok === false) {
      setLeadSubmitError(result.error);
      return;
    }
    setLeadSubmitted(true);
  }

  async function onNewsletterSubmit(e: FormEvent) {
    e.preventDefault();
    setNewsletterErr("");
    setNewsletterStatus("loading");
    const result = await submitPrismatechLead({
      name: "Newsletter",
      email: newsletterEmail,
      phone: "—",
      message: "Newsletter subscription (Figma agency landing).",
      source: "newsletter",
    });
    if (result.ok === false) {
      setNewsletterStatus("err");
      setNewsletterErr(result.error);
      return;
    }
    setNewsletterStatus("ok");
    setNewsletterEmail("");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`relative min-h-screen bg-[#050505] text-[#d1d1d1] antialiased ${font}`}
    >
      {/* Ambient Figma layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          alt=""
          src={AGENCY_IMG.ambient}
          className="absolute left-1/2 top-[-10%] h-[120vh] min-w-[120%] -translate-x-1/2 object-cover opacity-[0.22]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1920px] px-3 pt-3 pb-[max(3rem,env(safe-area-inset-bottom,0px))] sm:px-5 sm:pb-16 sm:pt-5 lg:px-8">
        {/* Nav — sticky must sit outside any overflow-x-hidden ancestor (see main wrapper) */}
        <header className="sticky top-[max(0.5rem,env(safe-area-inset-top,0px))] z-[140] mx-auto flex max-w-[1860px] items-center justify-between gap-2 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0f]/95 px-2.5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:gap-3 sm:rounded-[25px] sm:px-8 sm:py-4">
          <a href="#top" className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3.5" onClick={closeMobileNav}>
            <img alt="" src={AGENCY_IMG.logoMark} className="h-9 w-auto shrink-0 object-contain sm:h-[52px]" />
            <div className="min-w-0 leading-none">
              <div className="hidden flex-col sm:flex">
                <img
                  alt="PrismaTech"
                  src={AGENCY_IMG.logoWordmarkMask}
                  className="h-6 max-w-[220px] object-contain object-left brightness-0 invert sm:h-7 sm:max-w-[260px]"
                />
                <span className="mt-0.5 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a8a8a8] sm:text-[11px]">
                  INC
                </span>
              </div>
              <div className="flex flex-col sm:hidden">
                <span className="text-[15px] font-extrabold uppercase tracking-wide text-white">PRISMATECH</span>
                <span className="text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a8a8a8]">INC</span>
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-[15px] font-medium md:flex lg:gap-10 lg:text-[18px]">
            <a href="#top" className="font-bold" style={{ color: accent }}>
              Home
            </a>
            <a href="#about" className="text-[#d1d1d1] transition hover:text-white">
              About Us
            </a>
            <a href="#services" className="flex items-center gap-1 text-[#d1d1d1] transition hover:text-white">
              Services
              <span className="text-sm" style={{ color: accent }}>
                ▾
              </span>
            </a>
            <a
              href="#contact"
              className="text-[#d1d1d1] transition hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                openLeadPopup();
              }}
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={openLeadPopup}
              className={`rounded-full border border-white/10 px-5 py-2.5 text-[15px] font-semibold leading-none tracking-wide text-white transition hover:border-[rgba(188,19,254,0.45)] hover:text-white lg:px-6 lg:py-3 lg:text-[17px] lg:tracking-[0.06em] ${font}`}
              style={{ boxShadow: `0 0 20px ${accentShadow}` }}
            >
              Free Consultation
            </button>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${PRISMATECH_PHONE_TEL}`}
              className="flex shrink-0 items-center gap-2 rounded-[100px] bg-black py-1.5 pr-3 pl-1.5 sm:pr-5 sm:pl-2"
              style={{ boxShadow: `-3px -3px 12px ${accentShadow}` }}
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-full sm:size-[59px]"
                style={{ backgroundColor: accent }}
              >
                <svg className="size-5 text-[#d1d1d1]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </span>
              <span className="hidden text-[17px] font-bold text-white sm:inline">{PRISMATECH_PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white shadow-inner transition hover:border-[rgba(188,19,254,0.45)] hover:bg-white/[0.06] md:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="prisma-mobile-nav"
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span className="sr-only">{mobileNavOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex size-5 flex-col items-center justify-center gap-[5px]" aria-hidden>
                <span
                  className={`block h-0.5 w-[1.125rem] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${mobileNavOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-[1.125rem] rounded-full bg-white transition-opacity duration-200 motion-reduce:transition-none ${mobileNavOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-[1.125rem] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${mobileNavOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </header>

        {/* Mobile nav — slide-over drawer (md+ uses inline nav) */}
        <div
          className={`md:hidden fixed inset-0 z-[160] ${mobileNavOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          inert={!mobileNavOpen ? true : undefined}
        >
          <div
            role="presentation"
            className={`absolute inset-0 z-0 bg-black/65 backdrop-blur-[4px] transition-opacity duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${mobileNavOpen ? "opacity-100" : "opacity-0"}`}
            onClick={closeMobileNav}
          />
          <aside
            id="prisma-mobile-nav"
            className={`absolute top-0 right-0 z-[1] flex h-[100dvh] w-[min(20rem,calc(100vw-2.5rem))] max-w-[20rem] flex-col border-l shadow-[-20px_0_48px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{
              paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
              backgroundColor: "#07070c",
              borderLeftColor: "rgba(188, 19, 254, 0.22)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                background: `linear-gradient(165deg, ${accent} 0%, transparent 42%)`,
              }}
              aria-hidden
            />
            <div className="relative flex flex-1 flex-col px-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <img alt="" src={AGENCY_IMG.logoMark} className="h-8 w-auto shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-extrabold uppercase tracking-wide text-white">PrismaTech</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">Inc.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMobileNav}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-[rgba(188,19,254,0.45)] hover:bg-white/[0.08]"
                  aria-label="Close menu"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1 text-[17px] font-medium" aria-label="Mobile">
                <a
                  href="#top"
                  onClick={closeMobileNav}
                  className="rounded-xl px-3 py-3.5 font-bold text-white transition hover:bg-white/[0.06]"
                  style={{ color: accent }}
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={closeMobileNav}
                  className="rounded-xl px-3 py-3.5 text-[#d4d4d4] transition hover:bg-white/[0.06] hover:text-white"
                >
                  About Us
                </a>
                <a
                  href="#services"
                  onClick={closeMobileNav}
                  className="flex items-center justify-between gap-2 rounded-xl px-3 py-3.5 text-[#d4d4d4] transition hover:bg-white/[0.06] hover:text-white"
                >
                  Services
                  <span className="text-sm opacity-80" style={{ color: accent }}>
                    ▾
                  </span>
                </a>
                <button
                  type="button"
                  onClick={openLeadPopup}
                  className="w-full rounded-xl px-3 py-3.5 text-left text-[#d4d4d4] transition hover:bg-white/[0.06] hover:text-white"
                >
                  Contact Us
                </button>
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={openLeadPopup}
                  className="flex h-[52px] w-full items-center justify-center rounded-full text-[15px] font-medium text-white"
                  style={{
                    background: `linear-gradient(145deg, ${accent}, #8b0bc4)`,
                    boxShadow: `0 0 28px ${accentShadow}`,
                  }}
                >
                  Free Consultation
                </button>
                <a
                  href={`tel:${PRISMATECH_PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[15px] font-semibold text-white transition hover:border-[rgba(188,19,254,0.35)]"
                >
                  <span className="flex size-9 items-center justify-center rounded-full" style={{ backgroundColor: accent }}>
                    <svg className="size-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </span>
                  {PRISMATECH_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </aside>
        </div>

        <main
          id="top"
          className="mx-auto mt-3 max-w-[1860px] min-w-0 scroll-mt-24 overflow-x-visible px-0 sm:mt-6 sm:scroll-mt-28 md:mt-7"
        >
          {/* Hero — section uses overflow-x-clip; main stays visible so nested horizontal strips can scroll */}
          <section className="relative overflow-x-clip overflow-y-visible rounded-2xl border border-[#1f1f1f] sm:rounded-[25px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[25px]">
              <img alt="" src={AGENCY_IMG.heroPhoto} className="size-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 70% 60%, ${accent} 0%, transparent 55%)`,
                }}
              />
              {/* Right-edge fade on photo (reads as soft vignette into dark) */}
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background: `linear-gradient(270deg, rgba(5,5,8,0.68) 0%, rgba(5,5,8,0.32) 14%, rgba(5,5,8,0.08) 32%, transparent 52%)`,
                }}
                aria-hidden
              />
            </div>
            <div className="relative flex min-h-[min(68dvh,560px)] flex-col pb-8 pt-5 sm:min-h-[min(78dvh,720px)] sm:pb-14 sm:pt-6 lg:min-h-[780px] lg:pb-16">
              {/* Figma: 1388.55 × 672.44 @ top 89.07, left 241.45 (scaled via CSS) */}
              <div className="hero-figma-frame flex flex-1 flex-col">
                <h1 className="prisma-hero-h1 max-w-full text-white [overflow-wrap:anywhere]">
                  <span className="block lg:whitespace-nowrap">Amplify your brand with</span>
                  <span className="block text-white/95">cutting edge digital</span>
                  <span className="block">Services</span>
                </h1>

                <div className="flex-1" aria-hidden />

                <div className="mt-6 flex flex-col sm:mt-8 lg:mt-0 lg:items-end">
                  <div className="flex w-full flex-col gap-6 lg:max-w-[540px] lg:items-end lg:text-right">
                  <p className="text-[16px] leading-relaxed text-[#e8e8e8] sm:text-[18px] lg:ml-0 lg:max-w-[520px]">
                    At PrismaTech, we bring your ideas to life by crafting engaging, impactful digital experiences that
                    captivate audiences and drive results. From innovative web design to compelling content and
                    cutting-edge digital strategies.
                  </p>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 lg:flex-row-reverse lg:justify-end">
                    <button
                      type="button"
                      onClick={openLeadPopup}
                      className="relative flex h-[64px] w-full max-w-full items-center rounded-full bg-[#0e0e0e] pl-6 sm:h-[76px] sm:max-w-[280px] sm:pl-8 lg:max-w-[300px]"
                      style={{ boxShadow: `-4px -4px 14px ${accentShadow}` }}
                    >
                      <span className="text-[17px] font-semibold text-white">Get Started</span>
                      <span
                        className="absolute right-1.5 flex size-[58px] items-center justify-center rounded-full sm:size-[62px]"
                        style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accentShadow}` }}
                      >
                        <svg className="ml-0.5 size-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" transform="rotate(-90 12 12)" />
                        </svg>
                      </span>
                    </button>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end">
                      <div className="flex -space-x-3">
                        {[AGENCY_IMG.reviewer, AGENCY_IMG.reviewer1, AGENCY_IMG.reviewer2].map((src, i) => (
                          <img
                            key={src}
                            alt=""
                            src={src}
                            className="size-[52px] rounded-full border-[3px] object-cover ring-2 ring-black/60 sm:size-14"
                            style={{ borderColor: accent, zIndex: 3 - i }}
                          />
                        ))}
                      </div>
                      <p className="text-left text-[16px] font-bold leading-tight text-white sm:text-[17px] lg:text-right">
                        <span className="text-[#e0e0e0]">2.7k Positive </span>
                        <br className="sm:hidden" />
                        <span className="text-white">Reviews</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>

          {/* About / expertise — Figma: CTA + image left (~40%), copy + stats right (~60%) */}
          <section
            id="about"
            className="about-expertise-section mt-10 scroll-mt-24 rounded-2xl border border-white/[0.06] px-3 py-10 sm:mt-16 sm:scroll-mt-28 sm:rounded-[25px] sm:px-8 sm:py-16 lg:mt-20 lg:px-10 lg:py-20"
          >
            <div className="mx-auto grid max-w-[1860px] gap-8 sm:gap-10 lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
              {/* Left: row1 CTA + narrow vertical image, row2 wide horizontal image (staggered like design) */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_clamp(92px,26%,168px)] sm:items-stretch sm:gap-3 md:gap-4">
                  <div
                    className="rounded-2xl border p-5 sm:rounded-[32px] sm:p-8"
                    style={{
                      backgroundColor: "#121212",
                      borderColor: "rgba(188, 19, 254, 0.28)",
                      boxShadow: "0 0 48px rgba(188, 19, 254, 0.06)",
                    }}
                  >
                    <p className="text-[1.35rem] font-bold leading-snug text-white sm:text-[1.65rem] sm:leading-tight md:text-[2rem]">
                      Ready to Elevate Your Digital Presence?
                    </p>
                    <p className="mt-4 text-[17px] leading-relaxed text-[#9ca3af] sm:text-[18px]">
                      Let&apos;s create a custom strategy that fits your business goals.
                    </p>
                    <button
                      type="button"
                      onClick={openLeadPopup}
                      className="mt-6 inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-[17px] font-semibold no-underline sm:text-[18px]"
                      style={{ color: accent }}
                    >
                      Get Free Consultation
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: "rgba(188, 19, 254, 0.2)" }}
                        aria-hidden
                      >
                        <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div
                    className="overflow-hidden rounded-2xl border border-white/[0.08] sm:rounded-[32px]"
                    style={{ boxShadow: "0 20px 48px rgba(0,0,0,0.4)" }}
                  >
                    <div className="relative aspect-[4/3] min-h-[160px] sm:aspect-auto sm:h-full sm:min-h-[200px] md:min-h-[260px]">
                      <img
                        alt=""
                        src={AGENCY_IMG.aboutStrip}
                        className="absolute inset-0 size-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="overflow-hidden rounded-2xl border border-white/[0.08] sm:rounded-[32px]"
                  style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}
                >
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[5/3] lg:min-h-[320px]">
                    <img
                      alt="Team collaborating in a modern workspace"
                      src={AGENCY_IMG.expertise}
                      className="absolute inset-0 size-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Right: label, headline, body, list, stats card */}
              <div className="flex flex-col gap-6 lg:gap-7">
                <div className="flex items-center gap-2.5">
                  <img alt="" src={AGENCY_IMG.sparkle} className="size-5 object-contain opacity-95 sm:size-6" />
                  <p className="text-[15px] font-semibold uppercase tracking-[0.12em] text-white sm:text-base">Our Expertise</p>
                </div>
                <h2 className="text-[clamp(1.5rem,6.5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white sm:leading-[1.08]">
                  Data Driven Strategies, Measurable Results
                </h2>
                <p className="max-w-2xl text-[17px] leading-relaxed text-[#a3a3a3] sm:text-[19px]">
                  At Prisma, we specialize in crafting innovative digital marketing strategies that drive real business
                  growth. Our expertise ensures your brand stays ahead in the competitive digital landscape.
                </p>
                <div>
                  <p className="text-lg font-bold text-white sm:text-xl">What We Do Best</p>
                  <ul className="mt-4 space-y-3.5">
                    {["Performance Marketing", "Social Media Growth", "Content Marketing"].map((label) => (
                      <li key={label} className="flex items-center gap-3.5 text-[17px] font-semibold text-white sm:text-[18px]">
                        <span
                          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] text-white"
                          style={{ backgroundColor: "rgba(188, 19, 254, 0.35)" }}
                          aria-hidden
                        >
                          ✓
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="mt-2 rounded-2xl border p-5 sm:rounded-[28px] sm:p-8 lg:mt-4"
                  style={{
                    backgroundColor: "#121212",
                    borderColor: "rgba(188, 19, 254, 0.28)",
                    boxShadow: "0 0 48px rgba(188, 19, 254, 0.06)",
                  }}
                >
                  <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <span
                      className="text-[clamp(3.5rem,9vw,5.5rem)] font-black leading-none tracking-tight"
                      style={{
                        color: "#121212",
                        WebkitTextStroke: `2px ${accent}`,
                        paintOrder: "stroke fill",
                      }}
                    >
                      21+
                    </span>
                    <p className="max-w-[min(100%,280px)] pt-1 text-[17px] font-bold leading-snug text-white sm:text-[19px] lg:pt-3">
                      Years of Experience on Digital Marketing Services
                    </p>
                  </div>
                  <p className="mt-6 text-[16px] leading-relaxed text-[#9ca3af] sm:text-[17px]">
                    We measure our success by the success of our clients. With a focus on results and a dedication to
                    quality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mid banner — mobile min-height; md+ Figma aspect ~1860×632 */}
          <section className="relative mx-auto mt-10 w-full max-w-[1860px] min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.08] sm:mt-16 sm:min-h-[340px] sm:rounded-[25px] md:mt-24 md:aspect-[1860/631.98] md:min-h-0">
            <img
              alt=""
              src={AGENCY_IMG.midBanner}
              className="absolute inset-0 size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 sm:p-6 sm:pb-8 md:p-10 md:pb-12 lg:px-14 lg:pb-14">
              <div className="max-w-full sm:max-w-2xl">
                <div className="mb-3 flex items-center gap-3 sm:mb-4">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full sm:size-10"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  >
                    <span className="size-2 rounded-full bg-white sm:size-2.5" />
                  </span>
                  <p className="text-[15px] font-semibold text-white sm:text-base">We Help Brands Grow</p>
                </div>
                <h2 className="text-[clamp(1.75rem,4.2vw,3.15rem)] font-bold leading-[1.12] tracking-tight text-white">
                  Transform Your Business with Prisma!
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[1.65] text-white/95 sm:text-[18px] sm:leading-[1.7] lg:max-w-xl">
                  Take your digital marketing to the next level with data-driven strategies and innovative solutions.
                  Let&apos;s create something amazing together!
                </p>
              </div>
            </div>
          </section>

          {/* Our Core Services — Figma cards ~476×447, radius 28.79px, border 1.15px */}
          <section
            id="services"
            className="core-services-section relative mx-auto mt-10 max-w-[1860px] min-w-0 scroll-mt-24 overflow-visible rounded-2xl border border-white/[0.08] px-3 py-10 sm:mt-16 sm:scroll-mt-28 sm:rounded-[25px] sm:px-8 sm:py-14 md:mt-20 lg:px-10 lg:py-16"
          >
            <div className="relative z-[1] min-w-0">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full sm:size-10"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  >
                    <span className="size-2 rounded-full bg-white sm:size-2.5" />
                  </span>
                  <p className="text-[15px] font-semibold text-white sm:text-base">Our Core Services</p>
                </div>
                <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(1.85rem,4vw,3.35rem)] font-semibold leading-[1.12] tracking-tight text-[#e8e8e8]">
                  Digital Solutions That Drive Real Results
                </h2>
              </div>

              <div className="mx-auto mt-10 w-full min-w-0 max-w-[1520px] lg:mt-12">
                <div
                  ref={servicesStripRef}
                  className="scrollbar-hide flex w-full min-w-0 cursor-grab touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain py-1 pl-3 pr-8 scroll-pl-3 scroll-pr-3 [-webkit-overflow-scrolling:touch] active:cursor-grabbing sm:gap-5 sm:scroll-pl-0 sm:scroll-pr-10 sm:pl-0 sm:pr-10 md:gap-6"
                  role="region"
                  aria-label="Our core services"
                >
                {CORE_SERVICE_CARDS.map((card) => (
                  <article
                    key={card.key}
                    className="box-border flex w-[min(400px,calc((100vw-3rem)*0.88))] shrink-0 snap-center flex-col p-4 sm:w-[min(400px,calc(100vw-4rem))] sm:snap-start sm:p-5"
                    style={{
                      height: `${FIGMA_CORE_SERVICE_CARD.height}px`,
                      minHeight: `${FIGMA_CORE_SERVICE_CARD.height}px`,
                      borderRadius: `${FIGMA_CORE_SERVICE_CARD.radius}px`,
                      borderWidth: `${FIGMA_CORE_SERVICE_CARD.border}px`,
                      borderStyle: "solid",
                      borderColor: "rgba(188, 19, 254, 0.28)",
                      backgroundColor: "#121212",
                      boxShadow: "0 0 40px rgba(188, 19, 254, 0.04)",
                    }}
                  >
                      <div className="flex items-start gap-3 sm:gap-3.5">
                        <div
                          className="flex size-[68px] shrink-0 items-center justify-center rounded-[18px] sm:size-[72px] sm:rounded-[20px]"
                          style={{
                            background: "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
                            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
                          }}
                        >
                          <div className="relative size-[42px] sm:size-[46px]">
                            {"iconUrl" in card && card.iconUrl ? (
                              <img alt="" src={card.iconUrl} className="size-full object-contain" />
                            ) : (
                              <MerchantServicesIcon className="size-full" />
                            )}
                          </div>
                        </div>
                        <div className="min-h-[3rem] min-w-0 flex-1 text-left sm:min-h-[3.25rem]">
                          {card.title.map((line) => (
                            <p
                              key={line}
                              className="text-[1.2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[1.35rem] sm:leading-[1.12]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 min-h-0 flex-1 overflow-hidden text-left text-[14px] leading-relaxed text-[#a3a3a3] sm:text-[15px]">
                        {card.description}
                      </p>
                      <button
                        type="button"
                        onClick={openLeadPopup}
                        className="mt-auto grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-2 rounded-full border bg-[#0e0e0e] py-2 pl-3 pr-2 pt-4 sm:py-2.5 sm:pl-4"
                        style={{ borderColor: "rgba(188, 19, 254, 0.35)" }}
                      >
                        <span className="text-center text-[14px] font-semibold text-white sm:text-[15px]">
                          Inquire Details
                        </span>
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-full sm:size-11"
                          style={{ backgroundColor: accent }}
                          aria-hidden
                        >
                          <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M7 17 17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </article>
                  ))}
                </div>
              </div>

              <p className="relative z-[1] mx-auto mt-8 max-w-3xl px-1 text-center text-[15px] leading-relaxed text-white sm:mt-12 sm:mt-14 sm:text-[18px]">
                <span>Need a custom solution? Let&apos;s create a strategy tailored for your business. </span>
                <button
                  type="button"
                  onClick={openLeadPopup}
                  className="inline border-0 bg-transparent p-0 font-semibold underline-offset-2 transition hover:underline"
                  style={{ color: accent }}
                >
                  Get a Free Strategy Call
                </button>
              </p>
            </div>
          </section>

          {/* How it Work — Figma ~1860×813, top corners 25px only */}
          <section className="relative mx-auto mt-10 w-full max-w-[1860px] sm:mt-16 md:mt-24">
            <div className="flex min-h-0 flex-col overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#050505] px-4 py-8 sm:rounded-t-[25px] sm:px-8 sm:py-12 lg:min-h-[813.55px] lg:px-10 lg:py-14">
              <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-x-10 lg:gap-y-0 xl:gap-x-14 2xl:gap-x-20">
                <div className="min-w-0 lg:max-w-[min(100%,560px)] xl:max-w-[600px]">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full sm:size-10"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    >
                      <span className="size-2 rounded-full bg-white sm:size-2.5" />
                    </span>
                    <p className="text-[15px] font-semibold text-white sm:text-base">How it Work</p>
                  </div>
                  <h2 className="mt-4 text-[clamp(1.45rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
                    <span className="block text-white">Simple Steps to</span>
                    <span className="block text-[#a8a8a8]">Digital Success</span>
                  </h2>
                </div>
                <div className="min-w-0 max-w-xl shrink-0 text-left lg:max-w-[400px] lg:pt-1 xl:max-w-[440px]">
                  <p className="text-[16px] leading-relaxed text-[#a3a3a3] sm:text-[18px] lg:text-[19px]">
                    Our proven process combines research, strategy, and creativity to deliver tailored solutions that drive
                    measurable results.
                  </p>
                  <button
                    type="button"
                    onClick={openLeadPopup}
                    className="mt-6 inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-[16px] font-semibold no-underline sm:mt-7 sm:text-[17px]"
                    style={{ color: accent }}
                  >
                    Get Started Now
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(188, 19, 254, 0.2)" }}
                      aria-hidden
                    >
                      <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-12 flex flex-1 flex-col sm:mt-14 lg:mt-16 xl:mt-[4.5rem]">
                {/* Figma process strip: ~1469.54×365.02, radius 28.79, border 1.15; inset 2.3 glow */}
                <div
                  className="relative mx-auto grid w-full max-w-full grid-cols-1 divide-y divide-white/[0.08] bg-black p-5 sm:p-6 lg:h-[365.02px] lg:min-h-[365.02px] lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:overflow-hidden lg:px-6 lg:py-6 xl:px-7 xl:py-7"
                  style={{
                    maxWidth: "min(100%, 1469.54px)",
                    borderRadius: "28.79px",
                    borderWidth: "1.15px",
                    borderStyle: "solid",
                    borderColor: "rgba(188, 19, 254, 0.26)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-[2.3px] z-0 rounded-[calc(28.79px-2.3px)] opacity-[0.07]"
                    style={{
                      background: `linear-gradient(180deg, transparent 35%, ${accent} 100%)`,
                    }}
                    aria-hidden
                  />
                  {[
                    {
                      n: "01",
                      t: "Discovery & Consult",
                      b: "We customize strategies to fit your brand's specific needs, ensuring alignment.",
                      i: AGENCY_IMG.processIcon,
                    },
                    {
                      n: "02",
                      t: "Strategy & Planning",
                      b: "Combines industry knowledge and creativity to exceptional results for your brand.",
                      i: AGENCY_IMG.processIcon1,
                    },
                    {
                      n: "03",
                      t: "Execution & Optimize",
                      b: "We utilize data insights to refine strategies, optimize and ensure impactful, measurable results.",
                      i: AGENCY_IMG.processIcon2,
                    },
                    {
                      n: "04",
                      t: "Result & Growth",
                      b: "We provide continuous support and maintenance to keep your digital assets at best",
                      i: AGENCY_IMG.processIcon3,
                    },
                  ].map((step) => (
                    <div
                      key={step.n}
                      className="relative z-[1] flex min-h-0 flex-col px-1 py-6 sm:px-3 sm:py-7 lg:h-full lg:min-h-0 lg:gap-0 lg:px-3 lg:py-0 xl:px-4"
                    >
                      <div className="flex shrink-0 items-start justify-between gap-3">
                        <img alt="" src={step.i} className="size-12 object-contain sm:size-[52px] lg:size-[48px]" />
                        <span className="text-[14px] font-semibold tabular-nums text-white/85 sm:text-[15px] lg:text-[13px]">
                          {step.n}
                        </span>
                      </div>
                      <h3 className="mt-4 shrink-0 text-base font-semibold leading-snug tracking-tight text-white sm:mt-5 sm:text-lg lg:mt-4 lg:text-[1.05rem] lg:leading-tight">
                        {step.t}
                      </h3>
                      <p className="mt-2.5 min-h-0 flex-1 text-[13px] leading-relaxed text-[#9ca3af] sm:mt-3 sm:text-[14px] lg:mt-2.5 lg:text-[13px] lg:leading-[1.55]">
                        {step.b}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials — Figma ~1860×813, top radius 25px; grid bg + top row + 3 cards */}
          <section
            id="testimonials"
            className="core-services-section relative mx-auto mt-10 w-full max-w-[1860px] min-h-0 overflow-hidden rounded-t-2xl border border-white/[0.08] px-3 py-8 sm:mt-16 sm:rounded-t-[25px] sm:px-8 sm:py-12 md:mt-24 lg:min-h-[813.55px] lg:px-10 lg:py-14"
          >
            <div className="relative z-[1] flex flex-col gap-6 sm:gap-8 lg:gap-10">
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                <div
                  className="flex flex-col gap-5 rounded-2xl p-5 sm:gap-6 sm:rounded-[28px] sm:p-8"
                  style={{
                    backgroundColor: "#121212",
                    borderWidth: "1.15px",
                    borderStyle: "solid",
                    borderColor: "rgba(188, 19, 254, 0.28)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="flex -space-x-3">
                      {[AGENCY_IMG.reviewer, AGENCY_IMG.reviewer1, AGENCY_IMG.reviewer2, AGENCY_IMG.testimonialReviewer].map(
                        (src) => (
                          <img
                            key={src}
                            alt=""
                            src={src}
                            className="size-11 rounded-full border-[3px] object-cover sm:size-12"
                            style={{ borderColor: accent }}
                          />
                        ),
                      )}
                    </div>
                    <p className="text-base font-bold text-white sm:text-lg">2.7k Positive Reviews</p>
                  </div>
                  <div className="flex items-stretch gap-3 border-t border-white/10 pt-5 sm:gap-8 sm:pt-6 md:gap-10">
                    <div className="min-w-0 flex-1">
                      <p className="text-3xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">90%</p>
                      <p className="mt-1 text-xs text-[#9ca3af] sm:text-sm md:text-base">Improved Project</p>
                    </div>
                    <div className="w-px shrink-0 self-stretch bg-white/15" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="text-3xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">100+</p>
                      <p className="mt-1 text-xs text-[#9ca3af] sm:text-sm md:text-base">New Project</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 border-t border-white/10 pt-6">
                    {["Social Media Growth", "Content Marketing", "PPC Advertising"].map((label) => (
                      <li
                        key={label}
                        className="flex items-center gap-3 rounded-full border border-white/[0.06] bg-[#0e0e0e] px-4 py-2.5"
                      >
                        <span
                          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{ backgroundColor: "rgba(188, 19, 254, 0.45)" }}
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span className="text-[14px] font-semibold text-white sm:text-[15px]">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="flex flex-col justify-center rounded-2xl p-5 sm:rounded-[28px] sm:p-8 lg:p-10"
                  style={{
                    backgroundColor: "#121212",
                    borderWidth: "1.15px",
                    borderStyle: "solid",
                    borderColor: "rgba(188, 19, 254, 0.28)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 sm:size-10"
                      style={{ borderColor: accent }}
                      aria-hidden
                    >
                      <span className="size-2 rounded-full sm:size-2.5" style={{ backgroundColor: accent }} />
                    </span>
                    <p className="text-[15px] font-semibold text-white sm:text-base">What Our Client Says</p>
                  </div>
                  <h2 className="mt-5 text-[clamp(1.25rem,5.2vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-white sm:mt-6">
                    Hear from Our Satisfied Clients, Real Success Stories
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#9ca3af] sm:text-[17px]">
                    Discover how businesses like yours achieved outstanding growth with Prisma&apos;s expert digital
                    marketing solutions.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                {[
                  {
                    name: "Emma Richard",
                    role: "CEO Nexatech",
                    img: AGENCY_IMG.testimonialEmma,
                    quote:
                      "Prisma completely transformed our online presence! Their digital marketing strategies helped us double our revenue in just six months.",
                  },
                  {
                    name: "David Mont",
                    role: "Marketing Director",
                    img: AGENCY_IMG.testimonialDavid,
                    quote:
                      "We've worked with many agencies before, but Prisma stands out. Their data-driven approach and creative solutions gave us an edge over competitors.",
                  },
                  {
                    name: "Sophia Lewis",
                    role: "Founder",
                    img: AGENCY_IMG.testimonialSophia,
                    quote:
                      "From SEO to paid ads, Prisma nailed every aspect of our campaign. Our website traffic skyrocketed, and lead generation has never been better!",
                  },
                ].map((t) => (
                  <article
                    key={t.name}
                    className="flex flex-col rounded-2xl p-5 sm:rounded-[28px] sm:p-7"
                    style={{
                      backgroundColor: "#121212",
                      borderWidth: "1.15px",
                      borderStyle: "solid",
                      borderColor: "rgba(188, 19, 254, 0.28)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="select-none text-[17px] tracking-[0.12em] text-[#efbc2a] sm:text-lg" aria-hidden>
                        ★★★★★
                      </div>
                      <span className="font-serif text-5xl leading-none sm:text-6xl" style={{ color: accent }} aria-hidden>
                        ”
                      </span>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <img alt="" src={t.img} className="size-14 shrink-0 rounded-full object-cover sm:size-[72px]" />
                      <div className="min-w-0 pt-0.5">
                        <p className="text-lg font-bold text-white sm:text-xl">{t.name}</p>
                        <p className="mt-0.5 text-[14px] text-[#9ca3af] sm:text-[15px]">{t.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-white sm:mt-5 sm:text-[16px]">&ldquo;{t.quote}&rdquo;</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter — dark card, top purple radial, pill field + Subscribe + purple circle arrow */}
          <section className="mx-auto mt-10 w-full max-w-[1860px] sm:mt-16 md:mt-24">
            <div
              className="relative overflow-hidden rounded-2xl px-4 py-10 sm:rounded-[28px] sm:px-10 sm:py-14 lg:px-14 lg:py-16"
              style={{
                backgroundColor: "#0a0a0a",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(188, 19, 254, 0.22)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  background: `radial-gradient(ellipse 85% 70% at 50% 0%, #2b0d42 0%, transparent 58%)`,
                }}
              />
              <div className="relative z-[1] mx-auto max-w-[820px] text-center">
                <h2 className="text-[clamp(1.85rem,4vw,3.1rem)] font-bold leading-tight tracking-tight text-white">
                  Stay Ahead in Digital Marketing
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#d1d1d1] sm:mt-6 sm:text-[18px] sm:leading-relaxed">
                  Get exclusive insights, trends, and strategies delivered straight to your inbox. Subscribe now!
                </p>
                <form
                  onSubmit={onNewsletterSubmit}
                  className="mx-auto mt-8 flex max-w-[640px] flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#050505] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:mt-12 sm:flex-row sm:min-h-[56px] sm:items-center sm:gap-1 sm:rounded-full sm:p-1.5 sm:pl-5 sm:pr-2 sm:py-2"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Give your best email"
                    className="min-h-[52px] w-full min-w-0 rounded-xl border-0 bg-transparent px-4 py-3 text-left text-[15px] text-[#e8e8e8] outline-none placeholder:text-[#6b6b6b] focus-visible:ring-2 focus-visible:ring-[#bc13fe]/40 sm:min-h-[48px] sm:rounded-full sm:py-2 sm:pr-1 sm:text-[17px]"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl py-2 pl-3 pr-2 font-semibold text-white disabled:opacity-55 sm:h-auto sm:justify-end sm:gap-3 sm:rounded-full sm:py-1.5 sm:pl-3 sm:pr-2"
                  >
                    <span className="text-[15px] sm:text-[16px] md:text-[17px]">
                      {newsletterStatus === "loading" ? "Sending…" : "Subscribe"}
                    </span>
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-full sm:size-12"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    >
                      <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </form>
                {newsletterStatus === "ok" && <p className="mt-4 text-sm text-emerald-400">Thanks — you&apos;re subscribed.</p>}
                {newsletterStatus === "err" && <p className="mt-4 text-sm text-red-400">{newsletterErr}</p>}
              </div>
            </div>
          </section>

          {/* Footer — purple border, bottom glow, 4 cols + bar */}
          <footer
            id="contact"
            className="relative mx-auto mt-10 w-full max-w-[1860px] scroll-mt-24 overflow-hidden rounded-2xl sm:mt-16 sm:scroll-mt-28 sm:rounded-[25px] md:mt-24"
            style={{
              backgroundColor: "#030303",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(188, 19, 254, 0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 90% 65% at 50% 100%, rgba(188, 19, 254, 0.14), transparent 55%)`,
              }}
            />
            <div className="relative z-[1] px-4 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10 xl:gap-14">
                <div className="sm:col-span-2 lg:col-span-1">
                  <a href="#top" className="inline-flex items-center gap-3 no-underline">
                    <img alt="" src={AGENCY_IMG.logoMark} className="h-11 w-auto shrink-0 object-contain sm:h-12" />
                    <div className="leading-tight">
                      <span className="block text-[17px] font-extrabold tracking-wide text-white sm:text-lg">PRISMATECH</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a8a8a8] sm:text-[11px]">
                        INC
                      </span>
                    </div>
                  </a>
                  <p className="mt-8 text-[1.35rem] font-bold leading-snug text-white sm:text-[1.65rem] lg:mt-10">
                    Driving Digital Growth with Innovation &amp; Strategy
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#c4c4c4] sm:text-[16px]">
                    Our digital services empower brands with innovative strategies and solutions for sustainable growth and
                    engagement.
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold text-white sm:text-lg">Quick Links</p>
                  <ul className="mt-5 space-y-3 text-[15px] text-[#c8c8c8] sm:text-[16px]">
                    {[
                      { label: "Home", href: "#top" },
                      { label: "About Us", href: "#about" },
                      { label: "Services", href: "#services" },
                      { label: "Contact Us", href: "#contact" },
                    ].map((x) => (
                      <li key={x.label}>
                        <a
                          href={x.href}
                          className="transition hover:text-white"
                          onClick={
                            x.label === "Contact Us"
                              ? (e) => {
                                  e.preventDefault();
                                  openLeadPopup();
                                }
                              : undefined
                          }
                        >
                          {x.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-base font-bold text-white sm:text-lg">Services</p>
                  <ul className="mt-5 space-y-3 text-[15px] text-[#c8c8c8] sm:text-[16px]">
                    <li>
                      <a href="#services" className="transition hover:text-white">
                        Social Media Marketing
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="transition hover:text-white">
                        PPC Advertising
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="transition hover:text-white">
                        Content Marketing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <p className="text-base font-bold text-white sm:text-lg">Contact Info</p>
                  <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#c8c8c8] sm:text-[16px]">
                    <li className="break-all">
                      <span className="text-[#8a8a8a]">Email: </span>
                      <a href="mailto:info@prismatechinc.com" className="text-[#d8d8d8] transition hover:text-white">
                        info@prismatechinc.com
                      </a>
                    </li>
                    <li>
                      <span className="text-[#8a8a8a]">Phone: </span>
                      <a href={`tel:${PRISMATECH_PHONE_TEL}`} className="text-[#d8d8d8] transition hover:text-white">
                        {PRISMATECH_PHONE_DISPLAY}
                      </a>
                    </li>
                    <li className="break-words">
                      <span className="text-[#8a8a8a]">Address: </span>
                      <span className="text-[#d8d8d8]">949 Brandon Way, Fairfield, CA 94533</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-[13px] text-[#a3a3a3] sm:flex-row sm:text-sm lg:mt-14"
                style={{ borderColor: "rgba(188, 19, 254, 0.28)" }}
              >
                <p>
                  © Copyright {new Date().getFullYear()}{" "}
                  <span className="font-semibold text-[#d6d6d6]">PrismaTech Inc.</span> All Rights Reserved.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                  <Link to="/terms-of-service" className="no-underline transition hover:text-white">
                    Terms of Service
                  </Link>
                  <Link to="/privacy-policy" className="no-underline transition hover:text-white">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {leadModalOpen && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-[6px]"
                aria-hidden
                onClick={dismissLeadPopup}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="agency-lead-title"
                className="fixed top-1/2 left-1/2 z-[9999] max-h-[min(92dvh,720px)] w-[calc(100%-1rem)] max-w-[min(94vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border shadow-[0_32px_100px_rgba(0,0,0,0.65),0_0_0_1px_rgba(188,19,254,0.12)_inset] sm:w-[calc(100%-1.25rem)] sm:rounded-[28px]"
                style={{
                  backgroundColor: "#0c0c0c",
                  borderColor: "rgba(188, 19, 254, 0.32)",
                }}
              >
                <button
                  type="button"
                  onClick={dismissLeadPopup}
                  className="absolute top-3 right-3 z-30 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-xl leading-none text-white backdrop-blur-sm transition hover:bg-black/70 sm:top-4 sm:right-4"
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="grid min-h-0 max-h-[min(88dvh,680px)] md:grid-cols-[minmax(0,40%)_minmax(0,1fr)] md:max-h-[min(85dvh,560px)]">
                  {/* Visual column — Figma team image + brand */}
                  <div className="relative hidden min-h-[220px] md:block">
                    <img
                      alt=""
                      src={AGENCY_IMG.expertise}
                      className="absolute inset-0 size-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        background: `radial-gradient(ellipse 90% 70% at 20% 0%, ${accent}, transparent 55%)`,
                      }}
                    />
                    <div className="relative flex h-full min-h-[280px] flex-col justify-start gap-8 p-6 lg:gap-10 lg:p-8">
                      <div className="flex items-center gap-2.5">
                        <img alt="" src={AGENCY_IMG.logoMark} className="h-9 w-auto object-contain lg:h-10" />
                        <div className="leading-tight">
                          <span className="block text-sm font-extrabold tracking-wide text-white">PRISMATECH</span>
                          <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70">INC</span>
                        </div>
                      </div>
                      <div className="max-w-[280px]">
                        <p className="text-lg font-bold leading-snug text-white drop-shadow-md lg:text-xl">
                          Grow faster with a team that lives digital.
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-white/85 lg:text-sm">
                          Strategy, creative, and performance — one partner from first call to launch.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile image strip */}
                  <div className="relative h-28 shrink-0 sm:h-32 md:hidden">
                    <img alt="" src={AGENCY_IMG.heroPhoto} className="absolute inset-0 size-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="relative flex h-full items-end p-4 pb-3">
                      <img alt="" src={AGENCY_IMG.logoMark} className="h-8 w-auto object-contain opacity-95" />
                    </div>
                  </div>

                  {/* Form column */}
                  <div className="scrollbar-hide relative flex min-h-0 flex-col overflow-y-auto overscroll-contain bg-[#0a0a0a] p-5 pt-12 sm:p-6 sm:pt-14 md:min-h-0 md:pt-6">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-100"
                      style={{
                        background: `radial-gradient(ellipse 100% 80% at 100% 0%, rgba(188, 19, 254, 0.09), transparent 52%)`,
                      }}
                    />
                    <div className="relative z-[1]">
                      <p id="agency-lead-title" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Get a free consultation
                      </p>
                      <p className="mt-2 text-[14px] font-medium leading-relaxed" style={{ color: accent }}>
                        We&apos;ll reach out within one business day.
                      </p>

                      {leadSubmitted ? (
                        <div className="mt-8 text-center md:text-left">
                          <div
                            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border-2 text-3xl text-white md:mx-0"
                            style={{ borderColor: accent, backgroundColor: "rgba(188, 19, 254, 0.1)" }}
                            aria-hidden
                          >
                            ✓
                          </div>
                          <p className="text-lg font-semibold text-white">Thank you — we&apos;ve got your details.</p>
                          <p className="mt-2 text-[14px] leading-relaxed text-[#9ca3af]">
                            Our team will contact you shortly.
                          </p>
                          <button
                            type="button"
                            onClick={dismissLeadPopup}
                            className="mt-8 h-12 w-full max-w-xs rounded-full text-[15px] font-semibold text-white transition hover:opacity-92 md:max-w-[240px]"
                            style={{ backgroundColor: accent, boxShadow: `0 10px 32px ${accentShadow}` }}
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={onLeadPopupSubmit} className="mt-6 flex flex-col gap-3.5 sm:gap-4">
                          {(
                            [
                              {
                                id: "lead-name",
                                upper: "Full name",
                                name: "name" as const,
                                type: "text" as const,
                                autoComplete: "name" as const,
                                ph: "Your name",
                                icon: (
                                  <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                                    <circle cx="12" cy="7" r="4" />
                                  </svg>
                                ),
                              },
                              {
                                id: "lead-email",
                                upper: "Email",
                                name: "email" as const,
                                type: "email" as const,
                                autoComplete: "email" as const,
                                ph: "you@company.com",
                                icon: (
                                  <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="m22 6-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ),
                              },
                              {
                                id: "lead-phone",
                                upper: "Phone",
                                name: "phone" as const,
                                type: "tel" as const,
                                autoComplete: "tel" as const,
                                ph: PRISMATECH_PHONE_DISPLAY,
                                icon: (
                                  <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ),
                              },
                            ] as const
                          ).map((field) => (
                            <label key={field.name} htmlFor={field.id} className="block">
                              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7a7a]">
                                {field.upper}
                              </span>
                              <div className="flex items-stretch overflow-hidden rounded-xl border border-white/[0.1] bg-[#060606] transition focus-within:border-[rgba(188,19,254,0.45)] focus-within:ring-2 focus-within:ring-[rgba(188,19,254,0.2)]">
                                <span
                                  className="flex w-11 shrink-0 items-center justify-center border-r border-white/[0.06] bg-[#0f0f0f] text-[#bc13fe]"
                                  style={{ color: accent }}
                                  aria-hidden
                                >
                                  {field.icon}
                                </span>
                                <input
                                  id={field.id}
                                  required
                                  name={field.name}
                                  type={field.type}
                                  autoComplete={field.autoComplete}
                                  value={leadForm[field.name]}
                                  onChange={(e) => setLeadForm((f) => ({ ...f, [field.name]: e.target.value }))}
                                  className="min-h-11 flex-1 border-0 bg-transparent px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-[#5c5c5c]"
                                  placeholder={field.ph}
                                />
                              </div>
                            </label>
                          ))}

                          <label htmlFor="lead-message" className="block">
                            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7a7a]">
                              How can we help?
                            </span>
                            <div className="flex overflow-hidden rounded-xl border border-white/[0.1] bg-[#060606] transition focus-within:border-[rgba(188,19,254,0.45)] focus-within:ring-2 focus-within:ring-[rgba(188,19,254,0.2)]">
                              <span
                                className="flex w-11 shrink-0 items-start justify-center border-r border-white/[0.06] bg-[#0f0f0f] py-2.5"
                                style={{ color: accent }}
                                aria-hidden
                              >
                                <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <textarea
                                id="lead-message"
                                name="message"
                                rows={3}
                                value={leadForm.message}
                                onChange={(e) => setLeadForm((f) => ({ ...f, message: e.target.value }))}
                                className="min-h-[88px] flex-1 resize-y border-0 bg-transparent px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-[#5c5c5c]"
                                placeholder="Goals, timeline, budget…"
                              />
                            </div>
                          </label>

                          {leadSubmitError ? (
                            <p className="rounded-xl border border-red-500/35 bg-red-950/35 px-3 py-2.5 text-[13px] text-red-200">
                              {leadSubmitError}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={leadSubmitting}
                            className="mt-1 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full text-[16px] font-semibold text-white transition enabled:hover:opacity-93 disabled:cursor-not-allowed disabled:opacity-55"
                            style={{
                              backgroundColor: accent,
                              boxShadow: `0 10px 36px ${accentShadow}, 0 0 24px rgba(188, 19, 254, 0.25)`,
                            }}
                          >
                            {leadSubmitting ? "Sending…" : "Send message"}
                            {!leadSubmitting ? (
                              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </button>
                          <p className="text-center text-[11px] leading-snug text-[#5a5a5a] md:text-left">
                            By submitting, you agree we may contact you about PrismaTech services. No spam.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </motion.div>
  );
}
