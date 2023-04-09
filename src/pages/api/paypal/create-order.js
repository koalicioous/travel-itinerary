import { updateOrder } from "@/services/OrderService";
import client from "@/services/paypal";
import paypal from "@paypal/checkout-server-sdk";

export default async function handle(req, res) {
  const PaypalClient = client();
  const { orderId } = req.body;

  if (!orderId) {
    res.status(400).json({ message: "Bad request" });
  }

  //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
  const request = new paypal.orders.OrdersCreateRequest();
  request.headers["prefer"] = "return=representation";
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00",
        },
      },
    ],
  });
  const response = await PaypalClient.execute(request);
  if (response.statusCode !== 201) {
    res.status(500);
  }

  await updateOrder({
    orderId,
    status: "PENDING",
    paypalId: response.result.id,
  });

  res.json({ orderID: response.result.id });
}
