import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";

import blob from "../assets_26/images/shared/blob_tiny.svg";

import { ChevronDown, Menu, X } from "lucide-react";

import { scrollToSection } from "../utils/scrollToSection";

// A link that jumps to a section of the home page. On the home page it just
// scrolls. From any other page it goes home first, and Home does the scrolling.
function SectionLink({ section, pathname, onNavigate, className, children }) {
  return (
    <Link
      to="/"
      state={{ scrollTo: section }}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/") {
          e.preventDefault();
          scrollToSection(section);
        }
      }}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // "about" | "event" | null
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const closeMenu = () => setHamburgerOpen(false);

  // Only one desktop dropdown open at a time. onBlur only closes if focus
  // actually left the li (not just moved to a link inside its own menu) —
  // without that check, tabbing into a dropdown item would close the menu
  // you're tabbing into.
  const closeDropdownIfOutside = (e, key) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenDropdown((cur) => (cur === key ? null : cur));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setHamburgerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 80 || currentY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-30 bg-navy -mx-[5.5556%] -mt-[2rem] px-[2.5%] py-[1.5rem] flex items-center justify-between transition-transform duration-300 ${
        visible ? "translate-y-0" : `-translate-y-full ${styles.navHidden}`
      }`}
    >
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src={blob} alt="try/CATCH home" className="h-[2rem] w-auto" />
      </Link>

      {/* Desktop nav */}
      <ul
        role="menu"
        aria-label="Main menu"
        className={`${styles.navList26} hidden xl:flex items-center gap-[2rem]`}
      >
        <li
          role="menuitem"
          tabIndex="0"
          className={styles.dropdown26}
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown((cur) => (cur === "about" ? null : cur))}
          onFocus={() => setOpenDropdown("about")}
          onBlur={(e) => closeDropdownIfOutside(e, "about")}
        >
          <div className="flex items-center gap-[0.35rem] cursor-default">
            <span>About</span>
            <ChevronDown size={18} />
          </div>
          <ul role="menu" className={`${styles.dropdownContent26} ${openDropdown === "about" ? styles.open : ""}`}>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/sfu-wics">SFU WiCS</Link>
            </li>
          </ul>
        </li>

        <li
          role="menuitem"
          tabIndex="0"
          className={styles.dropdown26}
          onMouseEnter={() => setOpenDropdown("event")}
          onMouseLeave={() => setOpenDropdown((cur) => (cur === "event" ? null : cur))}
          onFocus={() => setOpenDropdown("event")}
          onBlur={(e) => closeDropdownIfOutside(e, "event")}
        >
          <div className="flex items-center gap-[0.35rem] cursor-default">
            <span>Event Details</span>
            <ChevronDown size={18} />
          </div>
          <ul role="menu" className={`${styles.dropdownContent26} ${openDropdown === "event" ? styles.open : ""}`}>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
            <li>
              <Link to="/speakers">Speakers</Link>
            </li>
            <li>
              <Link to="/workshops">Workshops</Link>
            </li>
          </ul>
        </li>

        <li role="menuitem" tabIndex="0">
          <Link to="/sponsors">Sponsors</Link>
        </li>

        {/* Reserved slot for the Snakes & Ladders game link — not wired up
            yet, just holding its place in the nav. Rename the text below
            once we settle on what to call it. */}
        <li role="menuitem" tabIndex="-1" aria-disabled="true">
          <span className="text-white/40 cursor-not-allowed select-none">Play</span>
        </li>

        <li role="menuitem" tabIndex="0">
          <SectionLink
            section="register"
            pathname={pathname}
            className="font-quicksand font-bold text-navy bg-yellow rounded-full px-[1.5rem] py-[0.5rem] hover:scale-105 transition-transform duration-300 inline-block"
          >
            Register
          </SectionLink>
        </li>
      </ul>
      {/* END desktop nav */}

      {/* Hamburger for mobile */}
      <button
        className="xl:hidden text-white"
        onClick={() => setHamburgerOpen(!hamburgerOpen)}
        aria-label="Toggle menu"
      >
        {hamburgerOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {hamburgerOpen && (
        <div className="absolute top-full left-0 right-0 z-30 bg-navy px-[6%] py-[1.5rem] xl:hidden">
          <ul className="flex flex-col gap-[1rem] font-quicksand text-white">
            <li>
              <div className="flex items-center justify-between">
                <span>About</span>
                <ChevronDown size={20} />
              </div>
              <ul className="ml-4 mt-2 flex flex-col gap-2">
                <li>
                  <Link to="/faq" onClick={() => setHamburgerOpen(false)}>FAQ</Link>
                </li>
                <li>
                  <Link to="/sfu-wics" onClick={() => setHamburgerOpen(false)}>SFU WiCS</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Event Details</span>
                <ChevronDown size={20} />
              </div>
              <ul className="ml-4 mt-2 flex flex-col gap-2">
                <li>
                  <Link to="/schedule" onClick={() => setHamburgerOpen(false)}>Schedule</Link>
                </li>
                <li>
                  <Link to="/speakers" onClick={() => setHamburgerOpen(false)}>Speakers</Link>
                </li>
                <li>
                  <Link to="/workshops" onClick={() => setHamburgerOpen(false)}>Workshops</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/sponsors" onClick={() => setHamburgerOpen(false)}>Sponsors</Link>
            </li>
            <li>
              <SectionLink
                section="register"
                pathname={pathname}
                onNavigate={closeMenu}
                className="font-quicksand font-bold text-navy bg-yellow rounded-full px-[1.5rem] py-[0.5rem] inline-block w-fit"
              >
                Register
              </SectionLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;