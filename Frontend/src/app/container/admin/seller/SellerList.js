import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Nav,
  NavLink,
  NavItem,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getSeller } from "./../../../../action/admin/sellerActions.js";
import {
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter,
} from "../../../../action/ProductAction/productAction";

class SellerList extends Component {
  state = {};

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


  render() {
    // console.log(this.props);
    const { sellers } = this.props.sellerAdmin;
    return (
      <Container>
        {" "}
        <ListGroup className="card-img-top">
          <TransitionGroup className="shopping-list">
            {sellers.map(({ _id, name, emailId, profilePictureUrl }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade" style={{marginTop:"10px"}}>
                <ListGroupItem className="w3-card-4">
                  <Row>
                    <Col xs="1">
                      <img src={profilePictureUrl} />
                    </Col>
                    <Col xs="11">
                      <Link
                        to={"/seller/profile/"+emailId}
                        className="text-dark"
                        onClick={this.onSearch.bind(this, name)}
                      >
                        <b>{name}</b>
                        <br />
                        <b>{emailId}</b>
                        <br />
                      </Link>
                    </Col>
                  </Row>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
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

// SellerList.propTypes = {
//   getSeller: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   sellerAdmin: state.sellerAdmin,
// });

// export default connect(mapStateToProps, { getSeller })(SellerList);
