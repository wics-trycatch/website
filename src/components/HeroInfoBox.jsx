import GridLines from "react-gridlines";
import styles from "./HeroInfoBox.module.css";

import DisplayText from "./DisplayText";
import window_options from "../assets/images/shared/window_options_simple.svg";
import kaomoji_box from "../assets/images/shared/kaomoji_message.svg";

function HeroInfoBox() {
  return (
    <div
      className={`w-[17rem] sm:w-[22rem] lg:w-[30rem] h-[15rem] bg-sky-blue border-[8px] border-t-[40px] border-dark-blue`}
    >
      <h2 className={`absolute top-0 font-body-bold text-white m-[0.5rem]`}>
        EVENT DATE ── .✦
      </h2>
      <img
        src={window_options}
        alt=" "
        className={`absolute top-[0.85rem] right-[1.5rem] sm:right-[0.75rem]`}
      />
      <GridLines
        className="absolute inset-0 p-[1rem] m-[8px] mt-[40px]"
        cellWidth={40}
        strokeWidth={4}
        lineColor="rgba(226,244,255,0.3)"
      >
        <p
          className={`absolute font-body text-dark-blue bottom-[0.75rem] max-w-[13rem] lg:max-w-[18rem]`}
        >
          <span className={`text-[1rem]/[1.25rem] lg:text-[1.25rem]/[1.25rem]`}>Try/CATCH is happening at{" "}
          <span className={`font-body-bold`}>SFU Burnaby Campus</span> on...{" "}</span>
          <em
            className={`${styles.displayText} ${styles.outsideStroke} block font-display text-[1.5rem]/[1.5rem] text-powder-blue mt-[0.75rem]`}
          >
            <svg
              viewBox="0 0 1000 150"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="heading"
              className="h-[2.7rem] sm:h-[3.5rem] lg:h-[5rem] mt-[-1.25rem] mb-[0.5rem] lg:mb-[-0.5rem]"
            >
              <title id="heading">event date</title>
              <text
                x="8"
                y="100"
                fontSize={72}
                fill="var(--color-powder-blue)"
                stroke="var(--color-dark-blue)"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fontFamily="Dream MMA"
                className={`${styles.displayText} ${styles.outsideStroke} stroke-[20px]`}
              >
                oct 25, 2025
              </text>
            </svg>
          </em>
        </p>
      </GridLines>

      <img
        src={kaomoji_box}
        alt=" "
        className={`absolute top-[4.5rem] sm:top-[3.25rem] lg:top-[4rem] right-[1.5rem] lg:right-[2rem] lg:w-[10rem]`}
      />
    </div>
  );
}

export default HeroInfoBox;
