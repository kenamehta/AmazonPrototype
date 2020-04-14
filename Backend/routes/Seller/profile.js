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

const profilePictureFileUploadSeller = multer({
  storage: multerS3({
    s3: s3,
    bucket: Config.AWS_BUCKET_NAME,
    key: function(req, file, cb) {
      cb(
        null,
        "ProfilePictures/Seller/" + req.body.emailId + "/" + file.originalname
      );
    }
  })
});

router.get("/:emailId", checkAuth, (req, res) => {
  console.log("Inside get of seller/profile/:emailId");
  console.log(req.body);

  req.body.path = "seller_get";
  req.body.emailId = req.params.emailId;

  kafka.make_request("profile", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

router.post("/updateProfileDetails", checkAuth, (req, res) => {
  console.log("Inside post of seller/profile/updateProfileDetails");
  console.log(req.body);

  req.body.path = "seller_update_profile";

  kafka.make_request("profile", req.body, function(err, results) {
    if (err) {
      res.status(500).send("System Error");
    } else {
      res.status(results.status).send(results.message);
    }
  });
});

router.post(
  "/updateProfilePicture",
  checkAuth,
  profilePictureFileUploadSeller.single("file"),
  (req, res) => {
    console.log("Inside post of seller/profile/updateProfilePicture");

    req.body.path = "seller_update_profilePicture";
    if (req.file) {
      console.log("New Seller Profile Picture File: ", req.file);
      req.body.fileUrl = req.file.location;
    }
    console.log(req.body);

    kafka.make_request("profile", req.body, function(err, results) {
      if (err) {
        res.status(500).send("System Error");
      } else {
        res.status(results.status).send(results.message);
      }
    });
  }
);

module.exports = router;
