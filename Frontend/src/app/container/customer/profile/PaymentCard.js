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
    cvv: "",
    editcard: "",
    addSuccessMsg: "",
    alertAddSameCard: ""
  };

  componentWillMount() {
    this.props.getPayment();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.msgSuccess) {
      this.setState({ addSuccessMsg: nextProps.msgSuccess });
    }
  }

  deletePayment = () => {
    let payload = {
      data: {
        card_id: this.state.editedId
      }
    };
    this.props.deletePayment(payload);
  };

  addPayment = e => {
    e.preventDefault();
    e.target.reset();
    let flag = 0;
    this.props.paymentArr.paymentCards.map(pay => {
      if (pay.cardNumber === this.state.cardNumber) flag = 1;
    });
    if (!flag) {
      let payload = {
        card_id: this.state.editcard._id,
        cardName: this.state.cardName,
        cardNumber: this.state.cardNumber,
        expirationDate: this.state.expirationDate,
        cvv: this.state.cvv
      };
      console.log(payload);
      this.props.addOrUpdatePayment(payload);
    } else {
      this.setState({ alertAddSameCard: "Card Number already present!" });
    }
  };
  updatePayment = e => {
    e.preventDefault();
    e.target.reset();
    let payload = {
      card_id: this.state.editcard._id,
      cardName: this.state.cardName,
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv
    };
    console.log(payload);
    this.props.addOrUpdatePayment(payload);
  };

  render() {
    return (
      <div className="container mt-5" style={{ display: "block" }}>
        <h2 className="m-3">Your Payment Details</h2>
        {this.props.paymentArr ? (
          <div className="my-4 d-flex scroll">
            <div
              className="col-3 mx-3 image-edit-avatar first-desktop-address-tile align-content-center"
              onClick={e => {
                this.setState({ modalShow: "block" });
              }}
            >
              <div className="a-box-inner">
                <div className="a-box-inner a-padding-extra-large" />
                <div className="address-plus-icon a-padding-extra-large" />
                <h3 style={{ color: "#767676" }}>Add Payment</h3>
              </div>
            </div>
            {this.props.paymentArr.paymentCards.map(card => (
              <div
                className="col-3 mx-3 rest-desktop-address-tile"
                key={card._id}
              >
                <h5
                  className="pt-4"
                  style={{ fontSize: "13px", fontWeight: "700" }}
                >
                  {card.cardName}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  Card Number: {card.cardNumber.slice(0, -5) + "XXXXX"}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  Expire on: {card.expirationDate.split("T")[0]}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  CVV: {"XX" + card.cvv.slice(2)}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  Added on: {card.createdAt.split("T")[0]}
                </h5>

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
                    this.setState({ editcard: card });
                    this.setState({ editedId: card._id }, () => {
                      console.log(this.state.editedId);
                      console.log(this.state.editcard);
                    });
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
                  onClick={e => {
                    this.setState({ editedId: card._id }, () => {
                      this.deletePayment();
                      console.log(this.state.editedId);
                    });
                  }}
                >
                  Delete
                </span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div
          className="modal modal-custom mt-5"
          align="center"
          style={{ display: this.state.modalShow }}
        >
          <div
            className="modal-content modal-content-custom col-5"
            style={{ fontFamily: "Suisse" }}
          >
            <div className="container">
              <span
                className="close image-edit-avatar"
                onClick={e => {
                  this.setState({ modalShow: "none", alertAddSameCard: "" });
                  this.setState({ addSuccessMsg: "" });
                  this.setState({ editcard: "" });
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
                  {this.state.editcard ? (
                    "Edit Payment Details"
                  ) : (
                    "Add Payment Details"
                  )}
                </h3>
              </div>
              <form
                onSubmit={
                  this.state.editcard ? this.updatePayment : this.addPayment
                }
              >
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Card Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder={
                      this.state.editcard ? (
                        this.state.editcard.cardName
                      ) : (
                        "Enter Card name"
                      )
                    }
                    onChange={e => {
                      this.setState({ cardName: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group col-md-11">
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Card Number
                  </label>
                  {this.state.editcard ? (
                    <div>
                      <input
                        type="number"
                        id="number"
                        name="number"
                        className="form-control"
                        placeholder={
                          this.state.editcard ? (
                            this.state.editcard.cardNumber
                          ) : (
                            "Enter Card number"
                          )
                        }
                        disabled
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="number"
                        id="number"
                        name="number"
                        className="form-control"
                        placeholder={
                          this.state.editcard ? (
                            this.state.editcard.cardNumber
                          ) : (
                            "Enter Card number"
                          )
                        }
                        onChange={e => {
                          this.setState({
                            cardNumber: e.target.value,
                            alertAddSameCard: ""
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
                <div style={{ color: "red", fontWeight: "bold" }}>
                  {this.state.alertAddSameCard}
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
                    placeholder={
                      this.state.editcard ? (
                        this.state.editcard.cvv
                      ) : (
                        "Enter Card cvv"
                      )
                    }
                    onChange={e => {
                      this.setState({ cvv: e.target.value });
                    }}
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
    paymentArr: state.customerProfileReducer.paymentArr,
    msgSuccess: state.customerProfileReducer.msgSuccess
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
