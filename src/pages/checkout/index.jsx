import MainLayout from "@/layouts/main";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLuggageCart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import moment from "moment";
import {
  calculateDuration,
  formatDuration,
  toTitleCase,
} from "@/utils/helpers";
import { Timeline } from "antd";
import clsx from "clsx";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

const FlightSegment = ({ segment, nextFlight = null, type = "departure" }) => {
  const flightDuration = formatDuration(
    calculateDuration(segment.departing_at, segment.arriving_at)
  );

  const cabin = segment.passengers[0];

  return (
    <div className="ml-3">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
        <div className="text-lg md:text-xl font-semibold">
          {moment(
            type === "departure" ? segment.departing_at : segment.arriving_at
          ).format("ddd, DD MMM YYYY, HH:mm")}
        </div>
        <div className="text-sm md:text-xl text-gray-500">
          {type === "departure" ? (
            <span>
              {`Departing from ${segment.origin.name} (${segment.origin.iata_code})`}
            </span>
          ) : (
            <span>
              {`Arriving at ${segment.destination.name} (${segment.destination.iata_code})`}
            </span>
          )}
        </div>
      </div>
      {type === "departure" && (
        <div className="mt-2 text-sm md:text-lg text-gray-500">
          Flight Duration: {flightDuration}
        </div>
      )}
      {type === "arrival" && (
        <div className="grid grid-cols-2 md:flex flex-col items-start md:flex-row md:items-center gap-2 md:gap-3 mt-2">
          <div>{cabin.cabin_class_marketing_name}</div>
          <div>{segment.operating_carrier.name}</div>
          <div>{segment.aircraft.name}</div>
          <div>
            {segment.marketing_carrier.iata_code}{" "}
            {segment.marketing_carrier_flight_number}
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <FontAwesomeIcon icon={faLuggageCart} />
            <div>{cabin.baggages[0].quantity} checked baggage</div>
          </div>
        </div>
      )}
    </div>
  );
};

