import GridLines from "react-gridlines";
import styles from "./HeroInfoBox.module.css";

import window_options from "../assets/images/shared/window_options_simple.svg";
import kaomoji_box from "../assets/images/shared/kaomoji_message.svg";

function HeroInfoBox() {
  return (
    <div
      className={`w-[17rem] h-[15rem] bg-sky-blue border-[8px] border-t-[40px] border-dark-blue`}
    >
      <h2 className={`absolute top-0 font-body-bold text-white m-[0.5rem]`}>
        EVENT DATE ── .✦
      </h2>
      <img
        src={window_options}
        alt=" "
        className={`absolute top-[0.85rem] right-[1.5rem]`}
      />
      <GridLines
        className="absolute inset-0 p-[1rem] m-[8px] mt-[40px]"
        cellWidth={40}
        strokeWidth={4}
        lineColor="rgba(226,244,255,0.3)"
      >
        <p
          className={`absolute font-body text-dark-blue text-[1rem]/[1.25rem] bottom-[2rem] max-w-[13rem]`}
        >
          Try/CATCH is happening at{" "}
          <span className={`font-body-bold`}>SFU Burnaby Campus</span> on...{" "}
          <em
            className={`${styles.displayText} ${styles.outsideStroke} block font-display text-[1.5rem]/[1.5rem] text-powder-blue mt-[0.75rem]`}
          >
            <span className={`block`}>october</span>
            <span className={`block`}> 25, 2025</span>
          </em>
        </p>
      </GridLines>

      <img
        src={kaomoji_box}
        alt=" "
        className={`absolute top-[3rem] right-[1.5rem]`}
      />
    </div>
  );
}

export default HeroInfoBox;
