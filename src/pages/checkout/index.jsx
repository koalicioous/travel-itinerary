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

const FlightSegment = ({ segment, nextFlight = null, type = "departure" }) => {
  //   console.log("segment", segment);
  //   console.log("nextFlight", nextFlight);

  const flightDuration = formatDuration(
    calculateDuration(segment.departing_at, segment.arriving_at)
  );

  const cabin = segment.passengers[0];

  return (
    <div className="ml-3">
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold">
          {moment(
            type === "departure" ? segment.departing_at : segment.arriving_at
          ).format("ddd, DD MMM YYYY, HH:mm")}
        </div>
        <div className="text-xl">
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
        <div className="mt-2 text-lg text-gray-500">
          Flight Duration: {flightDuration}
        </div>
      )}
      {type === "arrival" && (
        <div className="flex items-center gap-3 mt-2">
          <div>{cabin.cabin_class_marketing_name}</div>
          <div>{segment.operating_carrier.name}</div>
          <div>{segment.aircraft.name}</div>
          <div>
            {segment.marketing_carrier.iata_code}{" "}
            {segment.marketing_carrier_flight_number}
          </div>
          <div className="flex items-center gap-1">
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
      <div className="flex items-center justify-between">
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
            <div>
              {jointOperation ? routeSubtitle : toTitleCase(cabinClass)}
            </div>
          </div>
        </div>
        <div className="flex gap-8">
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
                <div className="py-1 px-4 rounded-full bg-gray-200 text-gray-700 text-sm inline-block">
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
  //   console.log(order);
  return (
    <div className="py-4 rounded-lg">
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
          <>{order && <FlightDetail order={order} />}</>
        )}
      </MainLayout>
    </>
  );
};

export default CheckoutPage;
