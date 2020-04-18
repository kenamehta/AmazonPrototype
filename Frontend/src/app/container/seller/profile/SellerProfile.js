import React from "react";
import BasicProfile from "./BasicProfile";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let sellerVisitingOwnProfile = true;
    if (this.props.match.params.id) {
      sellerVisitingOwnProfile = false;
    }
    return (
      <Container>
        <BasicProfile
          sellerVisitingOwnProfile={sellerVisitingOwnProfile}
          sellerEmailId={this.props.match.params.id}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps, {})(SellerProfile);
