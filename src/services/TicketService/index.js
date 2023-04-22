import { duffel } from "../duffel";

export const createOffer = async (params) => {
  const { data } = await duffel.offerRequests.create(params);
  return data;
};

export const createPartialOffer = async (params) => {
  const { data } = await duffel.partialOfferRequests.create(params);
  return data;
};

export const getPartialOffer = async (id, params) => {
  const { data } = await duffel.partialOfferRequests.get(id, {
    ...params,
  });

  return data;
};

export const getPartialOfferFare = async (id, params) => {
  console.log(params);
  const { data } = await duffel.partialOfferRequests.getFaresById(id, {
    ...params,
  });

  return data;
};

export const getOffer = async (id) => {
  const { data } = await duffel.offerRequests.get(id, {
    return_available_service: false,
  });
  return data;
};
