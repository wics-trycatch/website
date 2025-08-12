import { Link } from "react-router-dom";

function Button({ link, text, bgColor, textColor, type }) {
  return (
    <Link
      to={link}
      className={`font-body-bold bg-light-cyan hover:bg-dark-blue hover:rounded-md ${bgColor} text-dark-blue hover:text-powder-blue ${textColor} px-[1.5rem] py-[0.5rem] 2xl:px-[3rem] 2xl:py-[1rem] transition-all duration-300 ease-in-out ${
        type === "hero"
          ? "text-[1.25rem] 2xl:text-[2rem] border-dark-blue border-[3.5px] 2xl:border-[6px]" 
          : type === "navbar"
          ? "text-[1rem] 2xl:text-[1.5rem] bg-white border-0 2xl:border-0"
          : "text-[1rem] 2xl:text-[1.5rem] border-dark-blue border-[3.5px] 2xl:border-[6px]"
      }`}
    >
      {text}
    </Link>
  );
}

export default Button;
