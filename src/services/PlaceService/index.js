import { duffel } from "../duffel";

export const getPlaceSuggestions = async (query) => {
  const { data } = await duffel.suggestions.list({
    query,
  });
  return data;
};
