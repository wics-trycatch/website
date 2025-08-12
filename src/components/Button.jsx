import { Link } from 'react-router-dom';

function Button({link, text, bgColor, textColor, size, fontSize}){
    return(
        <Link to={link} className={`font-body-bold bg-light-cyan ${bgColor} text-dark-blue ${textColor} ${size === "small" ? "px-[1.5rem] py-[0.5rem] border-[3.5px]" : size === "large" ? "px-[3rem] py-[1rem] border-[6px]" : ""} ${fontSize}`}>
            {text}
        </Link>

    )
}

export default Button;
