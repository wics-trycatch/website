import ProfileCard from "../components/ProfileCard";
import { organizers } from "../data/organizers";
import { keynote } from "../data/keynote";
import { panelists } from "../data/panelists";

import DisplayText from "../components/DisplayText";

function Speakers() {
  return (
    <div>
      <div>
        <h1
          className={`text-[2rem] text-powder-blue`}
        >
          <DisplayText text="speakers"/>
        </h1>
        <p className={`mt-[-0.5rem]`}>
          Hear from inspiring women in tech as they share their journeys, challenges, and advice. Our keynote speaker and panelists bring real-world insights from industry and academia.
        </p>
      </div>

      <section className={`mt-[2rem]`}>
        <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
          Keynote Speaker
        </h2>

        <div className="grid gap-[2rem] mt-[1rem]">
          {keynote.map((speaker, i) => (
            <ProfileCard key={i} {...speaker} />
          ))}
        </div>
      </section>

    <section className={`mt-[2rem]`}>
        <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
          Panelists
        </h2>

        <div className="grid gap-[2rem] md:grid-cols-2 mt-[1rem]">
          {panelists.map((speaker, i) => (
            <ProfileCard key={i} {...speaker} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Speakers;
