import SponsorCard from "../components/SponsorCard";
import { sponsors } from "../data/sponsors";

import DisplayText from "../components/DisplayText";

function Sponsors() {
  // Filter sponsors by tier
  const goldSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Gold Sponsor"
  );
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Silver Sponsor"
  );
  const bronzeSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Bronze Sponsor"
  );
  const supporters = sponsors.filter((sponsor) => sponsor.tier === "Supporter");

  return (
    <div>
      <div>
        <h1 className={`text-[2rem] text-powder-blue`}>
          <DisplayText text="sponsors" />
        </h1>
        <p className={`mt-[-0.5rem]`}>
          Try/CATCH is entirely run by enthusiastic volunteers from Simon Fraser
          University Computing Science students, faculty and staff. As such,
          Try/CATCH is dependent on the generosity of our sponsors in order to
          host this exciting initiative. We're grateful to our sponsors for
          making try/CATCH possible. Their support helps us create opportunities
          for students to discover tech through hands-on workshops and inspiring
          speakers.
        </p>
      </div>

      <div>
        {/* Gold Sponsors */}
        {goldSponsors.length > 0 && (
          <section className={`mt-[2rem]`}>
            {/* <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
                Gold Sponsors
              </h2> */}
            <div className="grid gap-[3rem] lg:gap-[5rem] mt-[1rem]">
              {goldSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          </section>
        )}
        {/* Silver Sponsors */}
        {silverSponsors.length > 0 && (
          <section className={`mt-[2rem]`}>
            {/* <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
                Silver Sponsors
              </h2> */}
            <div className="grid gap-[3rem] lg:gap-[5rem] md:grid-cols-2 mt-[1rem]">
              {silverSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          </section>
        )}
        {/* Bronze Sponsors */}
        {bronzeSponsors.length > 0 && (
          <section className={`mt-[2rem]`}>
            {/* <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
                Bronze Sponsors
              </h2> */}
            <div className="grid gap-[3rem] lg:gap-[5rem] md:grid-cols-2 mt-[1rem]">
              {bronzeSponsors.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          </section>
        )}
        {/* Supporters */}
        {bronzeSponsors.length > 0 && (
          <section className={`mt-[2rem]`}>
            <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
              Supporters
            </h2>
            <div className="grid gap-[2rem] md:grid-cols-2 mt-[1rem]">
              {supporters.map((sponsor, i) => (
                <SponsorCard key={i} {...sponsor} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Sponsors;
