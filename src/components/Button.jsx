import { Link } from "react-router-dom";

function Button({ link, text, bgColor, textColor, type }) {
  return (
    <Link
      to={link}
      className={`font-body-bold bg-light-cyan ${bgColor} text-dark-blue ${textColor} px-[1.5rem] py-[0.5rem] border-[3.5px] 2xl:px-[3rem] 2xl:py-[1rem] 2xl:border-[6px] ${
        type === "hero"
          ? "text-[1.25rem] 2xl:text-[2rem]"
          : "text-[1rem] 2xl:text-[1.5rem]"
      }`}
    >
      {text}
    </Link>
  );
}

export default Button;
