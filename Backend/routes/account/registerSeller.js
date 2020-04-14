var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");

//Register a seller. Adds new seller record in model sellerRegister
router.post("/", async function(req, res) {
  console.log("In seller reg API");
  console.log(req.body);
  console.log(JSON.stringify(req.body));
  let msg = req.body;
  msg.route = "registerSeller";
  kafka.make_request("account", msg, function(err, results) {
    if (err) {
      res.status(err.status).send(err);
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
