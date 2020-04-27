"use strict";
const product = require("../../../models/product.model");

const getMultipleProducts = (msg, callback) => {
  var res = {};
  console.log("Inside getMultipleProducts in kafka");
  console.log(msg);
  var options = {
    page: parseInt(msg.page),
    limit: parseInt(msg.limit),
  };

  if (msg.orderOn === "rating") {
    if (msg.order === "asc") {
      options = Object.assign(options, {
        sort: { averageRating: 1 },
      });
    } else if (msg.order === "desc") {
      options = Object.assign(options, {
        sort: { averageRating: -1 },
      });
    }
  } else if (msg.orderOn === "price") {
    if (msg.order === "asc") {
      options = Object.assign(options, {
        sort: { productPrice: 1 },
      });
    } else if (msg.order === "desc") {
      options = Object.assign(options, {
        sort: { productPrice: -1 },
      });
    }
  }

  var filter = {};
  if (msg.sellerEmailId !== "") {
    filter = Object.assign(filter, {
      sellerEmailId: msg.sellerEmailId,
    });
  }

  // send productName='' if no productName given
  if (msg.productName !== "") {
    filter = Object.assign(filter, {
      productName: { $regex: ".*" + msg.productName + ".*", $options: "i" },
    });
  }

  // send sellerName='' if no sellerName given
  if (msg.sellerName !== "") {
    filter = Object.assign(filter, {
      sellerName: { $regex: ".*" + msg.sellerName + ".*", $options: "i" },
    });
  }

  // send productCategory='' to get products from all Category
  if (msg.productCategory !== "") {
    filter = Object.assign(filter, {
      productCategory: {
        $regex: ".*" + msg.productCategory + ".*",
        $options: "i",
      },
    });
  }

  // send minPrice ='' and maxPrice ='' if no filter on pricing required
  // send minPrice=200 and maxPrice='' to get all products with price >= 200
  if (msg.minPrice !== "" && msg.maxPrice !== "") {
    filter = Object.assign(filter, {
      productPrice: {
        $gte: parseFloat(msg.minPrice),
        $lte: parseFloat(msg.maxPrice),
      },
    });
  } else if (msg.minPrice !== "") {
    filter = Object.assign(filter, {
      productPrice: { $gte: parseFloat(msg.minPrice) },
    });
  } else if (msg.maxPrice !== "") {
    filter = Object.assign(filter, {
      productPrice: { $lte: parseFloat(msg.maxPrice) },
    });
  }

  // send minRating ='' and maxRating ='' if no filter on pricing required
  // send minRating=3.5 and maxRating='' to get all products with rating >= 3.5
  if (msg.minRating !== "" && msg.maxRating !== "") {
    filter = Object.assign(filter, {
      averageRating: {
        $gte: parseFloat(msg.minRating),
        $lte: parseFloat(msg.maxRating),
      },
    });
  } else if (msg.minRating !== "") {
    filter = Object.assign(filter, {
      averageRating: { $gte: parseFloat(msg.minRating) },
    });
  } else if (msg.maxRating !== "") {
    filter = Object.assign(filter, {
      averageRating: { $lte: parseFloat(msg.maxRating) },
    });
  }

  console.log("Filter:");
  console.log(filter);
  console.log("options:");
  console.log(options);

  product.paginate(filter, options, (err, results) => {
    if (err) {
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }
    res.status = 200;
    res.message = results;
    callback(null, res);
  });
};

exports.getMultipleProducts = getMultipleProducts;
