const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get address details of a customer
router.get("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAddress";
  kafka.make_request("customerAddressService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//add or update address details of a customer
router.post("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "addOrUpdateAddress";
  kafka.make_request("customerAddressService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//delete a address for customer
router.delete("/:id", (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "deleteAddress";
  kafka.make_request("customerAddressService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
