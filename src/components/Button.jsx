import { Link } from "react-router-dom";

function Button({ link, target, rel, text, bgColor, textColor, type }) {
  return (
    <Link
      to={link}
      target={target}
      rel={rel}
      className={`font-body-bold bg-light-cyan  hover:rounded-md ${bgColor} text-dark-blue ${textColor} px-[1.5rem] py-[0.5rem] 2xl:py-[1rem] transition-all duration-300 ease-in-out ${
        type === "hero"
          ? "text-[1.25rem] xl:text-[1.5rem] 2xl:text-[2rem] hover:bg-dark-blue border-dark-blue hover:text-powder-blue border-[3.5px] 2xl:border-[6px] 2xl:px-[3rem]" 
          : type === "navbar"
          ? "text-[1rem] xl:text-[1.25rem] 2xl:text-[1.5rem] bg-white hover:bg-powder-blue hover:text-dark-blue border-0 2xl:border-0 2xl:px-[2rem]"
          : "text-[1rem] xl:text-[1.25rem] 2xl:text-[1.5rem] hover:bg-dark-blue border-dark-blue hover:text-powder-blue border-[3.5px] 2xl:border-[6px] 2xl:px-[3rem]"
      }`}
    >
      {text}
    </Link>
  );
}

export default Button;
