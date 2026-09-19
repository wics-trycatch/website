import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./Home.module.css";
import rocket from "../assets_26/images/shared/rocket.svg";
import { scheduleData, scheduleMeta } from "../data/schedule";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const CIRCLE_STYLES = {
  deep: "bg-purple-deep ring-1 ring-black/50 shadow-[0_0_14px_2px_rgb(73_42_141/0.55)]",
  medium: "bg-purple-medium shadow-[0_0_16px_3px_rgb(115_83_186/0.5)]",
  pink: "bg-pink-light shadow-[0_0_22px_6px_rgb(239_195_245/0.5)]",
  yellow: "bg-yellow shadow-[0_0_22px_6px_rgb(255_194_123/0.5)]",
};

const DASHED_LINE = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, rgb(236 227 255 / 0.45) 0 4px, transparent 4px 10px)",
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[1.125rem] w-[1.125rem] shrink-0 text-pink-light">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
      />
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow rounded-sm";

function defaultMapUrl(location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`SFU Burnaby ${location}`)}`;
}

/* ------------------------------------------------------------------ */
/* One timeline stop                                                   */
/* ------------------------------------------------------------------ */

function ScheduleItem({ item, hasLine, hideLineOnDesktop, isOpen, onToggle, circleRef, itemRef }) {
  const panelId = useId();
  const { time, title, location, description, color, rocket: showRocket } = item;

  const mapUrl = item.mapUrl === undefined ? defaultMapUrl(location) : item.mapUrl;
  const canExpand = Boolean(description);

  const locationClasses = `underline decoration-pink-light/60 underline-offset-4 transition-colors hover:text-yellow hover:decoration-yellow ${focusRing}`;

  return (
    <li ref={itemRef} className="relative flex gap-4 pb-9 lg:gap-6">
      {hasLine && (
        <span
          aria-hidden
          className={`absolute bottom-0 left-[17px] top-4 w-[2px] ${hideLineOnDesktop ? "lg:hidden" : ""}`}
          style={DASHED_LINE}
        />
      )}

      {/* timeline circle (+ rocket) */}
      <div className="relative z-10 -mt-1 shrink-0">
        <span
          ref={circleRef}
          aria-hidden
          className={`block h-9 w-9 rounded-full ${CIRCLE_STYLES[color] ?? CIRCLE_STYLES.medium}`}
        />
        {showRocket && (
          <img
            src={rocket}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[1.1rem] z-20 w-[2.7rem] max-w-none -translate-x-1/2 select-none"
          />
        )}
      </div>

      {/* text */}
      <div className="min-w-0 flex-1">
        <p className="font-quicksand text-[0.95rem] font-bold leading-5 text-lavender-pale/80">{time}</p>

        {canExpand ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className={`group mt-0.5 flex w-full items-center justify-between gap-3 text-left font-special-gothic text-[1.125rem] font-bold leading-6 [word-spacing:0.12em] text-lavender-pale transition-colors hover:text-yellow lg:justify-start ${focusRing}`}
          >
            <span className="flex-1 lg:flex-initial">{title}</span>
            <ChevronDown
              aria-hidden
              size={22}
              className={`shrink-0 text-lavender-pale/80 transition-[transform,color] duration-300 group-hover:text-yellow motion-reduce:transition-none ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <h3 className="mt-0.5 font-special-gothic text-[1.125rem] font-bold leading-6 [word-spacing:0.12em] text-lavender-pale">{title}</h3>
        )}

        {location && (
          <div className="mt-2 flex items-center gap-2 font-quicksand text-[0.95rem] font-bold text-pink-light">
            <PinIcon />
            {mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={locationClasses}>
                {location}
              </a>
            ) : (
              <button type="button" onClick={onToggle} disabled={!canExpand} className={`${locationClasses} text-left`}>
                {location}
              </button>
            )}
          </div>
        )}

        {canExpand && (
          <div
            id={panelId}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden" inert={!isOpen}>
              <p className="max-w-[23rem] pt-3 font-quicksand text-[0.95rem] font-medium leading-6 text-lavender-pale/90">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Schedule() {
  const [openItems, setOpenItems] = useState(() => new Set());
  const [connectorPath, setConnectorPath] = useState("");

  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const itemRefs = useRef([]);

  // Desktop: first half of the day on the left, second half on the right.
  const split = Math.ceil(scheduleData.length / 2);
  const columns = [scheduleData.slice(0, split), scheduleData.slice(split)];

  const toggle = (index) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  // Draws the dashed curve that carries the left column into the right one.
  // Positions are measured, so it keeps up when dropdowns open or the window resizes.
  const measure = useCallback(() => {
    const box = containerRef.current;
    const from = circleRefs.current[split - 1];
    const to = circleRefs.current[split];
    const lastLeft = itemRefs.current[split - 1];

    if (!box || !from || !to || !lastLeft || !window.matchMedia("(min-width: 1024px)").matches) {
      setConnectorPath("");
      return;
    }

    const b = box.getBoundingClientRect();
    const f = from.getBoundingClientRect();
    const t = to.getBoundingClientRect();
    const l = lastLeft.getBoundingClientRect();

    const x1 = f.left + f.width / 2 - b.left;
    const y1 = f.top + f.height / 2 - b.top;
    const x2 = t.left + t.width / 2 - b.left;
    const y2 = t.top + t.height / 2 - b.top;

    // Drop straight down past the last item in the left column (so the curve
    // never crosses its text, even with the dropdown open), then swing across.
    const lowest = l.bottom - b.top + 4;
    const startCurve = l.bottom - b.top - 28;
    const depth = Math.max((lowest - 0.125 * (startCurve + y2)) / 0.75, startCurve + 20);

    setConnectorPath(
      `M ${x1} ${y1} L ${x1} ${startCurve} C ${x1 + 30} ${depth}, ${x2 - 22} ${depth}, ${x2} ${y2}`
    );
  }, [split]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    itemRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      id="schedule"
      className="relative scroll-mt-20 px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40 flex flex-col gap-[1.5rem] md:gap-[2rem]"
    >
      <p className="font-quicksand font-bold text-yellow text-[0.85rem] md:text-[0.95rem] tracking-[0.15em] uppercase">
        {scheduleMeta.dateLabel}
      </p>
      <h2 className={`${styles.sectionHeading} -mt-[1rem]`}>Schedule</h2>
      <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed max-w-[40rem]">
        {scheduleMeta.intro}
      </p>

      <div ref={containerRef} className="relative mt-[0.5rem] pb-6 lg:grid lg:grid-cols-2 lg:gap-x-24 lg:pl-2">
        {connectorPath && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
            <path
              d={connectorPath}
              fill="none"
              stroke="rgb(236 227 255 / 0.45)"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </svg>
        )}

        {columns.map((items, colIndex) => {
          const offset = colIndex === 0 ? 0 : split;
          return (
            // display: contents on small screens so both halves flow as one list
            <ol key={colIndex} className="contents lg:block">
              {items.map((item, i) => {
                const index = offset + i;
                return (
                  <ScheduleItem
                    key={index}
                    item={item}
                    hasLine={index < scheduleData.length - 1}
                    hideLineOnDesktop={index === split - 1}
                    isOpen={openItems.has(index)}
                    onToggle={() => toggle(index)}
                    circleRef={(el) => (circleRefs.current[index] = el)}
                    itemRef={(el) => (itemRefs.current[index] = el)}
                  />
                );
              })}
            </ol>
          );
        })}
      </div>
    </section>
  );
}

export default Schedule;