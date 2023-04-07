import { duffel } from "../duffel";

export const createOffer = async (params) => {
  const { data } = await duffel.offerRequests.create(params);
  return data;
};

export const getOffer = async (id) => {
  const { data } = await duffel.offerRequests.get(id, {
    return_available_service: false,
  });
  return data;
};
