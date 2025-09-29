import styles from "./Wics.module.css";

import ProfileCard from "../components/ProfileCard";
import DisplayText from "../components/DisplayText";
import { organizers } from "../data/organizers";

function Wics() {
  return (
    <div>
      <div>
        <h1 className="text-[2rem] text-powder-blue">
          <DisplayText text="sfu wics"/>
        </h1>

        <p className={`mt-[-0.5rem]`}>
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

        <div className="grid gap-[2rem]">
          <div className="grid gap-[2rem] md:grid-cols-2 mt-[1rem]">
            {organizers.slice(0, 2).map((org, i) => (
              <ProfileCard key={i} {...org} />
            ))}
          </div>
          
          <div className="grid gap-[2rem] md:grid-cols-2 lg:grid-cols-3 mt-[1rem]">
            {organizers.slice(2).map((org, i) => (
              <ProfileCard key={i + 2} {...org} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

export default Wics;
