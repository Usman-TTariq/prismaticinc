import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { INDUSTRY_PANELS } from "./finaxisIndustriesData";
import { submitPrismatechLead } from "./submitPrismatechLead";

const FINAXIS_LEAD_POPUP_DELAY_MS = 5 * 1000;

const imgVectorStroke =
  "https://www.figma.com/api/mcp/asset/03385499-8f80-46da-a59c-f5177b8b5079";
const imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131 =
  "https://www.figma.com/api/mcp/asset/8a51ae0d-c82e-4d06-b307-01e33fef56e2";
const imgGroup12 =
  "https://www.figma.com/api/mcp/asset/4d3b5054-66f3-4647-8108-19b328b828e3";
const img115831E41E2 =
  "https://www.figma.com/api/mcp/asset/f9cc9212-7c62-4c5e-9974-1b61072f809f";
const imgRectangle4079 =
  "https://www.figma.com/api/mcp/asset/a5ac3678-5f51-466f-ab55-cd915142834b";
const img3DWireframeOutlinePolygonSphereGlobeShape1 =
  "https://www.figma.com/api/mcp/asset/98e197b5-1190-45af-818c-902d11f18151";
const img3DWireframeOutlinePolygonSphereGlobeShape2 =
  "https://www.figma.com/api/mcp/asset/bc75401c-3ca0-465f-9d52-de8ab24ccbd1";
const imgRectangle4049 =
  "https://www.figma.com/api/mcp/asset/79fd9ffa-9341-4043-b407-c0c3447917c2";
const imgGroup13 = "https://www.figma.com/api/mcp/asset/f8b5f0e6-2eed-425a-a319-1f5421cf22ad";
const imgYouSell = "https://www.figma.com/api/mcp/asset/eab0fb85-cc9a-4014-8426-4997c5a7b145";
const imgEllipse36 = "https://www.figma.com/api/mcp/asset/f659f888-4ecf-44e4-ba73-e8cf2d16fa09";
const imgEllipse37 = "https://www.figma.com/api/mcp/asset/254af5c5-0e2c-415b-9314-67c46595333f";
const imgEllipse38 = "https://www.figma.com/api/mcp/asset/beb188ec-88cb-444d-a2f7-9649405c85d5";
const imgVector5 = "https://www.figma.com/api/mcp/asset/f3e1dcf5-3726-45c2-8a62-a7d7b165ad5a";
const imgRetailCardRow2021 = "https://www.figma.com/api/mcp/asset/5c58554f-7c6f-4c27-a4b3-760942aab287";
const imgGif121024X5621 = "https://www.figma.com/api/mcp/asset/03562f45-bc92-4fea-aa2b-e97f29870edb";
const imgRectangle1304 = "https://www.figma.com/api/mcp/asset/5ca09472-facc-468d-ba84-e2d5f631ce3c";
const imgSvg = "https://www.figma.com/api/mcp/asset/26cf74df-8014-4764-b05b-33c3b3cc0564";

const navLinks = [
  ["#finaxis-hero", "Home"],
  ["#finaxis-about", "About"],
  ["#finaxis-notable", "Our work"],
  ["#finaxis-why", "Why us"],
  ["#finaxis-you-know", "Insights"],
  ["#finaxis-services", "Services"],
  ["#finaxis-how-it-works", "How it works"],
  ["#finaxis-industries", "Industries"],
  ["#finaxis-branding", "Branding"],
  ["#finaxis-contact", "Contact"],
] as const;

const serviceCards = [
  {
    title: "POS HARDWARE FINANCING",
    body: "We help businesses access modern POS hardware with low upfront costs, fast approvals, flexible payment options, and financing to support steady growth.",
  },
  {
    title: "LEASE-TO-OWN POS PROGRAMS",
    body: "We help scaling businesses match with suitable POS systems for small businesses to make manageable payments over time, and gain full ownership without large upfront expenses.",
  },
  {
    title: "MERCHANT TRANSACTION SUPPORT",
    body: "We assist merchants with payment processing, issue resolution, uptime monitoring, and hands-on support to help them keep daily transactions running smoothly across all locations.",
  },
  {
    title: "ENTERPRISE POS SOLUTIONS",
    body: "Access scalable POS systems for e-commerce, retail, or any other industry that can support your multi-location businesses with centralized control, advanced reporting, custom integrations, and intuitive tools.",
  },
] as const;

