import { motion } from "framer-motion";

import styles from "./Home.module.css";

import Navbar from "../components/Navbar";
import PhotoWindow from "../components/PhotoWindow";
import Button from "../components/Button";
import HeroInfoBox from "../components/HeroInfoBox";
import GridBox from "../components/GridBox";
import PaintBox from "../components/PaintBox";
import HighlightsParagraph from "../components/HighlightsParagraph";
import FolderStatCard from "../components/FolderStatCard";
import PhotoCamera from "../components/PhotoCamera";

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
import attendees from "../assets/images/home/folder_attendees.svg";
import workshops from "../assets/images/home/folder_workshops.svg";
import sponsors from "../assets/images/home/folder_sponsors.svg";

import photo1 from '../assets/images/home/camera_photo_1.png';
import photo2 from '../assets/images/home/camera_photo_2.png';
import photo3 from '../assets/images/home/camera_photo_3.png';
import photo4 from '../assets/images/home/camera_photo_4.png';
import photo5 from '../assets/images/home/camera_photo_5.png';
import photo6 from '../assets/images/home/camera_photo_6.png';

import photo1_mobile from '../assets/images/home/camera_photo_mobile_1.png';
import photo2_mobile from '../assets/images/home/camera_photo_mobile_2.png';
import photo3_mobile from '../assets/images/home/camera_photo_mobile_3.png';
import photo4_mobile from '../assets/images/home/camera_photo_mobile_4.png';
import photo5_mobile from '../assets/images/home/camera_photo_mobile_5.png';
import photo6_mobile from '../assets/images/home/camera_photo_mobile_6.png';

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
                link="https://trycatch2025.eventbrite.ca/"
                target="_blank" rel="noopener noreferrer"
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
            className={`absolute z-100 right-[-3rem] md:right-[-4rem] lg:right-[-3rem] bottom-[-2rem] 2xl:bottom-[4rem]`}
          >
            <div className={`drop-shadow-[6px_6px_0_rgba(14,41,109,0.75)] md:drop-shadow-[8px_8px_0_rgba(14,41,109,0.75)]`}>
              <HeroInfoBox />
            </div>
            <img
              src={star_light_blue}
              alt=""
              className={`absolute w-[3.5rem] md:w-[4rem] 2xl:w-[5.5rem] top-[4.5rem] sm:top-[3.5rem] 2xl:top-[4rem] left-[-1.5rem] sm:left-[-2rem] 2xl:left-[-3rem]`}
            />
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

      {/* About Try/CATCH */}
      <div className={`relative h-full mt-[2rem] grid md:grid-cols-2`}>
        {/* What is Try/CATCH? */}
        <div>
          <PaintBox />
          {/* <div className={`px-[2rem] pt-[4rem] pb-[12rem] md:absolute md:top-[5rem] md:right-[-12rem]`}>
            <HighlightsParagraph />
          </div> */}
        </div>

        {/* Highlights */}
        <div className={`px-[2rem] pt-[4rem] h-full hidden md:block md:absolute md:inset-y-[5rem] md:right-[0] md:max-w-[50%]`}>
          <HighlightsParagraph />
        </div>
        {/* END What is Try/CATCH? */}

        <section className={`relative md:static mt-[1.5rem]`}>
          <div className={`md:absolute h-full md:w-full md:h-full z-[-1000] md:right-[-12rem] lg:right-[-24rem] top-[5rem] drop-shadow-[6px_6px_0_rgba(157,217,254,1)] md:drop-shadow-[6px_6px_0_rgba(157,217,254,1)]`}>
            <div className={`absolute z-[-1000] w-full h-full`}>
              <GridBox width="md:w-[calc(100%-12rem)] lg:w-[calc(100%-24rem)]" height="h-[100%] md:h-[calc(100%-4rem)]" />
            </div>

            <div className={`px-[2rem] pt-[4rem] pb-[12rem] md:hidden`}>
              <HighlightsParagraph />
            </div>
          
          </div>
        </section>
        {/* END Highlights */}
      </div>
      {/* END About Try/CATCH */}
      
      {/* Last year we had... */}
      <div className={`2xl:py-[5rem]`}>
        <h2 className={`mt-[3rem] md:mt-[7rem] 2xl:mb-[5rem]`}>
          {/* Mobile SVG */}
          <svg
            viewBox="0 0 1200 220"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="heading"
            className="w-full max-h-[20rem] p-[1rem] md:hidden ml-[-1rem]"
          >
            <title id="heading">last year we had...</title>
            <text
              x="8"
              y="100"
              fontSize={120}
              fill="white"
              stroke="var(--color-dark-blue)"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontFamily="Dream MMA"
              className={`${styles.displayText} ${styles.outsideStroke} stroke-[20px] drop-shadow-[10px_12px_0_rgba(14,41,109,1)]`}
            >
              <tspan x="10" dy="0">last year</tspan>
              <tspan x="10" dy="95">we had...</tspan>
            </text>
          </svg>

          {/* Desktop SVG */}
          <svg
            viewBox="0 0 1200 150"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="heading"
            className="w-full max-h-[12rem] p-[1rem] hidden md:block"
          >
            <title id="heading">last year we had...</title>
            <text
              x="8"
              y="100"
              fontSize={72}
              fill="white"
              stroke="var(--color-dark-blue)"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontFamily="Dream MMA"
              className={`${styles.displayText} ${styles.outsideStroke} stroke-[14px] drop-shadow-[8px_8px_0_rgba(14,41,109,1)]`}
            >
              last year we had...
            </text>
          </svg>
        </h2>

        <div className={`flex flex-col sm:flex-row gap-[3rem] mt-[2rem]`}>
            <div className={`mx-auto`}>
              <FolderStatCard folderImg={attendees} alt="85 Attendees" text="ATTENDEES" />
            </div>
            <div className={`mx-auto`}>
              <FolderStatCard folderImg={workshops} alt="5 Workshops" text="WORKSHOPS" />
            </div>
            <div className={`mx-auto`}>
              <FolderStatCard folderImg={sponsors} alt="10 Sponsors" text="SPONSORS" />
            </div>
        </div>
      </div>
      {/* END Last year we had... */}

      {/* Past year photos */}
      <div className={`relative mt-[8rem] 2xl:mt-[14rem]`}>
        <PhotoCamera 
          images={[photo1, photo2, photo3, photo4, photo5, photo6]} mobileImages={[photo1_mobile, photo2_mobile, photo3_mobile, photo4_mobile, photo5_mobile, photo6_mobile]} 
          interval={3000} 
        />
        <div className={`absolute inset-0 z-[-100] bg-gradient-to-t from-sky-blue to-light-blue`}></div>
      </div>
      {/* END Past year photos */}

      {/* More Try/CATCH 2025 Info */}
      <div className={`py-[3rem] 2xl:py-[10rem] pb-[10rem] 2xl:pb-[20rem] bg-sky-blue`}>
        <div className={`2xl:ml-[-1rem]`}>
          <h2 className={`pt-[3rem] md:pt-[7rem]`}>
            {/* Mobile SVG */}
            <svg
              viewBox="0 0 1200 220"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="heading"
              className="w-full max-h-[20rem] p-[1rem] md:hidden"
            >
              <title id="heading">try/catch 2025</title>
              <text
                x="600"
                y="100"
                fontSize={120}
                fill="var(--color-powder-blue)"
                stroke="var(--color-dark-blue)"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fontFamily="Dream MMA"
                textAnchor="middle"
                className={`${styles.displayText} ${styles.outsideStroke} stroke-[20px] drop-shadow-[10px_12px_0_rgba(14,41,109,1)]`}
              >
                <tspan x="600" dy="0">try/catch</tspan>
                <tspan x="600" dy="95">2025</tspan>
              </text>
            </svg>
            {/* Desktop SVG */}
            <svg
              viewBox="0 0 1200 150"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="heading"
              className="w-full max-h-[12rem] p-[1rem] hidden md:block"
            >
              <title id="heading">try/catch 2025</title>
              <text
                x="600"
                y="100"
                fontSize={72}
                fill="var(--color-powder-blue)"
                stroke="var(--color-dark-blue)"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
                fontFamily="Dream MMA"
                textAnchor="middle"
                className={`${styles.displayText} ${styles.outsideStroke} stroke-[14px] drop-shadow-[8px_8px_0_rgba(14,41,109,1)]`}
              >
                try/catch 2025
              </text>
            </svg>
          </h2>
          
          <div className={`px-[2rem]`}>
            <p className={`${styles.infoDesc} text-center mx-auto pt-[1.5rem] sm:pt-[2rem] md:pt-[0rem] xl:pt-[4rem] sm:max-w-[35rem] xl:max-w-[56rem]`}>
              This year's Try/CATCH event will be taking place on Saturday, October 25th, 2025 at the SFU Burnaby campus. <span className={`${styles.infoDescBold}`}>Registration is open!</span>
            </p>
            <div className={`flex flex-col sm:flex-row gap-[1rem] sm:gap-[2rem] justify-center mt-[4rem]`}>
                <Button link="https://trycatch2025.eventbrite.ca/" target="_blank" rel="noopener noreferrer" text="REGISTER" bgColor="bg-powder-blue" type="hero" />
                <Button link="/schedule" text="EVENT SCHEDULE" bgColor="bg-light-blue" type="hero" />
            </div>
          </div>
        </div>
      </div>
      {/* END More Try/CATCH 2025 Info */}

      

    </div>
  );
}

export default Home;
