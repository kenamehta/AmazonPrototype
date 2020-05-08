const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

router.post("/addProductCategory", checkAuth, (req, res) => {
  console.log("Inside post of product/admin/addProductCategory");
  console.log("HP is great", req.body);

  req.body.path = "addProductCategory";
  kafka.make_request("adminProductService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

router.post("/deleteProductCategory", checkAuth, (req, res) => {
  console.log("Inside post of product/admin/deleteProductCategory");
  console.log(req.body);

  req.body.path = "deleteProductCategory";
  kafka.make_request("adminProductService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

router.get("/getProductCategory", checkAuth, (req, res) => {
  console.log("Inside get of product/admin/getProductCategory");
  console.log(req.body);

  req.body.path = "getProductCategory";
  kafka.make_request("adminProductService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
