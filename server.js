const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Hi2tjF2rdrsGf19nMDWZSczmx4ZG8RXCPBtOE4v5tKy8cZshqIvqs0hb5dNhKua3jxUq8EWDOOkRI7JIh0Pt8e8009eFdSI3p"
);

// Create a new app & define its port or take it from the environment variables
// in case of deployment.
const app = express();
const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server running locally on port ${port}`));

//Middlewares
app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

//API routes
app.get("/hey", (req, res) => res.status(200).send("Yooooo!!"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log(`Payment request received!!, for this amount >> ${total}`);

  if (total >= 1) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, //subunits of the currency
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  }
});
