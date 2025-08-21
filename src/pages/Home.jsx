import { motion } from "framer-motion";

import styles from "./Home.module.css";

import Navbar from "../components/Navbar";
import PhotoWindow from "../components/PhotoWindow";
import Button from "../components/Button";
import HeroInfoBox from "../components/HeroInfoBox";
import GridBox from "../components/GridBox"

import banner_base from "../assets/images/home/banner_base.png";
import banner_texture from "../assets/images/home/banner_texture.png";
import logo from "../assets/images/shared/logo_full.png";
import scroll_more from "../assets/images/home/scroll_more.svg";
import paint_window from "../assets/images/home/paint_app_window.svg";
import bunny from "../assets/images/home/bunny.gif";

function Home() {
  return (
    <div className={`bg-light-cyan overflow-x-none max-w-[128rem] mx-[auto] pt-[2rem]`}>
      <Navbar/>
      {/* Hero section */}
      <div className={`relative`}>
        <div
          className={`absolute z-100 top-[6rem] md:top-[13rem] pl-[2.25rem] pr-[2.5rem] md:pl-[6rem] lg:pl-[8rem] 2xl:pl-[10rem]`}
        >
          <img
            src={logo}
            alt="Try/CATCH Logo"
            className={`w-[20rem] md:w-[30rem] 2xl:w-[50rem]`}
          />
          <div className={`mt-[1rem] ml-[2rem] mr-[1rem]`}>
            <p className={`${styles.heroDesc} max-w-[18rem] 2xl:max-w-[40rem]`}>
              A tech conference for high school girls and non-binary students to
              learn, connect, and get inspired.
            </p>
            <div className={`mt-[2rem] 2xl:mt-[4rem]`}>
              <Button
                link="/"
                text="REGISTER"
                size="small"
                fontSize="text-[1.25rem]"
                type="hero"
              />
            </div>
          </div>
        </div>
        <div className={`scale-90 origin-top ${styles.heroBanner} border-[8px] border-dark-blue`}>
          <PhotoWindow
            img={banner_base}
            imgWidth="w-[100%]"
            imgHeight="h-[80vh] sm:h-[92vh]"
            imgPosition="object-[55%_15%]"
            windowBorder="border-[0px]"
            alt="Group photo of Try/CATCH 2024 attendees at the SFU ASB Atrium"
          />
          <div className={`absolute inset-0`}>
            <PhotoWindow
                img={banner_texture}
                imgWidth="w-[100%]"
                imgHeight="h-[80vh] sm:h-[92vh]"
                imgPosition="object-[55%_15%]"
                windowBorder="border-[0px]"
                alt=" "
            />
          </div>
        </div>
      </div>

      {/* Try/CATCH location and date box */}
      <div className={`absolute z-10 right-[-1rem] bottom-[4rem]`}>
        <HeroInfoBox />
      </div>
      {/* END Try/CATCH location and date box */}

      {/* Scroll to learn more */}
      <motion.div
        className={`absolute z-1000 bottom-[1rem] left-[4rem]`}
        animate={{
          y: [0, -10, 0], // bob up and down
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 2.5, 
          repeat: Infinity,
          repeatDelay: 2.5, 
        }}>
        <img src={scroll_more} alt=" "/>
      </motion.div>
      {/* END Scroll to learn more */}
      {/* END Hero section */}

      {/* What is Try/CATCH? */}
      <section className={`mt-[3rem] mx-[5%]`}>
        <img src={paint_window} alt=" " />
      </section>
      {/* END What is Try/CATCH? */}

      {/* Highlights */}
      <section className={`relative mt-[3rem] mx-[5%] overflow-hidden`}>
        <GridBox width="w-full" height="h-[40rem]" />
        <div className={`${styles.highlights} absolute top-[3.5rem] px-[1.5rem]`}>
          {/* Discover Tech */}
          <div>
            <p className={`${styles.highlightsTitle}`}>
              DISCOVER TECH
            </p>
            <p>
              Explore coding, robotics, and design through hands-on workshops built for all ages and experience levels!
            </p>
          </div>
          {/* END Discover Tech */}

          {/* Meet Role Models */}
          <div>
            <p className={`${styles.highlightsTitle}`}>
              MEET ROLE MODELS
            </p>
            <p>
              Connect with women in tech—from students to seasoned professionals—and hear what it’s really like in computing and engineering fields.
            </p>
          </div>
          {/* END Meet Role Models */}

          {/* Be Inspired */}
          <div>
            <p className={`${styles.highlightsTitle}`}>
              BE INSPIRED
            </p>
            <p>
              Fuel your curiosity with keynotes, panels, and prizes. Walk away with new skills, new friends, and a glimpse into your future.
            </p>
          </div>
          {/* END Be Inspired */}
        </div>

        {/* Bunny GIF */}
        <div>
          <img src={bunny} alt=" " className={`absolute h-[17rem] bottom-[-1.45rem] left-[2.5rem]`} />
          {/* Blue saturation overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(164, 235, 255, 1)",
              mixBlendMode: "saturation",
            }}
          />
        </div>
        {/* END Bunny GIF */}
      </section>
      {/* END Highlights */}

    </div>
  );
}

export default Home;
