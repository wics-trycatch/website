import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Wrench, Award, ChevronDown } from "lucide-react";
import styles from "./Home.module.css";
import { scrollToSection } from "../utils/scrollToSection";

// Registration closes at midnight on Oct 21, 2026 (i.e. the very end of
// Oct 21 / start of Oct 22) — the CTA countdown below targets this date.
const REGISTRATION_DEADLINE = new Date("2026-10-22T00:00:00");

function useCountdown(target) {
  const getRemaining = () => {
    const diff = target - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000 * 30);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}

// Shared 2026 brand assets
import logoTiny from "../assets_26/images/shared/logo_tiny.svg";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import heroArc from "../assets_26/images/shared/hero_arc.svg";

// About section highlight icons
import codeIcon from "../assets_26/images/home/code_icon.svg";
import peopleIcon from "../assets_26/images/home/people_icon.svg";
import inspirationIcon from "../assets_26/images/home/inspiration_icon.svg";

// Gallery connector
import polaroidLine from "../assets_26/images/home/polaroid_line.svg";

// SFU WiCS value icons
import soundIcon from "../assets_26/images/home/sound_icon.svg";
import navigateIcon from "../assets_26/images/home/navigate_icon.svg";
import mountainIcon from "../assets_26/images/home/mountain_icon.svg";
import blocksIcon from "../assets_26/images/home/blocks_icon.svg";


// Gallery / workshop polaroids
import figmaWk from "../assets_26/images/wics/figma_wk.svg";
import panelQna from "../assets_26/images/wics/panel_qna.svg";
import gameDev from "../assets_26/images/wics/game__dev.svg";
import ml from "../assets_26/images/wics/ml.svg";
import sonyToio from "../assets_26/images/wics/sony_toio.svg";
import sfuWicsPhoto from "../assets_26/images/wics/sfuwics.svg.svg";
import groupPhoto from "../assets_26/images/wics/trycatch2024.png";

const galleryItems = [
  { img: figmaWk, caption: "Figma Workshop" },
  { img: panelQna, caption: "Panel and Q&A" },
  { img: gameDev, caption: "Game Dev Workshop" },
  { img: sonyToio, caption: "Sony Toio Robots Workshop" },
  { img: ml, caption: "Machine Learning Workshop" },
];

const highlights = [
  {
    icon: codeIcon,
    title: "Discover Tech",
    desc: "Explore coding, robotics, and design through hands-on workshops for all levels.",
  },
  {
    icon: peopleIcon,
    title: "Meet Role Models",
    desc: "Connect with women in tech, from students to seasoned professionals.",
  },
  {
    icon: inspirationIcon,
    title: "Be Inspired",
    desc: "Fuel your curiosity with keynotes, panels, and prizes. Walk away with new skills and a glimpse into your future.",
  },
];

const wicsValues = [
  { icon: soundIcon, label: "promote", desc: "women in Computing Science", bg: "bg-purple-deep" },
  { icon: navigateIcon, label: "support", desc: "students through their journey", bg: "bg-purple-medium" },
  { icon: mountainIcon, label: "challenge", desc: "biases and barriers in tech", bg: "bg-yellow" },
  { icon: blocksIcon, label: "build", desc: "a strong, inclusive community", bg: "bg-pink-light" },
];

