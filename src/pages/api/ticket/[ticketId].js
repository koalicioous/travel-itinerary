import { createOrder } from "@/services/OrderService";
import { getOffer } from "@/services/TicketService";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { ticketId } = req.query;
  const { email, passengers } = req.body;
  if (!ticketId || !email || !passengers) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const result = await getOffer(ticketId);

    const filtered = result.offers.filter((offer) => {
      return offer.payment_requirements.requires_instant_payment === false;
    });

    if (filtered.length > 0) {
      // Todo select first offer, save in db and create orderId
      const orderResult = await createOrder({
        email,
        offers: filtered.slice(0, 2),
        status: "pending",
        orderId: uuidv4(),
        passengers,
      });
      if (orderResult.error) {
        console.error(orderResult.error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        data: {
          message: "Order created",
        },
      });
    } else {
      res.status(404).json({
        message: "No flight available",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
