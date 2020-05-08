const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

router.get("/getSellerList", checkAuth, (req, res) => {
  console.log("Inside get of admin/seller/getSellerList");
  console.log(req.body);

  req.body.path = "getSellerList";
  kafka.make_request("adminSellerService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

router.post("/findSeller", checkAuth, (req, res) => {
  console.log("Inside post of admin/seller/findSeller");
  console.log("mehnaaz is great", req.body);

  req.body.path = "findSeller";
  kafka.make_request("adminSellerService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