// positions/sizes pulled directly from the Figma frame (as % of the three
// circles' own combined bounding box, so both edges sit flush and the
// section's own padding gives equal spacing on the left and right)
const stats = [
  {
    icon: Users, number: "79", label: "Attendees",
    bg: "bg-purple-medium", textColor: "text-lavender-pale",
    left: "0%", top: "0%", width: "35.716%", height: "100%",
    numSize: "10.582cqw", labelSize: "3.307cqw", iconSize: "8.268cqw", iconWeight: 2,
    mLeft: "6%", mTop: "2%", mWidth: "56%", mHeight: "33.87%",
    mNumSize: "15.5cqw", mLabelSize: "5.3cqw", mIconSize: "13.5cqw",
  },
  {
    icon: Wrench, number: "5", label: "Workshops", link: "/workshops",
    glow: "hover:shadow-[0_0_28px_8px_rgb(73_42_141/0.6)]",
    bg: "bg-purple-deep", textColor: "text-lavender-pale",
    left: "42.828%", top: "21.169%", width: "27.202%", height: "76.157%",
    numSize: "7.937cqw", labelSize: "2.977cqw", iconSize: "6.945cqw", iconWeight: 1.25,
    mLeft: "46%", mTop: "36%", mWidth: "42%", mHeight: "25.40%",
    mNumSize: "11.8cqw", mLabelSize: "4.0cqw", mIconSize: "10.2cqw",
  },
  {
    icon: Award, number: "3", label: "Sponsors", link: "/sponsors",
    glow: "hover:shadow-[0_0_28px_8px_rgb(255_194_123/0.6)]",
    bg: "bg-yellow", textColor: "text-navy",
    left: "76.601%", top: "27.625%", width: "23.398%", height: "64.352%",
    numSize: "7.937cqw", labelSize: "2.977cqw", iconSize: "7.110cqw", iconWeight: 1.25,
    mLeft: "12%", mTop: "68%", mWidth: "34%", mHeight: "20.56%",
    mNumSize: "9.6cqw", mLabelSize: "3.25cqw", mIconSize: "8.2cqw",
  },
];

// card 305.3x411.61 (r10), photo 269.1x296.34 (r5, 2px stroke) — pulled
// directly from Figma, so padding works out to 1.1306rem on every side
// base size matches the Figma card (scale 1); mobile passes a smaller scale
// so everything (card, photo inset, padding, radius) shrinks together
function Polaroid({ img, caption, className = "", scale = 1 }) {
  const card = { w: 15.65 * scale, h: 21.1 * scale };
  const photo = { w: 13.79 * scale, h: 15.19 * scale };
  const pad = 0.93 * scale;
  const radius = 0.51 * scale;
  const photoRadius = 0.26 * scale;
  const textSize = 1.15 * scale;

  return (
    <div
      className={`bg-lavender-pale shadow-lg flex flex-col hover:scale-105 hover:-translate-y-[0.4rem] transition-transform duration-300 ${className}`}
      style={{ width: `${card.w}rem`, height: `${card.h}rem`, padding: `${pad}rem`, borderRadius: `${radius}rem` }}
    >
      <div
        className="overflow-hidden shrink-0"
        style={{ width: `${photo.w}rem`, height: `${photo.h}rem`, borderRadius: `${photoRadius}rem` }}
      >
        <img src={img} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p
        className="font-quicksand font-bold text-navy text-center flex-1 flex items-center justify-center"
        style={{ fontSize: `${textSize}rem`, marginTop: `${pad * 0.8}rem` }}
      >
        {caption}
      </p>
    </div>
  );
}

// the 3-over-2 zig-zag grid, reused at both tablet and desktop scale so the
// same layout logic doesn't have to be duplicated by hand
function GalleryGrid({ scale, connectorRem, gapXRem }) {
  return (
    <div
      className="grid grid-cols-5 gap-y-0 max-w-[70rem] w-full mx-auto justify-items-center"
      style={{ gridTemplateRows: `auto ${connectorRem}rem auto`, columnGap: `${gapXRem}rem` }}
    >
      <div className="col-start-1 row-start-1">
        <Polaroid {...galleryItems[0]} scale={scale} />
      </div>
      <div className="col-start-3 row-start-1">
        <Polaroid {...galleryItems[1]} scale={scale} />
      </div>
      <div className="col-start-5 row-start-1">
        <Polaroid {...galleryItems[2]} scale={scale} />
      </div>

      <img src={polaroidLine} alt="" aria-hidden="true" className="pointer-events-none row-start-2 col-start-1 col-span-2 justify-self-center w-auto" style={{ height: `${connectorRem}rem` }} />
      <img src={polaroidLine} alt="" aria-hidden="true" className="pointer-events-none row-start-2 col-start-2 col-span-2 justify-self-center w-auto scale-x-[-1]" style={{ height: `${connectorRem}rem` }} />
      <img src={polaroidLine} alt="" aria-hidden="true" className="pointer-events-none row-start-2 col-start-3 col-span-2 justify-self-center w-auto" style={{ height: `${connectorRem}rem` }} />
      <img src={polaroidLine} alt="" aria-hidden="true" className="pointer-events-none row-start-2 col-start-4 col-span-2 justify-self-center w-auto scale-x-[-1]" style={{ height: `${connectorRem}rem` }} />

      <div className="col-start-2 row-start-3">
        <Polaroid {...galleryItems[3]} scale={scale} />
      </div>
      <div className="col-start-4 row-start-3">
        <Polaroid {...galleryItems[4]} scale={scale} />
      </div>
    </div>
  );
}

