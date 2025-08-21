function HeroInfoBox() {
  return (
    <div className={`w-[17rem] h-[15rem] bg-white`}>
      <h2>EVENT DATE</h2>
      <p>
        Try/CATCH is happening at <span>SFU Burnaby Campus</span> on...{" "}
        <em className={`block`}>October 25, 2025</em>
      </p>
    </div>
  );
}

export default HeroInfoBox;
