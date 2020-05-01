const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

router.get("/getSellerList", (req, res) => {
  console.log("Inside get of admin/seller/getSellerList");
  console.log(req.body);

  req.body.path = "getSellerList";
  kafka.make_request("adminSellerService", req.body, function (err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
