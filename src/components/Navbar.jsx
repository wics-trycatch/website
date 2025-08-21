import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Button from "./Button";

import logo from "../assets/images/shared/logo_simple_white.png";

import { ChevronDown } from "lucide-react";

function Navbar() {
  const [iconSize, setIconSize] = useState(36);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIconSize(24); // xl = 80rem = 1280px
      } else if (window.innerWidth < 1536) {
        setIconSize(32); // 2xl = 96rem = 1536px
      } else {
        setIconSize(36); // Larger than 2xl
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`mx-[5%] px-[2.5rem] pt-[2rem] pb-[0.5rem] flex justify-between bg-dark-blue`}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Homepage"
          className="h-[3rem] w-[auto] -translate-y-2"
        />
      </Link>
      <ul
        role="menu"
        aria-label="Main menu"
        className={`${styles.navList} flex gap-[3rem] xl:gap-[2rem]`}
      >
        <li role="menuitem" tabIndex="0" className={`${styles.dropdown} z-100`}>
          <div className={`flex`}>
            <span className={`mr-[0.5rem]`}>EVENT DETAILS</span>
            <ChevronDown size={iconSize} />
          </div>
          <ul role="menu" className={`${styles.dropdownContent}`}>
            <li role="menuitem" tabIndex="0">
              <Link to="/">
                SCHEDULE
              </Link>
            </li>
            <li role="menuitem" tabIndex="0">
              <Link to="/">
                WORKSHOPS
              </Link>
            </li>
          </ul>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/">
            SPONSORS
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/">
            FAQ
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Link to="/">
            SFU WICS
          </Link>
        </li>
        <li role="menuitem" tabIndex="0">
          <Button text="REGISTER" type="navbar" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
