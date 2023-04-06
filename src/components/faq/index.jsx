import { useState } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FaqAccordion = ({ faqList }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="max-w-4xl mx-auto">
      {faqList.map((faq, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="flex items-center justify-between w-full py-4 pl-4 pr-2 font-medium text-left focus:outline-none"
            onClick={() =>
              setActiveQuestion(activeQuestion === index ? null : index)
            }
          >
            <span className="text-sm md:text-base">{faq.question}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`ml-2 w-5 h-5 transition-transform ${
                activeQuestion === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <Transition
            show={activeQuestion === index}
            enter="transition-all duration-200 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-96"
            leave="transition-all duration-200 ease-in"
            leaveFrom="opacity-100 max-h-96"
            leaveTo="opacity-0 max-h-0"
          >
            {(ref) => (
              <div ref={ref} className="overflow-hidden px-4 pb-4 pt-2">
                <p className="text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            )}
          </Transition>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
