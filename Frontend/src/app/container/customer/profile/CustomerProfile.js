import React, { Component } from "react";
import ProfilePic from "./ProfilePic";
import Insights from "./Insights";
import { connect } from "react-redux";
import {getProfile,updateProfile} from "../../../../action/customerprofileaction/profileAction"

class CustomerProfile extends Component {
  state = {};
  componentWillMount(){
    this.props.getProfile();
  }
  render() {
    return (
      <div>
        <ProfilePic profileData={this.props.profiledata}
          updateProfile={this.props.updateProfile}

        ></ProfilePic>
        <Insights profileData={this.props.profiledata}></Insights>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
   profiledata:state.customerProfileReducer.profiledata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    updateProfile: (payload) => dispatch(updateProfile(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
