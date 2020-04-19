import React, { Component } from "react";
import "../../../../style/ProfilePic.css";
import { connect } from "react-redux";

import {
  addOrUpdatePayment,
  deletePayment,
  getPayment
} from "../../../../action/customerprofileaction/profileAction";

class PaymentCard extends Component {
  state = {
    modalShow: "none",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: ""
  };

  addOrUpdatePayment = e => {
    e.preventDefault();
    let payload = {
      cardName: this.state.cardName,
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv
    };
    this.props.addOrUpdatePayment(payload);
  };

  render() {
    return (
      <div className="container mt-5" style={{ display: "block" }}>
        <div className="row">
          <h2 className="m-3">Your Payment Details</h2>
          <div className="my-4 d-flex">
            <div
              className="col-4 mx-3 image-edit-avatar first-desktop-address-tile align-content-center"
              onClick={e => {
                this.setState({ modalShow: "block" });
              }}
            >
              <div className="a-box-inner a-padding-extra-large">
                <div className="a-box-inner a-padding-extra-large" />
                <div className="address-plus-icon" />
                <h3 style={{ color: "#767676" }}>Add Payment</h3>
              </div>
            </div>

            <div className="col-4 mx-3 rest-desktop-address-tile">
              <h5
                className="pt-4"
                style={{ fontSize: "13px", fontWeight: "700" }}
              >
                PuneetJyot Singh
              </h5>
              <h5 style={{ fontSize: "13px" }}>190 Ryland Street</h5>
              <h5 style={{ fontSize: "13px" }}>Apt 3105</h5>
              <h5 style={{ fontSize: "13px" }}>San Jose, CA</h5>
              <h5 style={{ fontSize: "13px" }}>USA</h5>
              <h5 style={{ fontSize: "13px" }}>Phone number: 20156568888</h5>
              <span
                className="link-color image-edit-avatar"
                style={{
                  fontSize: "13px",
                  bottom: "20px",
                  left: "22px",
                  position: "absolute"
                }}
                onClick={e => {
                  this.setState({ modalShow: "block" });
                }}
              >
                Edit
              </span>
              <span
                className="link-color image-edit-avatar"
                style={{
                  fontSize: "13px",
                  bottom: "20px",
                  left: "62px",
                  position: "absolute"
                }}
              >
                Delete
              </span>
            </div>

            <div className="col-4 mx-3 rest-desktop-address-tile">
              <h5
                className="pt-4"
                style={{ fontSize: "13px", fontWeight: "700" }}
              >
                PuneetJyot Singh
              </h5>
              <h5 style={{ fontSize: "13px" }}>190 Ryland Street</h5>
              <h5 style={{ fontSize: "13px" }}>Apt 3105</h5>
              <h5 style={{ fontSize: "13px" }}>San Jose, CA</h5>
              <h5 style={{ fontSize: "13px" }}>USA</h5>
              <h5 style={{ fontSize: "13px" }}>Phone number: 20156568888</h5>
              <span
                className="link-color"
                style={{
                  fontSize: "13px",
                  bottom: "20px",
                  left: "22px",
                  position: "absolute"
                }}
              >
                Edit
              </span>
              <span
                className="link-color"
                style={{
                  fontSize: "13px",
                  bottom: "20px",
                  left: "62px",
                  position: "absolute"
                }}
              >
                Delete
              </span>
            </div>
          </div>

          <div className="col-4 mx-3 rest-desktop-address-tile">
            <h5
              className="pt-4"
              style={{ fontSize: "13px", fontWeight: "700" }}
            >
              PuneetJyot Singh
            </h5>

            <h5 style={{ fontSize: "13px" }}>190 Ryland Street</h5>
            <h5 style={{ fontSize: "13px" }}>Apt 3105</h5>
            <h5 style={{ fontSize: "13px" }}>San Jose, CA</h5>
            <h5 style={{ fontSize: "13px" }}>USA</h5>
            <h5 style={{ fontSize: "13px" }}>Phone number: 20156568888</h5>
            <span
              className="link-color"
              style={{
                fontSize: "13px",
                bottom: "20px",
                left: "22px",
                position: "absolute"
              }}
            >
              Edit
            </span>
            <span
              className="link-color"
              style={{
                fontSize: "13px",
                bottom: "20px",
                left: "62px",
                position: "absolute"
              }}
            >
              Delete
            </span>
          </div>
        </div>

        <div
          className="modal mt-5"
          align="center"
          style={{ display: this.state.modalShow }}
        >
          <div className="modal-content col-5" style={{ fontFamily: "Suisse" }}>
            <div className="container">
              <span
                className="close image-edit-avatar"
                onClick={e => {
                  this.setState({ modalShow: "none" });
                  this.setState({ addSuccessMsg: "" });
                }}
              >
                &times;
              </span>
              {this.state.addSuccessMsg ? (
                <p style={{ color: "green" }}>{this.state.addSuccessMsg}</p>
              ) : (
                ""
              )}
              <div align="center">
                <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Add Payment
                </h3>
              </div>
              <form onSubmit={this.addOrUpdatePayment}>
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Card Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Card Name"
                    onChange={e => {
                      this.setState({ cardName: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Card Number
                  </label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    className="form-control"
                    placeholder="Enter Card Number"
                    onChange={e => {
                      this.setState({ cardNumber: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    onChange={e => {
                      this.setState({ expirationDate: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    CVV
                  </label>
                  <input
                    type="number"
                    id="cvv"
                    name="cvv"
                    className="form-control"
                    placeholder="Enter CVV"
                    onChange={e => {
                      this.setState({ cvv: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-8 m-3">
                  <input type="submit" className="btn btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    paymentArr: state.customerProfileReducer.paymentArr
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPayment: () => dispatch(getPayment()),
    addOrUpdatePayment: payload => dispatch(addOrUpdatePayment(payload)),
    deletePayment: payload => dispatch(deletePayment(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard);
