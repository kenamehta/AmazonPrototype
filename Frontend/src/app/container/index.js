import React from "react";
import topNav from "../container/navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import SavedAddress from "./customer/profile/SavedAddress";
import PaymentCard from "./customer/profile/PaymentCard";

import SellerProfile from "./seller/profile/SellerProfile";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterSeller from "./Register/RegisterSeller";

class bodyCont extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={topNav} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/seller/profile" component={SellerProfile} />
        <Route path="/login" component={Login} />
        <Route path="/registerCustomer" component={RegisterCustomer} />
        <Route path="/registerSeller" component={RegisterSeller} />
        <Route path="/address" component={SavedAddress} />
        <Route path="/paymentcard" component={PaymentCard} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getType: state.getType
  };
};

export default connect(mapStateToProps)(bodyCont);
