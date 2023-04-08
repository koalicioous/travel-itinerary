import supabase from "../supabase";

export const createOrder = async (data) => {
  const { orderId, status, email, offers, passengers, flightDetail } = data;

  return await supabase.from("orders").insert([
    {
      orderId,
      status,
      email,
      offers,
      passengers,
      flightDetail,
    },
  ]);
};

export const getOrder = async (data) => {
  const { orderId } = data;

  return await supabase.from("orders").select("*").eq("orderId", orderId);
};
