import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Select, Steps, Input, Checkbox } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
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
  faSpinner,
  faReceipt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import OrderFormProvider, { useOrderForm } from "@/context";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import useViewportWidth from "@/hooks/useViewportWidth";

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
  const { form } = useOrderForm();
  return (
    <div>
      <div className="mb-4">
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <div className="mb-2 font-semibold">Email Address</div>
          <Input
            placeholder="Email"
            size="large"
            onChange={(e) => {
              form.setFieldsValue({ email: e.target.value });
            }}
          />
        </Form.Item>
      </div>
      <div className="font-semibold">Passengers List</div>
      <div className="mb-4 text-sm text-gray-500">
        Up to 5 passengers in single reservation
      </div>
      <div>
        <Form.List name="passengers" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields?.map((field, index) => (
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
                      rules={[
                        {
                          required: true,
                          message: "Please select title",
                        },
                      ]}
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
                        {
                          max: 20,
                          message: "First name must be at most 20 characters",
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
                        {
                          max: 20,
                          message: "Last name must be at most 20 characters",
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
                  className="rounded py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-full font-bold mt-4"
                >
                  + Add Passenger
                </button>
              )}
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
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
  //   {
  //     title: "Review Order",
  //     content: <ReviewOrder />,
  //     icon: <FontAwesomeIcon icon={faPassport} size="xs" />,
  //   },
];

const Order = () => {
  const { form, originOptions, destinationOptions } = useOrderForm();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);

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

  const width = useViewportWidth();
  const smallView = useMemo(() => {
    return width < 768;
  }, [width]);

  useEffect(() => {
    setCurrentStep(0);
  }, [smallView]);

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

  const generatePayload = (values) => {
    const slices = [];
    const passengers = values.passengers.map((passenger) => ({
      family_name: passenger.lastName,
      given_name: passenger.firstName,
      title: passenger.title,
      type: "adult",
    }));

    slices.push({
      origin: origin.iata_code,
      destination: destination.iata_code,
      departure_date: departureDate.format("YYYY-MM-DD"),
    });

    if (flightType === "round-trip") {
      slices.push({
        origin: destination.iata_code,
        destination: origin.iata_code,
        departure_date: returnDate.format("YYYY-MM-DD"),
      });
    }

    const payload = {
      return_offers: true,
      supplier_timeout: 20000,
      slices,
      passengers,
    };

    return payload;
  };

  const handleGetOffer = async (id, passengers) => {
    setLoadingCheck(true);
    try {
      const result = new Promise(async (resolve, reject) => {
        const passengerForm = form.getFieldValue("passengers");
        const mergedPassengers = passengerForm.map((passenger, index) => ({
          ...passenger,
          ...passengers[index],
        }));
        await axios
          .post(`/api/ticket/${id}`, {
            email: form.getFieldValue("email"),
            passengers: mergedPassengers,
          })
          .then((res) => {
            setLoadingCheck(false);
            router.push(`/checkout?orderId=${res?.data?.data?.data?.id}`);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            setLoadingCheck(false);
          });
      });
      toast.promise(result, {
        loading: "Searching available tickets",
        success: "We found available tickets",
        error: "Sorry, no ticket available. Please try again or change flight.",
      });
    } catch (err) {
      if ((err.code = "offer_no_longer_available")) {
      }
      console.error(err);
    }
  };

  const handleSubmitRequest = async (values) => {
    setLoadingSubmit(true);
    try {
      const payload = generatePayload(values);
      const result = new Promise(async (resolve, reject) => {
        await axios
          .post("/api/check-available-flights", payload)
          .then((res) => {
            resolve(res);
            setLoadingSubmit(false);
            const { id, passengers } = res?.data?.data ?? {};
            handleGetOffer(id, passengers);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            setLoadingSubmit(false);
          });
      });
      toast.promise(result, {
        loading: "Routing your flights",
        success: "Flight route found",
        error: "Flight route not found",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const validateOrderForm = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmitRequest(values);
      })
      .catch((err) => {
        const flightInformationKeys = {
          flightOrigin: 1,
          flightDestination: 2,
          departureDate: 3,
          returnDate: 4,
        };
        const passengersData = {
          passengers: 1,
        };
        const firstPageError = [];
        const secondPageError = [];

        if (err?.errorFields) {
          for (const error of err.errorFields) {
            for (const fieldName of error.name) {
              if (flightInformationKeys.hasOwnProperty(fieldName)) {
                firstPageError.push(fieldName);
              } else if (passengersData.hasOwnProperty(fieldName)) {
                secondPageError.push(fieldName);
              }
            }
          }
        }
        if (firstPageError.length > 0) {
          toast.error("Please complete flight data");
        }
        if (secondPageError.length > 0) {
          toast.error("Please complete passengers data");
        }
      });
  };

  return (
    <MainLayout withFooter={false}>
      <Head>
        <title>Create Your Order</title>
      </Head>
      <Form
        form={form}
        initialValues={{
          flightType: "one-way",
        }}
      >
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-8 relative">
          <div className="col-span-2">
            <div className="hidden md:block">
              <Steps
                items={stepsItems}
                current={currentStep}
                size="small"
                onChange={(step) => {
                  setCurrentStep(step);
                }}
              />
            </div>
            <div className="mt-4">
              <div
                className={clsx({
                  hidden: currentStep !== 0,
                })}
              >
                <ChooseFlight />
              </div>
              <div
                className={clsx({
                  hidden: currentStep !== 1,
                })}
              >
                <InsertPassenger />
              </div>
            </div>
            <div
              className={clsx(
                "items-center mt-4 hidden sm:flex",
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

          <div className="hidden md:block w-full mb-6">
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
                  <div className="text-sm font-semibold mt-1">
                    {origin?.name}
                  </div>
                  <div className="text-xs">{origin?.city_name}</div>
                </div>
                <div className="mt-3">
                  <div className="text-xs font-mono text-gray-500">TO:</div>
                  <div className="text-sm font-semibold">
                    {destination?.name}
                  </div>
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
              <div className="mt-2 border-b border-dashed">
                {passengers?.map((passenger, index) => {
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
              <div className="mt-2">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Please accept the terms and condition")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I accept the <strong>terms and condition</strong>
                  </Checkbox>
                </Form.Item>
                <button
                  className="bg-green-600 p-2 w-full text-white text-center font-bold text-sm rounded hover:bg-green-700"
                  onClick={validateOrderForm}
                >
                  {loadingCheck || loadingSubmit ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div class="flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin"
                        />
                      </div>
                      <span className="font-semibold text-sm">
                        {loadingSubmit
                          ? "Finding Route..."
                          : "Searching available tickets.."}
                      </span>
                    </div>
                  ) : (
                    <>Find Flight</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {currentStep === 99 && (
            <div className="block md:hidden w-full mb-6">
              <div className="bg-white rounded-lg">
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
                    <div className="text-sm font-semibold mt-1">
                      {origin?.name}
                    </div>
                    <div className="text-xs">{origin?.city_name}</div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-mono text-gray-500">TO:</div>
                    <div className="text-sm font-semibold">
                      {destination?.name}
                    </div>
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
                  <div className="text-gray-500 text-sm">
                    Passengers Details
                  </div>
                </div>
                <div className="mt-2 border-b border-dashed">
                  {passengers?.map((passenger, index) => {
                    return (
                      <div key={index} className="mb-3 flex gap-3">
                        <div className="text-xs text-gray-400 mt-1">
                          {index + 1}.
                        </div>
                        <div>
                          {`${passenger?.title ? `${passenger.title} ` : ""}${
                            passenger?.firstName
                              ? `${passenger.firstName} `
                              : ""
                          }${
                            passenger?.lastName ? `${passenger.lastName}` : ""
                          }`}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error(
                                  "Please accept the terms and condition"
                                )
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      I accept the <strong>terms and condition</strong>
                    </Checkbox>
                  </Form.Item>
                  <button
                    className="bg-green-600 p-2 w-full text-white text-center font-bold text-sm rounded hover:bg-green-700"
                    onClick={validateOrderForm}
                  >
                    {loadingCheck || loadingSubmit ? (
                      <div className="flex items-center gap-2 justify-center">
                        <div class="flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                          />
                        </div>
                        <span className="font-semibold text-sm">
                          {loadingSubmit
                            ? "Finding Route..."
                            : "Searching available tickets.."}
                        </span>
                      </div>
                    ) : (
                      <>Find Flight</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 w-full bg-white border-t grid grid-cols-3 md:hidden">
            <button
              type="button"
              className="flex items-center justify-center gap-2 p-4 border-r"
              onClick={() => {
                setCurrentStep(0);
              }}
            >
              {/* <FontAwesomeIcon icon={faPlane} /> */}
              <span
                className={clsx("text-sm", {
                  "text-blue-500 font-semibold": currentStep === 0,
                })}
              >
                Flight
              </span>
              {/* <FontAwesomeIcon icon={faCheckCircle} size="xs" /> */}
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 p-4 border-r"
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              {/* <FontAwesomeIcon icon={faUserEdit} /> */}
              <span
                className={clsx("text-sm", {
                  "text-blue-500 font-semibold": currentStep === 1,
                })}
              >
                Passengers
              </span>
              {/* <FontAwesomeIcon icon={faCheckCircle} size="xs" /> */}
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-1 p-4"
              onClick={() => {
                setCurrentStep(99);
              }}
            >
              <span
                className={clsx("text-sm", {
                  "text-blue-500 font-semibold": currentStep === 99,
                })}
              >
                Review
              </span>
              {/* <FontAwesomeIcon icon={faReceipt} /> */}
            </button>
          </div>
        </section>
      </Form>
    </MainLayout>
  );
};

const OrderPage = () => {
  return (
    <OrderFormProvider>
      <Order />
    </OrderFormProvider>
  );
};

export default OrderPage;
