import supabase from "../supabase";

export const createOrder = async (data) => {
  const { orderId, status, email, offers, passengers } = data;

  return await supabase.from("orders").insert([
    {
      orderId,
      status,
      email,
      offers,
      passengers,
    },
  ]);
};
