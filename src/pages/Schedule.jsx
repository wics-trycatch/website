import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import DisplayText from "../components/DisplayText";

import { scheduleData } from "../data/schedule";

function ScheduleItem({ time, activity, location, description }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-[4px] border-dark-blue bg-white rounded-md overflow-hidden mb-[1.5rem]">
      {/* Time Header */}
      <div className="bg-sky-blue px-[1.5rem] pt-[1rem] pb-[0.5rem] border-b-[3px] border-dark-blue">
        <svg
          viewBox="0 0 1200 150"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={time}
          className="h-[3rem] xl:h-[3.5rem] w-full"
          preserveAspectRatio="xMinYMid meet"
          style={{
            filter: "drop-shadow(3px 3px 0px var(--color-dark-blue))"
          }}
        >
          <text
            x="8"
            y="100"
            fontSize={72}
            fill="var(--color-powder-blue)"
            stroke="var(--color-dark-blue)"
            strokeWidth="10"
            strokeLinejoin="round"
            strokeLinecap="round"
            fontFamily="Dream MMA"
            style={{
              WebkitTextStroke: "8px var(--color-dark-blue)",
              paintOrder: "stroke fill"
            }}
          >
            {time.toLowerCase()}
          </text>
        </svg>
      </div>

      {/* Activity Info */}
      <div className="px-[1.5rem] py-[1.25rem]">
        <h3 className="font-body-bold text-[1.25rem] xl:text-[1.5rem] text-dark-blue mb-[0.5rem]">
          {activity}
        </h3>
        
        {location && (
          <div className="flex items-start gap-[0.5rem] mb-[1rem]">
            <MapPin size={20} className="text-dark-blue flex-shrink-0 mt-[0.15rem]" />
            <p className="font-body text-[1rem] xl:text-[1.125rem] text-dark-blue">
              {location}
            </p>
          </div>
        )}

        {description && (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-[0.5rem] font-body-bold text-[1rem] text-dark-blue hover:text-sky-blue transition-colors duration-300"
              aria-expanded={isOpen}
            >
              <span>Read more</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100 mt-[1rem]" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue">
                {description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Schedule() {

  return (
    <div>
      <div>
        <h1 className="text-[2rem] text-powder-blue">
          <DisplayText text="schedule" />
        </h1>
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] mb-[2rem] max-w-[1200px]">
          Here's what to expect on October 25, 2025 at SFU Burnaby Campus. The day is packed with workshops, speakers, networking, and fun! 
        </p>
      </div>

      <section className="mt-[2rem]">
        {scheduleData.map((item, index) => (
          <ScheduleItem key={index} {...item} />
        ))}
      </section>

      <div className="mt-[3rem] px-[1.5rem] py-[1.5rem] bg-powder-blue border-[4px] border-dark-blue rounded-md">
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue">
          This schedule is subject to change. We'll send updates to all registered participants if there are any modifications. Make sure to check your email before the event!
        </p>
      </div>
    </div>
  );
}

export default Schedule;