const { anchor, merkle } = require("provendb-sdk-node");
const fs = require("fs");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5010,
  cors = require("cors");

app.use(cors());

app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("Backend Server is Running"));

// Creating a New Anchor Client
let client = anchor.connect(
  anchor.withCredentials(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhbmNob3IiLCJleHAiOjE3OTMyNzA0NDUsImp0aSI6ImFvNng3NWo1ZWVrcm0yNnpzY2sxeXdiaSIsInN1YiI6InV1aWd3Yzd6YXhlanJxZHNnYXF6M3NidSIsInNjb3BlIjoiMzEiLCJyb2xlIjoiRnJlZSJ9.Z--sFCzSKffue0cW4eyI4EuEM93R8bP8KRRUzqkGkhc"
  )
);

let updated = client.verifyProof({"id":"faaf786cd0508720b44fdc0897fd284410150a321f739051991b74cd956c872a:cjaTjOZuTFZRiS5M7hsl0","anchorType":"HEDERA_MAINNET","format":"CHP_PATH","batchId":"cjaTjOZuTFZRiS5M7hsl0","hash":"faaf786cd0508720b44fdc0897fd284410150a321f739051991b74cd956c872a","status":"CONFIRMED","metadata":{"txnId":"8cb142bcae8e88853f0ce15c71596e1f95018d7dbb9d1d72c3875f06d9e64422bfbee97a9e7b99d003a2ec2edc6b66a9","txnUri":"https://app.dragonglass.me/hedera/search?q=8cb142bcae8e88853f0ce15c71596e1f95018d7dbb9d1d72c3875f06d9e64422bfbee97a9e7b99d003a2ec2edc6b66a9","blockTime":1650863449,"blockTimeNano":984572000,"validStart":"2022-04-25T05:10:38.089409081Z","operator":"0.0.44034","transactionFee":51449,"confirmedByMirror":true},"data":{"@context":"https://w3id.org/chainpoint/v3","type":"Chainpoint","hash":"faaf786cd0508720b44fdc0897fd284410150a321f739051991b74cd956c872a","hash_id_node":"da023c5c-c895-11e9-a32f-2a2ae2dbcce4","hash_submitted_node_at":"2022-04-25T05:10:49Z","hash_id_core":"da023c5c-c895-11e9-a32f-2a2ae2dbcce4","hash_submitted_core_at":"2022-04-25T05:10:49Z","branches":[{"label":"pdb_hedera_mainnet_anchor_branch","ops":[{"anchors":[{"type":"cal","anchor_id":"8cb142bcae8e88853f0ce15c71596e1f95018d7dbb9d1d72c3875f06d9e64422bfbee97a9e7b99d003a2ec2edc6b66a9","uris":["https://anchor.proofable.io/verify/hedera_mainnet/8cb142bcae8e88853f0ce15c71596e1f95018d7dbb9d1d72c3875f06d9e64422bfbee97a9e7b99d003a2ec2edc6b66a9"]}]}]}]}});

console.log(updated);

updated.then((result) => {
  console.log(result);
});

app.listen(port, () =>
  console.log("Final Year Project Backend Listening on Port 5000")
);
