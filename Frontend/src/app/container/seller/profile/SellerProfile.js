/*eslint-disable */

import React from "react";
import BasicProfile from "./BasicProfile";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Button, Row } from "react-bootstrap";
import AddProduct from "./AddProduct";
import List from "../../products/productsList/list";
import {
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter,
} from "../../../../action/ProductAction/productAction";
import Report from "../reports/MonthlyProductSales";

class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in seller profile");
    console.log(props);

    this.state = { setShow: false };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  dispatchAction = () => {
    var email =
      this.props.location.pathname.split("/").length > 3
        ? this.props.location.pathname.split("/")[3]
        : "";
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: email,
      sellerName: "",
      productName: "",
      productCategory: "",
      minPrice: 0,
      maxPrice: 2500,
      minRating: "",
      maxRating: "",
    };
    this.props.dispatch(getAllProducts(data));
    this.props.dispatch(updateProductSearch("", "", ""));
    this.props.dispatch(updateProductSort("rating", "desc"));
    this.props.dispatch(updateProductFilter("", 0, 2500));
  };

  componentDidMount() {
    this.dispatchAction();
  }

  render() {
    let sellerVisitingOwnProfile = true;
    console.log("this.props.location.pathname");
    console.log(this.props.location.pathname);
    /*
      const a = '/seller/profile/2013uec1108@mnit.ac.in';
      let ab = a.split("/");
      console.log(ab)
      ab = ["","seller","profile","2013uec1108@mnit.ac.in"]
    */
    if (this.props.location.pathname.split("/").length > 3) {
      sellerVisitingOwnProfile = false;
    }
    var add;
    let report = "";
    if (localStorage.getItem("category") === "seller") {
      add = (
        <Button
          className="bluebeacon addProductButton"
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
    } else if (localStorage.getItem("category") === "admin") {
      report = (
        <>
          <Row
            xs={12}
            md={12}
            sm={12}
            lg={12}
            xl={12}
            style={{ position: "relative", marginTop: "50px", height: "500px" }}
          >
            <Report
              sellerVisitingOwnProfile={sellerVisitingOwnProfile}
              sellerEmailId={
                this.props.location.pathname.split("/").length > 3
                  ? this.props.location.pathname.split("/")[3]
                  : ""
              }
            />
          </Row>
        </>
      );
    }

    return (
      <Container fluid style={{ padding: "0 10%" }}>
        <BasicProfile
          sellerVisitingOwnProfile={sellerVisitingOwnProfile}
          sellerEmailId={
            this.props.location.pathname.split("/").length > 3
              ? this.props.location.pathname.split("/")[3]
              : ""
          }
        />
        {report}
        <Row
          xs={12}
          md={12}
          sm={12}
          lg={12}
          xl={12}
          style={{ position: "relative", marginTop: "50px", height: "500px" }}
        >
          <List sellerProfile={true} />
        </Row>
        {add}
        <AddProduct show={this.state.setShow} handleClose={this.handleClose} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps)(SellerProfile);
