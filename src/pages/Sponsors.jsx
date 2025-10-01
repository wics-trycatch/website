import SponsorCard from "../components/SponsorCard";
import GoldSponsorCard from "../components/GoldSponsorCard";
import { sponsors } from "../data/sponsors";

import DisplayText from "../components/DisplayText";

function Sponsors() {
  // Filter sponsors by tier
  const goldSponsors = sponsors.filter(sponsor => sponsor.tier === "gold");
  const silverSponsors = sponsors.filter(sponsor => sponsor.tier === "silver");
  const bronzeSponsors = sponsors.filter(sponsor => sponsor.tier === "bronze");

  return (
    <div>
      <div>
        <h1 className={`text-[2rem] text-powder-blue`}>
          <DisplayText text="sponsors"/>
        </h1>
        <p className={`mt-[-0.5rem]`}>
          We're grateful to our sponsors for making try/CATCH possible. Their support helps us create opportunities for students to discover tech through hands-on workshops and inspiring speakers.
        </p>
      </div>

      {/* Gold Sponsors */}
      {goldSponsors.length > 0 && (
        <section className={`mt-[2rem]`}>
          <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
            Gold Sponsors
          </h2>

          <div className="grid gap-[2rem] mt-[1rem]">
            {goldSponsors.map((sponsor, i) => (
              <div key={i}>
                <div className="hidden lg:block">
                  <GoldSponsorCard {...sponsor} />
                </div>
                <div className="block lg:hidden">
                  <SponsorCard {...sponsor} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Silver Sponsors */}
      {silverSponsors.length > 0 && (
        <section className={`mt-[2rem]`}>
          <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
            Silver Sponsors
          </h2>

          <div className="grid gap-[2rem] md:grid-cols-2 mt-[1rem]">
            {silverSponsors.map((sponsor, i) => (
              <SponsorCard key={i} {...sponsor} />
            ))}
          </div>
        </section>
      )}

      {/* Bronze Sponsors */}
      {bronzeSponsors.length > 0 && (
        <section className={`mt-[2rem]`}>
          <h2 className={`text-[1.5rem] font-body-bold text-dark-blue`}>
            Bronze Sponsors
          </h2>

          <div className="grid gap-[2rem] md:grid-cols-2 lg:grid-cols-3 mt-[1rem]">
            {bronzeSponsors.map((sponsor, i) => (
              <SponsorCard key={i} {...sponsor} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Sponsors;

// Example data structure for sponsors.js:
// export const sponsors = [
//   {
//     name: "Gold Company",
//     logo: "/path/to/logo.png",
//     blurb: "Description of the sponsor and their contribution...",
//     website: "https://company.com",
//     tier: "gold"
//   },
//   {
//     name: "Silver Company",
//     logo: "/path/to/logo.png",
//     website: "https://company.com",
//     tier: "silver"
//   },
//   {
//     name: "Bronze Company",
//     logo: "/path/to/logo.png",
//     website: "https://company.com",
//     tier: "bronze"
//   }
// ];