export default function FinaxisMobileHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState<string | null>(null);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [industryTab, setIndustryTab] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMenuOpen(false);
      setLeadModalOpen(true);
    }, FINAXIS_LEAD_POPUP_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const dismissLeadPopup = useCallback(() => {
    setLeadModalOpen(false);
    setLeadSubmitted(false);
    setLeadSubmitError(null);
    setLeadForm({ name: "", email: "", phone: "", message: "" });
  }, []);

  const dismissThankYou = useCallback(() => {
    setThankYouOpen(false);
    setContactSubmitError(null);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  }, []);

  const openLeadPopup = useCallback(() => {
    setMenuOpen(false);
    setLeadSubmitted(false);
    setLeadSubmitError(null);
    setLeadForm({ name: "", email: "", phone: "", message: "" });
    setLeadModalOpen(true);
  }, []);

  useEffect(() => {
    const locked = menuOpen || leadModalOpen || thankYouOpen;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (thankYouOpen) dismissThankYou();
      else if (leadModalOpen) dismissLeadPopup();
      else if (menuOpen) setMenuOpen(false);
    };
    if (!locked) return;
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, leadModalOpen, thankYouOpen, dismissLeadPopup, dismissThankYou]);

  const onLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadSubmitError(null);
    setLeadSubmitting(true);
    const result = await submitPrismatechLead({ ...leadForm, source: "popup" });
    setLeadSubmitting(false);
    if (result.ok) {
      setLeadSubmitted(true);
    } else {
      setLeadSubmitError(result.ok === false ? result.error : "Something went wrong");
    }
  };

  const onContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitError(null);
    setContactSubmitting(true);
    const result = await submitPrismatechLead({ ...contactForm, source: "contact_mobile" });
    setContactSubmitting(false);
    if (result.ok) {
      setThankYouOpen(true);
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setContactSubmitError(result.ok === false ? result.error : "Something went wrong");
    }
  };

  return (
    <div id="finaxis-top" className="min-h-svh bg-[#f7f7f7] text-black">
      <header
        className="sticky top-0 z-[200] border-b border-[#272727] bg-[#f7f7f7]/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-[#f7f7f7]/90"
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
      >
        <div className="mx-auto grid w-full max-w-xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 px-3 py-2 sm:gap-x-3 sm:px-4 sm:py-2.5">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="flex w-14 shrink-0 flex-col items-center gap-1 rounded-lg border-0 bg-transparent py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#035c24] sm:w-16"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <img alt="" className="h-5 w-6 sm:h-[22px] sm:w-7" src={imgVectorStroke} />
            <span className="font-['Satoshi:Medium',sans-serif] text-[10px] font-medium leading-none tracking-wide text-black sm:text-[11px]">
              Menu
            </span>
          </button>

          <a
            href="#finaxis-top"
            className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-0.5 text-inherit no-underline outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#035c24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f7]"
          >
            <div
              className="relative h-7 w-9 shrink-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371px_-412px] mask-size-[730px_730px] mix-blend-hard-light sm:h-8 sm:w-10"
              style={{ maskImage: `url('${imgGroup12}')` }}
            >
              <img
                alt=""
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                src={imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131}
              />
            </div>
            <div className="w-full min-w-0 text-center font-['Clash_Display',sans-serif] text-[clamp(0.7rem,3.2vw,0.95rem)] font-medium uppercase leading-[1.1] tracking-[0.04em] text-black sm:text-[15px]">
              <span className="block truncate px-0.5">Prismatech</span>
              <span className="mt-0.5 block text-[0.72em] font-medium normal-case tracking-normal opacity-90">Inc</span>
            </div>
          </a>

          <button
            type="button"
            onClick={openLeadPopup}
            className="shrink-0 rounded-full bg-[#035c24] px-2.5 py-2 font-['Satoshi:Medium',sans-serif] text-[11px] font-medium leading-tight text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#035c24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f7] sm:px-3.5 sm:text-[13px]"
          >
            Expert
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] bg-black/45 backdrop-blur-sm transition-opacity ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-[101] flex h-full max-h-svh w-[min(100%,20rem)] flex-col border-r border-[#272727] bg-[#f7f7f7] shadow-lg transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex items-center justify-between border-b border-[#272727] px-4 py-3">
          <span className="font-['Clash_Display',sans-serif] text-lg font-medium">Navigate</span>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-[#272727] bg-white text-lg text-[#035c24]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Sections">
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg border-l-[3px] border-transparent py-3 pl-3 font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-black hover:border-[#035c24] hover:bg-[#ececec]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="border-t border-[#272727] p-4">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openLeadPopup();
            }}
            className="w-full rounded-full bg-[#035c24] py-3 font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white"
          >
            Talk to an expert
          </button>
        </div>
      </aside>

      <main className="mx-auto max-w-lg pb-20 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:max-w-xl sm:px-6">
        <section id="finaxis-hero" className="scroll-mt-20 pt-5 pb-10 text-center sm:pt-6">
          <h1 className="finaxis-hero-display text-[clamp(1.85rem,8.5vw,3.5rem)] leading-[0.92] tracking-tight text-[#00511e]">
            POS SYSTEMS MADE ACCESSIBLE
          </h1>
          <p className="finaxis-hero-through-financing mt-4 font-['Caladea',serif] text-[clamp(1.25rem,4.5vw,1.75rem)] font-normal italic text-black">
            Through Smart Financing
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#272727] shadow-md">
            <img alt="" src={img115831E41E2} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-[#272727]/50 bg-white/90 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
            <div className="flex shrink-0 justify-center -space-x-2">
              <img alt="" src={imgEllipse36} className="relative z-[3] size-12 rounded-full border-2 border-white object-cover shadow-sm" />
              <img alt="" src={imgEllipse37} className="relative z-[2] size-12 rounded-full border-2 border-white object-cover shadow-sm" />
              <img alt="" src={imgEllipse38} className="relative z-[1] size-12 rounded-full border-2 border-white object-cover shadow-sm" />
            </div>
            <p className="w-full text-center font-['Satoshi:Medium',sans-serif] text-[13px] leading-relaxed text-[#333] sm:max-w-none sm:flex-1 sm:text-left">
              Merchants across retail &amp; hospitality trust Prismatech for POS financing and rollout support.
            </p>
          </div>
          <p className="mt-6 text-left font-['Satoshi:Medium',sans-serif] text-[16px] leading-relaxed text-black">
            We offer flexible financing to help scaling businesses access the best POS devices in the US with secure
            payoffs and predictable terms.
          </p>
        </section>

        <section id="finaxis-about" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Black',sans-serif] text-[20px] uppercase tracking-wide text-[#00511e]">
            About us
          </h2>
          <p className="mt-3 font-['Satoshi:Medium',sans-serif] text-[15px] leading-relaxed text-black">
            We are a transaction-focused POS financial solutions provider, designed to help scaling businesses maximize
            revenue by streamlining logistics. We match operations with cloud POS systems and smart financing decisions.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#272727] shadow-md">
            <img alt="" src={imgGroup13} className="aspect-[16/10] w-full object-cover object-[center_20%]" />
          </div>
          <p className="mt-4 rounded-xl border border-[#1e9500]/25 bg-gradient-to-br from-white to-[rgba(30,149,0,0.08)] px-4 py-3 font-['Satoshi:Medium',sans-serif] text-[14px] leading-relaxed text-black">
            WE HELP BUSINESSES GET THEIR HANDS ON HIGH-END POS TERMINALS WITHOUT BREAKING THE BANK — WITH SAFE PAYOFF
            PLANS AND FINANCING SO YOU CAN SCALE WITHOUT LOGISTICS HEADACHES.
          </p>
        </section>

        <section id="finaxis-notable" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[20px] font-medium text-black">Our notable work</h2>
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-['Satoshi:Medium',sans-serif] text-[15px] text-[#333]">
            <span>Website Design</span>
            <span className="text-[#1e9500]">✦</span>
            <span>Branding</span>
            <span className="text-[#1e9500]">✦</span>
            <span>Strategy</span>
            <span className="text-[#1e9500]">✦</span>
            <span>Digital marketing</span>
            <span className="text-[#1e9500]">✦</span>
            <span>Analytics</span>
          </div>
          {/* Social proof avatars (match reference layout: overlap, green outer rings, black center) */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center justify-center pl-1" aria-hidden="true">
              <img
                alt=""
                src={imgEllipse36}
                className="relative z-[1] size-[52px] shrink-0 rounded-full border-[2.5px] border-[#1e9500] object-cover shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              />
              <img
                alt=""
                src={imgEllipse37}
                className="relative z-[3] -mx-3 size-[56px] shrink-0 rounded-full border-[2.5px] border-black object-cover shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
              />
              <img
                alt=""
                src={imgEllipse38}
                className="relative z-[2] size-[52px] shrink-0 rounded-full border-[2.5px] border-[#1e9500] object-cover shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        </section>

        <section id="finaxis-why" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Black',sans-serif] text-[22px] uppercase tracking-wide text-[#00511e]">
            Why choose us?
          </h2>
          <p className="mt-3 font-['Satoshi:Medium',sans-serif] text-[15px] leading-relaxed text-black">
            Choosing us means quick, safe financing for POS systems with intuitive software and hardware that streamlines
            your logistics.
          </p>
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-[#1e9500] bg-[#00511e] p-4 shadow-md">
            <img
              alt=""
              src={imgRectangle4049}
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-35"
            />
            <div className="relative z-[1] flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-['Caladea',serif] text-[28px] font-bold uppercase leading-none text-white drop-shadow-sm">
                  40.7440 N
                </p>
                <p className="font-['Caladea',serif] text-[28px] font-bold uppercase leading-none text-white drop-shadow-sm">
                  73.9873 W
                </p>
              </div>
              <div className="relative h-28 w-28 shrink-0">
                <div
                  className="mask-alpha mask-no-clip mask-no-repeat relative size-full"
                  style={{
                    maskImage: `url('${img3DWireframeOutlinePolygonSphereGlobeShape1}')`,
                    WebkitMaskImage: `url('${img3DWireframeOutlinePolygonSphereGlobeShape1}')`,
                    maskSize: "contain",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                  }}
                >
                  <img
                    alt=""
                    src={img3DWireframeOutlinePolygonSphereGlobeShape2}
                    className="size-full object-contain object-center"
                  />
                </div>
              </div>
            </div>
            <div className="relative z-[1] mt-3 inline-block rounded border-2 border-white px-2 py-1 font-['Satoshi:Medium',sans-serif] text-[14px] text-white">
              5020
            </div>
            <button
              type="button"
              onClick={openLeadPopup}
              className="relative z-[1] mt-4 rounded-full bg-white px-4 py-2 font-['Satoshi:Medium',sans-serif] text-[15px] font-medium text-[#035c24]"
            >
              Learn more
            </button>
          </div>
        </section>

        <section id="finaxis-you-know" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <p className="font-['Caladea',serif] text-[1.35rem] font-bold italic text-[#1e9500]">You know what?</p>
          <p className="mt-3 font-['Satoshi:Medium',sans-serif] text-[15px] leading-relaxed text-black">
            We offer sufficient POS financing solutions so you can streamline operations without budget limitations —
            predictable terms, fast approvals, and hardware that fits how you actually sell.
          </p>
        </section>

        <section id="finaxis-services" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Black',sans-serif] text-[20px] uppercase leading-snug text-[#00511e]">
            We equip businesses with optimal POS devices
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            {serviceCards.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#1e9501] bg-[#035c24] px-4 py-4 text-white shadow-md"
              >
                <h3 className="font-['Satoshi:Black',sans-serif] text-[17px] uppercase leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 font-['Satoshi:Regular',sans-serif] text-[15px] leading-relaxed text-white/95">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="finaxis-how-it-works" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <p className="font-['Caladea',serif] text-[1.1rem] font-bold italic text-[#1e9500]">How it works?</p>
          <h2 className="mt-1 font-['Satoshi:Black',sans-serif] text-[20px] uppercase tracking-wide text-[#00511e]">
            Simple, transparent, fast
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 font-['Satoshi:Medium',sans-serif] text-[15px] leading-relaxed text-black">
            <li>Tell us about your stores and current POS setup.</li>
            <li>We match you with financing options and hardware that fit your volume.</li>
            <li>Get approved, deploy terminals, and keep support one message away.</li>
          </ol>
        </section>

        <section id="finaxis-industries" className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="finaxis-hero-display text-[clamp(1.75rem,8vw,2.5rem)] leading-[0.95] text-[#00511e]">
            SERVING BUSINESSES
          </h2>
          <p className="mt-2 font-['Caladea',serif] text-[1.35rem] italic text-black">Across industries</p>
          <p className="mt-4 font-['Satoshi:Medium',sans-serif] text-[15px] leading-relaxed text-black">
            We help merchants access modern POS hardware with flexible payment options so you can scale without budget
            surprises.
          </p>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Industries we serve">
            {INDUSTRY_PANELS.map((panel, i) => {
              const active = industryTab === i;
              return (
                <button
                  key={panel.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  id={`finaxis-m-industry-tab-${i}`}
                  aria-controls="finaxis-m-industry-panel"
                  onClick={() => setIndustryTab(i)}
                  className={`rounded-full border px-3 py-1.5 font-['Satoshi:Medium',sans-serif] text-[12px] outline-none transition-colors sm:text-[13px] focus-visible:ring-2 focus-visible:ring-[#1e9501] focus-visible:ring-offset-2 ${
                    active
                      ? "border-[#1e9501] bg-[#1e9501] text-white shadow-sm"
                      : "border-[#1e9501] bg-white text-[#00511e] hover:bg-[#ecf8ed]"
                  }`}
                >
                  {panel.label}
                </button>
              );
            })}
          </div>

          <div id="finaxis-branding" className="scroll-mt-20 mt-10 border-t border-[#272727]/25 pt-10">
            <p className="font-['Caladea',serif] text-[0.95rem] font-bold uppercase tracking-wide text-[#1e9500]">
              We are here to help!
            </p>
            <div className="relative min-h-[12rem] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={industryTab}
                  id="finaxis-m-industry-panel"
                  role="tabpanel"
                  aria-labelledby={`finaxis-m-industry-tab-${industryTab}`}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="finaxis-industry-panel__headline mt-2 font-['Caladea',serif] text-[clamp(2rem,9vw,3.25rem)] font-bold italic leading-[1.05] text-black normal-case">
                    {INDUSTRY_PANELS[industryTab]?.headline}
                  </h2>
                  <p className="mt-4 font-['Satoshi:Regular',sans-serif] text-[15px] leading-[1.65] text-black">
                    {INDUSTRY_PANELS[industryTab]?.body}
                  </p>
                  <p className="mt-4 font-['Satoshi:Medium',sans-serif] text-[15px] font-medium text-[#00511e]">
                    Access powerful features such as:
                  </p>
                  <ul className="mt-3 space-y-3">
                    {INDUSTRY_PANELS[industryTab]?.features.map((label) => (
                      <li key={label} className="flex items-start gap-3">
                        <img alt="" src={imgVector5} className="mt-1 size-4 shrink-0 object-contain" />
                        <span className="font-['Satoshi:Bold',sans-serif] text-[15px] leading-snug text-black">{label}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={openLeadPopup}
              className="mt-6 rounded-full bg-[#035c24] px-6 py-3 font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white shadow-sm"
            >
              Learn more
            </button>

            <div className="relative mt-8 space-y-3">
              <div className="overflow-hidden rounded-xl border border-[#272727]/35 shadow-sm">
                <img
                  alt=""
                  src={imgGif121024X5621}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-xl border border-[#272727]/35 shadow-sm">
                  <img
                    alt=""
                    src={imgRectangle1304}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/85 px-3 py-2 shadow-md backdrop-blur-sm">
                    <img alt="" src={imgSvg} className="size-8 shrink-0 object-contain" />
                    <div className="font-['Satoshi:Medium',sans-serif] leading-tight">
                      <span className="block text-[22px] font-semibold tracking-tight text-[#030f3a]">80k+</span>
                      <span className="text-[12px] text-black">Retailers</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-[#272727]/35 shadow-sm">
                  <img
                    alt=""
                    src={imgRetailCardRow2021}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#272727] shadow-md">
            <img alt="" src={imgRectangle4079} className="aspect-video w-full object-cover" loading="lazy" />
          </div>
        </section>

        <section className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Black',sans-serif] text-[18px] uppercase tracking-wide text-[#00511e]">
            Merchant voices
          </h2>
          <div className="mt-4 space-y-4">
            <figure className="rounded-xl border border-[#272727]/30 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img alt="" src={imgEllipse36} className="size-12 shrink-0 rounded-full object-cover" />
                <figcaption className="font-['Satoshi:Medium',sans-serif] text-[14px] font-medium text-black">
                  Mark Henry · Retail
                </figcaption>
              </div>
              <blockquote className="mt-3 font-['Satoshi:Regular',sans-serif] text-[14px] leading-relaxed text-[#333]">
                “Prismatech helped us find high-performing campaigns in minutes. Financing the POS upgrade was painless.”
              </blockquote>
            </figure>
            <figure className="rounded-xl border border-[#272727]/30 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img alt="" src={imgEllipse37} className="size-12 shrink-0 rounded-full object-cover" />
                <figcaption className="font-['Satoshi:Medium',sans-serif] text-[14px] font-medium text-black">
                  Operations lead · QSR
                </figcaption>
              </div>
              <blockquote className="mt-3 font-['Satoshi:Regular',sans-serif] text-[14px] leading-relaxed text-[#333]">
                “Clear terms and responsive support — we rolled out three locations without cash-flow surprises.”
              </blockquote>
            </figure>
          </div>
        </section>

        <section className="scroll-mt-20 border-t border-[#272727]/40 py-8">
          <h2 className="font-['Satoshi:Black',sans-serif] text-[18px] uppercase tracking-wide text-[#00511e]">
            Partners &amp; programs
          </h2>
          <p className="mt-2 font-['Satoshi:Medium',sans-serif] text-[14px] leading-relaxed text-[#444]">
            We work with networks and programs that keep your checkout modern and compliant.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#272727]/30 bg-white px-4 py-5">
            {(["STA", "NDA", "RDI", "ZED"] as const).map((name) => (
              <span
                key={name}
                className="rounded-full border border-[#272727]/40 bg-[#f7f7f7] px-4 py-2 font-['Satoshi:Bold',sans-serif] text-[13px] tracking-wide text-[#00511e]"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        <section id="finaxis-contact" className="scroll-mt-20 border-t border-[#272727]/40 py-10">
          <div className="mx-auto mb-4 max-w-[min(100%,280px)]">
            <img alt="" src={imgYouSell} className="w-full object-contain object-center" />
          </div>
          <p className="text-center font-['Caladea:Bold_Italic',serif] text-[clamp(2.25rem,11vw,3.5rem)] font-bold italic capitalize leading-[1.02] tracking-tight text-black">
            We support
          </p>
          <h2 className="mt-5 font-['Caladea',serif] text-[1.35rem] font-bold italic text-[#1e9500]">
            Contact us for a better POS today
          </h2>
          <p className="mt-2 font-['Satoshi:Regular',sans-serif] text-[15px] leading-relaxed text-black">
            Have questions? We&apos;re here to help with financing options that fit your stores.
          </p>
          <form onSubmit={onContactSubmit} className="mt-5 flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                name="name"
                placeholder="Full name"
                value={contactForm.name}
                onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                autoComplete="name"
                className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
              />
              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                autoComplete="tel"
                className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                autoComplete="email"
                className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24] sm:col-span-2"
              />
              <input
                required
                name="message"
                placeholder="Message"
                value={contactForm.message}
                onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24] sm:col-span-2"
              />
            </div>
            {contactSubmitError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-['Satoshi:Medium',sans-serif] text-[13px] text-red-800">
                {contactSubmitError}
              </p>
            ) : null}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={contactSubmitting}
                className="rounded-full bg-[#035c24] px-6 py-3 font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white disabled:opacity-60"
              >
                {contactSubmitting ? "Sending…" : "Get Started Today"}
              </button>
              <button
                type="button"
                onClick={openLeadPopup}
                className="rounded-full border border-[#272727] bg-white px-6 py-3 font-['Satoshi:Medium',sans-serif] text-[15px] font-medium text-black"
              >
                Talk to an expert
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t border-[#272727] bg-[#ececec] py-8 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6">
        <img
          alt="Prismatech"
          src="/Group%2018513.png"
          className="mx-auto mb-6 h-10 w-auto max-w-[min(100%,280px)] object-contain"
        />
        <nav
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-['Satoshi:Medium',sans-serif] text-[14px]"
          aria-label="Footer"
        >
          <a href="#finaxis-services" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            POS Solutions
          </a>
          <a href="#finaxis-about" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            About Us
          </a>
          <a href="#finaxis-industries" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            Industries We Serve
          </a>
          <a href="#finaxis-branding" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            Branding
          </a>
          <a href="#finaxis-how-it-works" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            How It Works
          </a>
          <a href="#finaxis-contact" className="text-black no-underline hover:text-[#035c24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]">
            Contact Us
          </a>
        </nav>
        <p className="mt-6 text-center font-['Satoshi:Regular',sans-serif] text-[13px] text-[#555]">
          © {new Date().getFullYear()} Prismatech Inc.
        </p>
      </footer>

      {leadModalOpen && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-sm"
                onClick={dismissLeadPopup}
                aria-hidden
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="finaxis-m-lead-title"
                className="fixed top-1/2 left-1/2 z-[9999] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#272727] bg-[#f7f7f7] p-4 shadow-xl"
              >
                <button
                  type="button"
                  className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-[#272727] bg-white text-lg text-[#035c24]"
                  aria-label="Close"
                  onClick={dismissLeadPopup}
                >
                  ×
                </button>
                <p id="finaxis-m-lead-title" className="pr-10 font-['Clash_Display',sans-serif] text-xl font-medium text-black">
                  Request a callback
                </p>
                <p className="mt-1 text-sm font-medium text-[#1e9500]">We&apos;ll reach out within one business day.</p>
                {leadSubmitted ? (
                  <div className="mt-6 text-center">
                    <p className="font-['Satoshi:Medium',sans-serif] text-[16px] text-black">Thank you — we&apos;ve received your message.</p>
                    <button
                      type="button"
                      onClick={dismissLeadPopup}
                      className="mt-6 w-full rounded-full bg-[#035c24] py-3 font-['Satoshi:Medium',sans-serif] text-white"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onLeadSubmit} className="mt-4 flex flex-col gap-3">
                    <input
                      required
                      placeholder="Full name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                      className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                      className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                      className="rounded-full border border-[#3e3e3e] bg-white px-4 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
                    />
                    <textarea
                      required
                      placeholder="How can we help?"
                      rows={3}
                      value={leadForm.message}
                      onChange={(e) => setLeadForm((f) => ({ ...f, message: e.target.value }))}
                      className="rounded-xl border border-[#3e3e3e] bg-white px-3 py-2 font-['Satoshi:Medium',sans-serif] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#035c24]"
                    />
                    {leadSubmitError ? (
                      <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-['Satoshi:Medium',sans-serif] text-[13px] text-red-800">
                        {leadSubmitError}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="mt-1 rounded-full bg-[#035c24] py-3 font-['Satoshi:Medium',sans-serif] text-[16px] text-white disabled:opacity-60"
                    >
                      {leadSubmitting ? "Sending…" : "Send message"}
                    </button>
                  </form>
                )}
              </div>
            </>,
            document.body,
          )
        : null}

      {thankYouOpen && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-sm"
                onClick={dismissThankYou}
                aria-hidden
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="finaxis-m-thanks-title"
                className="fixed top-1/2 left-1/2 z-[9999] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#272727] bg-[#f7f7f7] p-6 shadow-xl"
              >
                <button
                  type="button"
                  className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-[#272727] bg-white text-lg text-[#035c24]"
                  aria-label="Close"
                  onClick={dismissThankYou}
                >
                  ×
                </button>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border-2 border-[#1e9500] bg-[rgba(30,149,0,0.08)]">
                  <span className="font-['Satoshi:Bold',sans-serif] text-2xl text-[#035c24]" aria-hidden>
                    ✓
                  </span>
                </div>
                <p
                  id="finaxis-m-thanks-title"
                  className="text-center font-['Satoshi:Medium',sans-serif] text-[18px] font-medium text-black"
                >
                  Thank you!
                </p>
                <p className="mt-2 text-center font-['Satoshi:Regular',sans-serif] text-[14px] leading-relaxed text-[#444]">
                  We&apos;ve received your message. Our team will reach out at{" "}
                  <a href="mailto:info@prismatech.com" className="font-medium text-[#035c24] underline-offset-2 hover:underline">
                    info@prismatech.com
                  </a>{" "}
                  soon.
                </p>
                <button
                  type="button"
                  onClick={dismissThankYou}
                  className="mt-6 w-full rounded-full bg-[#035c24] py-3 font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white"
                >
                  Close
                </button>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
