import MainLayout from "@/layouts/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import Head from "next/head";
const Itinerary = dynamic(() => import("@/components/itinerary"), {
  ssr: false,
});

const SuccessPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [order, setOrder] = useState(null);

  const retrieveOrder = useCallback(
    async (orderId) => {
      setLoadingOrder(true);
      try {
        const response = await axios.get(`/api/order/${orderId}`);
        if (response) {
          if (response.data.status !== "PAID") {
            throw new Error("Order is not paid");
          }
          setOrder(response.data);
        }
      } catch (error) {
        router.push("/");
        console.error(error);
        toast.error("Error retrieving order");
      } finally {
        setLoadingOrder(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (router.isReady && orderId) {
      retrieveOrder(orderId);
    }

    if (router.isReady && !orderId) {
      router.push("/");
    }
  }, [router, retrieveOrder, orderId]);

  return (
    <>
      <Head>
        <title>Order Successful</title>
      </Head>
      <MainLayout>
        {loadingOrder ? (
          <div className="h-[calc(100vh-200px)] flex flex-col gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Retrieving your order detail
          </div>
        ) : (
          <div>
            <div className="bg-white py-10 text-center">
              <div className="container mx-auto text-center mb-8">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="4x"
                  className="text-green-600"
                />
                <h2 className="mt-6 text-3xl font-bold text-gray-800">
                  Order Successful
                </h2>
                <p className="mt-4 text-lg text-gray-800">
                  Thank you for your purchase! We&apos;ve generated the
                  reservation for your flight.
                </p>
              </div>
              <Itinerary order={order} />
              <p className="mt-8 text-gray-500 text-xs max-w-md text-center mx-auto">
                We encourage you to purchase the actual flight ticket
                reservation once you are comfortable with the flight plan. If
                you need assistance with this, please email us and we will be
                happy to help you buy the ticket.
              </p>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default SuccessPage;
