import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Bot, Brain, ChevronDown, Figma, Gamepad2 } from "lucide-react";

import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import rocket from "../assets_26/images/shared/rocket.svg";
import { workshops, workshopsMeta } from "../data/workshops";

const ICONS = { figma: Figma, brain: Brain, gamepad: Gamepad2, bot: Bot };

// Each accent colors the card's border, its glow, and its round icon.
const ACCENTS = {
  purple: {
    card: "border-purple-medium/80 shadow-[0_4px_0_0_rgb(115_83_186/0.9),0_12px_30px_-8px_rgb(115_83_186/0.55)]",
    icon: "bg-purple-deep text-lavender-pale",
  },
  pink: {
    card: "border-pink-light/70 shadow-[0_4px_0_0_rgb(239_195_245/0.75),0_12px_30px_-8px_rgb(239_195_245/0.35)]",
    icon: "bg-pink-light text-navy",
  },
  yellow: {
    card: "border-yellow/70 shadow-[0_4px_0_0_rgb(255_194_123/0.8),0_12px_30px_-8px_rgb(255_194_123/0.35)]",
    icon: "bg-yellow text-navy",
  },
  lavender: {
    card: "border-lavender-pale/60 shadow-[0_4px_0_0_rgb(236_227_255/0.7),0_12px_30px_-8px_rgb(236_227_255/0.3)]",
    icon: "bg-lavender-pale text-navy",
  },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow";

/* A host's photo, or their initial when no photo has been added yet. */
function Avatar({ host, alt = "", className }) {
  if (host.img) {
    return <img src={host.img} alt={alt} className={`object-cover ${className}`} />;
  }
  return (
    <span
      aria-hidden
      className={`grid place-items-center bg-purple-medium font-special-gothic font-bold text-lavender-pale ${className}`}
    >
      {host.name.charAt(0)}
    </span>
  );
}

function hostedBy(hosts) {
  const firstNames = hosts.map((h) => h.name.split(" ")[0]);
  if (firstNames.length < 2) return firstNames[0] ?? "";
  return `${firstNames.slice(0, -1).join(", ")} & ${firstNames[firstNames.length - 1]}`;
}

/* Every closed card should be the same size. This finds the tallest title and the
   tallest blurb across all the cards; each card then reserves that much room. */
function useMatchHeights() {
  const nodes = useRef(new Set());
  const observer = useRef(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    let tallest = 0;
    nodes.current.forEach((el) => {
      tallest = Math.max(tallest, Math.ceil(el.getBoundingClientRect().height));
    });
    setHeight(tallest);
  }, []);

  useEffect(() => {
    observer.current = new ResizeObserver(measure);
    nodes.current.forEach((el) => observer.current.observe(el));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.current.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const register = useCallback((el) => {
    if (!el) return;
    nodes.current.add(el);
    observer.current?.observe(el);
  }, []);

  return [register, height];
}

function WorkshopCard({ workshop, isOpen, onToggle, order, registerTitle, titleHeight, registerSummary, summaryHeight }) {
  const detailsId = useId();
  const Icon = ICONS[workshop.icon] ?? Figma;
  const accent = ACCENTS[workshop.accent] ?? ACCENTS.purple;

  return (
    <article
      style={{ order }}
      className={`rounded-[1.75rem] border-[1.5px] bg-[#1b1b3f] ${accent.card}`}
    >
      {/* header: this is the button that opens the card */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        className={`group block w-full rounded-t-[1.75rem] px-5 pb-3 pt-5 text-left md:px-6 md:pt-6 ${focusRing}`}
      >
        <span
          className="flex items-center gap-3 md:gap-4"
          style={{ minHeight: titleHeight || undefined }}
        >
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full md:h-11 md:w-11 ${accent.icon}`}>
            <Icon aria-hidden size={22} strokeWidth={1.75} />
          </span>
          <h2
            ref={registerTitle}
            className="min-w-0 flex-1 font-special-gothic text-[1.15rem] font-bold leading-6 text-lavender-pale md:flex-initial md:text-[1.25rem]"
          >
            {workshop.title}
          </h2>
          <ChevronDown
            aria-hidden
            size={22}
            className={`shrink-0 text-lavender-pale/80 transition-[transform,color] duration-300 group-hover:text-yellow motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* closed: short blurb + who is hosting */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="overflow-hidden" inert={isOpen}>
          <div className="px-5 pb-5 md:px-6" style={{ minHeight: summaryHeight ? summaryHeight + 20 : undefined }}>
            <p
              ref={registerSummary}
              className="font-quicksand text-[0.875rem] font-medium leading-6 text-lavender-pale/90 md:text-[0.9rem]"
            >
              {workshop.summary}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 border-t border-white/10 px-5 py-3.5">
            <span className="flex">
              {workshop.hosts.map((host, i) => (
                <Avatar
                  key={host.name}
                  host={host}
                  className={`h-9 w-9 rounded-full ring-2 ring-[#1b1b3f] ${i > 0 ? "-ml-2.5" : ""}`}
                />
              ))}
            </span>
            <p className="font-quicksand text-[0.875rem] font-bold leading-5 text-pink-light">
              <span className="block md:inline">Hosted by </span>
              <span className="block md:inline">{hostedBy(workshop.hosts)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* open: full description + host bios */}
      <div
        id={detailsId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <div className="px-5 pb-6 md:px-6">
            <p className="font-quicksand text-[0.875rem] font-medium leading-6 text-lavender-pale/90 md:text-[0.9rem]">
              {workshop.description}
            </p>

            <p className="mt-5 font-quicksand text-[0.95rem] font-bold text-lavender-pale">Workshop Hosts:</p>

            <div className="mt-4 flex flex-col gap-5">
              {workshop.hosts.map((host, i) => (
                <div key={host.name} className={`flex items-start gap-4 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
                  <Avatar
                    host={host}
                    alt={host.name}
                    className="h-[5rem] w-[5rem] shrink-0 rounded-[1.1rem] text-[1.75rem] md:h-[5.5rem] md:w-[5.5rem]"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-quicksand text-[0.9rem] font-bold text-lavender-pale">{host.name}</h3>
                    <p className="mt-1 font-quicksand text-[0.8rem] font-medium leading-[1.35rem] text-lavender-pale/85">
                      {host.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Workshops() {
  const [openItems, setOpenItems] = useState(() => new Set());
  const [registerTitle, titleHeight] = useMatchHeights();
  const [registerSummary, summaryHeight] = useMatchHeights();

  const toggle = (index) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  // Desktop: two columns that grow independently, so opening a card only moves
  // the cards under it. Phone: one column in the original order (via `order`).
  const columns = [
    workshops.map((w, i) => ({ w, i })).filter(({ i }) => i % 2 === 0),
    workshops.map((w, i) => ({ w, i })).filter(({ i }) => i % 2 === 1),
  ];

  return (
    <div className="relative -mx-[5.5556%] overflow-hidden bg-navy">
      {/* same star + constellation background as the home page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{ backgroundImage: `url(${frameBg})`, backgroundRepeat: "repeat", backgroundSize: "56rem auto" }}
      />

      <section className="relative px-[6%] pb-[3rem] pt-[1.5rem] md:py-[4rem]">
        <header className="flex flex-col items-center gap-[1.25rem] text-center md:items-start md:gap-[2rem] md:text-left">
          <img src={rocket} alt="" aria-hidden className="w-[6rem] select-none md:hidden" />
          <p className="font-quicksand text-[0.85rem] font-bold uppercase tracking-[0.15em] text-yellow md:text-[0.95rem]">
            {workshopsMeta.eyebrow}
          </p>
          <h1 className={`${styles.sectionHeading} -mt-[1rem]`}>Workshops</h1>
          <p className="font-quicksand text-[0.95rem] font-bold leading-relaxed text-pink-light md:text-[1.15rem]">
            {workshopsMeta.intro}
          </p>
        </header>

        <div className="mx-auto mt-[2rem] flex max-w-[34rem] flex-col gap-6 md:mt-[3rem] md:grid md:max-w-[64rem] md:grid-cols-2 md:items-start md:gap-x-12">
          {columns.map((items, col) => (
            <div key={col} className="contents md:flex md:flex-col md:gap-6">
              {items.map(({ w, i }) => (
                <WorkshopCard
                  key={w.title}
                  workshop={w}
                  order={i}
                  registerTitle={registerTitle}
                  titleHeight={titleHeight}
                  registerSummary={registerSummary}
                  summaryHeight={summaryHeight}
                  isOpen={openItems.has(i)}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Workshops;