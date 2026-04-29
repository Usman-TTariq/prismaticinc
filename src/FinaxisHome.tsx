import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const FINAXIS_LEAD_POPUP_DELAY_MS = 5 * 1000;

const imgElements361 = "https://www.figma.com/api/mcp/asset/385fcfb8-6ac7-4d5f-b71e-f55a3a920ead";
const imgErere1 = "https://www.figma.com/api/mcp/asset/072ef79f-e07b-4b6a-8862-e2dfbb107247";
const imgGroup13 = "https://www.figma.com/api/mcp/asset/f8b5f0e6-2eed-425a-a319-1f5421cf22ad";
const imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131 = "https://www.figma.com/api/mcp/asset/8a51ae0d-c82e-4d06-b307-01e33fef56e2";
const imgEllipse36 = "https://www.figma.com/api/mcp/asset/f659f888-4ecf-44e4-ba73-e8cf2d16fa09";
const imgEllipse37 = "https://www.figma.com/api/mcp/asset/254af5c5-0e2c-415b-9314-67c46595333f";
const imgEllipse38 = "https://www.figma.com/api/mcp/asset/beb188ec-88cb-444d-a2f7-9649405c85d5";
const imgEllipse44 = "https://www.figma.com/api/mcp/asset/0da27bd9-3139-4a96-9cd6-ede7a7200a1f";
const imgEllipse45 = "https://www.figma.com/api/mcp/asset/15b66849-4557-4fa5-92ce-7bdaa0694463";
const imgEllipse46 = "https://www.figma.com/api/mcp/asset/8c852e47-36cf-40f4-8863-9fcaa0dd42b2";
const img115831E41E2 = "https://www.figma.com/api/mcp/asset/f9cc9212-7c62-4c5e-9974-1b61072f809f";
const img3DWireframeOutlinePolygonSphereGlobeShape2 = "https://www.figma.com/api/mcp/asset/bc75401c-3ca0-465f-9d52-de8ab24ccbd1";
const imgRectangle4053 = "https://www.figma.com/api/mcp/asset/50b5d56c-89bc-4518-ad80-c8fb28deb006";
const imgRetailCardRow2021 = "https://www.figma.com/api/mcp/asset/5c58554f-7c6f-4c27-a4b3-760942aab287";
const imgGif121024X5621 = "https://www.figma.com/api/mcp/asset/03562f45-bc92-4fea-aa2b-e97f29870edb";
const imgRectangle1304 = "https://www.figma.com/api/mcp/asset/5ca09472-facc-468d-ba84-e2d5f631ce3c";
const imgRectangle4079 = "https://www.figma.com/api/mcp/asset/a5ac3678-5f51-466f-ab55-cd915142834b";
const imgVector = "https://www.figma.com/api/mcp/asset/b1ed7586-ba23-4ef7-bfdb-436c1f731cf5";
const imgLine1 = "https://www.figma.com/api/mcp/asset/590d8391-58ec-408b-851d-9549b9b97474";
const imgLine4 = "https://www.figma.com/api/mcp/asset/e059f469-534e-40c2-b77b-2712fce6256a";
const imgLine7 = "https://www.figma.com/api/mcp/asset/96ca9469-8180-4b2a-a7af-763029cc7c1a";
const imgLine5 = "https://www.figma.com/api/mcp/asset/b70e7f15-af0c-415a-8992-bbc99e3c1516";
const imgLine2 = "https://www.figma.com/api/mcp/asset/0ba87bac-a4a9-4d27-b1ff-a96d9fc25ac3";
const imgLine3 = "https://www.figma.com/api/mcp/asset/fc1169d5-ca38-4a3b-b0b3-d475f09be710";
const imgGroup9 = "https://www.figma.com/api/mcp/asset/65127d6d-e0fd-425a-8ef2-5d017256cfb1";
const imgGroup5 = "https://www.figma.com/api/mcp/asset/be8cc662-008a-4e13-8166-86dd835f25ce";
const imgGroup4 = "https://www.figma.com/api/mcp/asset/00677321-fa12-47f8-865c-6e7b01800141";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/de303eb5-dbfb-4055-8906-40a922c948a7";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/c4833667-c64e-42f3-8d3d-f3174dd3c7b8";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/86abcdc8-6486-4b9b-b9b2-680376b0f1b6";
const imgEllipse22 = "https://www.figma.com/api/mcp/asset/53a384e5-d029-47fa-b40d-d7bb149d9586";
const imgGroup12 = "https://www.figma.com/api/mcp/asset/4d3b5054-66f3-4647-8108-19b328b828e3";
const imgVector34 = "https://www.figma.com/api/mcp/asset/ff2e1a80-ace8-4130-a7c7-5c5e3efd259e";
const imgEllipse58 = "https://www.figma.com/api/mcp/asset/a36236bf-902e-4612-a513-7b3a7e7df829";
const imgMingcuteArrowUpLine = "https://www.figma.com/api/mcp/asset/8df136d6-4c2b-432b-8713-579d138984c6";
const imgGroup79 = "https://www.figma.com/api/mcp/asset/c374f2a3-e7da-408a-a67d-a62d56f14f1d";
const imgVectorStroke = "https://www.figma.com/api/mcp/asset/03385499-8f80-46da-a59c-f5177b8b5079";
const imgVector1 = "https://www.figma.com/api/mcp/asset/0d0d4c6d-644d-4016-9d4a-a48752ded6c5";
const imgVector2 = "https://www.figma.com/api/mcp/asset/393cdb11-0159-4823-bb40-5fa27b06ef60";
const imgVector3 = "https://www.figma.com/api/mcp/asset/e801969c-676e-4bd0-897d-8a5ff821844f";
const imgVector4 = "https://www.figma.com/api/mcp/asset/ed65793a-95d0-42d6-8fbd-5a1d5e9216e1";
const img115831E41E1 = "https://www.figma.com/api/mcp/asset/ba2979c5-a45f-43c6-8407-03637fe1061a";
const img = "https://www.figma.com/api/mcp/asset/1508068d-0e9e-4de6-9245-2709064b5925";
const imgLine8 = "https://www.figma.com/api/mcp/asset/d6fbc018-4618-47d9-b9d5-24065b5eccfc";
const imgLine9 = "https://www.figma.com/api/mcp/asset/18dc5272-d474-4005-ad9a-0dac0dad2b89";
const imgRectangle4049 = "https://www.figma.com/api/mcp/asset/79fd9ffa-9341-4043-b407-c0c3447917c2";
const img3DWireframeOutlinePolygonSphereGlobeShape1 = "https://www.figma.com/api/mcp/asset/98e197b5-1190-45af-818c-902d11f18151";
const imgEllipse47 = "https://www.figma.com/api/mcp/asset/429a8fae-ac3a-4c28-a8e4-4d280b827c72";
const imgGroup80 = "https://www.figma.com/api/mcp/asset/68ff5d6f-9867-4264-a0fc-615323cdd9ad";
const imgGroup82 = "https://www.figma.com/api/mcp/asset/bd5c128b-64da-47f9-aa64-e308911d3ba4";
const imgGroup81 = "https://www.figma.com/api/mcp/asset/c2fcbc69-c2d1-41c9-a382-78176da4b039";
const imgGroup83 = "https://www.figma.com/api/mcp/asset/7c6611ea-ede8-4b8e-af79-fb552bf143b0";
const imgVector5 = "https://www.figma.com/api/mcp/asset/f3e1dcf5-3726-45c2-8a62-a7d7b165ad5a";
const imgSvg = "https://www.figma.com/api/mcp/asset/26cf74df-8014-4764-b05b-33c3b3cc0564";
const imgSimpleTransparentFast = "https://www.figma.com/api/mcp/asset/9d978a60-943e-4252-8af5-6c9199ba8105";
const img01 = "https://www.figma.com/api/mcp/asset/f330da71-1895-4f61-8a4c-d9cba52775aa";
const imgVector6 = "https://www.figma.com/api/mcp/asset/ce3f305a-de8b-47a4-a7d8-105f70948b37";
const img02 = "https://www.figma.com/api/mcp/asset/8e0aae0c-adc0-41d9-8d72-2a93b3021245";
const img03 = "https://www.figma.com/api/mcp/asset/f05e89e4-ebc3-4a6b-8a29-cd1c2eb974ba";
const img04 = "https://www.figma.com/api/mcp/asset/8ab9c6ed-6760-49a3-933b-6193ecb27d4c";
const imgGroup226 = "https://www.figma.com/api/mcp/asset/e0b873e2-3863-4f20-9053-ef79380ba87c";
const imgYouSell = "https://www.figma.com/api/mcp/asset/eab0fb85-cc9a-4014-8426-4997c5a7b145";
const imgGroup = "https://www.figma.com/api/mcp/asset/c426ec05-5584-49cb-990d-ce0f357e4eba";
const imgIcOutlineFacebook = "https://www.figma.com/api/mcp/asset/5be24874-ea98-4720-a9c1-99c6b7212c79";
const imgIcOutlineWhatsapp = "https://www.figma.com/api/mcp/asset/da4413b1-8f26-45af-8fb8-8d0a91c8687f";
const imgDeviconTwitter = "https://www.figma.com/api/mcp/asset/f3e4c865-c276-427b-8545-e8e9dd045050";
const imgSta = "https://www.figma.com/api/mcp/asset/45ed5644-0ba9-414b-8176-fbdf478aa517";
const imgNda = "https://www.figma.com/api/mcp/asset/42bb8b87-5688-4af2-a225-89eb025f0b84";
const imgRdi = "https://www.figma.com/api/mcp/asset/96efa59b-7cec-45ec-8d28-60a25141c8fd";
const imgZed = "https://www.figma.com/api/mcp/asset/3b7f2c86-62b5-4458-bb7c-c22b1bc9fcea";

type Component22Props = {
  className?: string;
};

function Component22({ className }: Component22Props) {
  return (
    <div className={className || "bg-[#035c24] content-stretch flex h-[65px] items-center justify-center px-[24px] py-[16px] relative rounded-[38px] w-[227px]"} data-node-id="1:933">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:934">
        Get Started Today
      </p>
    </div>
  );
}

type Component19Props = {
  className?: string;
};

