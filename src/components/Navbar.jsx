import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Button from "./Button";

import logo from "../assets/images/shared/logo_simple_white.png";

import { ChevronDown, Menu, X } from "lucide-react";

function Navbar() {
  const [iconSize, setIconSize] = useState(36);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIconSize(24); // xl = 80rem = 1280px
      } else if (window.innerWidth < 1536) {
        setIconSize(32); // 2xl = 96rem = 1536px
      } else {
        setIconSize(36); // Larger than 2xl
      }

      if (window.innerWidth >= 1280) {
        setHamburgerOpen(false);
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`px-[2.5rem] pt-[2rem] pb-[0.5rem] flex justify-between bg-dark-blue`}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Homepage"
          className="h-[2.5rem] xl:h-[2.75rem] 2xl:h-[3rem] w-[auto] -translate-y-2"
        />
      </Link>

      {/* Desktop Full Navbar */}
      <ul
        role="menu"
        aria-label="Main menu"
        className={`${styles.navList} hidden xl:flex gap-[3rem] xl:gap-[2rem]`}
      >
        <li role="menuitem" tabIndex="0" className={`${styles.dropdown} z-10000`}>
          <div className={`flex`}>
            <span className={`mr-[0.5rem]`}>EVENT DETAILS</span>
            <ChevronDown size={iconSize} />
          </div>
          <ul role="menu" className={`${styles.dropdownContent}`}>
            <li role="menuitem" tabIndex="0">
              <Link to="/schedule">
                SCHEDULE
              </Link>
            </li>
            <li role="menuitem" tabIndex="0">
              <Link to="/speakers">
                SPEAKERS
              </Link>
            </li>
            <li role="menuitem" tabIndex="0">
              <Link to="/workshops">
                WORKSHOPS
              </Link>
            </li>
          </ul>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/sponsors">
            SPONSORS
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/faq">
            FAQ
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/sfu-wics">
            SFU WICS
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Button
            link="https://trycatch2025.eventbrite.ca/"
            target="_blank" rel="noopener noreferrer"
            text="REGISTER"
            type="navbar"
          />
        </li>
      </ul>
      {/* END Desktop Full Navbar */}

      {/* Hamburger menu button for mobile */}
      <button
        className="xl:hidden text-white -translate-y-2"
        onClick={() => setHamburgerOpen(!hamburgerOpen)}
        aria-label="Toggle menu"
      >
        {hamburgerOpen ? <X size={36} /> : <Menu size={36} />}
      </button>

      {/* Mobile Hamburger menu */}
      {hamburgerOpen && (
        <div className="z-10000 absolute top-[7.95rem] w-[90%] left-[5%] bg-dark-blue px-6 py-4 xl:hidden">
          <ul role="menu" className="flex flex-col gap-4 text-white">
            <li>
              <div className="flex items-center justify-between">
                <span>EVENT DETAILS</span>
                <ChevronDown size={24} />
              </div>
              <ul className="ml-4 mt-2 flex flex-col gap-2">
                <li>
                  <Link to="/schedule">SCHEDULE</Link>
                </li>
                <li>
                  <Link to="/speakers">SPEAKERS</Link>
                </li>
                <li>
                  <Link to="/workshops">WORKSHOPS</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/sponsors">SPONSORS</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/sfu-wics">SFU WICS</Link>
            </li>
            <li>
              <Button
                link="https://trycatch2025.eventbrite.ca/"
                target="_blank" rel="noopener noreferrer"
                text="REGISTER"
                type="navbar"
              />
            </li>
          </ul>
        </div>
      )}
      {/* END Mobile Hamburger Menu */}

    </nav>
  );
}

export default Navbar;
