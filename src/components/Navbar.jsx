import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Button from "./Button";

import logo from "../assets/images/shared/logo_simple_white.png";

import { ChevronDown } from "lucide-react";

function Navbar() {
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
        className={`${styles.navList} flex gap-[3rem]`}
      >
        <li role="menuitem" tabIndex="0" className={`${styles.dropdown} z-100`}>
          <div className={`flex`}>
            <span className={`mr-[0.5rem]`}>EVENT DETAILS</span>
            <ChevronDown size={36} />
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
