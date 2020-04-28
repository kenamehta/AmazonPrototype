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
} from "reactstrap";
import {
  //Redirect,
  Link,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import CategoryModal from "./CategoryModal";
import {
  getCategory,
  deleteCategory,
  setModalFalse,
  setAddModalFalse,
} from "./../../../../action/admin/categoryActions";
import {
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter,
} from "../../../../action/ProductAction/productAction";

class CategoryList extends Component {
  state = {};

  onSearch = (category) => {
    let cat = "";
    if (category !== "All" || category !== "All Departments") cat = category;
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: "",
      sellerName: "",
      productName: "",
      productCategory: cat,
      minPrice: 0,
      maxPrice: 2500,
      minRating: "",
      maxRating: "",
    };
    this.props.dispatch(getAllProducts(data));
    this.props.updateProductSearch("", cat, "");
    this.props.updateProductSort("rating", "desc");
    this.props.updateProductFilter("", 0, 2500);
    var path = window.location.pathname.split("/")[1];
    if (path !== "productlist" && path !== "productlisting")
      this.setState({
        reDirect: "redirect",
      });
  };

  componentDidMount() {
    this.props.getCategory();
  }

  onDeleteClick = (name) => {
    this.props.deleteCategory(name);
  };

  onSubmit = (e) => {
    this.props.setModalFalse();
  };
  onSubmit1 = (e) => {
    this.props.setAddModalFalse();
  };
  render() {
    console.log(this.props);
    const { categorys } = this.props.category;

    return (
      <Container>
        {" "}
        <CategoryModal />
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {categorys.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    //className=""
                    variant="outline-secondary"
                    className="sprite remove-btn"
                    size="sm"
                    margin="5px 5px"
                    padding="15px 15px"
                    onClick={this.onDeleteClick.bind(this, name)}
                  >
                    <b>&times;</b>
                  </Button>{" "}
                  <Link
                    to="/productlist"
                    className="text-dark"
                    onClick={(name) => {
                      this.onSearch(name);
                    }}
                  >
                    <b>{name}</b>
                  </Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Modal isOpen={this.props.category.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Error</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="category">This category can not be deleted</Label>

                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={this.onSubmit}
                >
                  {" "}
                  OK
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.props.category.addModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Error</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit1}>
              <FormGroup>
                <Label for="category">This category exists</Label>

                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={this.onSubmit1}
                >
                  {" "}
                  OK
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

CategoryList.propTypes = {
  getCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setModalFalse: PropTypes.func.isRequired,
  setAddModalFalse: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) =>
//  ({
//   category: state.category,
// });

const mapStateToProps = function (state) {
  console.log("In navbar");
  return {
    // getProfileInfo: state.getProfileInfo,
    //getType: state.getType,
    //getCompProfile: state.getCompProfile,
    category: state.category,
    //category1: state.categoryReducer.category,
    productSearch: state.product.productSearch,
  };
};
export default connect(mapStateToProps)(CategoryList);

/*{
  getCategory,
  setModalFalse,
  setAddModalFalse,
  deleteCategory,
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter,
}*/