const FlightSlice = ({ route, idx }) => {
  //   console.log(route);

  const journeyTime = {
    departure: moment(route.segments[0].departing_at),
    arrival: moment(route.segments[route.segments.length - 1].arriving_at),
  };

  const cabinClass = route.segments[0].passengers[0].cabin_class;

  const jointOperation =
    route.segments.length > 1 &&
    !route.segments
      .slice(1, route.segments.length - 1)
      .map((segment) => segment.operating_carrier.iata_code)
      .includes(route.segments[0].operating_carrier.iata_code);

  const routeSubtitle = `${toTitleCase(cabinClass)}${
    jointOperation && idx === 0
      ? ` · Sold by ${
          route.segments[0].marketing_carrier.name
        }, Partially operated by ${route.segments
          .map((segment) => {
            return segment.operating_carrier.name;
          })
          .reduce((unique, item) => {
            return unique.includes(item) ? unique : [...unique, item];
          }, [])
          .filter((item) => item !== route.segments[0].operating_carrier.name)
          .join(", ")}`
      : ""
  }`;

  const totalJourneyDuration = formatDuration(
    calculateDuration(
      route.segments[0].departing_at,
      route.segments[route.segments.length - 1].arriving_at
    )
  );

  return (
    <div className=" mb-4 border-b border-dashed">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={route.segments[0].operating_carrier.logo_symbol_url}
            width={32}
            height={32}
            alt="Marketing Carrier"
          />
          <div>
            <div className="text-lg font-semibold">
              {journeyTime.departure.format("HH:mm")} -{" "}
              {journeyTime.arrival.format("HH:mm")}
            </div>
            <div className="text-xs md:text-base">
              {jointOperation ? routeSubtitle : toTitleCase(cabinClass)}
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-2 md:mt-0 pl-12 md:pl-0">
          <div>
            <div className="text-lg font-semibold">{totalJourneyDuration}</div>
            <div>
              {route.segments[0].origin.iata_code} -{" "}
              {route.segments[route.segments.length - 1].destination.iata_code}
            </div>
          </div>
          <div>
            <div>
              <div className="text-lg font-semibold">
                {route.segments.length === 1
                  ? "Non-stop"
                  : route.segments.length === 2
                  ? "1 Stop"
                  : `${route.segments.length - 1} Stops`}
              </div>
              {/* TODO: List Stops */}
            </div>
          </div>
        </div>
      </div>
      {route.segments.map((segment, index) => {
        const hasStop = !!route.segments[index + 1];
        const nextFlight = hasStop ? route.segments[index + 1] : null;
        const layoverDuration = hasStop
          ? formatDuration(
              calculateDuration(segment.arriving_at, nextFlight.departing_at)
            )
          : null;
        return (
          <>
            <Timeline
              className={clsx(
                {
                  "mt-12": index === 0,
                },
                {
                  "mt-4": index > 0,
                }
              )}
            >
              <Timeline.Item key={segment.id} icon="Toast">
                <FlightSegment
                  segment={segment}
                  nextFlight={nextFlight}
                  type="departure"
                />
              </Timeline.Item>
              <Timeline.Item key={segment.id} icon="Toast">
                <FlightSegment
                  segment={segment}
                  nextFlight={nextFlight}
                  type="arrival"
                />
              </Timeline.Item>
            </Timeline>
            {nextFlight && (
              <div className="-mt-2 mb-8">
                <div className="py-1 px-4 rounded md:rounded-full bg-gray-200 text-gray-700 text-xs md:text-sm inline-block text-center">
                  {`${layoverDuration} layover at ${segment.destination.name}`}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

const FlightDetail = ({ order }) => {
  // console.log(order);
  return (
    <div className="py-4">
      <div className="font-semibold text-lg mb-4">Journey details</div>
      {order.routes.map((route, idx) => {
        return <FlightSlice key={route.id} route={route} idx={idx} />;
      })}
    </div>
  );
};

const CheckoutPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [retrieveOrderLoading, setRetrieveOrderLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.orderId) {
        router.push("/");
      }
    }
  }, [router]);

  const retrieveOrder = async (orderId) => {
    try {
      setRetrieveOrderLoading(true);
      const result = await axios.get(`/api/order/${orderId}`);
      if (result.data) {
        setOrder(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRetrieveOrderLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      retrieveOrder(orderId);
    }
  }, [orderId]);

  const createPayPalOrder = async () => {
    // const response = await createMutation.mutateAsync({})
    // return response.data.orderID
  };

  const onApprove = async (data) => {
    // return captureMutation.mutate({ orderID: data.orderID })
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <MainLayout withFooter={false}>
        {retrieveOrderLoading ? (
          <div className="h-[calc(100vh-200px)] flex flex-col gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Retrieving your order detail
          </div>
        ) : (
          <>
            {order && <FlightDetail order={order} />}
            {order?.passengers && (
              <>
                <div className=" border-b border-dashed pb-4">
                  <div className="font-semibold text-lg mb-4">
                    Passengers detail
                  </div>
                  <div className="text-lg">
                    {order?.passengers.map((passenger, idx) => {
                      console.log(passenger);
                      return (
                        <div key={passenger.id}>
                          {`${idx + 1}. ${passenger.title} ${
                            passenger.firstName
                          } ${passenger.lastName}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <div className="mt-2 mx-auto text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg flex items-center">
                  Total:
                </div>
                <div className="text-2xl font-semibold  flex items-center">
                  $10
                </div>
              </div>
              <div className="text-sm mb-4 text-gray-600">
                After you completed the payment, you will be able to directly
                download your e-ticket reservation including your airline
                booking reference
              </div>
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{
                    color: "gold",
                    shape: "rect",
                    label: "pay",
                    height: 50,
                  }}
                  fundingSource={FUNDING.PAYPAL}
                  createOrder={createPayPalOrder}
                  onApprove={onApprove}
                />
                <PayPalButtons
                  style={{
                    color: "black",
                    shape: "rect",
                    label: "pay",
                    height: 50,
                  }}
                  fundingSource={FUNDING.CARD}
                  createOrder={createPayPalOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default CheckoutPage;
