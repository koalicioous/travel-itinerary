import { getOrder } from "@/services/OrderService";

export default async function handler(req, res) {
  const { orderId } = req.query;

  const result = await getOrder({ orderId });

  if (result.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const { owner, slices } = result.data[0].flightDetail;

  res.status(200).json({
    airline: owner,
    routes: slices,
  });
}
