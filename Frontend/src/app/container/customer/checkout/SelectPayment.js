import React, { Component } from "react";
import { connect } from "react-redux";
import { sendModalStatus } from "./../../../../action/customerprofileaction/profileAction";

class SelectPayment extends Component {
  state = {
    modalShow: "none",
    modalSelected: "none",
    displayPayment: "block",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardNameSel: "",
    cardNumberSel: "",
    expirationDateSel: "",
    cvvSel: "",
    editcard: "",
    addSuccessMsg: ""
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

  addOrUpdatePayment = e => {
    e.preventDefault();
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
      <div>
        {/* Below block displays the selected Payment */}
        <div
          className="container mt-5"
          style={{ display: this.state.modalSelected }}
        >
          <h2 className="m-3">Use below Payment</h2>
          <div className="col-3 mx-3 rest-desktop-address-tile-checkout-selected">
            <div style={{ height: "153px" }}>
              <div className="" style={{ fontSize: "16px", fontWeight: "700" }}>
                {this.state.cardNameSel}
              </div>
              <div style={{ fontSize: "13px" }}>
                Card Number: {this.state.cardNumberSel.slice(0, -5) + "XXXXX"}
              </div>
              <div style={{ fontSize: "13px" }}>
                Expire on: {this.state.expirationDateSel.split("T")[0]}
              </div>
              <div style={{ fontSize: "13px" }}>
                CVV: {"XX" + this.state.cvvSel.slice(2)}
              </div>
            </div>
            <div className="ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
              <span
                className="a-button-inner a-button-text"
                onClick={() => {
                  this.setState({
                    modalSelected: "none",
                    displayPayment: "block"
                  });
                  this.props.sendModalStatus({ paymentSelectModal: "none" });
                }}
              >
                Select another payment
              </span>
            </div>
          </div>
        </div>
        {/* End of the selected payment block */}

        <div
          className="container mt-5"
          style={{ display: this.state.displayPayment }}
        >
          <h2 className="m-3">Your Payment Details</h2>

          {/* Below block displays array of payment */}
          {this.props.paymentArr ? (
            <div className="my-4 d-flex scroll">
              <div
                className="col-3 mx-3 image-edit-avatar first-desktop-address-tile-checkout align-content-center"
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
                  className="col-3 rest-desktop-address-tile-checkout"
                  key={card._id}
                >
                  <div style={{ height: "160px" }}>
                    <div
                      className=""
                      style={{ fontSize: "16px", fontWeight: "700" }}
                    >
                      {card.cardName}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      Card Number: {card.cardNumber.slice(0, -5) + "XXXXX"}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      Expire on: {card.expirationDate.split("T")[0]}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      CVV: {"XX" + card.cvv.slice(2)}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      Added on: {card.createdAt.split("T")[0]}
                    </div>
                  </div>
                  <div className="ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
                    <span
                      className="a-button-inner a-button-text"
                      onClick={() => {
                        this.setState({
                          modalSelected: "block",
                          displayPayment: "none",
                          cardNameSel: card.cardName,
                          cardNumberSel: card.cardNumber,
                          expirationDateSel: card.expirationDate,
                          cvvSel: card.cvv,
                          createdAtSel: card.createdAt
                        });
                        this.props.sendModalStatus({
                          paymentSelectModal: "block",
                          cardName: card.cardName,
                          cardNumber: card.cardNumber,
                          expirationDate: card.expirationDate,
                          cvv: card.cvv
                        });
                      }}
                    >
                      Use this payment
                    </span>
                  </div>
                  <div className="d-flex justify-content-between row-edit-delete">
                    <div className="edit-button-style">
                      <div
                        className="btn button-style-edit button-style-edit-delete"
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
                      </div>
                    </div>
                    <div className="delete-button-style">
                      <div
                        className="btn button-style-delete button-style-edit-delete"
                        onClick={e => {
                          this.setState({ editedId: card._id }, () => {
                            this.deletePayment();
                            console.log(this.state.editedId);
                          });
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {/* End of array of payment */}

          {/* Modal for adding/editing payment */}
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
                    this.setState({ modalShow: "none" });
                    this.setState({ addSuccessMsg: "" });
                    this.setState({ editcard: "" });
                  }}
                >
                  &times;
                </span>
                {this.state.editcard ? this.state.addSuccessMsg ? (
                  <p style={{ color: "green" }}>{this.state.addSuccessMsg}</p>
                ) : (
                  ""
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
                    {/* <input
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
                        this.setState({ cardNumber: e.target.value });
                      }}
                    /> */}
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
                    <input
                      type="submit"
                      onClick={() => {
                        this.setState({
                          modalSelected: "block",
                          displayPayment: "none",
                          modalShow: "none",
                          cardNameSel: this.state.cardName,
                          cardNumberSel: this.state.cardNumber,
                          expirationDateSel: this.state.expirationDate,
                          cvvSel: this.state.cvv,
                          createdAtSel: this.state.createdAt
                        });
                        this.props.sendModalStatus({
                          paymentSelectModal: "block"
                        });
                      }}
                      value="Add and Select"
                      className="btn btn sprite"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* End of add payment modal */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendModalStatus: payload => dispatch(sendModalStatus(payload))
  };
};
export default connect(null, mapDispatchToProps)(SelectPayment);
