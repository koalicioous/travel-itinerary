import { updatePaymentStatus } from "@/services/OrderService";
import client from "@/services/paypal";
import paypal from "@paypal/checkout-server-sdk";

export default async function handle(req, res) {
  //Capture order to complete payment
  const { orderId, paypalId } = req.body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(paypalId);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    res.status(500);
  }

  // Update payment to PAID status once completed
  await updatePaymentStatus({
    paypalId,
    orderId,
    status: "PAID",
  });

  res.json({ ...response.result });
}
