const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get address details of a customer
router.get("/report1/:sellerEmailId", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getSellerReport1";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//add or update address details of a customer
router.get("/report2/:sellerEmailId", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getSellerReport2";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
