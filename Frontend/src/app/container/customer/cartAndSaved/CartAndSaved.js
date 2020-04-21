import React, { Component } from "react";
import CartProducts from "./CartProducts"
import SavedProducts from "./SavedProducts"
import { getSavedAndCartProducts } from "./../../../../action/customer/savedProducts/getSavedAndCartProducts";
import { deleteSavedProduct } from "./../../../../action/customer/savedProducts/deleteSavedProduct";
import { moveSavedToCart } from "./../../../../action/customer/savedProducts/moveSavedToCart";
import { connect } from "react-redux";

componentWillMount(){
    this.props.getSavedAndCartProducts();
}

class CartAndSaved extends Component {
  state = {};
  render() {
    return (
      <div>
        <CartProducts
          savedProductsArr={this.props.savedProductsArr}
          savedCnt={this.props.savedCnt}
        />
        <SavedProducts
          cartProductsArr={this.props.cartProductsArr}
          cartCnt={this.props.cartCnt}
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
