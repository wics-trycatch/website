import styles from "../pages/Home.module.css";
import bunny from "../assets/images/home/bunny.gif";

function HighlightsParagraph() {
  return (
    <div>
      {/* Discover Tech */}
      <div>
        <h2 className={`${styles.highlightsTitle}`}>DISCOVER TECH</h2>
        <p className={`${styles.aboutDesc}`}>
          Explore coding, robotics, and design through hands-on workshops built
          for all ages and experience levels!
        </p>
      </div>
      {/* END Discover Tech */}

      {/* Meet Role Models */}
      <div>
        <h2 className={`${styles.highlightsTitle}`}>MEET ROLE MODELS</h2>
        <p className={`${styles.aboutDesc}`}>
          Connect with women in tech—from students to seasoned professionals—and
          hear what it’s really like in computing and engineering fields.
        </p>
      </div>
      {/* END Meet Role Models */}

      {/* Be Inspired */}
      <div>
        <h2 className={`${styles.highlightsTitle}`}>BE INSPIRED</h2>
        <p className={`${styles.aboutDesc}`}>
          Fuel your curiosity with keynotes, panels, and prizes. Walk away with
          new skills, new friends, and a glimpse into your future.
        </p>
      </div>
      {/* END Be Inspired */}

      {/* Bunny GIF */}
      <div>
        <img
          src={bunny}
          alt=" "
          className={`absolute h-[17rem] lg:h-[20rem] xl:h-[23rem] bottom-[-1.5rem] md:bottom-[2.55rem] lg:bottom-[2.25rem] xl:bottom-[1.95rem] right-[2rem]`}
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
    </div>
  );
}

export default HighlightsParagraph;