import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Form, Radio, Select, Steps } from "antd";
import Head from "next/head";
import { useState } from "react";
import {
  faPlaneDeparture,
  faUserEdit,
  faPassport,
} from "@fortawesome/free-solid-svg-icons";

const flightOptions = [
  {
    value: "one-way",
    label: "One Way",
  },
  {
    value: "round-trip",
    label: "Round Trip",
  },
];
const ChooseFlight = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Flight Type</div>
        <div>
          <Radio.Group
            options={flightOptions}
            optionType="button"
            style={{ width: "100%" }}
            size="large"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Origin</div>
        <Select
          style={{
            width: "100%",
          }}
          size="large"
          placeholder="Origin"
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Destination</div>
        <Select
          style={{
            width: "100%",
          }}
          size="large"
          placeholder="Destination"
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Departure Date</div>
        <DatePicker
          size="large"
          style={{
            width: "100%",
          }}
          placeholder="Departure Date"
          format={"DD MMMM YYYY"}
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Return Date</div>
        <DatePicker
          size="large"
          style={{
            width: "100%",
          }}
          placeholder="Return Date"
          format={"DD MMMM YYYY"}
        />
      </div>
    </div>
  );
};

const InsertPassenger = () => {
  return <div>Insert Passenger</div>;
};

const ReviewOrder = () => {
  return <div>Review Order</div>;
};

const stepsItems = [
  {
    title: "Choose Flight",
    content: <ChooseFlight />,
    icon: <FontAwesomeIcon icon={faPlaneDeparture} size="xs" />,
  },
  {
    title: "Insert Passenger",
    content: <InsertPassenger />,
    icon: <FontAwesomeIcon icon={faUserEdit} size="xs" />,
  },
  {
    title: "Review Order",
    content: <ReviewOrder />,
    icon: <FontAwesomeIcon icon={faPassport} size="xs" />,
  },
];

const Order = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <MainLayout withFooter={false}>
      <Head>
        <title>Create Your Order</title>
      </Head>
      <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-8">
        <div className="col-span-2">
          <Steps
            items={stepsItems}
            current={currentStep}
            size="small"
            onChange={(step) => {
              setCurrentStep(step);
            }}
          />
          <div className="md:mt-8">{stepsItems[currentStep].content}</div>
          <Form form={form}></Form>
        </div>
        <div className="w-full p-8 bg-gray-500 rounded-lg"></div>
      </section>
    </MainLayout>
  );
};

export default Order;
