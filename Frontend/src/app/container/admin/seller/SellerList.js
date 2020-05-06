import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSeller,
  updateSellerList,
} from "./../../../../action/admin/sellerActions.js";
import {
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter,
} from "../../../../action/ProductAction/productAction";

class SellerList extends Component {
  state = {
    name1: "",
  };

  onSearch = (sellerName) => {
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: "",
      sellerName: sellerName,
      productName: "",
      productCategory: "",
      minPrice: 0,
      maxPrice: 2500,
      minRating: "",
      maxRating: "",
    };
    this.props.dispatch(getAllProducts(data));
    this.props.dispatch(updateProductSearch("", "", sellerName));
    this.props.dispatch(updateProductSort("rating", "desc"));
    this.props.dispatch(updateProductFilter("", 0, 2500));
    var path = window.location.pathname.split("/")[1];
    if (path !== "productlist" && path !== "productlisting")
      this.setState({
        reDirect: "redirect",
      });
  };
  componentDidMount() {
    this.props.dispatch(getSeller());
  }

  onChange = (e) => {
    this.setState({ name1: e.target.value });

    const sellerName = {
      name: e.target.value,
    };
    this.props.dispatch(updateSellerList(sellerName));
  };

  onSearching = () => {
    // const nameOfSeller = this.state.name1;
    // console.log(nameOfSeller);

    const nameOfSeller = {
      name: this.state.name1,
    };

    this.props.dispatch(updateSellerList(nameOfSeller));
  };
  render() {
    // console.log(this.props);
    const { sellers } = this.props.sellerAdmin;
    const cards = this.props.sellerAdmin.sellers.map(
      ({ _id, name, emailId, profilePictureUrl }) => {
        let titleLink = "";
        if (this.props.sellerAdmin)
          titleLink = <h1 className="product-title2">{name}</h1>;
        //else titleLink = <h1 className="product-title2">Mehnaaz</h1>;
        return (
          <Col xl={2} lg={3} md={4} sm={5} xs={12} className="line">
            <Card key={_id} style={{ border: "none" }} className="class-style">
              <div style={{ height: "200px", width: "150px", margin: "auto" }}>
                <span class="helper"></span>
                <Link
                  to={`/seller/profile/${emailId}`}
                  className="text-dark"
                  // onClick={this.onSearch.bind(this, name)}
                >
                  <Card.Img
                    variant="top"
                    src={profilePictureUrl}
                    style={{ width: "150px", verticalAlign: "middle" }}
                  />
                </Link>
              </div>
              <Card.Body>
                <Card.Title style={{ marginBottom: "0" }}>
                  <Link
                    to={`/seller/profile/${emailId}`}
                    className="text-dark"
                    //onClick={this.onSearch.bind(this, name)}
                  >
                    {titleLink}
                  </Link>
                </Card.Title>

                <Card.Text
                  // className="margin-auto-custom"
                  style={{ color: "#000" }}
                >
                  <p className="price-style">
                    <p aria-hidden="true">
                      <p
                        className="a-price-fraction"
                        style={{
                          verticalAlign: "super",
                          top: "-.5em",
                          fontSize: "12px",
                          fontWeight: "400",
                          display: "inline",
                        }}
                      >
                        {emailId}
                      </p>
                    </p>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    );
    return (
      <Container style={{ marginTop: "10px" }}>
        {/* <Form.Label style={{ fontWeight: 800, marginTop: "10px" }}>
          Search By Seller
        </Form.Label> */}
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search Seller"
            name="name"
            onChange={this.onChange}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              className="sprite"
              onClick={this.onSearching}
            >
              <FaSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Row xl={12} lg={12} md={12} sm={12} xs={12}>
          {cards}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    sellerAdmin: state.sellerAdmin,
    productSearch: state.product.productSearch,
  };
};
export default connect(mapStateToProps)(SellerList);
