import React from "react";
import topNav from "../container/navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterSeller from "./Register/RegisterSeller";

class bodyCont extends React.Component {
  render() {
    /* Route to different components for different users 
    if (this.props.getType == "Student") {
    } else {
    }*/
    return (
      <div>
        <Route path="/" component={topNav} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/login" component={Login} />
        <Route path="/registerCustomer" component={RegisterCustomer} />
        <Route path="/registerSeller" component={RegisterSeller} />
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
