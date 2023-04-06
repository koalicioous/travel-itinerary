import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Form, Radio, Select, Steps, Input, Option } from "antd";
import Head from "next/head";
import { useState } from "react";
import {
  faPlaneDeparture,
  faUserEdit,
  faPassport,
  faTrash,
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
  const [flightType, setFlightType] = useState("one-way");
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
            onChange={(e) => setFlightType(e.target.value)}
            defaultValue={flightType}
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
      {flightType === "round-trip" && (
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
      )}
    </div>
  );
};

const titleOptions = [
  {
    value: "Mr.",
    label: "Mr.",
  },
  {
    value: "Mrs.",
    label: "Mrs.",
  },
  {
    value: "Ms.",
    label: "Ms.",
  },
];

const InsertPassenger = () => {
  return (
    <div>
      <div className="mb-3">Up to 5 passengers in single reservation</div>
      <div>
        <Form.List name="passengers" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex flex-col gap-4 mb-6 md:mb-0 border-b pb-3 md:border-none md:pb-0"
                >
                  <div className="grid grid-cols-2 md:flex gap-x-2 md:gap-4">
                    <Form.Item
                      {...field}
                      name={[field.name, "title"]}
                      fieldKey={[field.fieldKey, "title"]}
                      className="w-full md:w-1/4 col-span-2"
                      style={{
                        marginBottom: "12px",
                      }}
                    >
                      <Select
                        size="large"
                        placeholder="Title"
                        allowClear
                        options={titleOptions}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "firstName"]}
                      fieldKey={[field.fieldKey, "firstName"]}
                      className="md:w-1/2 w-full"
                      rules={[
                        {
                          required: true,
                          message: "Insert first name",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" size="large" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "lastName"]}
                      fieldKey={[field.fieldKey, "lastName"]}
                      className="w-full md:w-1/2"
                      rules={[
                        {
                          required: true,
                          message: "Insert last name",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" size="large" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(field.name)}
                        className="hover:bg-gray-200 rounded text-gray-500 px-2 h-11 col-span-2 mb-2 bg-gray-100 md:bg-transparent md:col-span-1 md:mb-0"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="md:hidden ml-2">
                          Delete Passenger {index + 1}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {fields.length < 5 && (
                <button
                  type="button"
                  onClick={() => add()}
                  className="rounded py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-full"
                >
                  Add Passenger
                </button>
              )}
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
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
          <Form form={form}>
            <div className="md:mt-8">{stepsItems[currentStep].content}</div>
          </Form>
        </div>
        <div className="w-full p-8 bg-gray-500 rounded-lg"></div>
      </section>
    </MainLayout>
  );
};

export default Order;
