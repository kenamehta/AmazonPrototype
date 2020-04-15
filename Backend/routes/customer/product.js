const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

// move it to Customer Product Folder/File
// sends all fields of a product document from mongoDb in response.
router.get('/list/:productId', checkAuth, (req, res) => {
  console.log("Inside get of product/list/:productId");
  console.log(req.body);

  req.body.path = "product_get";
  req.body.productId = req.params.productId;

  kafka.make_request("product", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

// move it to Customer Product Folder/File
// adds a comment for a product. updates average rating and returns the updated product document
router.post('/addComment', checkAuth, (req, res) => {
  console.log("Inside get of product/customer/addComment");
  console.log(req.body);

  req.body.path = "product_add_comment";
  kafka.make_request("product", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;