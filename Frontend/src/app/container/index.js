import React from "react";
import topNav from "./navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import PaymentAndAddressPage from "./customer/profile/PaymentAndAddressPage";

import SellerProfile from "./seller/profile/SellerProfile";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterSeller from "./Register/RegisterSeller";
import ProductList from "./products/productsList";
import ProductPage from "./products/productPage/ProductPage";
import CartAndSaved from "./customer/cartAndSaved/CartAndSaved";

class bodyCont extends React.Component {
  render() {
    return (
      <div>
        <Route path='/' component={topNav} />
        <Route path='/customer/profile' component={CustomerProfile} />
        <Route path='/seller/profile' component={SellerProfile} />
        <Route path='/login' component={Login} />
        <Route path='/registerCustomer' component={RegisterCustomer} />
        <Route path='/registerSeller' component={RegisterSeller} />
        <Route path='/addressandpayment' component={PaymentAndAddressPage} />
        <Route path='/productlist' component={ProductList} />
        {/* <Route path="/paymentcard" component={PaymentCard} /> */}
        <Route path='/productPage/:id' component={ProductPage} />
        <Route path='/cart' component={CartAndSaved} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getType: state.getType,
  };
};

export default connect(mapStateToProps)(bodyCont);
