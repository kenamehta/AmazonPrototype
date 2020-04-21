import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getCategory,
  deleteCategory,
} from "./../../../../action/admin/categoryActions.js";

class CategoryList extends Component {
  state = {};

  componentDidMount() {
    this.props.getCategory();
  }

  onDeleteClick = (id) => {
    this.props.deleteCategory(id);
  };
  render() {
    const { categorys } = this.props.category;
    console.log(this.state);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {categorys.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    margin="5px 5px"
                    padding="15px 15px"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>{" "}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

categoryList.propTypes = {
  getCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategory, deleteCategory })(
  CategoryList
);
