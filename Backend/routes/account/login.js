var express = require("express");
var router = express.Router();
const kafka = require("../../kafka/client");
const jwt = require("jsonwebtoken");
// const { secret } = require("../../utils/config");
const { auth } = require("../../passport");
const Config = require("./../../config");
auth();

//customer and seller login
router.post("/", function(req, res) {
  let msg = req.body;
  msg.route = "login";
  kafka.make_request("accounts", msg, function(err, results) {
    if (err) {
      res.status(err.status).send(err);
    } else {
      if (results.status == 200) {
        const token = jwt.sign(
          { _id: results.id, category: msg.category },
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
      } else {
        res.status(results.status).send(results);
      }
    }
  });
});

module.exports = router;
