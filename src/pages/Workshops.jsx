import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DisplayText from "../components/DisplayText";
import { workshops } from "../data/workshops";

function WorkshopHostCard({ img, name, blurb }) {
  return (
    <div className="flex flex-col sm:flex-row gap-[1rem] items-start p-[1rem] border-[3px] border-dark-blue">
      <img
        src={img}
        alt={name}
        className="w-[8rem] h-[8rem] object-cover rounded-md border-[3px] border-dark-blue flex-shrink-0"
      />
      <div>
        <h4 className="font-body-bold text-[1.125rem] text-dark-blue mb-[0.25rem]">
          {name}
        </h4>
        <p className="font-body text-[0.875rem]/[1.25rem] text-dark-blue">
          {blurb}
        </p>
      </div>
    </div>
  );
}

function WorkshopAccordion({ title, description, hosts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-[4px] border-dark-blue bg-white rounded-md overflow-hidden mb-[1rem]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[1.5rem] py-[1.25rem] flex justify-between items-center bg-sky-blue hover:bg-light-cyan transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <h3 className="font-body-bold text-[1.125rem] xl:text-[1.25rem] text-dark-blue text-left pr-[1rem]">
          {title}
        </h3>
        <ChevronDown
          size={28}
          className={`text-dark-blue flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-[1.5rem] py-[1.25rem]">
          <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue mb-[1.5rem]">
            {description}
          </p>
          
          <h4 className="font-body-bold text-[1.125rem] text-dark-blue mb-[1rem]">
            Workshop Hosts
          </h4>
          <div className="grid gap-[1rem]">
            {hosts.map((host, index) => (
              <WorkshopHostCard key={index} {...host} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Workshops() {
  return (
    <div className="">
      <div>
        <h1 className="text-[2rem] text-powder-blue">
          <DisplayText text="workshops" fontSize="72" />
        </h1>
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] mb-[2rem] max-w-[1200px]">
          Explore hands-on workshops designed to introduce you to different areas of technology. 
          Each workshop is led by experienced instructors who are passionate about sharing their knowledge. 
          Click on any workshop to learn more about what you'll build and who will be teaching!
        </p>
      </div>

      <section className="mt-[2rem]">
        {workshops.map((workshop, index) => (
          <WorkshopAccordion
            key={index}
            title={workshop.title}
            description={workshop.description}
            hosts={workshop.hosts}
          />
        ))}
      </section>

      <div className="mt-[3rem] px-[1.5rem] py-[1.5rem] bg-powder-blue border-[4px] border-dark-blue rounded-md">
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue">
          During the event, you'll participate in two workshops. When you register for the event, you'll let us know your top workshop choices and we'll do our best to accomodate everyone for their top choices!
          For more information, email us at{" "}
          <a 
            href="mailto:wics@sfu.ca" 
            className="font-body-bold hover:text-sky-blue transition-colors duration-300"
          >
            wics@sfu.ca
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Workshops;