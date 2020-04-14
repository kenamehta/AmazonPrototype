var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");
const jwt = require("jsonwebtoken");
// const { secret } = require("../../utils/config");
const { auth } = require("../../passport");
const Config = require("./../../config");
auth();

//student and company login
router.post("/", function(req, res) {
  let msg = req.body;
  msg.route = "login";
  kafka.make_request("account", msg, function(err, results) {
    if (err) {
      res.status(err.status).send(err);
    } else {
      const token = jwt.sign(
        { _id: result._id, category: msg.category },
        Config.secret,
        {
          expiresIn: 1008000
        }
      );
      var jwtToken = "JWT " + token;
      res.status(results.status).send({
        ...results,
        idToken: jwtToken
      });
    }
  });
});

module.exports = router;
