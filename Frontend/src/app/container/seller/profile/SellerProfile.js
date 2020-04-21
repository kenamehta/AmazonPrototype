/*eslint-disable */

import React from "react";
import BasicProfile from "./BasicProfile";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import AddProduct from "./AddProduct";

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setShow: false };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  render() {
    let sellerVisitingOwnProfile = true;
    if (this.props.match.params.id) {
      sellerVisitingOwnProfile = false;
    }
    var add;
    if (localStorage.getItem("category") == "seller") {
      add = (
        <Button
          className='bluebeacon addProductButton'
          style={{
            float: "right",
            borderRadius: 15 + "px",
            borderColor: "#232f3e",
            right: 40,
            bottom: 30,
            position: "fixed",
            fontSize: 20 + "px",
          }}
          onClick={this.handleShow}
        >
          Add Product
        </Button>
      );
    }
    return (
      <Container>
        <BasicProfile
          sellerVisitingOwnProfile={sellerVisitingOwnProfile}
          sellerEmailId={this.props.match.params.id}
        />
        {add}
        <AddProduct show={this.state.setShow} handleClose={this.handleClose} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps, {})(SellerProfile);
