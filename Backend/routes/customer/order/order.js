const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { checkAuth } = require("../../../passport");

router.get("/:email", checkAuth, (req, res) => {
  console.log("Inside get of customer/orders/:emailId");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "getOrders";
  msg.params = req.params;

  kafka.make_request("orderAddressService", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.post("/cancel/product/:email", checkAuth, (req, res) => {
  console.log("Inside post of customer/orders/cancel/product/:emailId");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "cancelOrders";
  msg.params = req.params;

  kafka.make_request("orderAddressService", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.post("/list/cancel/product/:email", checkAuth, (req, res) => {
  console.log("Inside post of customer/orders/list/cancel/product/:emailId");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "getCancelOrders";
  msg.params = req.params;

  kafka.make_request("orderAddressService", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.get("/list/open/product/:email", checkAuth, (req, res) => {
  console.log("Inside get of customer/orders/list/open/product/:emailId");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "getOpenOrders";
  msg.params = req.params;

  kafka.make_request("orderAddressService", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.post("/list/cancel/order/:email", checkAuth, (req, res) => {
  console.log("Inside post of customer/orders/list/cancel/order/:email");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "cancelCompleteOrders";
  msg.params = req.params;

  kafka.make_request("orderAddressService", msg, function(err, results) {
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
