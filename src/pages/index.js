import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheck,
  faCheckCircle,
  faPercent,
  faPlane,
  faCreditCard,
  faCloudDownload,
} from "@fortawesome/free-solid-svg-icons";
import FaqAccordion from "@/components/faq";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const keyFeatures = [
  {
    icon: <FontAwesomeIcon icon={faBolt} />,
    iconClassName: "text-yellow-500",
    title: "Instant Download",
    description: "Get your documents right away, without any delays",
  },
  {
    icon: <FontAwesomeIcon icon={faCheckCircle} />,
    iconClassName: "text-green-500",
    title: "Verified Reservation",
    description:
      "We ensure that your flight reservation is verifiable in airlines website",
  },
  {
    icon: <FontAwesomeIcon icon={faPercent} />,
    iconClassName: "text-blue-600",
    title: "Affordable",
    description:
      "Save money on expensive flight tickets with our affordable, legitimate flight reservations",
  },
];

const pricingBenefits = [
  {
    title: "PDF flight ticket",
    description: "Get your flight reservation instantly in PDF format",
  },
  {
    title: "Instant download",
    description: "Get your documents right away, without any delays",
  },
  {
    title: "Verified reservation",
    description: "Your flight reservation is verifiable in airlines website",
  },
];

const questions = [
  {
    question:
      "What is a verified flight reservation and why do I need one for my visa application?",
    answer:
      "A verified flight reservation is a booking that has been confirmed and verified with the airline, and is often required as part of a visa application. It shows that you have a confirmed itinerary and proof of travel plans. Without a verified reservation, your visa application may be denied.",
  },
  {
    question:
      "Is your service legitimate and will the reservations be accepted by the embassy?",
    answer:
      "Yes, our service is legitimate and our verified flight reservations are accepted by embassies and consulates worldwide. We take the verification process seriously and ensure that all reservations meet embassy requirements and are fully verified with the airline.",
  },
  {
    question: "How much does it cost to use your travel document service?",
    answer:
      "The cost of our travel document service depends on the type of document you need and the options you choose. We offer competitive pricing and a range of affordable options to meet your needs. Please visit our website for more information on pricing.",
  },
  {
    question: "How fast can I get my reservation once I make a payment?",
    answer:
      "Once you make a payment, you can typically download your reservation instantly. In some cases, it may take up to a few hours to receive your reservation. We offer instant download options for most of our services.",
  },
  {
    question:
      "What airlines do you work with for the verified flight reservations?",
    answer:
      "We work with a variety of airlines to provide verified flight reservations. Our team is familiar with embassy requirements and can help you select the best airline for your needs.",
  },
  {
    question:
      "What types of payment do you accept for your travel document service?",
    answer:
      "We accept multiple forms of payment for our travel document service, including credit cards and PayPal. Please visit our website for more information on payment options.",
  },
  {
    question: "Can I make changes to my reservation after I receive it?",
    answer:
      "Depending on the airline, changes to your reservation may be possible. Please contact our customer support team for assistance with making changes to your reservation.",
  },
  {
    question:
      "Do you offer any guarantees or refunds for your travel document service?",
    answer:
      "We stand behind the quality of our service and offer a satisfaction guarantee. If for any reason you are not satisfied with our travel document service, we offer a full refund within a certain timeframe. Please see our website for more information on our refund policy.",
  },
  {
    question: "How secure is your website and payment process?",
    answer:
      "We take website and payment security seriously and use industry-standard security measures to protect your information. Our website uses SSL encryption to ensure that your data is safe and secure during transmission. We also use secure payment gateways to process all payments.",
  },
];

const testimonials = [
  {
    user: "Jessica T.",
    handle: "@JetsetJess",
    review:
      "I was skeptical at first, but this service exceeded my expectations! The process was straightforward and the reservation was fully verified with the airline. I would definitely use this service again.",
  },
  {
    user: "Sarah K.",
    handle: "@PassportQueen",
    review:
      "The prices were unbeatable compared to other options out there. I would definitely use this service again in the future.",
  },
  {
    user: "Michael L.",
    handle: "@WanderlustMike",
    review:
      "I no longer have to worry about the hassle of making my own reservations or dealing with expensive travel agencies. I highly recommend this service to anyone who travels frequently.",
  },
];

