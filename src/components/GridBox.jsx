import GridLines from "react-gridlines";
import window_options from "../assets/images/shared/window_options_complex.svg";

function GridBox({width, height}) {
  return (
    <div
      className={`relative ${width} ${height} bg-white border-[4px] border-t-[40px] border-dark-blue`}
    >
      <img src={window_options} alt=" " className={`absolute h-[1.5rem] sm:h-[1.875rem] top-[-1.95rem] sm:top-[-2.1rem] right-[0.5rem] sm:right-[0.5rem]`} />
      <GridLines
        className="absolute inset-0 p-[1rem]"
        cellWidth={40}
        strokeWidth={4}
        lineColor="rgba(226,244,255,0.8)"
      >
      </GridLines>
    </div>
  );
}

export default GridBox;
