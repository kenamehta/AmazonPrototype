const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get payment details of a customer
router.get("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getPayment";
  kafka.make_request("customerPaymentService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//add or update payment details of a customer
router.post("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "addOrUpdatePayment";
  kafka.make_request("customerPaymentService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//delete a payment for customer
router.delete("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "deletePayment";
  kafka.make_request("customerPaymentService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
