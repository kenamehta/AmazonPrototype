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

// file.fieldname is the file1, file2 -> fd.append('file1',this.state.selectedFiles[0]);
const productImagesUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Config.AWS_BUCKET_NAME,
    key: function(req, file, cb) {
        cb(
          null,
          "Products/" + req.body.productName + "/" + file.fieldname + '.jpg'
        );
    }
  })
});

/* 
  frontend can be as follows:

  filesUploadHandler(e) {
    this.setState({
      selectedFiles: e.target.files,
    }, () => {
      console.log(this.state.selectedFiles);
    });
  }

  const fd = new FormData();
  fd.append('file', this.state.selectedFiles);

  OR
  for (var x = 0; x < this.state.selectedFiles.length; x++) {
    data.append("file" + x, this.state.selectedFiles[x]);
}
*/
// keep it in Seller Product Folder/File
router.post('/addProduct', productImagesUpload.any(), (req, res) => {
  console.log("Inside post of product/seller/addProduct");
  console.log(req.body);
  if (req.files) {
    console.log("Product Images req.files array after s3 upload: ", req.files);
    const productImagesURL = req.files.map((each)=>each.location);
    console.log(productImagesURL);
    req.body.productImagesURL = productImagesURL;

    req.body.path = "product_add";
    kafka.make_request("sellerProductService", req.body, function(err, results) {
      if (err) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results.message);
      }
    });
  } else {
    res.status(500).send('Error in Uploading Images');
  }
});


/*
  When seller adds a product, we first need to see if the product with given name already exists or not
  Status 200 if product exist and 400 on not.
  if 400 then call addProduct api

  Spoke to Puneet. Product Name is unique. So Seller cannot change a Product Name.
  checking for exact match, case insensitive in the backend
  so AMAZON and amazon is same product
*/
router.get('/existProduct/:productName', checkAuth, (req, res) => {
  console.log("Inside get of product/seller/existProduct");
  console.log(req.body);

  req.body.path = "product_exist";
  req.body.productName = req.params.productName;

  kafka.make_request("sellerProductService", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});


// Removing of a product by seller. Will only soft delete, set validFlag = false
// expecting productId in req.body
router.post('/removeProduct', checkAuth ,(req, res) => {
  console.log("Inside post of product/seller/removeProduct");
  console.log(req.body);

  req.body.path = "product_delete";

  kafka.make_request("sellerProductService", req.body, function(err, results) {
    if(err){
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});


// Seller cannot change Product Name. Do not give this editing field option in frontend. Assuming Product Name to be unique.
// Expecting productId to be given in req.body
router.post('/updateProduct', checkAuth, productImagesUpload.any() ,(req, res) => {
  console.log("Inside post of product/seller/updateProduct");
  console.log(req.body);

  if(req.files){
    console.log("Product Images req.files array after s3 upload: ", req.files);
    const productImagesURL = req.files.map((each)=>each.location);
    console.log(productImagesURL);
    req.body.productImagesURL = productImagesURL;
  }

  req.body.path = "product_update";

  kafka.make_request("sellerProductService", req.body, function(err, results) {
    if(err){
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;