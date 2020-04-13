var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");

//Register a customer. Adds new student record in model customerRegister
router.post("/registerCustomer", async function(req, res) {
  let msg = req.body;
  msg.route = "registerCustomer";
  kafka.make_request("account", msg, function(err, results) {
    if (err) {
      res.status(err.status).send(err);
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
