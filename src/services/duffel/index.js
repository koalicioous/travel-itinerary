import { Duffel } from "@duffel/api";

const token = process.env.DUFFEL_KEY;

export const duffel = new Duffel({
  token,
});
