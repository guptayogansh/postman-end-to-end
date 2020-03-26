const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const expressjwt = require("express-jwt");

app.use(bodyParser.json());

app.get("/asset", (req, res) => {
  res.status(200).send("Everybody can see this");
});

const jwtCheck = expressjwt({
  secret: "mykey"
});

app.get("/asset/secret", jwtCheck, (req, res) => {
  res.status(200).send("Only logged in people can see me");
});

app.listen("5000");
