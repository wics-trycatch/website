import styles from "./Wics.module.css";

import ProfileCard from "../components/ProfileCard";

import placeholder from "../assets/images/wics/placeholder_headshot.png";

function Wics() {
  return (
    <div>
      <div>
        <h1
          className={`displayText outsideStroke text-[2rem] text-powder-blue`}
        >
          SFU WiCS
        </h1>
        <p className={`mt-[1rem]`}>
          Try/CATCH is entirely run by enthusiastic volunteers from Simon Fraser
          University Computing Science students, faculty and staff. As such,
          Try/CATCH is dependent on the generosity of our sponsors in order to
          host this exciting initiative.
        </p>
      </div>

      <section className={`mt-[2rem]`}>
        <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
          Try/CATCH 2025 Committee
        </h2>

        <div>
          <ProfileCard
            img={placeholder}
            alt="Placeholder headshot"
            name="Mara David"
            role="Co-Chair, Website Developer"
            blurb="Lorem ipsum dolor sit amet consectetur. Fames ultricies ornare augue arcu fringilla rhoncus. In donec ut magna sed massa risus eget nulla. Massa neque nibh arcu in. Praesent eu aliquet non pharetra lectus lectus. Fermentum eget aliquam habitasse enim ornare condimentum. Bibendum cursus sed eros malesuada. In fermentum in et sit odio varius ornare nunc. Urna cras tempus faucibus malesuada et facilisis fringilla. Vitae congue eget sit feugiat in vitae imperdiet maecenas euismod. Amet."
          />
        </div>
      </section>
    </div>
  );
}

export default Wics;
