import { createPartialOffer } from "@/services/TicketService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = await createPartialOffer(req.body);

    res.status(200).json({
      data: result,
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const config = {
  api: {
    responseLimit: "8mb",
  },
};
