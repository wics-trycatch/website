import styles from "./Home.module.css";
import frameBg from "../assets_26/images/shared/frame_bg.svg";
import FaqAccordion from "../components/FaqAccordion";

const faqs = [
  {
    question: "What is Try/CATCH?",
    answer:
      "Try/CATCH (Computing and Technology Conference for Her) is a one day in-person event developed specifically for high school girls. Its objective is to foster curiosity about computing science with hands-on activities and provide confidence and basic knowledge to serve as a foundation for more advanced skills. We hope to provide a positive learning experience for the participants and to encourage their future endeavours in computing science and the field of technology.",
  },
  {
    question: "Is there a skill requirement for attending Try/Catch? If have no technical experience, can I attend this event?",
    answer:
      "There is no skill requirement, and you could totally attend this event without any technical experience! This event is designed to introduce you to facets of Computing Science. No coding/circuitry/design experience is expected.",
  },
  {
    question: "How much does it cost to attend Try/CATCH?",
    answer:
      "This event is completely FREE! All talks, workshops, panels, and refreshments are included. Additionally, attendees are eligible to win door prizes at the end of the event.",
  },
  {
    question: "What should I do if I don't receive the confirmation email?",
    answer:
      "Confirmation emails will be sent out after registration opens. If you do not receive a confirmation email or are experiencing any problems, please email us at wics@sfu.ca with the email address you used for registration and the date of your registration. We will get back to you as soon as we can.",
  },
  {
    question: "If my schedule changes and I am unable to make it to the event, what should I do?",
    answer:
      "Unfortunately, we are unable to change the date to accommodate everyone. However, please send us an email at wics@sfu.ca regarding your absence as soon as you can, so we can move a prospective participant off the waitlist. Hopefully you can join us next year!",
  },
  {
    question: "Can I bring my parents?",
    answer:
      "We will have a special Parent Info Session in the afternoon where there will be presentations by advisors from SFU's Faculty of Applied Sciences academic and co-op programs. However, in respect of the attendees' space, we ask that parents not join their children until the event is over.",
  },
];

function Faq() {
  return (
    <div className="relative bg-navy overflow-hidden -mx-[5.5556%]">
      {/* star + constellation background, tiled behind the whole page */}
      <div
        className="absolute inset-0 opacity-75 pointer-events-none"
        style={{ backgroundImage: `url(${frameBg})`, backgroundRepeat: "repeat", backgroundSize: "56rem auto" }}
        aria-hidden="true"
      />

      <section className="relative px-[6%] pt-[3rem] md:pt-[4rem] pb-[3rem] md:pb-[4rem] flex flex-col items-center gap-[1.5rem] md:gap-[2rem]">
        <div className="w-full max-w-[75rem] flex flex-col items-start gap-[1.5rem] md:gap-[2rem]">
          <p className="font-quicksand font-bold text-yellow text-[0.85rem] md:text-[0.95rem] tracking-[0.15em] uppercase">
            Got questions?
          </p>
          <h1 className={`${styles.sectionHeading} -mt-[1rem]`}>FAQ</h1>
          <p className="font-quicksand font-bold text-pink-light text-[1rem] md:text-[1.15rem] leading-relaxed">
            Check out our frequently asked questions to learn more about registration, workshops, what to bring, and
            everything else you need to know. Don't see your question here? Reach out to us at{" "}
            <a
              href="mailto:wics@sfu.ca"
              className="text-yellow underline decoration-yellow/50 hover:text-lavender-pale hover:decoration-lavender-pale/60 transition-colors duration-300"
            >
              wics@sfu.ca
            </a>
            .
          </p>

          <div className="w-full flex flex-col gap-[0.75rem] mt-[0.5rem]">
            {faqs.map((faq, i) => (
              <FaqAccordion key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq;
