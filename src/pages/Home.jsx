import { motion } from "framer-motion";

import styles from "./Home.module.css";

import Navbar from "../components/Navbar";
import PhotoWindow from "../components/PhotoWindow";
import Button from "../components/Button";
import HeroInfoBox from "../components/HeroInfoBox";
import GridBox from "../components/GridBox";
import PaintBox from "../components/PaintBox";

import banner_base from "../assets/images/home/banner_base.png";
import banner_texture from "../assets/images/home/banner_texture.png";
import logo from "../assets/images/shared/logo_full.png";
import scroll_more from "../assets/images/home/scroll_more.svg";
import paint_window from "../assets/images/home/paint_app_window.svg";
import bunny from "../assets/images/home/bunny.gif";
import scribble from "../assets/images/home/pixel_scribble.svg";
import star_light_blue from "../assets/images/shared/star_light_blue.svg";
import star_blue from "../assets/images/shared/star_blue.svg";
import sparkles_light_blue from "../assets/images/shared/sparkles_light_blue.svg";
import sparkles_blue from "../assets/images/shared/sparkles_blue.svg";

function Home() {
  return (
    <div className={`mx-auto`}>
      <Navbar />
      {/* Hero section */}
      <div className={`relative z-1000`}>
        <div
          className={`absolute z-100 top-[3.4rem] lg:top-[4rem] pl-[2.25rem] pr-[2.5rem] sm:pl-[1rem] md:pl-[3.5rem] 2xl:pl-[10rem]`}
        >
          <img
            src={logo}
            alt="Try/CATCH Logo"
            className={`w-[24rem] sm:w-[30rem] lg:w-[40rem] 2xl:w-[50rem] sm:ml-[1rem]`}
          />
          <div className={`mt-[1rem] ml-[2rem] mr-[1rem]`}>
            <p
              className={`${styles.heroDesc} max-w-[18rem] sm:max-w-[24rem] lg:max-w-[28rem] 2xl:max-w-[40rem]`}
            >
              A tech conference for high school girls and non-binary students to
              learn, connect, and get inspired.
            </p>
            <div className={`mt-[2rem] sm:mt-[3rem] 2xl:mt-[4rem]`}>
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
        <div
          className={`relative scale-100 origin-top ${styles.heroBanner} border-[8px] border-dark-blue`}
        >
          <PhotoWindow
            img={banner_base}
            imgWidth="w-[100%]"
            imgHeight="h-[36rem] lg:h-[40rem] 2xl:h-[56rem]"
            imgPosition="object-[55%_15%]"
            windowBorder="border-[0px]"
            alt="Group photo of Try/CATCH 2024 attendees at the SFU ASB Atrium"
          />
          <div className={`absolute inset-0`}>
            <PhotoWindow
              img={banner_texture}
              imgWidth="w-[100%]"
              imgHeight="h-[36rem] lg:h-[40rem] 2xl:h-[56rem]"
              imgPosition="object-[55%_15%]"
              windowBorder="border-[0px]"
              alt=" "
            />
          </div>

          {/* Try/CATCH location and date box */}
          <div
            className={`absolute z-100 right-[-3rem] md:right-[-4rem] lg:right-[-3rem] bottom-[-2rem] 2xl:bottom-[4rem] drop-shadow-[6px_6px_0_rgba(14,41,109,0.75)] md:drop-shadow-[8px_8px_0_rgba(14,41,109,0.75)]`}
          >
            <HeroInfoBox />
          </div>
          {/* END Try/CATCH location and date box */}

          {/* Scroll to learn more */}
          <motion.div
            className={`absolute z-1000 bottom-[-5rem] md:bottom-[-2rem] left-[2rem] md:left-[6rem] xl:left-[12rem] 2xl:left-[16rem]`}
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
            <img src={scroll_more} alt=" " className={`w-[16rem] lg:w-[20rem] 2xl:w-[24rem]`} />
          </motion.div>
          {/* END Scroll to learn more */}

          {/* Stars */}
            
          {/* Light blue star top left */}
          <img
            src={star_light_blue}
            alt=" "
            className={`absolute z-1000 w-[3rem] md:w-[4rem] 2xl:w-[5.5rem] top-[1rem] 2xl:top-[3rem] left-[-1.5rem] md:left-[-2.5rem] 2xl:left-[-3.5rem]`}
          />

          {/* Light blue sparkle top right */}
          <img
            src={sparkles_light_blue}
            alt=" "
            className={`absolute z-1000 w-[3.5rem] md:w-[4.75rem] 2xl:w-[7rem] top-[7rem] md:top-[10rem] xl:top-[16rem] right-[-1.25rem] md:right-[1.5rem] xl:right-[5rem]`}
          />

          {/* Blue star bottom right */}
          <img
            src={star_blue}
            alt=" "
            className={`absolute z-1000 w-[2.5rem] md:w-[3.25rem] 2xl:w-[4.5rem] bottom-[15rem] 2xl:bottom-[26rem] right-[-1.5rem] md:right-[-2rem] 2xl:right-[-2.5rem]`}
          />

          {/* Blue sparkle bottom left */}
          <img
            src={sparkles_blue}
            alt=" "
            className={`absolute z-1000 w-[4.5rem] md:w-[5.5rem] 2xl:w-[8rem] bottom-[1rem] 2xl:bottom-[6rem] left-[-2rem] md:left-[-2.25rem] 2xl:left-[-3rem]`}
          />

          {/* END Stars */}

        </div>
      </div>

      {/* END Hero section */}

      <div className={`relative grid md:grid-cols-2`}>
    
        {/* What is Try/CATCH? */}
        <PaintBox />
        {/* END What is Try/CATCH? */}

        {/* Highlights */}
        <section className={`relative mt-[1.5rem] overflow-hidden`}>
          <GridBox width="w-full" height="h-[40rem]" />
          <div
            className={`${styles.highlights} absolute top-[3.5rem] px-[1.5rem]`}
          >
            {/* Discover Tech */}
            <div>
              <h2 className={`${styles.highlightsTitle}`}>DISCOVER TECH</h2>
              <p>
                Explore coding, robotics, and design through hands-on workshops
                built for all ages and experience levels!
              </p>
            </div>
            {/* END Discover Tech */}

            {/* Meet Role Models */}
            <div>
              <h2 className={`${styles.highlightsTitle}`}>MEET ROLE MODELS</h2>
              <p>
                Connect with women in tech—from students to seasoned
                professionals—and hear what it’s really like in computing and
                engineering fields.
              </p>
            </div>
            {/* END Meet Role Models */}

            {/* Be Inspired */}
            <div>
              <h2 className={`${styles.highlightsTitle}`}>BE INSPIRED</h2>
              <p>
                Fuel your curiosity with keynotes, panels, and prizes. Walk away
                with new skills, new friends, and a glimpse into your future.
              </p>
            </div>
            {/* END Be Inspired */}
          </div>

          {/* Bunny GIF */}
          <div>
            <img
              src={bunny}
              alt=" "
              className={`absolute h-[17rem] bottom-[-1.45rem] left-[2.5rem]`}
            />
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

    </div>
  );
}

export default Home;
