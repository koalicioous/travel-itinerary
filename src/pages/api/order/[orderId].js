import { getOrder } from "@/services/OrderService";

export default async function handler(req, res) {
  const { orderId } = req.query;

  const result = await getOrder({ orderId });

  if (result.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const { owner, slices } = result.data[0].flightDetail;
  const status = result.data[0].status;
  const isPaid = status === "PAID";

  res.status(200).json({
    airline: owner,
    routes: slices,
    passengers: result.data[0].passengers,
    status,
    ...(isPaid && { flightDetail: result.data[0].flightDetail }),
  });
}
