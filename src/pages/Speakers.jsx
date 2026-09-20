import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import { keynote } from "../data/keynote";
import { panelists } from "../data/panelists";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

// accent: "yellow" for the keynote speaker, "purple" for everyone else —
// matches whichever glow color the card itself uses. The keynote badge is
// yellow at rest too (not just on hover), so its hover state inverts colors
// instead of just turning yellow like the purple ones do.
function LinkedInBadge({ href, accent }) {
  if (!href) return null;
  const base = accent === "yellow" ? "bg-yellow text-navy" : "bg-lavender-pale text-navy";
  const hover =
    accent === "yellow"
      ? "hover:bg-navy hover:text-yellow hover:scale-110"
      : "hover:bg-purple-medium hover:text-white";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
      className={`inline-flex items-center justify-center w-[1.4rem] h-[1.4rem] rounded-[0.4rem] shrink-0 transition-all duration-300 ${base} ${hover}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[0.85rem] h-[0.85rem]" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    </a>
  );
}

// One speaker profile. The keynote card just stretches wider and switches to
// a row layout a bit earlier (lg instead of sm) since there's only one of
// them and more room to give it. Every card glows on hover (yellow for the
// keynote, purple for panelists) — the LinkedIn badge picks up the same accent.
function SpeakerCard({ img, imgProperties, alt, name, role, blurb, linkedin, keynote: isKeynote }) {
  const accent = isKeynote ? "yellow" : "purple";
  const glow = isKeynote
    ? "hover:shadow-[0_0_16px_2px_rgb(255_194_123/0.4)]"
    : "hover:shadow-[0_0_16px_2px_rgb(115_83_186/0.4)]";

  return (
    <div
      className={`group relative rounded-[1.25rem] md:rounded-[1.5rem] border border-purple-medium/40 transition-shadow duration-300 flex flex-col gap-[1.25rem] md:gap-[1.5rem] p-[1.25rem] md:p-[1.5rem] ${glow} ${
        isKeynote ? "md:flex-row md:items-center" : "sm:flex-row sm:items-center"
      }`}
    >
      <div
        className={`shrink-0 overflow-hidden rounded-[0.9375rem] aspect-square mx-auto md:mx-0 ${
          isKeynote ? "w-[13rem] md:w-[16rem] lg:w-[18rem]" : "w-[9rem] sm:w-[10.5rem] md:w-[12rem]"
        }`}
      >
        <img
          src={img}
          alt={alt || `${name} headshot`}
          className={`w-full h-full object-cover ${imgProperties || "object-center"}`}
        />
      </div>

      {/* divider between the photo and the bio — only makes sense once
          they're sitting side by side in a row */}
      <div
        aria-hidden="true"
        className={`hidden w-px self-stretch bg-[rgb(239_195_245_/_0.45)] ${isKeynote ? "md:block" : "sm:block"}`}
      />

      <div
        className={`flex-1 flex flex-col gap-[0.5rem] text-center ${isKeynote ? "md:text-left" : "sm:text-left"}`}
      >
        <div
          className={`flex items-center justify-center gap-[0.6rem] ${isKeynote ? "md:justify-start" : "sm:justify-start"}`}
        >
          <h3 className="font-special-gothic font-bold text-lavender-pale text-[1.25rem] md:text-[1.5rem]">{name}</h3>
          <LinkedInBadge href={linkedin} accent={accent} />
        </div>
        <p className="font-quicksand font-bold text-yellow text-[0.8rem] tracking-[0.1em] uppercase -mt-[0.25rem]">
          {role}
        </p>
        <p className="font-quicksand text-pink-light text-[0.9rem] md:text-[1rem] leading-relaxed text-left">
          {blurb}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Speakers() {
  return (
    <div className="relative bg-navy overflow-hidden -mx-[5.5556%]">
      {/* star + constellation background, tiled behind the whole page */}
      <div
        className="absolute inset-0 opacity-75 pointer-events-none"
        style={{ backgroundImage: `url(${frameBg})`, backgroundRepeat: "repeat", backgroundSize: "56rem auto" }}
        aria-hidden="true"
      />

      <section className="relative px-[6%] pt-[3rem] md:pt-[4rem] pb-[3rem] md:pb-[4rem] flex flex-col items-center gap-[1.5rem] md:gap-[2rem]">
        <div className="w-full max-w-[90rem] flex flex-col items-start gap-[1.5rem] md:gap-[2rem]">
          <p className="font-quicksand font-bold text-yellow text-[0.85rem] md:text-[0.95rem] tracking-[0.15em] uppercase">
            From industry and academia
          </p>
          <h1 className={`${styles.sectionHeading} -mt-[1rem]`}>Speakers</h1>
          <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed">
            Hear from inspiring women in tech as they share their journeys, challenges, and advice. Our keynote
            speaker and panelists bring real-world insights from industry and academia.
          </p>

          <div className="w-full flex flex-col gap-[1rem] mt-[0.5rem]">
            {keynote.map((speaker, i) => (
              <SpeakerCard key={i} {...speaker} keynote />
            ))}
          </div>

          <div className="w-full flex flex-col gap-[1.25rem] mt-[0.5rem]">
            {panelists.map((speaker, i) => (
              <SpeakerCard key={i} {...speaker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Speakers;
