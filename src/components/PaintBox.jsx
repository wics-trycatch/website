import styles from "../pages/Home.module.css";

import window_options from "../assets/images/shared/window_options_complex.svg";
import window_name from "../assets/images/shared/info_bmp.svg";
import paint_tools_double from "../assets/images/shared/paint_tools_double.png";
import paint_tools_single from "../assets/images/shared/paint_tools_single.png";
import paint_nav from "../assets/images/shared/window_tools.png"
import scribble from "../assets/images/home/pixel_scribble.svg";

function PaintBox() {
  return (
    <section
      className={`relative mt-[3rem] p-[1rem] bg-light-cyan`}
      style={{
        boxShadow:
          "inset 0 -5px 0 0 var(--color-sky-blue), inset -5px 0 0 0 var(--color-sky-blue), inset 0 5px 0 0 white, inset 5px 0 0 0 white",
      }}
    >
      <div className={`w-full border-b-[3rem] border-dark-blue`}>
          <img src={window_name} alt=" " className={`absolute h-[1.5rem] sm:h-[2rem] top-[1.75rem] sm:top-[1.5rem] left-[2rem] sm:left-[1.5rem]`} />
          <img src={window_options} alt=" " className={`absolute h-[1.5rem] :h-[2rem] top-[1.75rem] sm:top-[1.5rem] right-[2rem] sm:right-[1.5rem]`} />
          <img src={paint_nav} alt=" " className={`absolute h-[1.75rem] sm:h-[2.25rem] md:h-[1.75rem] top-[4.25rem] left-[1.25rem] sm:left-[1.75rem]`} />
          <img src={paint_tools_single} alt=" " className={`absolute w-[2.75rem] top-[7rem] left-[1.25rem]`} />
      </div>

    
      <div className={`relative pl-[3.5rem]`}>
        <div className={`${styles.about} mt-[3rem] pb-[2rem] lg:p-[0.75rem] 2xl:pt-[2.25rem] 2xl:px-[2rem] lg:pb-[2.25rem] [4rem] min-h-[30.3rem] overflow-x-hidden bg-white border-[3px] border-black`}>
          <h2 className={`mt-[1.5rem] ml-[0.5rem] sm:ml-[1.5rem] md:ml-[0.75rem] max-w-[15rem]`}>
            <svg
              viewBox="0 0 500 150"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="heading"
              className="h-[14.5vw] md:h-[7.5vw] 2xl:h-[8rem] mt-[-1.25rem] ml-[2rem] sm:ml-[3rem] md:ml-[2rem] 2xl:ml-[3rem] mb-[-8.5vw] sm:mb-[-9vw] md:mb-[-4.65vw] 2xl:mb-[-5rem]"
            >
              <title id="heading">about</title>
              <text
                x="8"
                y="100"
                fontSize={72}
                fill="var(--color-powder-blue)"
                stroke="black"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fontFamily="Dream MMA"
                className={`${styles.displayText} ${styles.outsideStroke} stroke-[16px] sm:stroke-[12px]`}
              >
                about
              </text>
            </svg>
            <svg
              viewBox="0 0 600 150"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="heading"
              className="h-[14.5vw] md:h-[7.5vw] 2xl:h-[8rem] mb-[0.5rem] md:mb-[0.5rem]"
            >
              <title id="heading">try/catch</title>
              <text
                x="8"
                y="100"
                fontSize={72}
                fill="var(--color-powder-blue)"
                stroke="black"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fontFamily="Dream MMA"
                className={`${styles.displayText} ${styles.outsideStroke} stroke-[16px] sm:stroke-[12px]`}
              >
                try/catch
              </text>
            </svg>
          </h2>
          <img
            src={scribble}
            alt=" "
            className={`pl-[16vw] md:pl-[10vw] 2xl:pl-[11rem] mt-[-5.5vw] md:mt-[-3vw] 2xl:mt-[-3.5rem] 2xl:mb-[3rem] h-[6vw] md:h-[3vw] 2xl:h-[3rem]`}
          />
          <p
            className={`${styles.aboutDesc} mt-[1rem] pl-[1rem] sm:pl-[2rem] md:pl-[1rem] pr-[0.75rem] sm:pr-[2rem] md:pr-[0.75rem] 2xl:pb-[8rem] h-[77%] 2xl:max-w-[48rem]`}
          >
            <span className={`block mb-[1rem]`}>
              Try/CATCH (Computing and Technology Conference for Her) is a one-day
              event designed to spark curiosity and confidence in female and
              non-binary high school students in grades 8-12.
            </span>
            <span className={`block mb-[1rem]`}>
              The event offers interactive workshops in programming, robotics, and
              design, as well as a keynote, a Women in Tech panel, and
              opportunities to network with university students, alumnae, and
              industry professionals.
            </span>
            <span className={`block`}>
              With over 1,400 participants since 2009, Try/CATCH is more than just
              a conference—it's a space to explore technology in a supportive,
              inclusive, and empowering environment.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaintBox;
