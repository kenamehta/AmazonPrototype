import React from "react";
import topNav from "../container/navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";

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