function Home() {
  const { days, hours, mins } = useCountdown(REGISTRATION_DEADLINE);

  // Arriving from another page via a navbar link: scroll to the requested section.
  // (Tried twice because images further up the page can shift the layout as they load.)
  const location = useLocation();
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const timers = [60, 600].map((ms) => setTimeout(() => scrollToSection(id), ms));
    return () => timers.forEach(clearTimeout);
  }, [location.state]);

  return (
    <div className="relative bg-navy overflow-hidden -mx-[5.5556%]">
      {/* star + constellation background, tiled behind the whole page */}
      <div
        className="absolute inset-0 opacity-75 pointer-events-none"
        style={{ backgroundImage: `url(${frameBg})`, backgroundRepeat: "repeat", backgroundSize: "56rem auto" }}
        aria-hidden="true"
      />

      {/* HERO */}
      <section className="relative pt-[2rem]">
        {/* mobile + tablet: simple centered stack, no arc, lighter text */}
        <div className="xl:hidden flex flex-col items-center text-center gap-[1.25rem] px-[10%] pt-[2.5rem] pb-[3rem]">
          <img src={logoTiny} alt="try/CATCH" className="w-[13rem]" />
          <p className="font-quicksand font-bold text-pink-light text-[0.95rem] leading-relaxed max-w-[18rem]">
            A tech conference for high school girls and non-binary students to learn, connect, and get inspired.
          </p>
          <span
            aria-disabled="true"
            className="bg-white/20 text-lavender-pale/70 font-quicksand font-bold text-[1rem] rounded-full px-[2rem] py-[0.75rem] cursor-not-allowed select-none"
          >
            Registration Opens Soon
          </span>
          <p className="font-quicksand font-bold text-lavender-pale text-[0.8rem] leading-relaxed mt-[0.5rem]">
            Try/CATCH is happening in SFU Burnaby campus on Oct 24th, 2026!
          </p>
        </div>

        {/* desktop: full arc with content laid over it */}
        <div className="relative hidden xl:block">
          <img src={heroArc} alt="" aria-hidden="true" className="block w-full h-auto pointer-events-none" />

          <div className={`absolute left-1/2 -translate-x-1/2 bottom-[8%] ${styles.heroGrid}`}>
            <img src={logoTiny} alt="try/CATCH" className={`${styles.heroLogo} w-[24rem]`} />

            <div className={`${styles.heroDesc} flex flex-col items-center text-center gap-[1.5rem] max-w-[24rem]`}>
              <p className="font-quicksand font-bold text-pink-light text-[1.6rem] leading-snug">
                A tech conference for high school girls and non-binary students to learn, connect, and get inspired.
              </p>
              <span
                aria-disabled="true"
                className="border-2 border-white/30 text-white/50 font-quicksand font-bold text-[1.1rem] rounded-full px-[2.5rem] py-[0.85rem] cursor-not-allowed select-none"
              >
                Registration Opens Soon
              </span>
            </div>

            <p className={`${styles.heroDate} font-quicksand font-bold text-pink-light text-left text-[1.35rem] leading-snug`}>
              Try/CATCH is happening in<br /> SFU Burnaby campus on Oct 24th, 2026!
            </p>
          </div>

          <div className="absolute bottom-[1.5rem] left-[48%] -translate-x-1/2 w-[2.75rem] h-[2.75rem] rounded-full border-2 border-lavender-pale/60 flex items-center justify-center animate-bounce">
            <ChevronDown size={20} className="text-lavender-pale" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40">
        <div className="xl:grid xl:grid-cols-[1fr_1.2fr] xl:gap-[5rem] xl:items-center">
          <div className="max-w-[38rem]">
            <h2 className={`${styles.sectionHeading} mb-[1.5rem]`}>About Try/CATCH</h2>

            <p className="font-quicksand font-bold text-pink-light text-[1rem] xl:text-[1.5rem] leading-relaxed">
              Try/CATCH (Computing and Technology Conference for Her) is a one-day event
              designed to spark curiosity and confidence in female and non-binary high
              school students in grades 8&ndash;12.
            </p>
            <p className="font-quicksand font-bold text-pink-light text-[1rem] xl:text-[1.5rem] leading-relaxed mt-[1rem]">
              With over 1,400 participants since 2009, it&apos;s more than a conference
              &mdash; it&apos;s a space to explore technology in a supportive, inclusive
              environment.
            </p>
          </div>

          <div className="relative mt-[2rem] xl:mt-0 rounded-[0.5rem] overflow-hidden max-w-[65rem] xl:max-w-none mx-auto">
            <img src={groupPhoto} alt="Try/CATCH 2024 attendees at SFU Burnaby" className="w-full h-auto object-cover" />
            <span className="absolute bottom-[0.75rem] left-[0.75rem] bg-navy/80 text-white font-quicksand font-bold text-[0.85rem] rounded-full px-[1rem] py-[0.35rem]">
              Try/Catch 2024, SFU Burnaby
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] mt-[3rem]">
          {highlights.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-[0.75rem]">
              <div className="bg-yellow rounded-[1.25rem] xl:rounded-[1.875rem] p-[1rem] xl:p-[1.25rem]">
                <img src={icon} alt="" aria-hidden="true" className="w-[1.75rem] h-[1.75rem] xl:w-[2.25rem] xl:h-[2.25rem]" />
              </div>
              <h3 className="font-special-gothic font-bold text-lavender-pale text-[1.1rem] xl:text-[2.25rem]">{title}</h3>
              <p className="font-quicksand font-bold text-pink-light text-[0.9rem] xl:text-[1.25rem] leading-relaxed max-w-[16rem] xl:max-w-[22rem]">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-[1.25rem] sm:gap-[4.5rem] mt-[2.5rem]">
          <Link
            to="/schedule"
            className="font-quicksand font-bold text-yellow text-[1.1rem] xl:text-[1.25rem] flex items-center gap-[0.5rem] hover:gap-[0.75rem] transition-all duration-300 cursor-pointer w-fit"
          >
            See the full schedule <span aria-hidden="true">&#8594;</span>
          </Link>
          <Link
            to="/speakers"
            className="font-quicksand font-bold text-yellow text-[1.1rem] xl:text-[1.25rem] flex items-center gap-[0.5rem] hover:gap-[0.75rem] transition-all duration-300 cursor-pointer w-fit"
          >
            Meet our speakers <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="relative px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40">
        <h2 className={`${styles.sectionHeading} mb-[2rem]`}>Last year we had...</h2>

        {/* mobile: circles stacked top to bottom, connected by a vertical squiggle */}
        <div className="md:hidden relative @container" style={{ aspectRatio: "375 / 620" }}>
          <svg
            viewBox="0 0 193 372"
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ width: "48%", height: "auto", transform: "translate(-50%, -50%)" }}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M36.2667 0.959202C180.967 43.576 192.614 65.4639 191.614 141.963C190.614 218.463 -5.14943 269.718 1.11415 371.463"
              stroke="#ECE3FF"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.8"
            />
          </svg>

          {stats.map(({ icon: Icon, number, label, bg, textColor, mLeft, mTop, mWidth, mHeight, mNumSize, mLabelSize, mIconSize, iconWeight, link, glow }) => {
            const Wrapper = link ? Link : "div";
            return (
              <Wrapper
                key={label}
                {...(link ? { to: link } : {})}
                className={`${bg} rounded-full overflow-hidden flex flex-col items-center justify-center gap-[0.25rem] absolute ${
                  link ? `hover:scale-105 transition-all duration-300 ${glow ?? ""}` : ""
                }`}
                style={{ left: mLeft, top: mTop, width: mWidth, height: mHeight }}
              >
                <Icon size="100%" strokeWidth={iconWeight} className={textColor} style={{ width: mIconSize, height: mIconSize }} />
                <span className={`font-special-gothic font-bold leading-none ${textColor}`} style={{ fontSize: mNumSize }}>
                  {number}
                </span>
                <span className={`font-special-gothic font-bold ${textColor}`} style={{ fontSize: mLabelSize }}>
                  {label}
                </span>
              </Wrapper>
            );
          })}
        </div>

        {/* tablet + desktop: circles in a row, extra side gutter so the
            line's overhanging tips never get clipped at narrower widths */}
        <div className="hidden md:block px-[8%]">
          <div
            className="relative @container max-w-[75rem] mx-auto"
            style={{ aspectRatio: "1209.55 / 432" }}
          >
            {/* single dashed thread, layered behind the circles, shifted left
                and widened so its start/end tips peek out past the first and
                last circle instead of hiding underneath them */}
            <svg
              viewBox="0 0 1392 295"
              className="absolute top-1/2 pointer-events-none"
              style={{ left: "-16%", width: "130%", height: "auto", transform: "translateY(-50%) rotate(10deg)" }}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M201.065 292.805C-498.318 -30.7102 820.657 319.175 1391.17 1.31033"
                stroke="#ECE3FF"
                strokeWidth="3"
                strokeDasharray="5 5"
                opacity="0.8"
              />
            </svg>

            {stats.map(({ icon: Icon, number, label, bg, textColor, left, top, width, height, numSize, labelSize, iconSize, iconWeight, link, glow }) => {
              const Wrapper = link ? Link : "div";
              return (
                <Wrapper
                  key={label}
                  {...(link ? { to: link } : {})}
                  className={`${bg} rounded-full flex flex-col items-center justify-center gap-[0.25rem] absolute ${
                    link ? `hover:scale-105 transition-all duration-300 ${glow ?? ""}` : ""
                  }`}
                  style={{ left, top, width, height }}
                >
                  <Icon size="100%" strokeWidth={iconWeight} className={textColor} style={{ width: iconSize, height: iconSize }} />
                  <span className={`font-special-gothic font-bold leading-none ${textColor}`} style={{ fontSize: numSize }}>
                    {number}
                  </span>
                  <span className={`font-special-gothic font-bold ${textColor}`} style={{ fontSize: labelSize }}>
                    {label}
                  </span>
                </Wrapper>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-[0.75rem] sm:gap-[4.5rem] mt-[2.5rem]">
          <Link
            to="/workshops"
            className="font-quicksand font-bold text-yellow text-[1.1rem] xl:text-[1.25rem] flex items-center gap-[0.5rem] hover:gap-[0.75rem] transition-all duration-300 cursor-pointer w-fit"
          >
            Explore workshops <span aria-hidden="true">&#8594;</span>
          </Link>
          <Link
            to="/sponsors"
            className="font-quicksand font-bold text-yellow text-[1.1rem] xl:text-[1.25rem] flex items-center gap-[0.5rem] hover:gap-[0.75rem] transition-all duration-300 cursor-pointer w-fit"
          >
            See our sponsors <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40 flex flex-col items-start gap-[0.5rem]">
        <h2 className={styles.sectionHeading}>Moments from last year</h2>
        <p className="font-quicksand font-bold text-pink-light text-[0.8rem] whitespace-nowrap md:text-[1.15rem] md:whitespace-normal mb-[2rem] md:mb-[3rem]">
          A little constellation of memories from try/CATCH 2025
        </p>

        {/* mobile: one photo per row, gently alternating left/right within a
            padded column (not full-width swings), connected end to end */}
        <div className="md:hidden flex flex-col items-center w-full px-[12%]">
          {galleryItems.map((item, i) => (
            <div key={item.caption} className="w-full flex flex-col items-center">
              <div className={`w-full flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <Polaroid {...item} scale={0.62} />
              </div>
              {i < galleryItems.length - 1 && (
                <img
                  src={polaroidLine}
                  alt=""
                  aria-hidden="true"
                  className={`pointer-events-none h-[4rem] w-auto ${i % 2 === 0 ? "self-center" : "self-center scale-x-[-1]"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* desktop: 3-over-2 zig-zag. the middle grid row is reserved purely
            for the connector art, so each row of photos sits flush against
            wherever that connector ends instead of leaving a gap */}
        {/* tablet: everything scaled down from the full desktop size */}
        <div className="hidden md:block xl:hidden w-full">
          <GalleryGrid scale={0.7} connectorRem={4} gapXRem={1.1} />
        </div>

        {/* true desktop: full size */}
        <div className="hidden xl:block w-full">
          <GalleryGrid scale={1} connectorRem={5.7} gapXRem={1.6} />
        </div>
      </section>

      {/* SFU WICS TEASER */}
      <section className="relative px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40 flex flex-col gap-[1.5rem] md:gap-[2rem]">
        <p className="font-quicksand font-bold text-yellow text-[0.85rem] md:text-[0.95rem] tracking-[0.15em] uppercase">
          The team behind Try/CATCH
        </p>
        <h2 className={`${styles.sectionHeading} -mt-[1rem]`}>SFU Women in Computing Science</h2>

        <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed">
          Try/CATCH is entirely run by enthusiastic volunteers from Simon Fraser University
          Computing Science students, faculty and staff. SFU Women in Computing Science
          (WiCS) is a student-led society dedicated to building a supportive network for
          gender-diverse students throughout their computing science studies. We organize
          a diverse range of activities, including social, technical, and outreach
          initiatives that aim to empower and connect women in tech.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem] md:gap-[2rem] mt-[0.5rem] justify-items-center md:justify-items-start mx-auto md:mx-0">
          {wicsValues.map(({ icon, label, desc, bg }) => (
            <div key={label} className="flex flex-col items-center text-center md:items-start md:text-left gap-[0.5rem]">
              <div className={`${bg} rounded-[1rem] w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] flex items-center justify-center`}>
                <img src={icon} alt="" aria-hidden="true" className="w-[1.75rem] h-[1.75rem] md:w-[2.1rem] md:h-[2.1rem]" />
              </div>
              <p className="font-special-gothic font-bold text-lavender-pale text-[1.5rem]">{label}</p>
              <p className="font-quicksand text-pink-light text-[0.8rem] md:text-[0.9rem] leading-snug">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-[1rem] rounded-[0.5rem] md:rounded-[1.25rem] overflow-hidden">
          <img src={sfuWicsPhoto} alt="SFU WiCS at Try/CATCH 2025" className="w-full h-auto object-cover" />
          <span className="absolute bottom-[0.75rem] left-[0.75rem] bg-navy/80 text-white font-quicksand font-bold text-[0.85rem] rounded-full px-[1rem] py-[0.35rem]">
            SFU WiCS @ Try/CATCH 2025
          </span>
        </div>
      </section>

      {/* COUNTDOWN / REGISTER CTA */}
      <section id="register" className="relative scroll-mt-20 px-[6%] py-[3rem] md:py-[4rem] border-t border-purple-medium/40 flex flex-col items-center text-center gap-[0.75rem]">
        <p className="font-special-gothic font-bold text-yellow text-[1rem] md:text-[1.25rem] tracking-[0.15em] uppercase">
          Secure your spot
        </p>
        <p className="font-quicksand font-bold text-pink-light text-[0.95rem] md:text-[1.1rem]">
          Registration closes in
        </p>

        <div className="flex items-start gap-[2rem] md:gap-[3.5rem] mt-[1.5rem] mb-[2rem]">
          {[
            { value: days, label: "Days" },
            { value: hours, label: "Hrs" },
            { value: mins, label: "Mins" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-[0.25rem]">
              <span className="font-special-gothic font-bold text-lavender-pale text-[2.75rem] md:text-[4rem] leading-none">
                {String(value).padStart(2, "0")}
              </span>
              <span className="font-quicksand font-bold text-yellow text-[0.75rem] md:text-[0.85rem] tracking-[0.1em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <span
          aria-disabled="true"
          className="bg-white/20 text-lavender-pale/70 font-quicksand font-bold text-[1.1rem] md:text-[1.25rem] rounded-[0.75rem] px-[2.5rem] py-[0.9rem] cursor-not-allowed select-none"
        >
          Registration Opens Soon
        </span>
      </section>
    </div>
  );
}

export default Home;
