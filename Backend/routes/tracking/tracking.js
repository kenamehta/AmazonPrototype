const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get tracking
router.get("/:orderProductId", checkAuth, (req, res) => {
  console.log(req.params);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getTracking";
  kafka.make_request("trackingService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

//update status
router.post("/:orderProductId", checkAuth, (req, res) => {
  console.log(req.params);
  msg = req.body;
  msg.params = req.params;
  msg.route = "updateTracking";
  kafka.make_request("trackingService", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
