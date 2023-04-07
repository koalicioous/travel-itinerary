import { getOffer } from "@/services/TicketService";

export default async function handler(req, res) {
  const { ticketId } = req.query;
  try {
    const result = await getOffer(ticketId);

    const filtered = result.offers.filter((offer) => {
      return offer.payment_requirements.requires_instant_payment === false;
    });

    if (filtered.length > 0) {
      // Todo select first offer, save in db and create orderId
      res.status(200).json({
        data: result,
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
