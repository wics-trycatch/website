import styles from "./HeroInfoBox.module.css";

function DisplayText({ text, x="5", y="100", fontSize }) {
  return (
    <svg
      viewBox="0 0 600 150"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="heading"
      className="w-full h-auto"
    >
      <title id="heading">sfu wics</title>
      <text
        x={x}
        y={y}
        fontSize={fontSize}
        fill="var(--color-powder-blue)"
        stroke="var(--color-dark-blue)"
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
        fontFamily="Dream MMA"
        className={`${styles.displayText} ${styles.outsideStroke}`}
      >
        {text.toLowerCase()}
      </text>
    </svg>
  );
}

export default DisplayText;