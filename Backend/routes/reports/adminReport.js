const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//admin report 1 : No of orders per day.
router.get("/report1", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport1";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//2: Top 5 most sold products.
router.get("/report2", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport2";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//3: Top 5 sellers based on total sales amount.
router.get("/report3", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport3";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//4: Top 5 customers based on total purchase amount.
router.get("/report4", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport4";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//5: Top 10 products based on rating.
router.get("/report5", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport5";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//6: Top 10 products viewed per day.
router.get("/report6", checkAuth, (req, res) => {
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getAdminReport6";
  kafka.make_request("reportService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
