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
  console.log("Inside get of seller/product/addProduct");
  console.log(req.body);

  if (req.files) {
    console.log("Product Images req.files array after s3 upload: ", req.files);
    //req.body.fileUrl = req.file.location;
  }

  /*
  req.body.path = "add_product";
  kafka.make_request("product", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
  */
 
 res.status(200).send('Successfully Added');
});

module.exports = router;