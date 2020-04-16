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

const profilePictureFileUploadCustomer = multer({
  storage: multerS3({
    s3: s3,
    bucket: Config.AWS_BUCKET_NAME,
    key: function(req, file, cb) {
      //cb(null, "ProfilePictures/Customer/" + req.body.emailId + ".jpg");
      cb(
        null,
        "ProfilePictures/Customer/" + req.body.emailId + ".jpg"
      );
    }
  })
});

router.get("/:emailId", (req, res) => {
  console.log("Inside get of customer/profile/:emailId");
  console.log(req.body);

  //   req.body.path = "";
  //   req.body.emailId = req.params.emailId;
  let msg = req.body;
  msg.route = "getProfile";
  msg.params = req.params.emailId;

  kafka.make_request("customerProfile", msg, function(err, results) {
    console.log(results);
    console.log("while returning");
    if (results.status != 200) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.put("/updateProfileDetails", checkAuth, (req, res) => {
  console.log("Inside post of customer/profile/updateProfileDetails");
  console.log(req.body);
  let msg = req.body;
  msg.route = "updateProfile";

  kafka.make_request("customerProfile", msg, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results);
    }
  });
});

router.put(
  "/updateProfilePicture",
  checkAuth,
  profilePictureFileUploadCustomer.single("file"),
  (req, res) => {
    console.log("Inside post of customer/profile/updateProfilePicture");

    req.body.route = "updateProfilePicture";
    if (req.file) {
      console.log("New customer Profile Picture File: ", req.file);
      req.body.fileUrl = req.file.location;
    }
    console.log(req.body);

    kafka.make_request("customerProfile", req.body, function(err, results) {
      if (err) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results.message);
      }
    });
  }
);

module.exports = router;
