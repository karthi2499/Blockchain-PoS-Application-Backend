const express = require("express"),
  app = express(),
  port = process.env.PORT || 5001,
  cors = require("cors");

app.use(cors());

const fs = require("fs");

const twilio = require("twilio");
const convert = require("json-to-plain-text");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("Backend Server is Running"));

// SendSaleDetailsRoute

app.post("/saleDetails", async (req, res) => {
  const carts = req.body.carts;
  const id = req.body.id;
  const orderId = req.body.orderId;
  const productsPurchased = req.body.productsPurchased;
  const quantity = req.body.quantity;
  const amount = req.body.amount;
  const whatsappNumber = req.body.number;

  console.log(whatsappNumber);

  var test = productsPurchased;

  test.forEach((test) => {
    delete test.status;
    delete test.stock;
    delete test.updated_at;
  });

  var response = convert.toPlainText(productsPurchased);
  console.log(response);

  let toNumber = "whatsapp:" + whatsappNumber;
  //console.log(toNumber);

  const accountSid = "AC6ca5f2ae445964c9afd905185210d89e";
  const authToken = "a3e704568cea57597b0a7970ed4370bd";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "OrderId: " + orderId + "\n\n" + response,
      from: "whatsapp:+14155238886",
      to: toNumber,
    })
    .then((message) => console.log(message.status))
    .done();
});

app.listen(port, () =>
  console.log("Final Year Project Backend Listening on Port 5001")
);
