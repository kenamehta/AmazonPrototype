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
} from "./../../../../action/admin/categoryActions.js";

class CategoryList extends Component {
  state = {};

  componentDidMount() {
    this.props.getCategory();
  }

  onDeleteClick = (name) => {
    this.props.deleteCategory(name);
  };

  onSubmit = (e) => {
    this.props.setModalFalse();
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
                  <Link to="/productlist" className="text-dark">
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
      </Container>
    );
  }
}

CategoryList.propTypes = {
  getCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setModalFalse: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {
  getCategory,
  setModalFalse,
  deleteCategory,
})(CategoryList);
