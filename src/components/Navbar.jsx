import styles from "./Navbar.module.css";
import Button from "./Button";

import logo from "../assets/images/shared/logo_simple_white.png"

function Navbar(){
    return(
        <nav className={`mx-[5%] px-[2rem] py-[1.5rem] flex justify-between bg-dark-blue`}>
            <img src={logo} alt="Logo" className="h-[3rem] w-[auto]" />
            <ul className={`flex gap-[3rem]`}>
                <li>EVENT DETAILS
                    <ul>
                        <li className={`hidden`}>SCHEDULE</li>
                        <li className={`hidden`}>WORKSHOPS</li>
                    </ul>
                </li>
                <li>SPONSORS</li>
                <li>FAQ</li>
                <li>SFU WICS</li>
                <li><Button text="REGISTER" type="navbar" /></li>
            </ul>
        </nav>
    );
}

export default Navbar;