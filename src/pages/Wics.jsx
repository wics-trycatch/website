import styles from "./Wics.module.css";

import ProfileCard from "../components/ProfileCard";
import DisplayText from "../components/DisplayText";
import { organizers } from "../data/organizers";

function Wics() {
  return (
    <div>
      <div>
        <h1 className="displayText outsideStroke text-[2rem] text-powder-blue">
          <DisplayText text="sfu wics" fontSize="72" />
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

        <div className="grid gap-[2rem] mt-[1rem]">
          {organizers.map((org, i) => (
            <ProfileCard key={i} {...org} />
          ))}
        </div>

      </section>
    </div>
  );
}

export default Wics;
