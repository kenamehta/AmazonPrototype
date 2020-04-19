import React, { Component } from "react";
import SavedAddress from "./SavedAddress";
import PaymentCard from "./PaymentCard";

class PaymentAndAddressPage extends Component {
  state = {};
  render() {
    return <div>
        <SavedAddress></SavedAddress>
        <PaymentCard></PaymentCard>
    </div>;
  }
}

export default PaymentAndAddressPage;
