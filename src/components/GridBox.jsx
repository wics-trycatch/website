import GridLines from "react-gridlines";

function GridBox({width, height}) {
  return (
    <div
      className={`relative ${width} ${height} bg-white border-[4px] border-t-[32px] border-dark-blue overflow-hidden`}
    >
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
