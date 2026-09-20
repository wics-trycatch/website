import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Closed questions are just a row with a lavender divider underneath.
// The open one gets pulled into its own highlighted, rounded card instead
// of a line, matching the "GOT QUESTIONS?" mockup.
function FaqAccordion({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen
          ? "rounded-[1rem] md:rounded-[1.25rem] border border-purple-medium/50 bg-purple-deep/20 px-[1.25rem] md:px-[1.5rem] py-[1.25rem] md:py-[1.5rem]"
          : "border-b border-lavender-pale/25 px-0 py-[1.25rem] md:py-[1.5rem]"
      }`}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-[1rem] text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-quicksand font-bold text-lavender-pale text-[0.95rem] md:text-[1.15rem]">
          {question}
        </h3>
        <ChevronDown
          size={22}
          className={`text-yellow shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 mt-[1rem]" : "max-h-0 opacity-0"
        }`}
      >
        <p className="font-quicksand text-pink-light text-[0.9rem] md:text-[1rem] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default FaqAccordion;
