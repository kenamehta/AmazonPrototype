const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");

router.get("/:email", (req, res) => {
    console.log("Inside get of customer/profile/:emailId");
    console.log(req.body);
  
    //   req.body.path = "";
    //   req.body.emailId = req.params.emailId;
    let msg = req.body;
    msg.route = "getOrders";
    msg.params = req.params;
  
    kafka.make_request("orderAddressService", msg, function (err, results) {
      console.log(results);
      console.log("while returning");
      if (results.status != 200) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results);
      }
    });
  });

  router.post("/cancel/product/:email", (req, res) => {
    console.log("Inside get of customer/order/cancel/product/:emailId");
    console.log(req.body);
  
    //   req.body.path = "";
    //   req.body.emailId = req.params.emailId;
    let msg = req.body;
    msg.route = "cancelOrders";
    msg.params = req.params;
  
    kafka.make_request("orderAddressService", msg, function (err, results) {
      console.log(results);
      console.log("while returning");
      if (results.status != 200) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results);
      }
    });
  });
  
  module.exports = router;
