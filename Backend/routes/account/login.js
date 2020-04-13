var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");

//student and company login
router.post("/login", function(req, res) {
  let msg = req.body;
  msg.route = "login";
  kafka.make_request("account", msg, function(err, results) {
    if (err) {
      res.status(err.status).send(err);
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
