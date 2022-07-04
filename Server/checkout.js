const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const stripe = require("stripe")(
  "sk_test_51KjjqoSF4Sl9UBFsRuv255c0qr1jgONsmmADZvlMWzH23blzNdXv2kyTb2YPWqXGreJhu4arf0OvxdLKsXdMw6cE00W1djw1fq"
);
const cors = require("cors");

app.use(cors());

var price = Number;

app.post("/getAmount", async (req, res) => {
  const amount = req.body.amount;

  price = amount;
  console.log(price);
  //console.log(amount);
});

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "CART TOTAL",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:4200/pos",
    cancel_url: "http://localhost:4200/paymentError",
  });

  res.json({ url: session.url });
});

app.listen(5005, () => {
  console.log("App is listening on Port 5005");
});
