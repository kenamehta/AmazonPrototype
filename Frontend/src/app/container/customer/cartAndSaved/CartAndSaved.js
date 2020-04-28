import React, { Component } from "react";
import CartProducts from "./CartProducts";
import SavedProducts from "./SavedProducts";
import { getSavedAndCartProducts } from "./../../../../action/customer/savedAndCartProducts/getSavedAndCartProducts";
import { deleteSavedProduct } from "./../../../../action/customer/savedAndCartProducts/deleteSavedProduct";
import { moveSavedToCart } from "./../../../../action/customer/savedAndCartProducts/moveSavedToCart";
import { deleteCartProduct } from "./../../../../action/customer/savedAndCartProducts/deleteCartProduct";
import { moveCartToSaved } from "./../../../../action/customer/savedAndCartProducts/moveCartToSaved";
import { updateCart } from "./../../../../action/customer/savedAndCartProducts/updateCart";
import { connect } from "react-redux";
import "./cartAndSaved.css";
import { Row } from "react-bootstrap";

class CartAndSaved extends Component {
  state = {};

  render() {
    return (
      <div>
        <CartProducts
          cartProductsArr={this.props.cartProductsArr}
          cartCnt={this.props.cartCnt}
          deleteCartProduct={this.props.deleteCartProduct}
          moveCartToSaved={this.props.moveCartToSaved}
          updateCart={this.props.updateCart}
        />
        <Row>
          <SavedProducts
            savedProductsArr={this.props.savedProductsArr}
            savedCnt={this.props.savedCnt}
            deleteSavedProduct={this.props.deleteSavedProduct}
            moveSavedToCart={this.props.moveSavedToCart}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    savedProductsArr: state.savedAndCartProductReducer.savedProductsArr,
    cartProductsArr: state.savedAndCartProductReducer.cartProductsArr,
    savedCnt: state.savedAndCartProductReducer.savedCnt,
    cartCnt: state.savedAndCartProductReducer.cartCnt,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSavedAndCartProducts: () => dispatch(getSavedAndCartProducts()),
    deleteSavedProduct: (payload) => dispatch(deleteSavedProduct(payload)),
    moveSavedToCart: (payload) => dispatch(moveSavedToCart(payload)),
    deleteCartProduct: (payload) => dispatch(deleteCartProduct(payload)),
    moveCartToSaved: (payload) => dispatch(moveCartToSaved(payload)),
    updateCart: (payload) => dispatch(updateCart(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartAndSaved);
