const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get saved product route
router.get("/:id", (req, res) => {
  console.log(req.params);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getProducts";

  kafka.make_request("customerProductService", req.body, function(
    err,
    results
  ) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

// Common API for customer seller and admin get Products
router.delete("/:id", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "deleteSavedProduct";

  kafka.make_request("customerProductService", body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

// move saved product to cart
router.post("/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  req.route = "moveSavedToCart";

  kafka.make_request("customerProductService", req.body, function(
    err,
    results
  ) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
