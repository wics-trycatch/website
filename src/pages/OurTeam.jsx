import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import { chair, organizers } from "../data/organizers";

/* Color accents                                                       */
const ACCENTS = {
  yellow: {
    pill: "bg-yellow text-navy",
    glow: "hover:shadow-[0_0_16px_2px_rgb(255_194_123/0.5)]",
    badgeBase: "bg-yellow text-navy",
    badgeHover: "hover:bg-navy hover:text-yellow hover:scale-110",
  },
  purpleDeep: {
    pill: "bg-purple-deep/80 text-lavender-pale",
    glow: "hover:shadow-[0_0_16px_2px_rgb(73_42_141/0.5)]",
    badgeBase: "bg-purple-deep text-lavender-pale",
    badgeHover: "hover:bg-lavender-pale hover:text-purple-deep hover:scale-110",
  },
  pinkLight: {
    pill: "bg-pink-light/80 text-navy",
    glow: "hover:shadow-[0_0_16px_2px_rgb(239_195_245/0.5)]",
    badgeBase: "bg-pink-light text-navy",
    badgeHover: "hover:bg-navy hover:text-pink-light hover:scale-110",
  },
  lavenderPale: {
    pill: "bg-lavender-pale/80 text-navy",
    glow: "hover:shadow-[0_0_16px_2px_rgb(236_227_255/0.5)]",
    badgeBase: "bg-lavender-pale text-navy",
    badgeHover: "hover:bg-navy hover:text-lavender-pale hover:scale-110",
  },
};
const ACCENT_CYCLE = ["purpleDeep", "pinkLight", "lavenderPale"];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function RolePill({ role, accent }) {
  const roles = role.split(",").map((r) => r.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap items-center gap-[0.4rem]">
      {roles.map((r) => (
        <span
          key={r}
          className={`inline-flex items-center justify-center w-fit rounded-full px-[0.85rem] py-[0.3rem] font-quicksand font-bold text-[0.7rem] tracking-[0.08em] uppercase ${accent.pill}`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

function LinkedInBadge({ href, accent }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
      className={`inline-flex items-center justify-center w-[1.4rem] h-[1.4rem] rounded-[0.4rem] shrink-0 transition-all duration-300 ${accent.badgeBase} ${accent.badgeHover}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[0.85rem] h-[0.85rem]" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    </a>
  );
}

// The featured Chair card — same idea as the keynote card on the Speakers
// page: bigger, sits on its own, glows yellow.
function ChairCard({ img, imgProperties, alt, name, role, blurb, linkedin }) {
  const accent = ACCENTS.yellow;
  return (
    <div
      className={`group relative w-full rounded-[1.25rem] md:rounded-[1.5rem] border border-purple-medium/40 transition-shadow duration-300 flex flex-col md:flex-row md:items-center gap-[1.25rem] md:gap-[1.5rem] p-[1.25rem] md:p-[1.5rem] ${accent.glow}`}
    >
      <div className="shrink-0 overflow-hidden rounded-[0.9375rem] aspect-square mx-auto md:mx-0 w-[15rem] md:w-[19rem] lg:w-[21rem]">
        <img
          src={img}
          alt={alt || `${name} headshot`}
          className={`w-full h-full object-cover ${imgProperties || "object-center"}`}
        />
      </div>

      <div className="hidden md:block w-px self-stretch bg-[rgb(239_195_245_/_0.45)]" aria-hidden="true" />

      <div className="flex-1 flex flex-col gap-[0.5rem] items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-[1.5rem]">
          <h3 className="font-special-gothic font-bold text-lavender-pale text-[1.25rem] md:text-[1.5rem]">{name}</h3>
          <LinkedInBadge href={linkedin} accent={accent} />
        </div>
        <RolePill role={role} accent={accent} />
        <p className="font-quicksand text-pink-light text-[0.9rem] md:text-[1rem] leading-relaxed text-left mt-[0.25rem]">
          {blurb}
        </p>
      </div>
    </div>
  );
}

// One team member tile — square photo up top, name/role/bio below, glows
// with whichever accent color this column was assigned.
function TeamMemberCard({ img, imgProperties, alt, name, role, blurb, linkedin, accentKey, className = "" }) {
  const accent = ACCENTS[accentKey] ?? ACCENTS.purpleDeep;
  const paragraphs = (blurb ?? "").split("\n\n");

  return (
    <div
      className={`rounded-[1.25rem] border border-purple-medium/40 p-[1.25rem] transition-shadow duration-300 flex flex-col gap-[0.75rem] ${accent.glow} ${className}`}
    >
      <div className="w-full aspect-square overflow-hidden rounded-[0.9375rem]">
        <img
          src={img}
          alt={alt || `${name} headshot`}
          className={`w-full h-full object-cover ${imgProperties || "object-center"}`}
        />
      </div>

      <div className="flex flex-col gap-[0.4rem]">
        <div className="flex items-center gap-[1.3rem]">
          <h3 className="font-special-gothic font-bold text-lavender-pale text-[1.1rem]">{name}</h3>
          <LinkedInBadge href={linkedin} accent={accent} />
        </div>
        <RolePill role={role} accent={accent} />
        {paragraphs.map((para, i) => (
          <p key={i} className="font-quicksand text-pink-light text-[0.85rem] leading-relaxed mt-[0.15rem]">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function OurTeam() {
  // Cycle the 3 accent colors by column (left to right), across the whole
  // roster in reading order — not reset per row.
  const withAccent = organizers.map((member, i) => ({ ...member, accentKey: ACCENT_CYCLE[i % 3] }));

  // Center the last, incomplete row instead of letting it hang left with a
  // visible gap (see the mockup we worked out for this earlier).
  const fullRowCount = Math.floor(withAccent.length / 3) * 3;
  const fullRows = withAccent.slice(0, fullRowCount);
  const lastRow = withAccent.slice(fullRowCount);

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
            The people behind it all
          </p>
          <h1 className={`${styles.sectionHeading} -mt-[1rem]`}>Our Team</h1>
          <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed">
            Try/CATCH is entirely run by enthusiastic volunteers from Simon Fraser University Computing Science
            students, faculty and staff. Meet the team behind this year's event!
          </p>

          <ChairCard {...chair} />

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] mt-[0.5rem]">
            {fullRows.map((member, i) => (
              <TeamMemberCard key={i} {...member} />
            ))}
          </div>

          {lastRow.length > 0 && (
            <div className="w-full flex flex-wrap justify-center gap-[1.5rem]">
              {lastRow.map((member, i) => (
                <TeamMemberCard key={i} {...member} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OurTeam;
