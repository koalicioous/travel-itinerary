import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Select, Steps, Input, Option } from "antd";
import Head from "next/head";
import { useMemo, useState } from "react";
import ChooseFlight from "./ChooseFlight";
import {
  faPlaneDeparture,
  faUserEdit,
  faPassport,
  faTrash,
  faChevronRight,
  faChevronLeft,
  faPlane,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import OrderFormProvider, { useOrderForm } from "@/context";

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
                  key={`${field.key}`}
                  className="flex flex-col gap-4 mb-6 md:mb-0 border-b pb-3 md:border-none md:pb-0"
                >
                  <div className="grid grid-cols-2 md:flex gap-x-2 md:gap-4">
                    <Form.Item
                      {...field}
                      name={[field.name, "title"]}
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
  const { form, originOptions, destinationOptions } = useOrderForm();

  const [currentStep, setCurrentStep] = useState(0);

  const flightType = Form.useWatch("flightType", { form, preserve: true });
  const flightOrigin = Form.useWatch("flightOrigin", { form, preserve: true });
  const flightDestination = Form.useWatch("flightDestination", {
    form,
    preserve: true,
  });
  const departureDate = Form.useWatch("departureDate", {
    form,
    preserve: true,
  });
  const returnDate = Form.useWatch("returnDate", { form, preserve: true });

  const origin = useMemo(() => {
    if (flightOrigin) {
      return originOptions.find((option) => option.value === flightOrigin);
    }
    return null;
  }, [flightOrigin, originOptions]);

  const destination = useMemo(() => {
    if (flightDestination) {
      return destinationOptions.find(
        (option) => option.value === flightDestination
      );
    }
    return null;
  }, [destinationOptions, flightDestination]);

  const passengers = Form.useWatch("passengers", { form, preserve: true });

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
              console.log(form.getFieldsValue());
              setCurrentStep(step);
            }}
          />
          <Form
            form={form}
            initialValues={{
              flightType: "one-way",
            }}
          >
            <div className="md:mt-8">{stepsItems[currentStep].content}</div>
          </Form>
          <div
            className={clsx(
              "flex items-center mt-4",
              { "justify-end": currentStep === 0 },
              { "justify-between": currentStep > 0 }
            )}
          >
            {
              // Show previous button if current step is not the first step
              currentStep > 0 && (
                <button
                  className="py-2 px-6  text-blue-700 rounded font-semibold flex items-center"
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                  <span className="ml-2 pb-[1px]">Previous</span>
                </button>
              )
            }
            {currentStep < stepsItems.length - 1 && (
              <button
                className="py-2 px-6  text-blue-700 rounded font-semibold flex items-center"
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
              >
                <span className="mr-2 pb-[1px]">Next</span>
                <FontAwesomeIcon icon={faChevronRight} size="xs" />
              </button>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className=" border-b border-dashed border-gray-200 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faPlane}
                  size="xs"
                  className="mr-2 text-gray-300"
                />
                <div className="text-gray-500 text-sm">Flight Details</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                {flightType && (
                  <div className="w-full flex justify-center">
                    {flightType === "one-way" ? (
                      <div>One Way</div>
                    ) : (
                      <div>Round Trip</div>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-[1fr_40px_1fr]">
                  <div className="text-mono text-5xl text-center">
                    {origin?.iata_code}
                  </div>
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlane} />
                  </div>
                  <div className="text-mono text-5xl text-center">
                    {destination?.iata_code}
                  </div>
                </div>
                <div></div>
              </div>
              <div className="mt-3">
                <div className="text-xs font-mono text-gray-500">FROM:</div>
                <div className="text-sm font-semibold mt-1">{origin?.name}</div>
                <div className="text-xs">{origin?.city_name}</div>
              </div>
              <div className="mt-3">
                <div className="text-xs font-mono text-gray-500">TO:</div>
                <div className="text-sm font-semibold">{destination?.name}</div>
                <div className="text-xs">{destination?.city_name}</div>
              </div>
              <div className="mt-3">
                <div className="text-xs font-mono text-gray-500">
                  DEPARTURE DATE:
                </div>
                <div className="text-sm font-semibold">
                  {departureDate ? (
                    <>{departureDate.format("dddd, DD MMMM YYYY")}</>
                  ) : (
                    <div className="text-gray-400">Not Selected</div>
                  )}
                </div>
              </div>
              {returnDate && (
                <div className="mt-3">
                  <div className="text-xs font-mono text-gray-500">
                    RETURN DATE:
                  </div>
                  <div className="text-sm font-semibold">
                    <>{returnDate.format("dddd, DD MMMM YYYY")}</>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faPerson}
                size="xs"
                className="mr-[14px] text-gray-300"
              />
              <div className="text-gray-500 text-sm">Passengers Details</div>
            </div>
            <div className="mt-2">
              {passengers.map((passenger, index) => {
                return (
                  <div key={index} className="mb-3 flex gap-3">
                    <div className="text-xs text-gray-400 mt-1">
                      {index + 1}.
                    </div>
                    <div>
                      {`${passenger?.title ? `${passenger.title} ` : ""}${
                        passenger?.firstName ? `${passenger.firstName} ` : ""
                      }${passenger?.lastName ? `${passenger.lastName}` : ""}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const OrderPage = () => {
  const [form] = Form.useForm();

  return (
    <OrderFormProvider form={form}>
      <Order />
    </OrderFormProvider>
  );
};

export default OrderPage;
