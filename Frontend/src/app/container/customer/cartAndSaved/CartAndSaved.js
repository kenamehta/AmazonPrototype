import React, { Component } from "react";
import CartProducts from "./CartProducts";
import SavedProducts from "./SavedProducts";
import { getSavedAndCartProducts } from "./../../../../action/customer/savedAndCartProducts/getSavedAndCartProducts";
import { deleteSavedProduct } from "./../../../../action/customer/savedAndCartProducts/deleteSavedProduct";
import { moveSavedToCart } from "./../../../../action/customer/savedAndCartProducts/moveSavedToCart";
import { connect } from "react-redux";
import "./cartAndSaved.css";

class CartAndSaved extends Component {
  state = {};
  componentWillMount() {
    this.props.getSavedAndCartProducts();
  }
  render() {
    return (
      <div>
        <CartProducts
          cartProductsArr={this.props.cartProductsArr}
          cartCnt={this.props.cartCnt}
        />
        <SavedProducts
          savedProductsArr={this.props.savedProductsArr}
          savedCnt={this.props.savedCnt}
          deleteSavedProduct={this.props.deleteSavedProduct}
          moveSavedToCart={this.props.moveSavedToCart}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    savedProductsArr: state.savedAndCartProductReducer.savedProductsArr,
    cartProductsArr: state.savedAndCartProductReducer.cartProductsArr,
    savedCnt: state.savedAndCartProductReducer.savedCnt,
    cartCnt: state.savedAndCartProductReducer.cartCnt
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSavedAndCartProducts: () => dispatch(getSavedAndCartProducts()),
    deleteSavedProduct: payload => dispatch(deleteSavedProduct(payload)),
    moveSavedToCart: payload => dispatch(moveSavedToCart(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartAndSaved);
