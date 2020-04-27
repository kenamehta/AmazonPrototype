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
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getSeller } from "./../../../../action/admin/sellerActions.js";

class SellerList extends Component {
  state = {};
  componentDidMount() {
    this.props.getSeller();
  }
  render() {
    console.log(this.props);
    const { sellers } = this.props.sellerAdmin;
    return (
      <Container>
        {" "}
        <ListGroup className="card-img-top">
          <TransitionGroup className="shopping-list">
            {sellers.map(({ _id, name, emailId, profilePictureUrl }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem className="w3-card-4">
                  <Link to="/productlist" className="text-dark">
                    <b>{name}</b>
                    <br />
                    <b>{emailId}</b>
                    <br />
                    <b> {profilePictureUrl}</b>
                    <br />
                  </Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

SellerList.propTypes = {
  getSeller: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sellerAdmin: state.sellerAdmin,
});

export default connect(mapStateToProps, { getSeller })(SellerList);
