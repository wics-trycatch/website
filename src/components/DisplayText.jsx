import styles from "./HeroInfoBox.module.css";

function DisplayText({ text, x="5", y="100" }) {
  return (
    <svg
      viewBox="0 0 1000 150"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="heading"
      className="max-h-[7.5rem]"
    >
      <title id="heading">sfu wics</title>
      <text
        x={x}
        y={y}
        fontSize={72}
        fill="var(--color-powder-blue)"
        stroke="var(--color-dark-blue)"
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
        fontFamily="Dream MMA"
        className={`${styles.displayText} ${styles.outsideStroke} stroke-[12px] sm:stroke-[10px]`}
      >
        {text.toLowerCase()}
      </text>
    </svg>
  );
}

export default DisplayText;