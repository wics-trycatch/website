import { Link } from "react-router-dom";
import logo from "../assets/images/shared/logo_full.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white mt-[4rem]">
      <div className="px-[2.5rem] py-[3rem] xl:px-[6rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2rem] xl:gap-[3rem]">
          
          {/* Logo and Description */}
          <div className="xl:col-span-2">
            <img 
              src={logo} 
              alt="Try/CATCH Logo" 
              className="w-[16rem] md:w-[18rem] xl:w-[20rem] 2xl:w-[24rem] mb-[1.5rem]"
            />
            <p className="font-body text-[1rem]/[1.25rem] max-w-[25rem] text-powder-blue">
              A tech conference for high school girls and non-binary students to learn, connect, and get inspired. Hosted by SFU Women in Computing Science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body-bold text-[1.25rem] mb-[1rem] text-light-cyan">
              QUICK LINKS
            </h3>
            <ul className="font-body text-[1rem] space-y-[0.5rem]">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link 
                  to="/speakers" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/sfu-wics" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  SFU WICS
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-body-bold text-[1.25rem] mb-[1rem] text-light-cyan">
              GET IN TOUCH
            </h3>
            <div className="font-body text-[1rem] space-y-[0.5rem]">
              <p>
                <a 
                  href="mailto:wics@sfu.ca" 
                  className="hover:text-powder-blue transition-colors duration-300"
                >
                  wics@sfu.ca
                </a>
              </p>
              

              {/* Social Links */}
            <div className="mt-[1.5rem]">
              <h4 className="font-body-bold text-[1rem] mb-[0.5rem]">
                FOLLOW US
              </h4>
              <div className="flex gap-[1rem]">
                <a 
                  href="https://www.instagram.com/sfuwics/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-powder-blue transition-colors duration-300"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.linkedin.com/company/sfu-wics/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-powder-blue transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            </div>

            
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-powder-blue mt-[2rem] pt-[1.5rem] flex flex-col md:flex-row justify-between items-center gap-[1rem]">
          <p className="font-body text-[0.875rem] text-center md:text-left">
            © {currentYear} SFU Women in Computing Science. All rights reserved.
          </p>
          <p className="font-body text-[0.875rem] text-center md:text-right">
            Made with 💙 by Bianca & Mara
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;