import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FaqAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-[4px] border-dark-blue bg-white rounded-md overflow-hidden mb-[1rem]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[1.5rem] py-[1.25rem] flex justify-between items-center bg-sky-blue hover:bg-light-cyan transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <h3 className="font-body-bold text-[1.125rem] xl:text-[1.25rem] text-dark-blue text-left pr-[1rem]">
          {question}
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
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-[1.5rem] py-[1.25rem] font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default FaqAccordion;