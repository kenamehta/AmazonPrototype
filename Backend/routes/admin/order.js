const express = require("express");
const router = express.Router();
const kafka = require("../../kafka/client");
const { checkAuth } = require("../../passport");

router.get("/:statusFilter/:sellerNameFilter", checkAuth, (req, res) => {
  console.log("Inside get of admin/orders");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "getAdminOrders";
  msg.params = req.params;

  kafka.make_request("adminOrderServices", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

module.exports = router;
