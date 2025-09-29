import { useState, useRef, useEffect } from "react";
import ShowMoreText from "react-show-more-text";

import styles from "./ProfileCard.module.css";

function KeynoteProfileCard({ img, imgProperties, alt, name, role, blurb }) {
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState("6.25rem"); // 5 lines height
  const [expandedHeight, setExpandedHeight] = useState("auto");
  const textRef = useRef(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    if (hiddenRef.current && textRef.current) {
      const fullHeight = hiddenRef.current.scrollHeight;
      setExpandedHeight(`${fullHeight}px`);
      
      const lineHeight = 20; // 1.25rem in pixels
      const fiveLineHeight = lineHeight * 18;
      setCollapsedHeight(`${fiveLineHeight}px`);
    }
  }, [blurb]);

  return (
    <div
      className={`${styles.card} overflow-hidden rounded-md border-[5px] border-sky-blue bg-sky-blue flex flex-col h-[32rem]`}
    >
        <div className={`grid grid-cols-[40%_auto]`}>
            <div
                className={`transition-all duration-500 h-[32rem] ${styles.keynoteHeadshot} overflow-hidden relative object-cover`}
            >
                <img
                src={img}
                alt={alt}
                className={`relative w-full h-full object-cover ${imgProperties}`}
                />
            </div>
        
            {/* Text Section */}
            <div 
                className="mt-[-3rem] bg-sky-blue transition-all duration-500 z-20"
                style={{
                paddingTop: expanded ? "0rem" : "1rem",
                paddingBottom: "0.75rem",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                maxHeight: expanded ? "32rem" : "10rem", // Limit to full card height
                background: "linear-gradient(to bottom, transparent 0%, rgba(157, 217, 254, 1) 30%, rgba(157, 217, 254, 1) 30%, rgba(157, 217, 254, 1) 100%)"
                }}
            >
                {/* Name and Role*/}
                <div
                className={`transition-all duration-500 z-30`}
                style={{
                    top: expanded ? "0rem" : "0rem",
                    left: "1.25rem"
                }}
                >
                <svg
                    viewBox="0 0 600 150"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="heading"
                    className="max-h-[7rem] mt-[1.5rem] ml-[-0.15rem]"
                >
                    <title id="heading">{name}</title>
                    <text
                    x="8"
                    y="120"
                    fontSize="3.75rem"
                    fill="white"
                    stroke="black"
                    strokeWidth="13"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fontFamily="Dream MMA"
                    className={`${styles.displayText} ${styles.outsideStroke}`}
                    >
                    {name.toLowerCase()}
                    </text>
                </svg>
                <p className={`!text-[1.25rem] !font-body-medium mb-[1.25rem]`}>{role}</p>
                </div>

                <div
                ref={textRef}
                className={`font-body text-[1rem]/[1.25rem] transition-all duration-500 ${
                    expanded ? "overflow-y-auto" : "overflow-hidden"
                }`}
                style={{
                    maxHeight: expanded ? "18rem" : collapsedHeight, // 18rem leaves room for name/role/button
                }}
                >
                {blurb}
                </div>
                <button
                onClick={() => setExpanded((prev) => !prev)}
                className="font-body-bold text-dark-blue cursor-pointer mt-2"
                >
                {expanded ? "Show less" : "Read more"}
                </button>
            </div>

        </div>

        {/* Hidden element to measure full text height */}
        <div
            ref={hiddenRef}
            className="absolute opacity-0 pointer-events-none font-body text-[1rem]/[1.25rem] px-[1.25rem]"
            style={{ 
            top: "-9999px", 
            width: "calc(100% - 2.5rem)",
            visibility: "hidden"
            }}
        >
            {blurb}
        </div>

    </div>
  );
}

export default KeynoteProfileCard;