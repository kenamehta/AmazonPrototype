const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");
const Config = require("../../config");

router.get("/:emailId", checkAuth, (req, res) => {
    console.log("Inside get of seller/order/:emailId");
   
    let msg = req.body;
    msg.route = "getSellerOrder";
    msg.params = req.params;
    
  
    kafka.make_request("sellerOrderService", req.body, function(err, results) {
      if (results.status != 200) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results);
      }
    });
  });
  


module.exports = router;
