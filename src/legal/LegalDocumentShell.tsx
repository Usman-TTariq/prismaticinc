import { Link } from "react-router-dom";
import { AGENCY_IMG } from "../prismaAgencyAssets";

const accent = "#bc13fe";
const accentSoft = "rgba(188, 19, 254, 0.45)";
const font = "font-['Plus_Jakarta_Sans',ui-sans-serif,system-ui,sans-serif]";

export function LegalDocumentShell({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle?: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative min-h-screen overflow-x-clip bg-[#050505] text-[#d1d1d1] antialiased ${font}`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background: `radial-gradient(ellipse 75% 55% at 85% 12%, ${accent} 0%, transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 10% 80%, ${accentSoft} 0%, transparent 50%)`,
          }}
        />
      </div>

      <header className="sticky top-0 z-20 border-b border-[#1f1f1f] bg-[#0a0a0f]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 no-underline transition opacity-100 hover:opacity-95">
            <img alt="" src={AGENCY_IMG.logoMark} className="h-8 w-auto shrink-0 object-contain sm:h-9" />
            <span className="truncate text-[15px] font-bold tracking-tight text-white sm:text-[16px]">PrismaTech Inc.</span>
          </Link>
          <Link
            to="/"
            className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-[13px] font-semibold text-[#e8e8e8] no-underline transition hover:border-[rgba(188,19,254,0.4)] hover:text-white sm:px-4 sm:text-sm"
          >
            ← Home
          </Link>
        </div>
      </header>

      <article className="relative z-[1] mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: accent }}>
          Legal
        </p>
        <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#a3a3a3] sm:text-[16px]">{subtitle}</p> : null}
        <p className="mt-4 text-[13px] text-[#7a7a7a] sm:text-sm">Last updated: {updated}</p>
        <div className="mt-10 space-y-10 border-t border-white/[0.06] pt-10">{children}</div>
      </article>

      <footer className="relative z-[1] border-t border-white/[0.06] py-8 text-center text-[12px] text-[#6b6b6b] sm:text-[13px]">
        <Link to="/" className="font-medium text-[#9ca3af] no-underline transition hover:text-white">
          prismatechinc.com
        </Link>
      </footer>
    </div>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-lg font-semibold leading-snug text-white sm:text-xl"
      style={{ borderLeft: `3px solid ${accent}`, paddingLeft: "0.85rem" }}
    >
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.7] text-[#c6c6c6] sm:text-[16px] sm:leading-[1.75]">{children}</p>;
}

export function LegalUl({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#c6c6c6] marker:text-[#bc13fe] sm:text-[16px]">{children}</ul>;
}
