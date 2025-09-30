import DisplayText from "../components/DisplayText";
import FaqAccordion from "../components/FaqAccordion";

function Faq() {
  const faqs = [
    {
      question: "What is Try/CATCH?",
      answer: "Try/CATCH (Computing and Technology Conference for Her) is a one day in-person event developed specifically for high school girls. Its objective is to foster curiosity about computing science with hands-on activities and provide confidence and basic knowledge to serve as a foundation for more advanced skills. We hope to provide a positive learning experience for the participants and to encourage their future endeavours in computing science and the field of technology."
    },
    {
      question: "Is there a skill requirement for attending Try/Catch? If have no technical experience, can I attend this event?",
      answer: "There is no skill requirement, and you could totally attend this event without any technical experience! This event is designed to introduce you to facets of Computing Science. No coding/circuitry/design experience is expected."
    },
    {
      question: "How much does it cost to attend Try/CATCH?",
      answer: "This event is completely FREE! All talks, workshops, panels, and refreshments are included. Additionally, attendees are eligible to win door prizes at the end of the event."
    },
    {
      question: "What should I do if I don't receive the confirmation email?",
      answer: "Confirmation emails will be sent out after registration opens. If you do not receive a confirmation email or are experiencing any problems, please email us at wics@sfu.ca with the email address you used for registration and the date of your registration. We will get back to you as soon as we can."
    },
    {
      question: "If my schedule changes and I am unable to make it to the event, what should I do?",
      answer: "Unfortunately, we are unable to change the date to accommodate everyone. However, please send us an email at wics@sfu.ca regarding your absence as soon as you can, so we can move a prospective participant off the waitlist. Hopefully you can join us next year!"
    },
    {
      question: "Can I bring my parents?",
      answer: "We will have a special Parent Info Session in the afternoon where there will be presentations by advisors from SFU's Faculty of Applied Sciences academic and co-op programs. However, in respect of the attendees' space, we ask that parents not join their children until the event is over."
    }
  ];

  return (
    <div className="">
      <div>
        <h1 className="text-[2rem] text-powder-blue">
          <DisplayText text="faq" fontSize="72" />
        </h1>
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] mb-[2rem] max-w-[1200px]">
          Find answers to common questions about Try/CATCH. If you don't see your question here, feel free to reach out to us at{" "}
          <a 
            href="mailto:wics@sfu.ca" 
            className="font-body-bold text-dark-blue hover:text-sky-blue transition-colors duration-300"
          >
            wics@sfu.ca
          </a>
        </p>
      </div>

      <section className="mt-[2rem]">
        {faqs.map((faq, index) => (
          <FaqAccordion
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </section>

      <div className="mt-[3rem] px-[1.5rem] py-[1.5rem] bg-powder-blue border-[4px] border-dark-blue rounded-md">
        <p className="font-body-bold text-[1.125rem] xl:text-[1.25rem] text-dark-blue mb-[0.5rem]">
          More questions?
        </p>
        <p className="font-body text-[1rem]/[1.5rem] xl:text-[1.125rem]/[1.75rem] text-dark-blue">
          Please email us at{" "}
          <a 
            href="mailto:wics@sfu.ca" 
            className="font-body-bold hover:text-sky-blue transition-colors duration-300"
          >
            wics@sfu.ca
          </a>
          . We will answer your questions as soon as we can. Thank you!
        </p>
      </div>
    </div>
  );
}

export default Faq;