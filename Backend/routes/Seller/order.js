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
  
  router.get("/list/open/product/:emailId", checkAuth, (req, res) => {
    console.log("Inside get of seller/order/:emailId");
   
    let msg = req.body;
    msg.route = "getSellerOpenOrder";
    msg.params = req.params;
    
  
    kafka.make_request("sellerOrderService", req.body, function(err, results) {
      if (results.status != 200) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results);
      }
    });
  });

  router.post("/list/cancel/product/:email", checkAuth, (req, res) => {
    console.log("Inside get of /list/cancel/product/:email");
   
    let msg = req.body;
    msg.route = "cancelOrderbySeller";
    msg.params = req.params;
    
  
    kafka.make_request("sellerOrderService", req.body, function(err, results) {
      if (results.status != 200) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results);
      }
    });
  });

  router.get("/list/cancel/product/:email", checkAuth, (req, res) => {
    console.log("Inside get of seller/order/:emailId");
   
    let msg = req.body;
    msg.route = "getSellerCancelOrder";
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