function Component19({ className }: Component19Props) {
  return (
    <div className={className || "bg-[#013a16] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:953">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:954">
        Transaction-Based Models
      </p>
    </div>
  );
}

type Component18Props = {
  className?: string;
};

function Component18({ className }: Component18Props) {
  return (
    <div className={className || "bg-[#035c24] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:943">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:944">
        Monthly POS Financing
      </p>
    </div>
  );
}

type Component17Props = {
  className?: string;
};

function Component17({ className }: Component17Props) {
  return (
    <div className={className || "bg-[#035c24] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:938">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:939">
        Start Your POS Setup
      </p>
    </div>
  );
}

type Component16Props = {
  className?: string;
};

function Component16({ className }: Component16Props) {
  return (
    <div className={className || "bg-[#00511e] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:968">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:969">
        Learn More
      </p>
    </div>
  );
}

type Component15Props = {
  className?: string;
};

function Component15({ className }: Component15Props) {
  return (
    <div className={className || "bg-[#035c24] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:958">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:959">
        Get POS Financing
      </p>
    </div>
  );
}

type Component14Props = {
  className?: string;
};

function Component14({ className }: Component14Props) {
  return (
    <div className={className || "bg-white content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]"} data-node-id="1:963">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[#035c24] text-[22px] text-center whitespace-nowrap" data-node-id="1:964">
        Learn More
      </p>
    </div>
  );
}

type Component13Props = {
  className?: string;
  onClick?: () => void;
};

function Component13({ className, onClick }: Component13Props) {
  const layout =
    className ||
    "bg-[#035c24] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[38px]";
  const label = (
    <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] not-italic relative shrink-0 text-[22px] text-center text-white whitespace-nowrap" data-node-id="1:929">
      Talk To An Expert
    </p>
  );
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${layout} cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#035c24]`}
        data-node-id="1:928"
      >
        {label}
      </button>
    );
  }
  return (
    <div className={layout} data-node-id="1:928">
      {label}
    </div>
  );
}

export default function FinaxisHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
    setLeadForm({ name: "", email: "", phone: "", message: "" });
  }, []);

  const openLeadPopup = useCallback(() => {
    setMenuOpen(false);
    setLeadSubmitted(false);
    setLeadForm({ name: "", email: "", phone: "", message: "" });
    setLeadModalOpen(true);
  }, []);

  useEffect(() => {
    const locked = menuOpen || leadModalOpen;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (leadModalOpen) dismissLeadPopup();
      else if (menuOpen) setMenuOpen(false);
    };
    if (!locked) return;
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen, leadModalOpen, dismissLeadPopup]);

  const onLeadSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <div
      id="finaxis-top"
      className="relative min-h-[8190px] w-full bg-[#f7f7f7]"
      data-node-id="76:136"
      data-name="home"
    >
      <div className="-translate-x-1/2 absolute h-[254px] left-[calc(50%+299.5px)] top-[2896px] w-[1055px]" data-node-id="76:137" data-name="Vector">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
      </div>
      <div className="absolute h-0 left-[40px] top-[1274px] w-[1834px]" data-node-id="76:138">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine1} />
        </div>
      </div>
      <div className="absolute h-0 left-[45px] top-[523px] w-[791px]" data-node-id="76:139">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine4} />
        </div>
      </div>
      <div className="absolute h-0 left-[1090px] top-[523px] w-[784px]" data-node-id="76:140">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine7} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute left-[40px] top-[523px] z-[3] h-[751px] w-[1840px] border border-[#272727] border-solid"
        aria-hidden="true"
      />
      <div
        id="finaxis-hero"
        className="absolute left-[42px] top-[80px] z-[25] h-[444px] w-[1837px] scroll-mt-[150px] overflow-hidden"
        data-node-id="76:141"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-[201px] flex flex-col justify-center text-center leading-none not-italic text-[#00511e] tracking-[3.522px] uppercase whitespace-nowrap"
          data-node-id="76:142"
        >
          <p className="finaxis-hero-procerus-figma m-0 leading-[normal]">POS SYSTEMS MADE ACCESSIBLE</p>
        </div>
        <p
          className="absolute left-[calc(50%-729.5px)] top-[249px] z-20 w-[1458px] text-center font-['Caladea',serif] text-[126px] font-normal capitalize italic leading-[normal] text-black"
          data-node-id="76:143"
        >
          Through Smart Financing
        </p>
      </div>
      <div className="absolute flex h-[751px] items-center justify-center left-[533px] top-[523px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[751px]" data-node-id="76:145">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine5} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[751px] items-center justify-center left-[1381px] top-[523px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[751px]" data-node-id="76:146">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine5} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-[1381px] top-[863px] w-[493px]" data-node-id="76:147">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine2} />
        </div>
      </div>
      <div className="absolute h-0 left-[40px] top-[924px] w-[493px]" data-node-id="76:148">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine3} />
        </div>
      </div>
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] left-[58px] not-italic text-[26px] text-black top-[570px] w-[446px]" data-node-id="76:149">
        We offer flexible financing to help scaling businesses access the best POS Device in the US without much hassle. Secure financing with easier payoffs
      </p>
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] left-[1408px] not-italic text-[28px] text-black top-[954px] w-[466px]" data-node-id="76:150">
        A reliable partner for POS transactions.
      </p>
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] left-[40px] not-italic text-[28px] text-black top-[957px] whitespace-nowrap z-[5]" data-node-id="76:151">
        Our Notable Work
      </p>
      <div
        id="finaxis-notable"
        className="absolute left-[40px] top-[1004px] z-[6] max-w-[560px] scroll-mt-[150px] pb-20 pr-6"
      >
        <div className="finaxis-notable-work-services font-['Satoshi:Medium',sans-serif]">
          <span>Website Design</span>
          <span className="finaxis-notable-work-sep" aria-hidden="true">
            {"\u2732"}
          </span>
          <span>Branding</span>
          <span className="finaxis-notable-work-sep" aria-hidden="true">
            {"\u2732"}
          </span>
          <span>Strategy Consulting</span>
          <span className="finaxis-notable-work-sep" aria-hidden="true">
            {"\u2732"}
          </span>
          <span>Digital - Marketing</span>
          <span className="finaxis-notable-work-sep" aria-hidden="true">
            {"\u2732"}
          </span>
          <span>Analytics & Report</span>
        </div>
      </div>
      <p className="absolute font-['Satoshi:Bold',sans-serif] leading-[normal] left-[1408px] not-italic text-[26px] text-black top-[1169px] uppercase whitespace-nowrap" data-node-id="76:152">
        Marquez D Dragon
      </p>
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[normal] left-[1408px] not-italic text-[26px] text-black top-[1034px] w-[452px]" data-node-id="76:153">
        They understand the POS industry and offer flexible financial solutions.
      </p>
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[normal] left-[1408px] not-italic text-[20px] text-black top-[1207px] whitespace-nowrap" data-node-id="76:154">
        Restaurant Owner
      </p>
      <div className="absolute h-[37.406px] left-[1408px] top-[901px] w-[192.08px]" data-node-id="76:155">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup9} />
      </div>
      <div className="absolute contents inset-[13.57%_16.18%_86.02%_73.33%]" data-node-id="76:168">
        <div className="absolute inset-[13.57%_24.92%_86.02%_73.33%]" data-node-id="76:169">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup5} />
        </div>
        <div className="absolute inset-[13.57%_22.73%_86.02%_75.52%]" data-node-id="76:172">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
        </div>
        <div className="absolute inset-[13.57%_20.55%_86.02%_77.7%]" data-node-id="76:175">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
        </div>
        <div className="absolute inset-[13.57%_18.36%_86.02%_79.89%]" data-node-id="76:178">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
        </div>
        <div className="absolute inset-[13.57%_16.18%_86.02%_82.07%]" data-node-id="76:181">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
        </div>
      </div>
      <div className="absolute contents left-[58px] top-[792px]" data-node-id="76:184">
        <p className="absolute font-['Satoshi:Bold',sans-serif] leading-[normal] left-[58px] not-italic text-[#1e9500] text-[22px] top-[793px] whitespace-nowrap" data-node-id="76:185">
          EST
        </p>
        <div className="absolute bg-black border border-[#00511e] border-solid h-[32px] left-[116px] rounded-[50px] top-[792px] w-[84px]" data-node-id="76:186" />
        <div className="absolute bg-white h-[23px] left-[122px] rounded-bl-[50px] rounded-tl-[50px] top-[797px] w-[36px]" data-node-id="76:187" />
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] left-[131px] not-italic text-[18px] text-black top-[796px] whitespace-nowrap" data-node-id="76:188">
          20
        </p>
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] left-[167px] not-italic text-[18px] text-white top-[796px] whitespace-nowrap" data-node-id="76:189">
          25
        </p>
      </div>
      <div className="absolute top-[402px] left-[451px] h-[826px] w-[1218px]" data-node-id="76:190">
        <div className="absolute contents left-[14.27px] top-[-32.73px]" data-node-id="76:191">
          <div className="-translate-x-1/2 absolute left-[calc(50%-100px)] size-[730px] top-[96px]" data-node-id="76:192">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse22} />
          </div>
          <div className="absolute top-[219px] left-[643px] h-[92px] w-[316px]" data-node-id="164:450" data-name="elements36 1">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgElements361} />
          </div>
          <div className="absolute top-[377px] left-[32px] h-[110px] w-[258px] shadow-[-11px_22px_15.4px_0px_rgba(0,0,0,0.25)]" data-node-id="164:453" data-name="erere 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgErere1} />
          </div>
          <div className="absolute contents left-[144px] top-[96px]" data-node-id="76:193" data-name="Mask group">
            <div className="absolute contents left-[216.65px] top-[55px]" data-node-id="163:437">
              <div className="absolute contents left-[216.65px] top-[55px]" data-node-id="163:438">
                <div className="absolute h-[829.2px] left-[216.65px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-72.654px_41px] mask-size-[730px_730px] top-[55px] w-[584.692px]" data-node-id="163:439" style={{ maskImage: `url('${imgGroup12}')` }} data-name="Group 1 2">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup13} />
                </div>
                <div className="absolute h-[110.56px] left-[466.74px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-322.743px_-381.839px] mask-size-[730px_730px] top-[477.84px] w-[152.02px]" data-node-id="163:440" style={{ maskImage: `url('${imgGroup12}')` }}>
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector34} />
                </div>
              </div>
              <div
                className="absolute left-[515px] top-[508px] h-[46px] w-[58px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371px_-412px] mask-size-[730px_730px] mix-blend-hard-light"
                data-node-id="206:316"
                style={{ maskImage: `url('${imgGroup12}')` }}
                data-name="Gemini_Generated_Image_8fm19t8fm19t8fm1 3 1"
              >
                <img
                  alt=""
                  className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                  src={imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[55px] left-[217px] h-[65px] w-[584px]" data-node-id="163:445" data-name="Group 1 2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="" className="absolute top-0 left-[-0.14%] h-[1267.5%] w-[100.27%] max-w-none" src={imgGroup13} />
          </div>
        </div>
        <div className="absolute contents inset-[15.32%_68.93%_58.82%_16.39%]" data-node-id="76:208" style={{ containerType: "size" }} data-name="Layer 2">
          <div className="absolute contents inset-[15.32%_68.93%_58.82%_16.39%]" data-node-id="76:209" style={{ containerType: "size" }} data-name="Layer 1">
            <div className="absolute flex inset-[33.54%_79.4%_61.21%_16.58%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(73.4385cqw,45.4746cqh)] rotate-[-61.22deg] w-[hypot(26.5615cqw,-54.5254cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:210">
                  M
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[30.94%_78.49%_64.37%_17.74%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(77.008cqw,53.2289cqh)] rotate-[-59.76deg] w-[hypot(22.992cqw,-46.7711cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:211">
                  A
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[28.69%_77.4%_66.58%_18.88%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(76.0192cqw,57.0023cqh)] rotate-[-57.11deg] w-[hypot(23.9808cqw,-42.9977cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:212">
                  R
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[26.51%_76.22%_68.53%_20.11%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(72.4554cqw,61.5032cqh)] rotate-[-52.07deg] w-[hypot(27.5446cqw,-38.4968cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:213">
                  K
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[24.58%_75.03%_70.43%_21.51%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(70.7317cqw,68.2224cqh)] rotate-[-46.69deg] w-[hypot(29.2683cqw,-31.7776cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.458px] text-white whitespace-nowrap" data-node-id="76:214">
                  E
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[25.74%_75.75%_70.62%_21.96%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(100cqw,100cqh)] rotate-[-42.96deg] w-[hypot(2.61921cqw,-2.27123cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:215">{` `}</p>
              </div>
            </div>
            <div className="absolute flex inset-[22.64%_73.75%_72.21%_22.91%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(67.115cqw,71.7686cqh)] rotate-[-41.86deg] w-[hypot(32.885cqw,-28.2314cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:216">
                  T
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[21.67%_72.88%_73.84%_24.38%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(79.4352cqw,84.3081cqh)] rotate-[-40.29deg] w-[hypot(20.5648cqw,-15.6919cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:217">
                  I
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[19.73%_71.16%_74.6%_25.37%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(55.3237cqw,71.9584cqh)] rotate-[-34.79deg] w-[hypot(44.6763cqw,-28.0416cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.443px] text-white whitespace-nowrap" data-node-id="76:218">
                  N
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[18.04%_69.44%_76.23%_27.34%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(44.6014cqw,78.3779cqh)] rotate-[-25.23deg] w-[hypot(55.3986cqw,-21.6221cqh)]">
                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative text-[30.501px] text-white whitespace-nowrap" data-node-id="76:219">
                  G
                </p>
              </div>
            </div>
            <div className="absolute flex inset-[22.08%_69.5%_76.89%_30.25%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="flex-none h-[hypot(100cqw,100cqh)] rotate-[-19.92deg] w-[hypot(30.6609cqw,-4.02652cqh)]">
                <p className="font-['Myriad_Pro:Regular',sans-serif] leading-[normal] not-italic relative text-[7.32px] text-white whitespace-nowrap" data-node-id="76:220">{` `}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#00511e] h-[75px] left-[47px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[396px] w-[9px]" data-node-id="164:455" />
        <div className="absolute bg-[#00511e] h-[66px] left-[63px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[405px] w-[9px]" data-node-id="164:456" />
        <div className="absolute bg-[#00511e] h-[72px] left-[79px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[399px] w-[10px]" data-node-id="164:457" />
        <div className="absolute bg-[#00511e] h-[49px] left-[96px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[422px] w-[10px]" data-node-id="164:459" />
        <div className="absolute bg-[#00511e] h-[66px] left-[112px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[405px] w-[10px]" data-node-id="164:460" />
        <div className="absolute bg-[#00511e] h-[62px] left-[129px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[409px] w-[10px]" data-node-id="164:461" />
        <div className="absolute bg-[#00511e] h-[75px] left-[145px] mix-blend-hue rounded-tl-[2px] rounded-tr-[2px] top-[396px] w-[10px]" data-node-id="164:462" />
        <div className="absolute left-[873px] mix-blend-hue size-[81px] top-[219px]" data-node-id="164:463">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse58} />
        </div>
      </div>
      <div className="absolute left-[1416px] size-[106px] top-[575px]" data-node-id="76:329">
        <div className="absolute inset-[-2.83%]">
          <img alt="" className="block max-w-none size-full" height="112" src={imgEllipse36} width="112" />
        </div>
      </div>
      <div className="absolute left-[1588px] size-[106px] top-[575px]" data-node-id="76:330">
        <div className="absolute inset-[-2.83%]">
          <img alt="" className="block max-w-none size-full" height="112" src={imgEllipse37} width="112" />
        </div>
      </div>
      <div className="absolute left-[1760px] size-[106px] top-[575px]" data-node-id="76:331">
        <div className="absolute inset-[-2.83%]">
          <img alt="" className="block max-w-none size-full" height="112" src={imgEllipse38} width="112" />
        </div>
      </div>
      <div className="absolute contents left-[1458px] not-italic text-black text-center top-[712px]" data-node-id="164:467">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[1641px] text-[24px] top-[727px] w-[366px]" data-node-id="76:335">
          <p className="leading-[29.25px]">Mark Henry</p>
        </div>
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19px] left-[1641.5px] text-[14px] top-[743px] w-[291px]" data-node-id="76:336">
          PrismaTech helped us find high-performing campaigns in minutes. The platform makes marketing brands effortless.”
        </p>
      </div>
      <div className="absolute flex items-center justify-center left-[1850px] size-[24px] top-[744px]">
        <div className="flex-none rotate-90">
          <div className="overflow-clip relative size-[24px]" data-node-id="76:337" data-name="mingcute:arrow-up-line">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMingcuteArrowUpLine} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1408px] size-[24px] top-[744px]">
        <div className="-rotate-90 flex-none">
          <div className="overflow-clip relative size-[24px]" data-node-id="76:341" data-name="mingcute:arrow-up-line">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMingcuteArrowUpLine} />
          </div>
        </div>
      </div>
      <div className="absolute h-[13px] left-[1575px] top-[822px] w-[133px]" data-node-id="76:345">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup79} />
      </div>
      <header className="absolute top-0 left-0 z-50 h-[134px] w-full overflow-hidden" data-node-id="76:351">
        <nav
          className="relative mx-auto h-[134px] w-full max-w-[1920px] border border-[#272727] border-solid bg-[#f7f7f7] shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
          data-node-id="76:352"
        >
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="finaxis-nav-drawer"
            onClick={() => setMenuOpen((o) => !o)}
            className="absolute left-[59.5px] top-[52px] flex h-[30px] cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#035c24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f7]"
            data-node-id="76:353"
          >
            <div className="relative h-[23px] w-7 shrink-0" data-node-id="76:354" data-name="Vector (Stroke)">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVectorStroke} />
            </div>
            <span
              className="font-['Satoshi:Medium',sans-serif] text-[22px] font-medium leading-none not-italic tracking-[0.22px] text-black"
              data-node-id="76:355"
            >
              Menu
            </span>
          </button>

          <div
            className="absolute top-[39px] left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap"
            data-node-id="76:362"
          >
            <div
              className="relative h-[46px] w-[58px] shrink-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371px_-412px] mask-size-[730px_730px] mix-blend-hard-light"
              data-node-id="206:316"
              data-name="Gemini_Generated_Image_8fm19t8fm19t8fm1 3 1"
              style={{ maskImage: `url('${imgGroup12}')` }}
            >
              <img
                alt=""
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                src={imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131}
              />
            </div>
            <div className="flex items-baseline gap-2 font-['Clash_Display',sans-serif] text-[44px] font-medium leading-none not-italic text-black uppercase">
              <span>Prismatech</span>
              <span className="text-[0.62em] font-medium tracking-[0.02em]">Inc</span>
            </div>
          </div>

          <Component13
            onClick={openLeadPopup}
            className="absolute top-[38px] right-[26.5px] flex h-[55px] w-[220px] items-center justify-center rounded-[38px] bg-[#035c24] px-6"
          />
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        id="finaxis-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
        className={`fixed top-0 left-0 z-[101] flex h-full max-h-svh w-[min(420px,92vw)] flex-col border-r border-[#272727] bg-[#f7f7f7] shadow-[8px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#272727] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div
              className="relative h-9 w-11 shrink-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371px_-412px] mask-size-[730px_730px] mix-blend-hard-light"
              style={{ maskImage: `url('${imgGroup12}')` }}
            >
              <img
                alt=""
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                src={imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131}
              />
            </div>
            <div className="flex items-baseline gap-1.5 font-['Clash_Display',sans-serif] text-xl font-medium uppercase leading-none text-black">
              <span>Prismatech</span>
              <span className="text-[0.62em] font-medium tracking-[0.02em]">Inc</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex size-10 items-center justify-center rounded-full border border-[#272727] bg-white text-xl leading-none text-[#035c24] transition-colors hover:bg-[#ececec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Page sections">
          {(
            [
              ["#finaxis-top", "Home"],
              ["#finaxis-hero", "POS & financing"],
              ["#finaxis-notable", "Our notable work"],
              ["#finaxis-how-it-works", "How it works"],
              ["#finaxis-contact", "Contact"],
            ] as const
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border-l-[3px] border-transparent py-3.5 pr-3 pl-4 font-['Satoshi:Medium',sans-serif] text-[18px] font-medium tracking-[0.02em] text-black transition-colors hover:border-[#035c24] hover:bg-[#ececec]"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="shrink-0 border-t border-[#272727] p-5">
          <a
            href="#finaxis-contact"
            onClick={() => setMenuOpen(false)}
            className="flex h-[52px] w-full items-center justify-center rounded-[38px] bg-[#035c24] font-['Satoshi:Medium',sans-serif] text-[18px] font-medium text-white transition-colors hover:bg-[#024a1d]"
          >
            Talk to an expert
          </a>
          <p className="mt-4 text-center font-['Satoshi:Regular',sans-serif] text-[13px] text-[#555]">Smart POS financing for growing businesses.</p>
        </div>
      </aside>

      {leadModalOpen && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-[3px] transition-opacity"
                aria-hidden
                onClick={dismissLeadPopup}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="finaxis-lead-title"
                className="fixed top-1/2 left-1/2 z-[9999] w-[calc(100%-1.5rem)] max-w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[#272727] border-solid bg-[#ebebeb] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.4)_inset] sm:p-2.5"
              >
            <div className="relative max-h-[min(88vh,720px)] overflow-hidden rounded-[16px] border border-[#1e9500] border-solid bg-gradient-to-br from-white via-[#f9fdf9] to-[rgba(30,149,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
              <button
                type="button"
                onClick={dismissLeadPopup}
                className="absolute top-3 right-3 z-20 flex size-10 items-center justify-center rounded-full border border-[#272727] bg-[#f7f7f7] text-xl leading-none text-[#035c24] shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]"
                aria-label="Close"
              >
                ×
              </button>

              <div className="max-h-[min(88vh,720px)] overflow-y-auto overscroll-contain">
                <div className="grid gap-0 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] sm:gap-0">
                  <div className="relative min-h-[140px] overflow-hidden rounded-t-[14px] sm:min-h-[280px] sm:rounded-bl-[14px] sm:rounded-tl-[14px]">
                    <img
                      alt=""
                      src={img115831E41E2}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                    <div className="relative flex h-full min-h-[140px] flex-col justify-end p-4 pb-5 sm:min-h-[280px] sm:p-5 sm:pr-8">
                      <div className="mb-3 flex items-center gap-2.5">
                        <div
                          className="relative h-10 w-[46px] shrink-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371px_-412px] mask-size-[730px_730px] mix-blend-hard-light"
                          style={{ maskImage: `url('${imgGroup12}')` }}
                        >
                          <img
                            alt=""
                            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                            src={imgGeminiGeneratedImage8Fm19T8Fm19T8Fm131}
                          />
                        </div>
                        <div className="flex items-baseline gap-1 font-['Clash_Display',sans-serif] text-lg font-medium uppercase leading-none text-white drop-shadow-sm">
                          <span>Prismatech</span>
                          <span className="text-[0.62em] opacity-95">Inc</span>
                        </div>
                      </div>
                      <p className="font-['Clash_Display',sans-serif] text-[22px] font-medium leading-tight tracking-tight text-white drop-shadow-md sm:text-[26px]">
                        Smart financing for your POS.
                      </p>
                      <p className="mt-2 max-w-[280px] font-['Satoshi:Medium',sans-serif] text-[13px] font-medium leading-snug text-white/90 sm:text-[14px]">
                        Same-day follow-ups · Transparent terms · Built for scaling merchants
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col border-t border-[#272727]/25 bg-[#f7f7f7]/95 p-4 sm:border-t-0 sm:border-l sm:border-[#272727]/20 sm:p-5 sm:pl-5">
                    <div className="mb-4 flex items-start justify-between gap-2 pr-10 sm:pr-2">
                      <div>
                        <p
                          id="finaxis-lead-title"
                          className="font-['Clash_Display',sans-serif] text-[22px] font-medium leading-tight tracking-tight text-black sm:text-[24px]"
                        >
                          Request a callback
                        </p>
                        <p className="mt-1 font-['Satoshi:Medium',sans-serif] text-[14px] font-medium text-[#1e9500]">
                          We&apos;ll reach out within one business day.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-[#272727]/35 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-4">
                      {leadSubmitted ? (
                        <div className="py-6 text-center">
                          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border-2 border-[#1e9500] bg-[rgba(30,149,0,0.08)]">
                            <span className="font-['Satoshi:Bold',sans-serif] text-2xl text-[#035c24]" aria-hidden>
                              ✓
                            </span>
                          </div>
                          <p className="font-['Satoshi:Medium',sans-serif] text-[17px] font-medium text-black">
                            Thank you — we&apos;ve received your message.
                          </p>
                          <p className="mt-2 font-['Satoshi:Regular',sans-serif] text-[14px] text-[#555]">
                            Our team will reach out shortly.
                          </p>
                          <button
                            type="button"
                            onClick={dismissLeadPopup}
                            className="mt-6 h-[48px] w-full rounded-[38px] bg-[#035c24] font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white transition-colors hover:bg-[#024a1d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]"
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={onLeadSubmit} className="flex flex-col gap-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <label className="block sm:col-span-2">
                              <span className="mb-1 block font-['Satoshi:Medium',sans-serif] text-[11px] font-medium uppercase tracking-[0.12em] text-[#555]">
                                Full name
                              </span>
                              <input
                                required
                                name="name"
                                value={leadForm.name}
                                onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                                autoComplete="name"
                                className="h-11 w-full rounded-full border border-[#3e3e3e] bg-[#fafafa] px-4 font-['Satoshi:Medium',sans-serif] text-[15px] text-black outline-none transition-[box-shadow,background-color] placeholder:text-[#929292] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#035c24]"
                                placeholder="Jane Merchant"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-1 block font-['Satoshi:Medium',sans-serif] text-[11px] font-medium uppercase tracking-[0.12em] text-[#555]">
                                Email
                              </span>
                              <input
                                required
                                type="email"
                                name="email"
                                value={leadForm.email}
                                onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                                autoComplete="email"
                                className="h-11 w-full rounded-full border border-[#3e3e3e] bg-[#fafafa] px-4 font-['Satoshi:Medium',sans-serif] text-[15px] text-black outline-none transition-[box-shadow,background-color] placeholder:text-[#929292] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#035c24]"
                                placeholder="you@business.com"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-1 block font-['Satoshi:Medium',sans-serif] text-[11px] font-medium uppercase tracking-[0.12em] text-[#555]">
                                Phone
                              </span>
                              <input
                                required
                                type="tel"
                                name="phone"
                                value={leadForm.phone}
                                onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                                autoComplete="tel"
                                className="h-11 w-full rounded-full border border-[#3e3e3e] bg-[#fafafa] px-4 font-['Satoshi:Medium',sans-serif] text-[15px] text-black outline-none transition-[box-shadow,background-color] placeholder:text-[#929292] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#035c24]"
                                placeholder="+1 (555) 000-0000"
                              />
                            </label>
                          </div>
                          <label className="block">
                            <span className="mb-1 block font-['Satoshi:Medium',sans-serif] text-[11px] font-medium uppercase tracking-[0.12em] text-[#555]">
                              How can we help?
                            </span>
                            <textarea
                              required
                              name="message"
                              rows={3}
                              value={leadForm.message}
                              onChange={(e) => setLeadForm((f) => ({ ...f, message: e.target.value }))}
                              className="w-full resize-y rounded-[14px] border border-[#3e3e3e] bg-[#fafafa] px-3.5 py-2.5 font-['Satoshi:Medium',sans-serif] text-[15px] text-black outline-none transition-[box-shadow,background-color] placeholder:text-[#929292] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#035c24]"
                              placeholder="Tell us about your stores and current POS setup…"
                            />
                          </label>
                          <button
                            type="submit"
                            className="mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-[38px] bg-[#035c24] font-['Satoshi:Medium',sans-serif] text-[16px] font-medium text-white shadow-[0_4px_14px_rgba(3,92,36,0.35)] transition-[background-color,transform] hover:bg-[#024a1d] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035c24]"
                          >
                            Send message
                            <span className="text-lg leading-none opacity-90" aria-hidden>
                              →
                            </span>
                          </button>
                          <p className="text-center font-['Satoshi:Regular',sans-serif] text-[11px] leading-snug text-[#777]">
                            By submitting, you agree we may contact you about POS financing. No spam.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>,
            document.body,
          )
        : null}

      <div className="absolute h-[560px] left-0 top-[2201px] w-[1920px]" data-node-id="76:364">
        <div className="absolute flex h-[560px] items-center justify-center left-0 top-0 w-[1920px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-gradient-to-r from-[rgba(255,255,255,0.5)] h-[560px] to-[rgba(30,149,0,0.25)] w-[1920px]" data-node-id="76:365" />
          </div>
        </div>
        <div className="absolute h-[192px] left-[43px] top-[76px] w-[1712px]" data-node-id="76:366">
          <div className="absolute left-0 size-[95px] top-0" data-node-id="76:367">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="95" src={imgEllipse44} width="95" />
          </div>
          <div className="absolute left-[58px] size-[95px] top-0" data-node-id="76:368">
            <div className="absolute inset-[-10%_-2.63%_-10%_-17.37%]">
              <img alt="" className="block max-w-none size-full" height="114" src={imgEllipse45} width="114" />
            </div>
          </div>
          <div className="absolute left-[116px] size-[95px] top-0" data-node-id="76:369">
            <div className="absolute inset-[-10%_-2.63%_-10%_-17.37%]">
              <img alt="" className="block max-w-none size-full" height="114" src={imgEllipse46} width="114" />
            </div>
          </div>
          <div className="-translate-x-1/2 absolute h-[173px] left-[calc(50%-139px)] top-[16px] w-[704px]" data-node-id="76:370" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[calc(50%+284px)] not-italic text-[22px] text-black text-justify top-[102px] uppercase w-[572px]" data-node-id="76:371">
            <p className="leading-[normal]">WE HELP BUSINESSES GET THEIR HANDS ON HIGH-END POS TERMINALS WITHOUT BREAKING THE BANK. WITH SAFE AND SECURE PAYOFF PLANS AND FINANCING, BUSINESSES CAN NOW SCALE WITHOUT WORRYING ABOUT OVERWHELMING BUSINESS LOGISTICS AND INVENTORY MANAGEMENT.</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center leading-[0] left-[267px] not-italic text-[28px] text-black top-[31px] uppercase whitespace-nowrap" data-node-id="76:372">
            <p className="leading-[normal]">01.</p>
          </div>
        </div>
        <div className="absolute h-[150px] left-[214px] top-[349px] w-[1467px]" data-node-id="76:373">
          <div className="-translate-x-1/2 absolute h-[149px] left-[calc(50%-328.5px)] top-0 w-[606px]" data-node-id="76:374" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[calc(50%+45.5px)] not-italic text-[22px] text-black text-justify top-[82px] uppercase w-[804px]" data-node-id="76:375">
            <p className="leading-[normal]">We are a transaction-focused POS financial solutions provider, designed to help scaling businesses maximize revenue by streamlining their business logistics. We effectively help businesses scale by matching their operations with a standardized cloud POS system and smart financial decision-making.</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center leading-[0] left-0 not-italic text-[28px] text-black top-[19px] uppercase whitespace-nowrap" data-node-id="76:376">
            <p className="leading-[normal]">02.</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[928px] left-0 top-[1274px] w-[1942px]" data-node-id="76:377">
        <div className="absolute h-[927px] left-0 top-px w-[1303px]" data-node-id="76:378">
          <div className="absolute bg-gradient-to-r from-[rgba(255,255,255,0.5)] h-[927px] left-0 to-[rgba(30,149,0,0.25)] top-0 w-[1303px]" data-node-id="76:379" />
          <div className="-translate-x-1/2 absolute h-[349px] left-[calc(50%-256.5px)] top-[108px] w-[328px]" data-node-id="76:380" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
          </div>
          <div className="-translate-x-1/2 absolute h-[392px] left-[calc(50%+1.5px)] top-[483px] w-[840px]" data-node-id="76:381" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
          </div>
          <div className="absolute contents left-[595px] top-[105px]" data-node-id="76:382" data-name="Mask group">
            <div className="absolute h-[423px] left-[595px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_16px] mask-size-[668px_356px] rounded-[20px] top-[89px] w-[668px]" data-node-id="76:384" style={{ maskImage: `url('${img115831E41E1}')` }} data-name="1158_31e41e 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={img115831E41E2} />
            </div>
          </div>
          <div className="-translate-x-1/2 absolute h-[392px] left-[calc(50%+502px)] top-[483px] w-[89px]" data-node-id="76:385" data-name="?">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
          </div>
        </div>
        <div className="absolute h-[927px] left-[1295px] top-0 w-[647px]" data-node-id="76:386">
          <div className="absolute flex h-[23px] items-center justify-center left-[89px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:387">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[288px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:388">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[490px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:389">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[120px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:390">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[319px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:391">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[521px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:392">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[155px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:393">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[354px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:394">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[556px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:395">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[187px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:396">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[386px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:397">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[222px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:398">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[23px] items-center justify-center left-[421px] top-[33px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[23px]" data-node-id="76:399">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine8} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[253px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:400">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[11px] items-center justify-center left-[452px] top-[45px] w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[11px]" data-node-id="76:401">
                <div className="absolute inset-[-3px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#00511e] h-[927px] left-0 top-0 w-[647px]" data-node-id="76:402" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold',sans-serif] justify-center leading-[0] left-[86px] not-italic text-[83px] text-white top-[541px] uppercase whitespace-nowrap" data-node-id="76:403">
            <p className="leading-[normal] mb-0">40.7440 N</p>
            <p className="leading-[normal]">73.9873 W</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[86px] not-italic text-[35px] text-white top-[763.5px] tracking-[-2.1px] w-[475px]" data-node-id="76:404">
            <p className="leading-[normal]">Choosing us means you are choosing quick, safe financing for POS systems with intuitive POS software and hardware that streamlines your business logistics</p>
          </div>
          <div
            className="absolute left-[87px] top-[53px] z-[1] h-[360px] w-[474px] overflow-hidden"
            data-node-id="76:405-wrap"
            data-name="Wireframe card"
          >
            <div className="pointer-events-none absolute inset-0" data-node-id="76:405">
              <img alt="" className="absolute inset-0 block size-full max-w-none object-cover" src={imgRectangle4049} />
            </div>
            <div className="pointer-events-none absolute inset-x-3 bottom-3 top-[10%] flex items-end justify-end">
              <div className="relative aspect-square h-[280px] w-[280px] max-h-full max-w-full shrink-0 sm:h-[300px] sm:w-[300px]">
                <div
                  className="mask-alpha mask-no-clip mask-no-repeat relative size-full"
                  data-node-id="76:409"
                  data-name="3d-wireframe-outline-polygon-sphere-globe-shape 1"
                  style={{
                    maskImage: `url('${img3DWireframeOutlinePolygonSphereGlobeShape1}')`,
                    WebkitMaskImage: `url('${img3DWireframeOutlinePolygonSphereGlobeShape1}')`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <img
                    alt=""
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-contain object-center"
                    src={img3DWireframeOutlinePolygonSphereGlobeShape2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute border-2 border-solid border-white h-[35px] left-[106px] top-[71px] w-[83px] z-[2]" data-node-id="76:406" />
          <p className="absolute z-[3] font-['Satoshi:Medium',sans-serif] leading-[normal] left-[119px] not-italic text-[22px] text-white top-[74px] whitespace-nowrap" data-node-id="76:410">
            5020
          </p>
          <div className="absolute h-[16px] left-[370px] top-[465px] w-[15px]" data-node-id="76:411">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse47} />
          </div>
          <div className="absolute h-[16px] left-[360px] top-[557px] w-[15px]" data-node-id="76:412">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse47} />
          </div>
          <Component14 className="absolute z-[3] bg-white content-stretch flex items-center justify-center left-[106px] px-[24px] py-[16px] rounded-[38px] top-[139px]" />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%-228px)] text-[#1e9500] text-[38px] top-[2854px] uppercase whitespace-nowrap" data-node-id="76:414">
        <p className="leading-[normal]">YOU KNOW WHAT?</p>
      </div>
      <div className="absolute h-[202px] left-[233px] top-[2916px] w-[414px]" data-node-id="76:415">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[calc(50%-207px)] not-italic text-[22px] text-black top-[60px] w-[385px]" data-node-id="76:416">
          <p className="leading-[normal]">We offer sufficient POS financing solutions, so you could streamline your business operations more effectively without the budget limitations.</p>
        </div>
        <Component15 className="absolute bg-[#035c24] content-stretch flex items-center justify-center left-0 px-[24px] py-[16px] rounded-[38px] top-[147px]" />
      </div>
      <div className="absolute h-[362.736px] left-[233px] top-[3185px] w-[713.643px]" data-node-id="76:418">
        <div className="absolute h-[362.736px] left-0 top-0 w-[713.643px]" data-node-id="76:419">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup80} />
        </div>
        <div className="absolute contents leading-[0] left-[52px] not-italic text-white top-[48px]" data-node-id="76:422">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center left-[52px] text-[46px] top-[110px] uppercase w-[447px]" data-node-id="76:423">
            <p className="leading-[normal]">POS HARDWARE FINANCING</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center left-[52px] text-[22px] top-[257px] w-[496px]" data-node-id="76:424">
            <p className="leading-[normal]">We help businesses access modern POS hardware with low upfront costs, fast approvals, flexible payment options, and financing to support steady growth.</p>
          </div>
        </div>
        <div className="absolute contents left-[612px] top-[42px]" data-node-id="76:425" data-name="Mask group">
          <div className="absolute bg-white h-[73.333px] left-[616px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_0px] mask-size-[50.464px_68px] top-[42px] w-[46.667px]" data-node-id="76:427" style={{ maskImage: `url('${imgRectangle4053}')` }} />
        </div>
      </div>
      <div className="absolute h-[362.736px] left-[233px] top-[3568px] w-[713.643px]" data-node-id="76:428">
        <div className="absolute h-[362.736px] left-0 top-0 w-[713.643px]" data-node-id="76:429">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup82} />
        </div>
        <div className="absolute contents leading-[0] left-[53px] not-italic text-white top-[65px]" data-node-id="76:432">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center left-[53px] text-[46px] top-[127px] uppercase w-[447px]" data-node-id="76:433">
            <p className="leading-[normal]">LEASE-TO-OWN POS PROGRAMS</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center left-[53px] text-[22px] top-[272px] w-[607px]" data-node-id="76:434">
            <p className="leading-[normal]">We help scaling businesses match with suitable POS systems for small businesses to make manageable payments over time, and gain full ownership without large upfront expenses.</p>
          </div>
        </div>
        <div className="absolute contents left-[612px] top-[44px]" data-node-id="76:435" data-name="Mask group">
          <div className="absolute bg-white h-[73.333px] left-[616px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_0px] mask-size-[50.464px_68px] top-[44px] w-[46.667px]" data-node-id="76:437" style={{ maskImage: `url('${imgRectangle4053}')` }} />
        </div>
      </div>
      <div className="absolute h-[362.736px] left-[966px] top-[3185px] w-[713.643px]" data-node-id="76:438">
        <div className="absolute h-[362.736px] left-0 top-0 w-[713.643px]" data-node-id="76:439">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup81} />
        </div>
        <div className="absolute contents leading-[0] left-[71px] not-italic text-white top-[48px]" data-node-id="76:442">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center left-[71px] text-[46px] top-[110px] uppercase w-[571px]" data-node-id="76:443">
            <p className="leading-[normal]">MERCHANT TRANSACTION SUPPORT</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center left-[71px] text-[22px] top-[257px] w-[551px]" data-node-id="76:444">
            <p className="leading-[normal]">We assist merchants with payment processing, issue resolution, uptime monitoring, and hands-on support to help them keep daily transactions running smoothly across all locations.</p>
          </div>
        </div>
        <div className="absolute contents left-[637px] top-[42px]" data-node-id="76:445" data-name="Mask group">
          <div className="absolute bg-white h-[73.333px] left-[641px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_0px] mask-size-[50.464px_68px] top-[42px] w-[46.667px]" data-node-id="76:447" style={{ maskImage: `url('${imgRectangle4053}')` }} />
        </div>
      </div>
      <div className="absolute h-[362.736px] left-[966px] top-[3568px] w-[713.643px]" data-node-id="76:448">
        <div className="absolute h-[362.736px] left-0 top-0 w-[713.643px]" data-node-id="76:449">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup83} />
        </div>
        <div className="absolute contents leading-[0] left-[52px] not-italic text-white top-[65px]" data-node-id="76:452">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Black',sans-serif] justify-center left-[52px] text-[46px] top-[127px] uppercase w-[447px]" data-node-id="76:453">
            <p className="leading-[normal]">ENTERPRISE POS SOLUTIONS</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center left-[52px] text-[22px] top-[272px] w-[610px]" data-node-id="76:454">
            <p className="leading-[normal]">Access scalable POS systems for e-commerce, retail, or any other industry that can support your multi-location businesses with centralized control, advanced reporting, custom integrations, and intuitive tools.</p>
          </div>
        </div>
        <div className="absolute contents left-[637px] top-[44px]" data-node-id="76:455" data-name="Mask group">
          <div className="absolute bg-white h-[73.333px] left-[641px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_0px] mask-size-[50.464px_68px] top-[44px] w-[46.667px]" data-node-id="76:457" style={{ maskImage: `url('${imgRectangle4053}')` }} />
        </div>
      </div>
      <div className="absolute h-[1088px] left-0 top-[4028px] w-[1920px]" data-node-id="76:458">
        <div className="-translate-x-1/2 absolute bg-white h-[1088px] left-1/2 top-0 w-[1920px]" data-node-id="76:459" />
        <div className="absolute h-[377px] left-[233px] top-[54px] w-[1449px]" data-node-id="76:460">
          <div className="absolute h-[283.791px] left-0 top-0 w-[1449px]" data-node-id="76:461">
            <div className="absolute h-[283.791px] left-0 top-0 w-[876px] whitespace-nowrap" data-node-id="76:462">
              <div
                className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-45.5px)] top-[136.5px] flex flex-col justify-center text-center leading-none not-italic text-[#00511e]"
                data-node-id="76:463"
              >
                <p className="finaxis-serving-businesses-type m-0">SERVING BUSINESSES</p>
              </div>
              <p className="absolute capitalize font-['Caladea:Bold_Italic',sans-serif] italic leading-[normal] left-[calc(50%-438px)] text-[114.265px] text-black top-[152.79px]" data-node-id="76:464">
                Across Industries
              </p>
            </div>
            <div className="absolute h-[115px] leading-[0] left-[1070px] top-[93px] w-[379px]" data-node-id="76:465">
              <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center left-[calc(50%+189.5px)] not-italic text-[22px] text-black text-right top-[85px] w-[362px]" data-node-id="76:466">
                <p className="leading-[normal]">{`Need a new POS but don't have the funds?`}</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center left-[calc(50%-292.5px)] text-[#1e9500] text-[38px] top-[22px] uppercase whitespace-nowrap" data-node-id="76:467">
                <p className="leading-[normal]">You Transact, We Finance</p>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute contents left-[calc(50%+2.5px)] top-[317px]" data-node-id="76:468">
            <div className="-translate-x-1/2 absolute contents left-[calc(50%+2.5px)] top-[317px]" data-node-id="76:469">
              <div className="-translate-x-1/2 absolute backdrop-blur-[4px] bg-[#f4f6ff] h-[60px] left-[calc(50%+2.5px)] rounded-[20px] top-[317px] w-[1160px]" data-node-id="76:470" />
              <div className="-translate-x-1/2 absolute bg-white content-stretch flex gap-[10px] items-center left-[calc(50%+2.5px)] top-[327px]" data-node-id="76:471">
                <div className="bg-[#1e9501] content-stretch drop-shadow-[3px_5px_6.35px_rgba(30,149,1,0.4)] flex h-[40px] items-center justify-center px-[49px] py-[8px] relative rounded-[10px] shrink-0 w-[148px]" data-node-id="76:472">
                  <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white tracking-[0.4px] whitespace-nowrap" data-node-id="76:473">
                    <p className="leading-[normal]">Retail</p>
                  </div>
                </div>
                <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[15px] py-[8px] relative rounded-[10px] shrink-0" data-node-id="76:474">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[0.4px] whitespace-nowrap" data-node-id="76:475">
                    <p className="leading-[normal]">Restaurants</p>
                  </div>
                </div>
                <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[15px] py-[8px] relative rounded-[10px] shrink-0" data-node-id="76:476">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[0.4px] whitespace-nowrap" data-node-id="76:477">
                    <p className="leading-[normal]">Supermarkets</p>
                  </div>
                </div>
                <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[15px] py-[8px] relative rounded-[10px] shrink-0" data-node-id="76:478">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[0.4px] whitespace-nowrap" data-node-id="76:479">
                    <p className="leading-[normal]">{`Salons & Spas`}</p>
                  </div>
                </div>
                <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[15px] py-[8px] relative rounded-[10px] shrink-0" data-node-id="76:480">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[0.4px] whitespace-nowrap" data-node-id="76:481">
                    <p className="leading-[normal]">Service Industries</p>
                  </div>
                </div>
                <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[15px] py-[8px] relative rounded-[10px] shrink-0" data-node-id="76:482">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[0.4px] whitespace-nowrap" data-node-id="76:483">
                    <p className="leading-[normal]">Cannabis Dispensaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%-726px)] text-[#1e9500] text-[29px] top-[467.5px] uppercase whitespace-nowrap" data-node-id="76:484">
          <p className="leading-[normal]">We are here to help!</p>
        </div>
        <div className="absolute h-[533px] left-[233px] top-[484px] w-[1447px]" data-node-id="76:485">
          <div className="absolute contents left-0 top-0" data-node-id="76:486">
            <div className="absolute contents left-0 top-0" data-node-id="76:487">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[22px] text-black top-[176.5px] w-[753px]" data-node-id="76:488">
                <p className="leading-[35px]">
                  Match the fast pace of shoppers with quick checkout processing via advanced POS for retail. Manage store logistics, inventory, and stocking without worrying about human error and inaccuracy. Enjoy shorter queues with better reviews today!
                  <br aria-hidden="true" />
                  Access powerful features such as:
                </p>
              </div>
              <div className="absolute contents left-0 top-[289px]" data-node-id="76:489">
                <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[31px] not-italic text-[20px] text-black top-[306.5px] w-[215px]" data-node-id="76:490">
                  <p className="leading-[35px]">low-stock alerts</p>
                </div>
                <div className="absolute inset-[55.53%_98.55%_40.53%_0]" data-node-id="76:491" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                </div>
              </div>
              <div className="absolute contents left-0 top-[344px]" data-node-id="76:492">
                <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[31px] not-italic text-[20px] text-black top-[361.5px] w-[215px]" data-node-id="76:493">
                  <p className="leading-[35px]">Unified In-Store Sales</p>
                </div>
                <div className="absolute inset-[65.85%_98.55%_30.21%_0]" data-node-id="76:494" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                </div>
              </div>
              <div className="absolute contents left-0 top-[399px]" data-node-id="76:495">
                <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[31px] not-italic text-[20px] text-black top-[416.5px] w-[215px]" data-node-id="76:496">
                  <p className="leading-[35px]">Accurate Online Sales</p>
                </div>
                <div className="absolute inset-[76.17%_98.55%_19.89%_0]" data-node-id="76:497" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                </div>
              </div>
              <div className="absolute contents left-0 top-[454px]" data-node-id="76:498">
                <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[31px] not-italic text-[20px] text-black top-[471.5px] w-[230px]" data-node-id="76:499">
                  <p className="leading-[35px]">Vendor Sales Reporting</p>
                </div>
                <div className="absolute inset-[85.93%_98.55%_10.13%_0]" data-node-id="76:500" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                </div>
              </div>
              <p className="absolute capitalize font-['Caladea:Bold_Italic',sans-serif] italic leading-[normal] left-0 text-[80px] text-black top-0 whitespace-nowrap" data-node-id="76:501">{`Branding & Identity`}</p>
            </div>
          </div>
          <div className="absolute h-[473px] left-[500px] top-[60px] w-[947px]" data-node-id="76:502">
            <div className="absolute contents left-[569px] top-0" data-node-id="76:503">
              <div className="absolute bg-[#00280f] h-[472.5px] left-[569px] rounded-[10px] top-0 w-[378px]" data-node-id="76:504" data-name="Retail_CardRow2_02 2" />
              <div className="absolute h-[472.5px] left-[569px] mix-blend-luminosity rounded-[10px] top-0 w-[378px]" data-node-id="76:505" data-name="Retail_CardRow2_02 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgRetailCardRow2021} />
              </div>
            </div>
            <div className="absolute contents left-[289px] top-0" data-node-id="76:506">
              <div className="absolute bg-[#d9d9d9] h-[220px] left-[289px] rounded-[10px] shadow-[10px_12px_20.1px_0px_rgba(0,0,0,0.15)] top-0 w-[243px]" data-node-id="76:507" />
              <div className="absolute bg-white h-[220px] left-[289px] rounded-[10px] top-0 w-[243px]" data-node-id="76:508" data-name="1230 1" />
              <div className="absolute h-[133px] left-[289px] top-[44px] w-[243px]" data-node-id="164:469" data-name="Gif-1-2-1024x562 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGif121024X5621} />
              </div>
            </div>
            <div className="absolute h-[220px] left-[226px] rounded-[10px] shadow-[10px_12px_20.1px_0px_rgba(0,0,0,0.15)] top-[253px] w-[306px]" data-node-id="76:509">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle1304} />
            </div>
            <div className="absolute backdrop-blur-[6.5px] bg-[rgba(255,255,255,0.5)] bottom-[15px] drop-shadow-[0px_0px_30px_rgba(0,0,0,0.05)] h-[128px] right-[670px] rounded-[20px] w-[277px]" data-node-id="76:510" data-name="Overlay+Shadow+OverlayBlur">
              <div className="-translate-y-1/2 absolute left-[20px] size-[65px] top-[calc(50%-0.12px)]" data-node-id="76:511" data-name="SVG">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSvg} />
              </div>
              <div className="absolute contents font-['Satoshi:Medium',sans-serif] leading-[0] left-[115px] not-italic text-[#030f3a] top-[15px]" data-node-id="76:518">
                <div className="-translate-y-1/2 absolute flex flex-col h-[60px] justify-center left-[191.22px] text-[55.8px] top-[48px] w-[66.26px]" data-node-id="76:519">
                  <p className="leading-[60px]">k+</p>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-4.5px)] text-[60px] text-center top-[48px] whitespace-nowrap" data-node-id="76:520">
                  <p className="leading-[66px]">8</p>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[66px] justify-center left-[calc(50%+34.03px)] text-[60px] text-center top-[48px] w-[38.84px]" data-node-id="76:521">
                  <p className="leading-[66px]">0</p>
                </div>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-[115px] not-italic text-[18px] text-black top-[96px] whitespace-nowrap" data-node-id="76:522">
                <p className="leading-[29.25px]">Retailers</p>
              </div>
            </div>
          </div>
        </div>
        <Component16 className="absolute bg-[#00511e] content-stretch flex items-center justify-center left-[233px] px-[24px] py-[16px] rounded-[38px] top-[1002px]" />
      </div>
      <div
        id="finaxis-how-it-works"
        className="absolute h-[734px] scroll-mt-[150px] left-[99px] top-[5197px] w-[1723px]"
        data-node-id="76:524"
      >
        <div className="absolute h-[308.047px] left-[260px] top-0 w-[1322px]" data-node-id="76:525">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%+381px)] text-[#1e9500] text-[38px] top-[22px] uppercase whitespace-nowrap" data-node-id="76:526">
            <p className="leading-[normal]">How It Works?</p>
          </div>
          <div className="-translate-x-1/2 absolute h-[201.735px] left-[calc(50%-59.6px)] top-[106.31px] w-[1202.802px]" data-node-id="76:527" data-name="SIMPLE, TRANSPARENT, FAST">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSimpleTransparentFast} />
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute capitalize flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%-228.5px)] text-[95.076px] text-black text-center top-[88.5px] whitespace-nowrap" data-node-id="76:551">
            <p className="leading-[normal]">POS Financing Made</p>
          </div>
        </div>
        <div className="absolute h-[257px] left-0 top-[360px] w-[1723px]" data-node-id="76:552">
          <div className="absolute h-[257px] left-0 top-0 w-[392px]" data-node-id="76:553">
            <div className="-translate-x-1/2 absolute h-[111px] left-[calc(50%-160.08px)] top-[18px] w-[71.842px]" data-node-id="76:554" data-name="01">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={img01} />
            </div>
            <div className="absolute h-[257px] left-[66px] top-0 w-[326px]" data-node-id="76:557" data-name="Component 6">
              <div className="absolute bg-white border border-[#1e9501] border-solid inset-0 rounded-[20px] shadow-[4px_8px_29px_0px_rgba(0,0,0,0.15)]" data-node-id="76:558" />
              <p className="absolute font-['Satoshi:Black',sans-serif] inset-[9.73%_5.52%_80.93%_7.36%] leading-[normal] not-italic text-[18px] text-black tracking-[0.36px] whitespace-nowrap" data-node-id="76:559">
                CHOOSE YOUR POS SOLUTION
              </p>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[90px] tracking-[0.36px] w-[277px]" data-node-id="76:560">
                <p className="leading-[normal]">Select the POS devices you need.</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[149px] tracking-[0.36px] w-[283px]" data-node-id="76:561">
                <p className="leading-[normal]">We guide you through the decision-making process.</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[209px] tracking-[0.36px] w-[283px]" data-node-id="76:562">
                <p className="leading-[normal]">{` We help you match up with the right point-of-sale.`}</p>
              </div>
              <div className="absolute h-0 left-[326px] top-[145px] w-[1009.5px]" data-node-id="76:563">
                <div className="absolute inset-[-1px_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector6} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[257px] left-[432px] top-0 w-[403px]" data-node-id="76:564">
            <div className="-translate-x-1/2 absolute h-[111px] left-[calc(50%-156.73px)] top-[18px] w-[89.54px]" data-node-id="76:565" data-name="02">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={img02} />
            </div>
            <div className="absolute h-[257px] left-[77px] top-0 w-[326px]" data-node-id="76:568" data-name="Component 17">
              <div className="absolute bg-white border border-[#1e9501] border-solid inset-0 rounded-[20px] shadow-[4px_8px_29px_0px_rgba(0,0,0,0.15)]" data-node-id="76:569" />
              <p className="absolute font-['Satoshi:Black',sans-serif] inset-[9.73%_6.75%_80.93%_7.36%] leading-[normal] not-italic text-[18px] text-black tracking-[0.36px] whitespace-nowrap" data-node-id="76:570">
                SELECT A FINANCING OPTION
              </p>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[90px] tracking-[0.36px] w-[277px]" data-node-id="76:571">
                <p className="leading-[normal]">Flexible POS financing and lease-to-own options available</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[149px] tracking-[0.36px] w-[260px]" data-node-id="76:572">
                <p className="leading-[normal]">Plans designed to support healthy cash flow and payoffs</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[209px] tracking-[0.36px] w-[260px]" data-node-id="76:573">
                <p className="leading-[normal]">No unnecessary complexity or hidden steps and fees</p>
              </div>
            </div>
          </div>
          <div className="absolute h-[257px] left-[875px] top-0 w-[402px]" data-node-id="76:574">
            <div className="-translate-x-1/2 absolute h-[111px] left-[calc(50%-156.23px)] top-[18px] w-[89.54px]" data-node-id="76:575" data-name="03">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={img03} />
            </div>
            <div className="absolute h-[257px] left-[76px] top-0 w-[326px]" data-node-id="76:578" data-name="Component 18">
              <div className="absolute bg-white border border-[#1e9501] border-solid inset-0 rounded-[20px] shadow-[4px_8px_29px_0px_rgba(0,0,0,0.15)]" data-node-id="76:579" />
              <p className="absolute font-['Satoshi:Black',sans-serif] inset-[9.73%_20.55%_80.93%_7.36%] leading-[normal] not-italic text-[18px] text-black tracking-[0.36px] whitespace-nowrap" data-node-id="76:580">
                GET APPROVED QUICKLY
              </p>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[89px] tracking-[0.36px] w-[242px]" data-node-id="76:581">
                <p className="leading-[normal]">Fast review and approval process</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[149px] tracking-[0.36px] w-[260px]" data-node-id="76:582">
                <p className="leading-[normal]">Minimal paperwork with transparent, clear terms</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[209px] tracking-[0.36px] w-[260px]" data-node-id="76:583">
                <p className="leading-[normal]">Built for merchants who value scaling and fast processing</p>
              </div>
            </div>
          </div>
          <div className="absolute h-[257px] left-[1317px] top-0 w-[406px]" data-node-id="76:584">
            <div className="-translate-x-1/2 absolute h-[111px] left-[calc(50%-154.88px)] top-[18px] w-[96.237px]" data-node-id="76:585" data-name="04">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={img04} />
            </div>
            <div className="absolute h-[257px] left-[80px] top-0 w-[326px]" data-node-id="76:588" data-name="Component 19">
              <div className="absolute bg-white border border-[#1e9501] border-solid inset-0 rounded-[20px] shadow-[4px_8px_29px_0px_rgba(0,0,0,0.15)]" data-node-id="76:589" />
              <p className="absolute font-['Satoshi:Black',sans-serif] inset-[9.73%_19.33%_80.93%_7.36%] leading-[normal] not-italic text-[18px] text-black tracking-[0.36px] whitespace-nowrap" data-node-id="76:590">
                TRANSACT CONFIDENTLY
              </p>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[89px] tracking-[0.36px] w-[230px]" data-node-id="76:591">
                <p className="leading-[normal]">Get your hands on the chosen POS solution</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[149px] tracking-[0.36px] w-[260px]" data-node-id="76:592">
                <p className="leading-[normal]">Accept payments smoothly and securely</p>
              </div>
              <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[24px] not-italic text-[18px] text-black top-[209px] tracking-[0.36px] w-[260px]" data-node-id="76:593">
                <p className="leading-[normal]">Focus on growth without worry about the payoff</p>
              </div>
            </div>
          </div>
        </div>
        <Component17 className="-translate-x-1/2 absolute bg-[#035c24] content-stretch flex items-center justify-center left-[calc(50%-0.5px)] px-[24px] py-[16px] rounded-[38px] top-[679px]" />
      </div>
      <div className="absolute left-[953px] top-[6026px] h-[879px] w-[727px] overflow-hidden rounded-[20px]" data-node-id="76:595">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute right-[24px] top-[26px] h-[826px] w-[204px] rounded-[20px] bg-[#00511e]" data-node-id="76:596" />
        <div className="typography-procerus-display -translate-y-1/2 absolute top-[136.5px] left-0 right-0 flex items-center whitespace-nowrap px-6 pr-[260px] text-white">
          <p className="m-0 p-0 leading-[inherit]">FINANCIAL</p>
        </div>
        <div className="typography-procerus-display -translate-y-1/2 absolute top-[329.5px] left-0 right-0 flex items-center whitespace-nowrap px-6 pr-[260px] text-white">
          <p className="m-0 p-0 leading-[inherit]">SOLUTIONS</p>
        </div>
        <div className="typography-procerus-display -translate-y-1/2 absolute top-[522.5px] left-0 right-0 flex items-center whitespace-nowrap px-6 pr-[260px] text-white">
          <p className="m-0 p-0 leading-[inherit]">DESIGNED</p>
        </div>
        <div className="typography-procerus-display -translate-y-1/2 absolute top-[715.5px] left-0 right-0 flex items-center whitespace-nowrap px-6 pr-[260px] text-white">
          <p className="m-0 whitespace-pre p-0 leading-[inherit]">{`FOR  POS`}</p>
        </div>
      </div>
      <div className="absolute flex h-[122.146px] items-center justify-center left-[1313px] top-[6693.68px] w-[123.62px]">
        <div className="flex-none rotate-[42.66deg]">
          <div className="h-[74.224px] relative w-[99.704px]" data-node-id="76:601">
            <div className="absolute inset-[-4.04%_-3.01%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup226} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[879px] left-[233px] top-[6026px] w-[683px]" data-node-id="76:604">
        <div className="absolute contents left-0 top-0" data-node-id="76:605">
          <div className="absolute bg-white border-2 border-[#1e9501] border-solid h-[286px] left-0 rounded-[20px] shadow-[-6px_7px_23.7px_0px_rgba(93,93,93,0.25)] top-[593px] w-[683px]" data-node-id="76:606" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold',sans-serif] justify-center leading-[0] left-[33px] not-italic text-[24px] text-black top-[636.5px] w-[428px]" data-node-id="76:607">
            <p className="leading-[35px]">{`Worried about hefty payoffs? Don't be!`}</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Italic',sans-serif] italic justify-center leading-[0] left-[33px] text-[24px] text-black top-[715.5px] w-[631px]" data-node-id="76:608">
            <p className="leading-[35px]">Prismatechinc understands the importance of the point of sale in scaling businesses, which is why we offer reliable POS financing options available on a monthly or transaction-based basis.</p>
          </div>
          <div className="absolute h-[558px] left-0 top-0 w-[683px]" data-node-id="76:609">
            <div className="absolute inset-[-1.7%_-1.54%_-4.21%_-3.29%]">
              <img alt="" className="block max-w-none size-full" height="591" src={imgRectangle4079} width="716" />
            </div>
          </div>
          <Component18 className="absolute bg-[#035c24] content-stretch flex items-center justify-center left-[28px] px-[24px] py-[16px] rounded-[38px] top-[785px]" />
          <Component19 className="absolute bg-[#013a16] content-stretch flex items-center justify-center left-[322px] px-[24px] py-[16px] rounded-[38px] top-[785px]" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-gradient-to-r from-white h-[695px] left-1/2 to-[436.2%] to-[rgba(19,95,0,0.5)] top-[6984px] w-[1920px]" data-node-id="76:612" />
      <div
        id="finaxis-contact"
        className="absolute h-[147px] scroll-mt-[150px] left-[1171px] top-[7089.57px] w-[509px]"
        data-node-id="76:613"
      >
        <div className="-translate-y-1/2 absolute flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%-455.5px)] text-[#1e9500] text-[38px] top-[102px] uppercase whitespace-nowrap" data-node-id="76:614">
          <p className="leading-[normal]">Contact us to get a better POS today!</p>
        </div>
        <p className="-translate-x-full absolute font-['Satoshi:Regular',sans-serif] leading-[1.27] left-[calc(50%+254.5px)] not-italic text-[22px] text-black text-right top-[0.43px] w-[469px]" data-node-id="76:615">{`We'd love to hear from you! Have questions, we’ve got all the answers!`}</p>
      </div>
      <div className="absolute h-[283px] left-[232px] top-[7323px] w-[1415px]" data-node-id="76:616">
        <div className="absolute bg-white border-[#3e3e3e] border-[0.5px] border-solid h-[124px] left-0 rounded-[500px] top-0 w-[575px]" data-node-id="76:617" />
        <div className="absolute bg-white border-[#3e3e3e] border-[0.5px] border-solid h-[124px] left-0 rounded-[500px] top-[159px] w-[575px]" data-node-id="76:618" />
        <div className="absolute bg-white border-[#3e3e3e] border-[0.5px] border-solid h-[124px] left-[584px] rounded-[500px] top-0 w-[575px]" data-node-id="76:619" />
        <div className="absolute bg-white border-[#3e3e3e] border-[0.5px] border-solid h-[124px] left-[584px] rounded-[500px] top-[159px] w-[575px]" data-node-id="76:620" />
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[1.27] left-[calc(50%-667.5px)] not-italic text-[#929292] text-[22px] top-[48px] whitespace-nowrap" data-node-id="76:621">{`Full Name `}</p>
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[1.27] left-[calc(50%-76.5px)] not-italic text-[#929292] text-[22px] top-[48px] whitespace-nowrap" data-node-id="76:622">
          Phone No
        </p>
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[1.27] left-[calc(50%-667.5px)] not-italic text-[#929292] text-[22px] top-[207px] whitespace-nowrap" data-node-id="76:623">
          E-mail
        </p>
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[1.27] left-[calc(50%-76.5px)] not-italic text-[#929292] text-[22px] top-[207px] whitespace-nowrap" data-node-id="76:624">
          Message
        </p>
        <Component22 className="absolute bg-[#035c24] content-stretch flex h-[65px] items-center justify-center left-[1188px] px-[24px] py-[16px] rounded-[38px] top-[104px] w-[227px]" />
      </div>
      <div className="-translate-x-1/2 absolute h-[220.847px] left-[calc(50%-530px)] top-[7043.39px] w-[394px]" data-node-id="76:626" data-name="YOU SELL">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgYouSell} />
      </div>
      <div className="absolute h-[560px] left-[-206px] top-[7628px] w-[1887.447px]" data-node-id="76:634">
        <div className="absolute contents left-0 top-0" data-node-id="76:635">
          <div className="absolute flex h-[261.358px] items-center justify-center left-[367.21px] top-[178.97px] w-[261.597px]">
            <div className="-scale-y-100 flex-none rotate-[-136.24deg]">
              <div className="h-[181.025px] w-[188.847px] bg-[rgba(30,149,0,0.05)]" data-node-id="76:636" />
            </div>
          </div>
          <div className="absolute flex h-[261.358px] items-center justify-center left-[183.61px] top-[359.44px] w-[261.597px]">
            <div className="-scale-y-100 flex-none rotate-[-136.24deg]">
              <div className="h-[181.025px] w-[188.847px] bg-[rgba(203,213,225,0.35)]" data-node-id="76:637" />
            </div>
          </div>
          <div className="absolute flex h-[261.358px] items-center justify-center left-[183.61px] top-0 w-[261.597px]">
            <div className="-scale-y-100 flex-none rotate-[-136.24deg]">
              <div className="h-[181.025px] w-[188.847px] bg-[rgba(203,213,225,0.35)]" data-node-id="76:638" />
            </div>
          </div>
          <div className="absolute flex h-[261.358px] items-center justify-center left-0 top-[180.47px] w-[261.597px]">
            <div className="-scale-y-100 flex-none rotate-[-136.24deg]">
              <div className="h-[181.025px] w-[188.847px] bg-[rgba(203,213,225,0.35)]" data-node-id="76:639" />
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex font-['Satoshi:Medium',sans-serif] gap-[45px] items-center leading-[normal] left-[444px] not-italic text-[22px] text-black top-[500px] whitespace-nowrap" data-node-id="76:640">
          <p className="relative shrink-0" data-node-id="76:641">
            POS Solutions
          </p>
          <p className="relative shrink-0" data-node-id="76:642">
            About Us
          </p>
          <p className="relative shrink-0" data-node-id="76:643">
            Industries We Serve
          </p>
          <p className="relative shrink-0" data-node-id="76:644">
            How It Works
          </p>
          <p className="relative shrink-0" data-node-id="76:645">
            Contact Us
          </p>
        </div>
        <div className="absolute left-[444px] top-[134px] h-[147px] w-[1443.447px]" data-node-id="76:648">
            <div className="-translate-y-1/2 absolute capitalize flex flex-col font-normal font-['Clash Display',sans-serif] justify-center leading-[0] left-[calc(50%-721.72px)] not-italic text-[47px] text-black top-1/2 w-[232px]" data-node-id="76:649">
              <p className="leading-[1.04]">POS Financing Transact</p>
            </div>
            <div className="absolute contents left-[1193px] top-[93px]" data-node-id="76:650">
              <div className="absolute contents left-[1261.32px] top-[93px]" data-node-id="76:651">
                <div className="absolute flex items-center justify-center left-[1261.32px] size-[45.391px] top-[93px]">
                  <div className="-scale-y-100 flex-none">
                    <div className="backdrop-blur-[12px] bg-black border-[1.5px] border-solid border-white rounded-[500px] size-[45.391px]" data-node-id="76:652" />
                  </div>
                </div>
                <div className="absolute left-[1273.21px] overflow-clip size-[21.615px] top-[104.89px]" data-node-id="76:653" data-name="lets-icons:insta">
                  <div className="absolute inset-[12.5%]" data-node-id="76:654" data-name="Group">
                    <div className="absolute inset-[-6.17%]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute contents left-[1193px] top-[93px]" data-node-id="76:658">
                <div className="absolute flex items-center justify-center left-[1193px] size-[45.391px] top-[93px]">
                  <div className="-scale-y-100 flex-none">
                    <div className="backdrop-blur-[12px] bg-black border-[1.5px] border-solid border-white rounded-[500px] size-[45.391px]" data-node-id="76:659" />
                  </div>
                </div>
                <div className="absolute left-[1204.89px] size-[21.615px] top-[104.89px]" data-node-id="76:660" data-name="ic:outline-facebook">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcOutlineFacebook} />
                </div>
              </div>
              <div className="absolute contents left-[1330.06px] top-[93px]" data-node-id="76:662">
                <div className="absolute contents left-[1330.06px] top-[93px]" data-node-id="76:663">
                  <div className="absolute flex items-center justify-center left-[1330.06px] size-[45.391px] top-[93px]">
                    <div className="-scale-y-100 flex-none">
                      <div className="backdrop-blur-[12px] bg-black border-[1.5px] border-solid border-white rounded-[500px] size-[45.391px]" data-node-id="76:664" />
                    </div>
                  </div>
                  <div className="absolute left-[1341.94px] size-[21.615px] top-[104.89px]" data-node-id="76:665" data-name="lets-icons:insta" />
                </div>
                <div className="absolute left-[1341.06px] size-[24px] top-[103px]" data-node-id="76:666" data-name="ic:outline-whatsapp">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcOutlineWhatsapp} />
                </div>
              </div>
              <div className="absolute contents left-[1398.06px] top-[93px]" data-node-id="76:668">
                <div className="absolute contents left-[1398.06px] top-[93px]" data-node-id="76:669">
                  <div className="absolute flex items-center justify-center left-[1398.06px] size-[45.391px] top-[93px]">
                    <div className="-scale-y-100 flex-none">
                      <div className="backdrop-blur-[12px] bg-black border-[1.5px] border-solid border-white rounded-[500px] size-[45.391px]" data-node-id="76:670" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[1413.06px] size-[16px] top-[107px]" data-node-id="76:671" data-name="devicon:twitter">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDeviconTwitter} />
                </div>
              </div>
            </div>
          </div>
        <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-[calc(50%+821.28px)] not-italic text-[#1e9501] text-[47px] top-[calc(50%+228px)] whitespace-nowrap" data-node-id="76:673">
          <p className="leading-[1.04]">2026</p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute capitalize flex flex-col font-['Caladea:Bold_Italic',sans-serif] italic justify-center leading-[0] left-[calc(50%-484px)] text-[95.076px] text-black text-center top-[7248.07px] whitespace-nowrap" data-node-id="76:674">
        <p className="leading-[normal]">We Support</p>
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%+594.49px)] top-[6081px]" data-node-id="76:675">
        <div className="-translate-x-1/2 absolute h-[179.38px] left-[calc(50%+594.89px)] top-[6081px] w-[141.726px]" data-node-id="76:676" data-name="STA">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSta} />
        </div>
        <div className="-translate-x-1/2 absolute h-[179.38px] left-[calc(50%+597.36px)] top-[6275px] w-[149.22px]" data-node-id="76:680" data-name="NDA">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNda} />
        </div>
        <div className="-translate-x-1/2 absolute h-[181.77px] left-[calc(50%+594.38px)] top-[6472px] w-[154.755px]" data-node-id="76:684" data-name="RDI">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRdi} />
        </div>
        <div className="-translate-x-1/2 absolute h-[179.38px] left-[calc(50%+594.47px)] top-[6669px] w-[154.579px]" data-node-id="76:688" data-name="ZED">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgZed} />
        </div>
      </div>
      {/* Brand strip — tightened height vs Figma to reduce footer dead space */}
      <div
        className="absolute left-[242px] top-[7920px] z-10 flex h-[180px] w-[1442px] rotate-0 items-center justify-center opacity-100"
        data-node-id="76:646"
      >
        <img
          alt="PRISMA"
          className="h-full w-full max-h-full object-contain object-center"
          data-node-id="76:647"
          src="/Group%2018513.png"
        />
      </div>
    </div>
  );
}