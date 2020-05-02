import React from "react";
import topNav from "./navbar";
import CustomerProfile from "./customer/profile/CustomerProfile";
import PaymentAndAddressPage from "./customer/profile/PaymentAndAddressPage";

import SellerProfile from "./seller/profile/SellerProfile";
import SellerOrderPage from "./seller/order/OrderPage";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import cookie from 'react-cookies';
import Login from "./Login/Login";
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterSeller from "./Register/RegisterSeller";
import ProductList from "./products/productsList";
import ProductPage from "./products/productPage/ProductPage";
import OrderPage from "./customer/order/OrderPage";
import CancelledOrder from "./customer/order/CancelledOrder";
import OpenOrder from "./customer/order/OpenOrder";
import CartAndSaved from "./customer/cartAndSaved/CartAndSaved";
import CategoryList from "./admin/category/CategoryList";
import SellerList from "./admin/seller/SellerList";
import SelectAddressAndPayment from "./customer/checkout/SelectAddressAndPayment";

class bodyCont extends React.Component {
  render() {
    return (
      <div>
        <Route path='/' component={topNav} />
        <Route path='/customer/profile' component={CustomerProfile} />
        <Route path='/seller/profile' component={SellerProfile} />
        <Route path='/seller/order' component={SellerOrderPage} />

        <Route path='/login' component={Login} />
        <Route path='/registerCustomer' component={RegisterCustomer} />
        <Route path='/registerSeller' component={RegisterSeller} />
        <Route path='/addressandpayment' component={PaymentAndAddressPage} />
        <Route path='/customer/orders' component={OrderPage} />
        <Route path='/admin/inventory' component={CategoryList} />
        <Route path='/admin/seller' component={SellerList} />
        <Route path='/productlist' component={ProductList} />
        <Route path='/productlisting' component={ProductList} />
        {/* <Route path="/paymentcard" component={PaymentCard} /> */}
        <Route path='/productPage/:id' component={ProductPage} />
        <Route path='/cart' component={CartAndSaved} />
        <Route path='/checkout' component={SelectAddressAndPayment} />
        <Route
          path='/customer/order/cancelledorders'
          component={CancelledOrder}
        />
        <Route path='/customer/order/openorders' component={OpenOrder} />
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
