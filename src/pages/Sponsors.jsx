import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import { sponsors } from "../data/sponsors";

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[0.9rem] h-[0.9rem]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Turns bare URLs inside a blurb (e.g. "www.orbis.com/careers") into real,
// distinctly-colored links instead of plain text.
const URL_PATTERN = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

function linkifyText(text) {
  return text.split(URL_PATTERN).map((part, i) => {
    if (!/^(https?:\/\/|www\.)/.test(part)) return part;

    const trailingMatch = part.match(/[.,;:!?)]+$/);
    const trailing = trailingMatch ? trailingMatch[0] : "";
    const clean = trailing ? part.slice(0, -trailing.length) : part;
    const href = clean.startsWith("www.") ? `https://${clean}` : clean;

    return (
      <span key={i}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow underline decoration-yellow/50 hover:text-lavender-pale hover:decoration-lavender-pale/60 transition-colors duration-300"
        >
          {clean}
        </a>
        {trailing}
      </span>
    );
  });
}

// size scales the logo card's height and the tier-label color across gold /
// silver / bronze, matching the weight each tier is meant to carry.
const TIER_STYLES = {
  "Gold Sponsor": { label: "text-yellow", logoH: "h-[9rem] md:h-[11rem]" },
  "Silver Sponsor": { label: "text-lavender-pale", logoH: "h-[7rem] md:h-[8rem]" },
  "Bronze Sponsor": { label: "text-pink-light", logoH: "h-[6rem]" },
  Supporter: { label: "text-pink-light", logoH: "h-[6rem]" },
};

function SponsorCard({ name, logo, tier, website, blurb }) {
  const { label: labelColor, logoH } = TIER_STYLES[tier] ?? TIER_STYLES["Bronze Sponsor"];
  const paragraphs = (blurb ?? "").split("\n\n");

  return (
    <div className="rounded-[1.25rem] md:rounded-[1.5rem] border border-purple-medium/40 p-[1.25rem] md:p-[1.5rem] transition-shadow duration-300 hover:shadow-[0_0_16px_2px_rgb(236_227_255/0.35)]">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center justify-center w-full rounded-[1rem] bg-lavender-pale ${logoH}`}
      >
        <img src={logo} alt={`${name} logo`} className="max-w-[78%] max-h-[68%] w-auto h-auto object-contain" />
        {website && (
          <span className="absolute top-[0.75rem] right-[0.75rem] text-navy/50 group-hover:text-purple-medium transition-colors duration-300">
            <ExternalLinkIcon />
          </span>
        )}
      </a>

      <div className="mt-[1.25rem]">
        <h3 className="font-special-gothic font-bold text-lavender-pale text-[1.25rem] md:text-[1.5rem]">{name}</h3>
        <p className={`font-quicksand font-bold text-[0.75rem] tracking-[0.1em] uppercase ${labelColor}`}>{tier}</p>

        <div className="mt-[0.75rem] flex flex-col gap-[0.75rem]">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-quicksand text-pink-light text-[0.9rem] leading-relaxed">
              {linkifyText(para)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}


/* Page */

function Sponsors() {
  const goldSponsors = sponsors.filter((s) => s.tier === "Gold Sponsor");
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver Sponsor");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "Bronze Sponsor");
  const supporters = sponsors.filter((s) => s.tier === "Supporter");

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
            Made possible by
          </p>
          <h1 className={`${styles.sectionHeading} -mt-[1rem]`}>Sponsors</h1>
          <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed">
            Try/CATCH is entirely run by volunteers and depends on the generosity of our sponsors. Their support
            helps us create opportunities for students to discover tech through hands-on workshops and inspiring
            speakers.
          </p>

          {goldSponsors.length > 0 && (
            <div className="w-full grid grid-cols-1 gap-[1.5rem] mt-[0.5rem]">
              {goldSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          )}

          {silverSponsors.length > 0 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] mt-[0.5rem]">
              {silverSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          )}

          {bronzeSponsors.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] mt-[0.5rem]">
              {bronzeSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          )}

          {supporters.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] mt-[0.5rem]">
              {supporters.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Sponsors;
