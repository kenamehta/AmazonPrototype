import React, { Component } from "react";
import ProfilePic from "./ProfilePic";
import Insights from "./Insights";
import { connect } from "react-redux";

import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "../../../../action/customerProfileAction/profileAction";

class CustomerProfile extends Component {
  state = {};
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <div>
        <ProfilePic
          profileData={this.props.profiledata}
          updateProfile={this.props.updateProfile}
          updateProfilePicture={this.props.updateProfilePicture}
        />
        <Insights profileData={this.props.profiledata} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profiledata: state.customerProfileReducer.profiledata,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(getProfile()),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
    updateProfilePicture: (payload) => dispatch(updateProfilePicture(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