const orderSteps = [
  {
    icon: faPlane,
    title: "Choose Your Route",
    description:
      "Select the route, flight detail, and enter your passenger details.",
  },
  {
    icon: faCreditCard,
    title: "Complete Payment",
    description:
      "Pay with multiple 100% secure payment options to suit your needs.",
  },
  {
    icon: faCloudDownload,
    title: "Download Your Reservation",
    description:
      "No more waiting around for your reservation to arrive, instant, right you your device.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Flight — Hassle Free Traveling</title>
        <meta
          name="description"
          content="Get your verified flight itinerary. cheap and instant."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainLayout>
          <section className="pb-4 md:pb-8 pt-4 md:pt-12 flex items-center">
            <div>
              <div
                className={`text-5xl lg:text-8xl font-bold leading-[50px] lg:leading-[104px]`}
              >
                Traveling was never this easy.
              </div>
              <p className="mt-4 text-base lg:text-2xl font-regular leading-snug text-gray-500">
                Instantly Get a{" "}
                <span className="font-bold">Verified Flight Reservation</span>{" "}
                for Visa Application. Hassle-Free with single cheap price!
              </p>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/hero-1.png"
                alt="hero image"
                width={600}
                height={600}
              />
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center gap-4">
            <Link
              href="/order"
              className="py-2 md:py-4 px-3 md:px-6 rounded-lg bg-blue-700 text-white w-full md:w-auto"
            >
              Order Now ($10)
            </Link>
            <button className="py-4 px-4 rounded-lg w-full md:w-auto">
              See a Preview &#8594;
            </button>
          </section>
          <section className="py-8 md:py-16 flex flex-col md:flex-row items-center justify-between gap-4">
            {keyFeatures.map((feature) => {
              return (
                <div
                  key={feature.title}
                  className="bg-gray-50 w-full p-4 py-4 md:py-8 rounded-lg hover:scale-[102%] transition-al duration-200"
                >
                  <div
                    className={`text-center text-xl mb-3 ${feature.iconClassName}`}
                  >
                    {feature.icon}
                  </div>
                  <div className="text-center text-lg font-medium">
                    {feature.title}
                  </div>
                  <div className="text-sm text-center text-gray-500">
                    {feature.description}
                  </div>
                </div>
              );
            })}
          </section>
          <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold">
                  Flight Reservation & Itinerary
                </div>
                <div className="mt-6 text-gray-600 text-base md:text-lg">
                  <p className="mb-4">
                    Our flight booking service provides a legitimate flight
                    reservation along with proof of reservation and itinerary.
                    This makes it easy to apply for a visa or use as an onward
                    ticket.{" "}
                  </p>
                  <p>
                    With our service, you can travel with confidence knowing
                    that your flight reservation meets embassy requirements and
                    is fully verified with the airline.
                  </p>
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faBolt} />
                      <span className="font-bold">
                        One ticket may include up to 5 passengers
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faBolt} />
                      <span className="font-bold">
                        Instant download after you completed the payment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faBolt} />
                      <span className="font-bold">
                        Verifiable ticket with PNR number
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/itinerary-1.png"
                alt="itinerary-example"
                className="transition-all rotate-3 duration-200 hover:rotate-0"
                width={500}
                height={500}
              />
            </div>
          </section>
          <section className="pt-12 md:pt-32 pb-12 md:pb-24">
            <div className="mb-1 text-lg md:text-xl text-center text-blue-500 font-bold">
              Super Easy Process
            </div>
            <div className="text-3xl md:text-4xl font-bold text-center">
              Only <span className="">a Single Minute</span> to Get Your
              Reservation
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {orderSteps.map((step, idx) => {
                return (
                  <div key={step.title} className="text-center">
                    <div className="text-lg font-bold text-blue-600 mb-4 bg-gray-50 w-[64px] h-[64px] flex items-center justify-center mx-auto rounded-full">
                      {/* {idx + 1}. */}
                      <FontAwesomeIcon icon={step.icon} size="xl" />
                    </div>
                    <div className="text-lg md:text-xl font-bold mb-2 ">
                      {step.title}
                    </div>
                    <div className="text-gray-500 text-sm md:text-base">
                      {step.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="bg-blue-700 rounded-xl p-4 md:p-8 px-8 md:px-12 mt-20 shadow-xl border border-blue-500 shadow-blue-400">
            <div className="text-center text-2xl md:text-3xl text-white font-semibold">
              Affordable Pricing
            </div>
            <div className="text-center text-blue-200 text-sm mt-2">
              Get More for Less with Our Budget-Friendly Package. All benefits
              are just in single cheap pricing.
            </div>
            <div className="grid grid-cols-1 py-4 md:py-16 pb-4 md:pb-8">
              {pricingBenefits.map((benefit) => {
                return (
                  <div
                    key={benefit.title}
                    className="py-3 border-b border-blue-500 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-bold">
                        {benefit.title}
                      </div>
                      <div className="text-blue-300 text-sm md:text-base">
                        {benefit.description}
                      </div>
                    </div>
                    <div className="mr-8 text-white">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/order"
                className="py-4 px-6 rounded-lg bg-white text-blue-700 font-bold"
              >
                Order Now
              </Link>
              <div className="text-white mr-4 text-4xl font-semibold">$10</div>
            </div>
          </section>
          <section className="pt-20 md:pt-32 pb-12 md:pb-24">
            <div className="mb-1 text-xl text-center text-blue-500 font-bold">
              Testimonials
            </div>
            <div className="text-3xl md:text-4xl font-bold text-center">
              We have been become a great partner for travelers!
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-12">
              {testimonials.map((item) => {
                return (
                  <div
                    key={item.user}
                    className="transition-all duration-300 border flex flex-col justify-between rounded-xl shadow-xl hover:scale-[102%]"
                  >
                    <div className="p-4 md:p-8 text-sm md:text-base">
                      &quot;{item.review}&quot;
                    </div>
                    <div className="px-4 md:px-8 py-4 border-t border-gray-100">
                      <div className="font-semibold">{item.user}</div>
                      <div className="text-sm text-gray-400">{item.handle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="pt-8 md:pt-12 pb-12 md:pb-24">
            <div className="text-3xl md:text-4xl font-bold text-center">
              Are You Ready to Travel the World?
            </div>
            <div className="text-center mt-3 text-base md:text-xl text-gray-600">
              Get your flight reservation for as low as $10
            </div>
            <div className="flex items-center justify-center mt-4 md:mt-12">
              <Link
                href="/order"
                className="py-4 px-24 font-bold rounded-lg bg-blue-700 text-white"
              >
                Order Now
              </Link>
            </div>
          </section>
          <section>
            <div className="text-3xl md:text-4xl font-bold text-center mb-6">
              Frequently Asked Questions
            </div>
            <FaqAccordion faqList={questions} />
          </section>
        </MainLayout>
      </main>
    </>
  );
}
