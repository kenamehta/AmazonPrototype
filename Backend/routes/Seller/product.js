const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const { checkAuth } = require("../../passport");
const kafka = require("../../kafka/client");
const Config = require("../../config");

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  region: Config.AWS_REGION
});

const productImagesUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Config.AWS_BUCKET_NAME,
    key: function(req, file, cb) {
      cb(
        null,
        "Products/" + req.body.productName + "/" + file.originalname
      );
    }
  })
});

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

router.post('/customer/addComment', checkAuth, (req, res) => {
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