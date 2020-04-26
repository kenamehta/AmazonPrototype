import React, { Component } from "react";
import SelectAddress from "./SelectAddress";
import SelectPayment from "./SelectPayment";
import { connect } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
  addOrUpdatePayment,
  deletePayment,
  getPayment
} from "../../../../action/customerprofileaction/profileAction";
import { proceedToOrder } from "../../../../action/customer/checkout/proceedToOrder";
import "./SelectAddressAndPayment.css";

class SelectAddressAndPayment extends Component {
  state = {};
  render() {
    return (
      <div>
        <SelectAddress
          addressArray={this.props.addressArray}
          msgSuccess={this.props.msgSuccess}
          getAddress={this.props.getAddress}
          addAddress={this.props.addAddress}
          deleteAddress={this.props.deleteAddress}
          proceedToOrder={this.props.proceedToOrder}
        />
        <SelectPayment
          paymentArr={this.props.paymentArr}
          msgSuccess={this.props.msgSuccess}
          getPayment={this.props.getPayment}
          addOrUpdatePayment={this.props.addOrUpdatePayment}
          deletePayment={this.props.deletePayment}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    paymentArr: state.customerProfileReducer.paymentArr,
    addressArray: state.customerProfileReducer.addressArray,
    msgSuccess: state.customerProfileReducer.msgSuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPayment: () => dispatch(getPayment()),
    addOrUpdatePayment: payload => dispatch(addOrUpdatePayment(payload)),
    deletePayment: payload => dispatch(deletePayment(payload)),
    getAddress: () => dispatch(getAddress()),
    addAddress: payload => dispatch(addAddress(payload)),
    deleteAddress: payload => dispatch(deleteAddress(payload)),
    proceedToOrder: payload => dispatch(proceedToOrder(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  SelectAddressAndPayment
);
