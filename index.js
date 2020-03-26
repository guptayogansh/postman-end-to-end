// Loading our dependencies
let express = require("express");
let jwt = require("jsonwebtoken");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");

app.use(bodyParser.json({ type: "application/json" }));
// HomePage route that displays a Welcome message
// can be accessed without token
app.get("/", function(req, res) {
  res.send("Welcome to postman end to end");
});
app.use(cors());

// login route

let users = [
  { id: 1, username: "clarkKent", password: "superman" },
  { id: 2, username: "bruceWayne", password: "batman" }
];

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send("Error. Please enter the correct username and password");
    return;
  }
  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    "mykey",
    { expiresIn: "3 hours" }
  );
  res.status(200).send({ access_token: token });
});

app.listen("3000");
