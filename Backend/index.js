// inbuilt package imports
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// User defined module imports
const Config = require("./config");
const sellerProfile = require("./routes/Seller/profile");
const sellerProduct = require("./routes/Seller/product");
const customerProduct = require("./routes/customer/product");
const adminProduct = require("./routes/admin/product");
const adminSeller = require("./routes/admin/seller");
const healthCheck = require("./routes/HealthCheck/healthCheck");

const app = express();
// setting view engine
app.set("view engine", "ejs");
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(
  session({
    secret: "sarthak_amazon_secure_string",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);
app.use(
  cors({
    origin: `${Config.applicationAddress}:${Config.applicationPort}`,
    credentials: true,
  })
);
app.use(express.static("./ProfilePictures/Seller"));
app.use(express.static("./ProfilePictures/Customer"));
app.use(express.static("./ProfilePictures/Common"));

app.use("/healthCheck", healthCheck);
app.use("/login", require("./routes/account/login"));
app.use("/registerCustomer", require("./routes/account/registerCustomer"));
app.use("/registerSeller", require("./routes/account/registerSeller"));
app.use("/customer/profile", require("./routes/customer/profile"));
app.use("/seller/profile", sellerProfile);
app.use("/product/customer", customerProduct);
app.use("/product/seller", sellerProduct);
app.use("/product/admin", adminProduct);
app.use("/admin/seller", adminSeller);
app.use("/customer/payment", require("./routes/customer/payment"));
app.use("/customer/address", require("./routes/customer/address"));
app.use("/customer/orders", require("./routes/customer/order/order"));

app.use(
  "/customer/cartProducts",
  require("./routes/customer/savedAndCartProducts")
);
app.use("/customer/checkout", require("./routes/customer/checkout"));
app.use("/order/status", require("./routes/tracking/tracking"));

const server = app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
