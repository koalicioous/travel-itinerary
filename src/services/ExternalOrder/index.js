import { duffel } from "../duffel";

export const createExternalOrder = async (data) => {
  const { offerId, passengers, email } = data;
  const result = await duffel.orders.create({
    type: "hold",
    selected_offers: [offerId],
    passengers: passengers.map((passenger) => {
      const { id, given_name, family_name, title } = passenger;
      const titleWithoutDot = title.replace(".", "").toLowerCase();
      return {
        id,
        given_name,
        family_name,
        title: titleWithoutDot,
        gender: title === "Mr." ? "m" : "f",
        email,
        phone_number: "+46700000000",
        born_on: "1999-01-01",
      };
    }),
  });
  return result;
};
