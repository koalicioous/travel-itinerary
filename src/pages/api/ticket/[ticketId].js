import { createExternalOrder } from "@/services/ExternalOrder";
import { createOrder } from "@/services/OrderService";
import { getOffer, getPartialOffer } from "@/services/TicketService";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { ticketId } = req.query;
  const { email, passengers, type } = req.body;
  if (!ticketId || !email || !passengers) {
    return res.status(400).json({ message: "Bad request" });
  }

  // Return Ticket
  if (type === "return-trip") {
    const order = await createExternalOrder({
      offerId: ticketId,
      passengers,
      email,
    });

    const orderId = uuidv4();
    const orderResult = await createOrder({
      email,
      offers: [],
      orderId,
      passengers,
      flightDetail: order.data,
      status: "pending",
    });
    if (orderResult.error) {
      console.error(orderResult.error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({
      data: {
        message: "Order created",
        data: {
          id: orderId,
        },
      },
    });
    return;
  } else {
    // One Way Ticket
    try {
      const result = await getOffer(ticketId);

      const filtered = result.offers.filter((offer) => {
        return (
          offer.payment_requirements.requires_instant_payment === false &&
          offer.owner.iata_code !== "ZZ"
        );
      });

      if (filtered.length > 0) {
        const order = await createExternalOrder({
          offerId: filtered[0].id,
          passengers,
          email,
        });

        const orderId = uuidv4();
        const orderResult = await createOrder({
          email,
          offers: filtered.slice(0, 2),
          status: "pending",
          orderId,
          passengers,
          flightDetail: order.data,
        });

        if (orderResult.error) {
          console.error(orderResult.error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({
          data: {
            message: "Order created",
            data: {
              id: orderId,
            },
          },
        });
      } else {
        console.error(err);
        res.status(404).json({
          message: "No flight available",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export const config = {
  api: {
    responseLimit: "8mb",
  },
};
