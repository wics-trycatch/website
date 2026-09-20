import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import { chair, organizers } from "../data/organizers";

/* ------------------------------------------------------------------ */
/* Color accents                                                       */
/* ------------------------------------------------------------------ */

// Sydney gets yellow. Everyone else cycles through these three per column,
// left to right, so the grid reads as a repeating 3-color rhythm. Each
// accent carries its own pill color, hover glow, and LinkedIn badge
// treatment (badge is tinted with the accent at rest, inverts on hover) —
// written out as full literal class strings so Tailwind's build-time scan
// picks them all up (it can't see classes assembled from interpolated
// runtime values).
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
  white: {
    pill: "bg-white/85 text-navy",
    glow: "hover:shadow-[0_0_16px_2px_rgb(255_255_255/0.4)]",
    badgeBase: "bg-white text-navy",
    badgeHover: "hover:bg-navy hover:text-white hover:scale-110",
  },
};

// Column 0 = dark purple, column 1 = light pink, column 2 = white — except
// Sydney (always the very first card), who gets yellow instead.
const COLUMN_ACCENTS = ["purpleDeep", "pinkLight", "white"];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

// Some people (e.g. Sanya: "Finances, Communications") sit on more than one
// team — give each team its own pill instead of cramming them into one.
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

// Every card is the same size now — Sydney included — she's just picked out
// with the yellow accent instead of getting a bigger, separate layout.
function TeamMemberCard({ img, imgProperties, alt, name, role, blurb, linkedin, accentKey }) {
  const accent = ACCENTS[accentKey] ?? ACCENTS.purpleDeep;
  const paragraphs = (blurb ?? "").split("\n\n");

  return (
    <div
      className={`rounded-[1.25rem] border border-purple-medium/40 p-[1.25rem] transition-shadow duration-300 flex flex-col gap-[0.75rem] ${accent.glow}`}
    >
      <div className="w-full aspect-square overflow-hidden rounded-[0.9375rem]">
        <img
          src={img}
          alt={alt || `${name} headshot`}
          className={`w-full h-full object-cover ${imgProperties || "object-center"}`}
        />
      </div>

      <div className="flex flex-col gap-[0.4rem]">
        <div className="flex items-center gap-[0.9rem]">
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

// Requested layout (reading order, 3 per row):
// sydney aeris sanya / serena aniyah malaika / an jennifer alexis /
// sanika manjari tanveen / laraib sahaj sherry
const LAYOUT_ORDER = [
  "sydney", "aeris", "sanya",
  "serena", "aniyah", "malaika",
  "an", "jennifer", "alexis",
  "sanika", "manjari", "tanveen",
  "laraib", "sahaj", "sherry",
];

function OurTeam() {
  const byFirstName = new Map(
    [chair, ...organizers].map((person) => [person.name.split(" ")[0].toLowerCase(), person])
  );

  const team = LAYOUT_ORDER.map((firstName, i) => {
    const person = byFirstName.get(firstName);
    // Sydney (always index 0) is the only one who gets yellow; everyone else
    // is colored by column.
    const accentKey = i === 0 ? "yellow" : COLUMN_ACCENTS[i % 3];
    return { ...person, accentKey };
  });

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

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] mt-[0.5rem]">
            {team.map((member, i) => (
              <TeamMemberCard key={i} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurTeam;
