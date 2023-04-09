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

export const updateOrder = async (data) => {
  const { orderId, status, paypalId } = data;

  return await supabase
    .from("orders")
    .update({ status, paypalId })
    .eq("orderId", orderId);
};

export const updatePaymentStatus = async (data) => {
  const { paypalId, status } = data;

  return await supabase

    .from("orders")
    .update({ status })
    .eq("paypalId", paypalId);
};
