const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");

//get saved and carts product route
router.get("/:id", (req, res) => {
  console.log(req.params);
  msg = req.body;
  msg.params = req.params;
  msg.route = "getProducts";

  kafka.make_request("customerProductService", req.body, function(
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


router.delete("/cart/:id", (req, res) => {
  console.log("Inside delete of /customer/cartProducts/cart/:id");
  req.body.cartProductId = req.params.id;
  console.log(req.body);

  req.body.route = "deleteCartProduct";
  kafka.make_request("savedAndCartProductService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

// Common API for customer seller and admin get Products
router.delete("/:id", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  msg.route = "deleteSavedProduct";

  kafka.make_request("customerProductService", body, function(err, results) {
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
Keeping it above move saved product to cart api since :id is catching addToCart
It returns all cart products of customer along with each product detail
*/
router.post("/addToCart", (req, res) => {
  console.log("Inside post of /customer/cartProducts/addToCart");
  console.log(req.body);

  req.body.route = "addToCart";
  kafka.make_request("savedAndCartProductService", req.body, function (
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


router.post("/addToSaveForLater", (req, res) => {
  console.log("Inside post of /customer/cartProducts/addToSaveForLater");
  console.log(req.body);

  req.body.route = "addToSaveForLater";
  kafka.make_request("savedAndCartProductService", req.body, function (
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


router.post("/moveFromCartToSaveForLater", (req, res) => {
  console.log("Inside post of /customer/cartProducts/moveFromCartToSaveForLater");
  console.log(req.body);

  req.body.route = "moveCartToSaved";
  kafka.make_request("savedAndCartProductService", req.body, function (
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


// move saved product to cart
router.post("/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  msg = req.body;
  msg.params = req.params;
  req.route = "moveSavedToCart";

  kafka.make_request("customerProductService", req.body, function(
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
