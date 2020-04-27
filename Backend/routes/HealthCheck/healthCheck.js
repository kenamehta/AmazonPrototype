const express = require("express");
const router = express.Router();

router.get("/dummy", (req, res) => {
  console.log('Inside get /healthCheck/dummy');
  res.status(200).send("OK");
});

module.exports = router;