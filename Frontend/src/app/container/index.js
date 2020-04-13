import React from "react";
import topNav from "../container/navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import SellerProfile from "./seller/profile/SellerProfile";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";

class bodyCont extends React.Component {
  render() {
    return (
      <div>
       <Route path="/" component={topNav} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/seller/profile" component={SellerProfile} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    getType: state.getType,
  };
};

export default connect(mapStateToProps)(bodyCont);
