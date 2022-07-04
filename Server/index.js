const { anchor, merkle } = require("provendb-sdk-node");
const fs = require("fs");
const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");

// MongoDB Connection

async function connectDB() {
  mongoose.Promise = global.Promise;
  await mongoose
    .connect("mongodb+srv://karthi:karthi@pos.9qukr.mongodb.net/sale", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log("Database is connected");
      },
      (err) => {
        console.log(err);
      }
    );
}
connectDB();

app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("Backend Server is Running"));

// Sales Route

app.post("/sales", async (req, res) => {
  const id = req.body.id;
  const orderId = req.body.orderId;
  const carts = req.body.carts;
  const amount = req.body.amount;

  console.log(orderId);

  // MongoDB Schema

  var schema = new mongoose.Schema({
    id: "string",
    orderId: "string",
    encryptedData: "string",
  });

  // MongoDB Collection

  mongoose.models = {};
  var SaleDetails = mongoose.model("Sale-Details", schema);

  // Chainpoint - Proven DB (Blockchain User Data Encryption)

  // Create the New Builder and Add User Data
  let builder = merkle.newBuilder("sha-256");
  builder.add("key1", Buffer.from(id));
  builder.add("key2", Buffer.from(orderId));
  builder.add("key3", Buffer.from(carts));

  // Constructing Tree
  let tree = builder.build();

  // Creating a New Anchor Client
  let client = anchor.connect(
    anchor.withCredentials(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhbmNob3IiLCJleHAiOjE3OTMyNzA0NDUsImp0aSI6ImFvNng3NWo1ZWVrcm0yNnpzY2sxeXdiaSIsInN1YiI6InV1aWd3Yzd6YXhlanJxZHNnYXF6M3NidSIsInNjb3BlIjoiMzEiLCJyb2xlIjoiRnJlZSJ9.Z--sFCzSKffue0cW4eyI4EuEM93R8bP8KRRUzqkGkhc"
    )
  );

  // Submitting Proof
  let proof = await client.submitProof(
    tree.getRoot(),
    anchor.submitProofWithAnchorType(anchor.Anchor.Type.HEDERA_MAINNET),
    anchor.submitProofWithAwaitConfirmed(true)
  );

  console.log(proof);

  // Adding Proof to the Tree Object
  tree.addProof(proof);

  // Exporting Tree to JSON
  tree.exportSync("./sales.json");

  var encryptedData = JSON.stringify(proof);

  console.log(encryptedData);

  fs.writeFileSync("proof.json", encryptedData);

  let saleDetails = new SaleDetails({
    id,
    orderId,
    amount,
    encryptedData,
  });

  await saleDetails.save();
  res.json({
    token: "1234567890",
  });
});

app.listen(port, () =>
  console.log("Final Year Project Backend Listening on Port 5000")
);
