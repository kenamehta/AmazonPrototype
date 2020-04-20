const express = require("express");
const router = express.Router();

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

// move it to Customer Product Folder/File
// sends all fields of a product document from mongoDb in response.
// not checking for ValidFlag = true in the backend
// to suffice if customer ordered a product and seller soft deletes it, that customer could still product page from his/her orders
router.get("/list/:productId", (req, res) => {
  console.log("Inside get of product/customer/list/:productId");
  console.log(req.body);

  req.body.path = "product_get";
  req.body.productId = req.params.productId;

  kafka.make_request("customerProductService", req.body, function (
    err,
    results
  ) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});


// Common API for customer seller and admin get Products
router.get('/listAllProducts', (req, res) => {
  console.log('Inside product/customer/listAllProducts')
  
  console.log(req.query);
  const body = {
    path: "products_get",
    ...req.query
  }
  kafka.make_request("customerProductService", body, function(err, results){
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

// move it to Customer Product Folder/File
// adds a comment for a product. updates average rating and returns the updated product document
router.post("/addComment", (req, res) => {
  console.log("Inside get of product/customer/addComment");
  console.log(req.body);

  req.body.path = "product_add_comment";
  kafka.make_request("customerProductService", req.body, function (
    err,
    results
  ) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

/*
Expecting product_id, seller_email_id, quantity.
If product is a gift, provide giftMessage which is a required field in frontend
*/
router.post("/addToCart", checkAuth, (req, res) => {
  console.log("Inside get of product/customer/addToCart");
  console.log(req.body);

  req.body.path = "product_add_cart";
  kafka.make_request("customerProductService", req.body, function (
    err,
    results
  ) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
