const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

router.post("/addProductCategory", checkAuth, (req, res) => {
  console.log("Inside post of product/admin/addProductCategory");
  console.log(req.body);

  req.body.path = "addProductCategory";
  kafka.make_request("adminProductService", req.body, function (err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
