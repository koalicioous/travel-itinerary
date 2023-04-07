import { getPlaceSuggestions } from "@/services/PlaceService";

export default async function handler(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const results = await getPlaceSuggestions(query);
    res.status(200).json({ data: [...results] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
