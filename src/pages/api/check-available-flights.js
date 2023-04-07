import { createOffer } from "@/services/TicketService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = await createOffer(req.body);

    res.status(200).json({
      data: result,
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
