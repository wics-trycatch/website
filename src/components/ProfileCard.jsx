import { useState } from "react";
import ShowMoreText from "react-show-more-text";

import styles from "./ProfileCard.module.css";

function ProfileCard({ img, imgProperties, alt, name, role, blurb }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.card} overflow-hidden rounded-md border-[5px] border-sky-blue bg-sky-blue h-[36rem] flex flex-col`}
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
          <p
            className={`${styles.displayText} ${styles.outsideStroke} !text-[1.875rem] text-white mb-[1rem]`}
          >
            {name}
          </p>
          <p className={`!text-[1.25rem] !font-body-medium`}>{role}</p>
        </div>
      </div>
      {/* Text Section */}
      <div className="flex-1 overflow-hidden relative px-[1.25rem]">
        <div
          className={`font-body text-[1rem]/[1.25rem] transition-all duration-500 ${
            expanded ? "line-clamp-none" : "line-clamp-5"
          }`}
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
