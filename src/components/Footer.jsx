import logo from "../assets_26/images/shared/logo_tiny.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-purple-medium/40 px-[6%] py-[2.5rem] -mx-[5.5556%] -mb-[2rem] mt-[2rem]">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-[2rem]">
        <img src={logo} alt="try/CATCH" className="w-[10rem] md:w-[12rem]" />

        <div className="flex flex-col items-center md:items-end gap-[0.75rem]">
          <div className="flex flex-nowrap justify-center gap-[0.65rem] md:gap-[2rem]">
            <a
              href="mailto:wics@sfu.ca"
              className="font-special-gothic font-bold text-white text-[0.6rem] md:text-[0.85rem] tracking-[0.03em] md:tracking-[0.05em] uppercase hover:text-yellow transition-colors duration-300 whitespace-nowrap"
            >
              Email
            </a>
            <a
              href="https://www.instagram.com/sfuwics/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-special-gothic font-bold text-white text-[0.6rem] md:text-[0.85rem] tracking-[0.03em] md:tracking-[0.05em] uppercase hover:text-yellow transition-colors duration-300 whitespace-nowrap"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/sfu-wics/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-special-gothic font-bold text-white text-[0.6rem] md:text-[0.85rem] tracking-[0.03em] md:tracking-[0.05em] uppercase hover:text-yellow transition-colors duration-300 whitespace-nowrap"
            >
              LinkedIn
            </a>
            <a
              href="https://www.sfuwics.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-special-gothic font-bold text-white text-[0.6rem] md:text-[0.85rem] tracking-[0.03em] md:tracking-[0.05em] uppercase hover:text-yellow transition-colors duration-300 whitespace-nowrap"
            >
              sfuwics.com
            </a>
          </div>

          <p className="font-special-gothic text-lavender-pale text-[0.85rem]">
            &copy; {currentYear} SFU Women in Computing Science
          </p>
          <p className="font-special-gothic text-lavender-pale text-[0.8rem]">
            Made with 🤍 by Manjari and Tina
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
