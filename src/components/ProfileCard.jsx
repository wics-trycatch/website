import { useState, useRef, useEffect } from "react";
import ShowMoreText from "react-show-more-text";

import styles from "./ProfileCard.module.css";

function ProfileCard({ img, imgProperties, alt, name, role, blurb }) {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState("6.25rem");
  const blurbRef = useRef(null);

  useEffect(() => {
    if (blurbRef.current) {
      if (expanded) {
        // set to full scroll height when expanded
        setHeight(`${blurbRef.current.scrollHeight}px`);
      } else {
        setHeight("6.25rem");
      }
    }
  }, [expanded, blurb]);

  return (
    <div
      className={`${styles.card} overflow-hidden rounded-md border-[5px] border-sky-blue bg-sky-blue flex flex-col`}
    >
      <div
        className={`transition-all duration-500 ${
          expanded ? "h-[14rem]" : "h-[26.5rem]"
        } overflow-hidden relative ${styles.headshot} object-cover`}
      >
        <img
          src={img}
          alt={alt}
          className={`relative w-full h-full object-cover ${imgProperties}`}
        />
        <div className={`absolute bottom-[1.25rem] left-[1.25rem] z-100`}>
          <svg
            viewBox="0 0 600 150"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="heading"
            className="w-full h-auto ml-[-0.15rem]"
          >
            <title id="heading">sfu wics</title>
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
      </div>
      {/* Text Section */}
      <div className="flex-1 overflow-hidden relative px-[1.25rem] pb-[1.5rem]">
        <div
          ref={blurbRef}
          style={{ maxHeight: height }}
          className={`font-body text-[1rem]/[1.25rem] pb-[0.5rem] transition-all duration-500 overflow-hidden ${expanded ? "" : "line-clamp-5"}`}
        >
          {blurb}
        </div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="font-body-bold text-dark-blue cursor-pointer"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
