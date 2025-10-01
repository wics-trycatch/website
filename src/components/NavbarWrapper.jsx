import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import NavbarSecondary from "./NavbarSecondary.jsx";

function NavbarWrapper() {
  const location = useLocation();

  // Adjust this to match your Home route ("/")
  const isHome = location.pathname === "/";

  return isHome ? <Navbar /> : <NavbarSecondary />;
}

export default NavbarWrapper;
