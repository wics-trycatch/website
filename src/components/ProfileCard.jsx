import { useState, useRef, useEffect } from "react";
import ShowMoreText from "react-show-more-text";

import styles from "./ProfileCard.module.css";

function ProfileCard({ img, imgProperties, alt, name, role, blurb }) {
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
      const fiveLineHeight = lineHeight * 5;
      setCollapsedHeight(`${fiveLineHeight}px`);
    }
  }, [blurb]);

  return (
    <div
      className={`${styles.card} overflow-hidden rounded-md border-[5px] border-sky-blue bg-sky-blue flex flex-col h-[32rem]`}
    >
      <div
        className={`transition-all duration-500 h-[22rem] overflow-hidden relative ${styles.headshot} object-cover`}
      >
        <img
          src={img}
          alt={alt}
          className={`relative w-full h-full object-cover ${imgProperties}`}
        />
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
      
      {/* Text Section */}
      <div 
        className="absolute bottom-0 left-0 bg-sky-blue transition-all duration-500 z-20"
        style={{
          paddingTop: expanded ? "7rem" : "1rem",
          paddingBottom: "0.75rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          maxHeight: expanded ? "32rem" : "10rem", // Limit to full card height
          background: "linear-gradient(to bottom, transparent 0%, rgba(157, 217, 254, 1) 30%, rgba(157, 217, 254, 1) 30%, rgba(157, 217, 254, 1) 100%)"
        }}
      >
        {/* Name and Role*/}
        <div
          className={`absolute transition-all duration-500 z-30`}
          style={{
            top: expanded ? "0rem" : "-6rem",
            left: "1.25rem"
          }}
        >
          <svg
            viewBox="0 0 600 150"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="heading"
            className="w-full h-auto ml-[-0.15rem]"
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
          <p className={`!text-[1.25rem] !font-body-medium`}>{role}</p>
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
  );
}

export default ProfileCard;