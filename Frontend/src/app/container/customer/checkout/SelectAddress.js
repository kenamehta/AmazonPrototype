import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SelectAddress extends Component {
  state = {
    modalShow: "none",
    modalOrder: "none",
    modalShowEdit: "none",
    modalSelected: "none",
    displayAddress: "block",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    editaddress: "",
    editedId: "",
    addSuccessMsg: "",
    redirect: false,
    errorMessages: "",
  };

  componentWillMount() {
    this.props.getAddress();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.msgSuccess) {
      this.setState({ addSuccessMsg: nextProps.msgSuccess });
    }
  }

  deleteAddress = () => {
    let payload = {
      data: {
        address_id: this.state.editedId,
      },
    };
    this.props.deleteAddress(payload);
  };

  capitalize(word, splitParam = " ") {
    if (word) {
      word = word.split(splitParam).map((eachWord) =>
        eachWord
          .split(" ")
          .map(
            (each) =>
              each.charAt(0).toUpperCase() + each.substring(1).toLowerCase()
          )
          .join(" ")
      );
      word = word.join(splitParam);
      return word;
    }
    return "";
  }

  US_States_List() {
    const US_States = [
      {
        name: "ALABAMA",
        abbreviation: "AL",
      },
      {
        name: "ALASKA",
        abbreviation: "AK",
      },
      {
        name: "ARIZONA",
        abbreviation: "AZ",
      },
      {
        name: "ARKANSAS",
        abbreviation: "AR",
      },
      {
        name: "CALIFORNIA",
        abbreviation: "CA",
      },
      {
        name: "COLORADO",
        abbreviation: "CO",
      },
      {
        name: "CONNECTICUT",
        abbreviation: "CT",
      },
      {
        name: "DELAWARE",
        abbreviation: "DE",
      },
      {
        name: "FLORIDA",
        abbreviation: "FL",
      },
      {
        name: "GEORGIA",
        abbreviation: "GA",
      },
      {
        name: "HAWAII",
        abbreviation: "HI",
      },
      {
        name: "IDAHO",
        abbreviation: "ID",
      },
      {
        name: "IILLINOIS",
        abbreviation: "IL",
      },
      {
        name: "INDIANA",
        abbreviation: "IN",
      },
      {
        name: "IOWA",
        abbreviation: "IA",
      },
      {
        name: "KANSAS",
        abbreviation: "KS",
      },
      {
        name: "KENTUCKY",
        abbreviation: "KY",
      },
      {
        name: "LOUISIANA",
        abbreviation: "LA",
      },
      {
        name: "MAINE",
        abbreviation: "ME",
      },
      {
        name: "MARYLAND",
        abbreviation: "MD",
      },
      {
        name: "MASSACHUSETTS",
        abbreviation: "MA",
      },
      {
        name: "MICHIGAN",
        abbreviation: "MI",
      },
      {
        name: "MINNESOTA",
        abbreviation: "MN",
      },
      {
        name: "MISSISSIPPI",
        abbreviation: "MS",
      },
      {
        name: "MISSOURI",
        abbreviation: "MO",
      },
      {
        name: "MONTANA",
        abbreviation: "MT",
      },
      {
        name: "NEBRASKA",
        abbreviation: "NE",
      },
      {
        name: "NEVADA",
        abbreviation: "NV",
      },
      {
        name: "NEW HAMPSHIRE",
        abbreviation: "NH",
      },
      {
        name: "NEW JERSEY",
        abbreviation: "NJ",
      },
      {
        name: "NEW MEXICO",
        abbreviation: "NM",
      },
      {
        name: "NEW YORK",
        abbreviation: "NY",
      },
      {
        name: "NORTH CAROLINA",
        abbreviation: "NC",
      },
      {
        name: "NORTH DAKOTA",
        abbreviation: "ND",
      },
      {
        name: "OHIO",
        abbreviation: "OH",
      },
      {
        name: "OKLAHOMA",
        abbreviation: "OK",
      },
      {
        name: "OREGON",
        abbreviation: "OR",
      },
      {
        name: "PENNSYLVANIA",
        abbreviation: "PA",
      },
      {
        name: "RHODE ISLAND",
        abbreviation: "RI",
      },
      {
        name: "SOUTH CAROLINA",
        abbreviation: "SC",
      },
      {
        name: "SOUTH DAKOTA",
        abbreviation: "SD",
      },
      {
        name: "TENNESSEE",
        abbreviation: "TN",
      },
      {
        name: "TEXAS",
        abbreviation: "TX",
      },
      {
        name: "UTAH",
        abbreviation: "UT",
      },
      {
        name: "VERMONT",
        abbreviation: "VT",
      },
      {
        name: "VIRGINIA",
        abbreviation: "VA",
      },
      {
        name: "WASHINGTON",
        abbreviation: "WA",
      },
      {
        name: "WEST VIRGINIA",
        abbreviation: "WV",
      },
      {
        name: "WISCONSIN",
        abbreviation: "WI",
      },
      {
        name: "WYOMING",
        abbreviation: "WY",
      },
    ];

    return US_States;
  }

  addAddress = (e) => {
    e.preventDefault();
    e.target.reset();

    let { name, street, city, state, country, zipcode, phone } = this.state;

    name = name.trim();
    phone = phone.trim();
    street = street.trim();
    city = city.trim();
    state = state.trim();
    country = country.trim();
    zipcode = zipcode.trim();

    let stateErrorMessage = "";
    let zipCodeErrorMessage = "";

    //Check US states
    const US_States = this.US_States_List();

    if (state === "") {
      stateErrorMessage = "Required. Enter State.";
    }

    let result = US_States.find((us_state) => {
      return (
        state.toUpperCase() === us_state.name ||
        state.toUpperCase() === us_state.abbreviation
      );
    });

    if (result === undefined) {
      stateErrorMessage = "Not a valid state.";
    }

    // Check zipcode
    const zipCodePatt = new RegExp("^\\d{5}(-\\d{4})?$");

    if (zipcode === "") {
      zipCodeErrorMessage = "Required. Enter Zip Code.";
    } else if (!zipCodePatt.test(zipcode)) {
      zipCodeErrorMessage = "Not a valid zip code format.";
    }

    if (stateErrorMessage === "" && zipCodeErrorMessage === "") {
      if (state.length === 2) {
        state = state.toUpperCase();
      } else {
        state = this.capitalize(state);
      }

      country = country.toUpperCase();

      let payload = {
        addressName: name,
        street,
        city,
        state,
        country,
        zipcode,
        phone,
      };

      this.props.addAddress(payload);

      this.setState({
        modalSelected: "block",
        displayAddress: "none",
        modalShow: "none",
        errorMessages: "",
      });
    } else {
      this.setState({
        errorMessages: {
          stateErrorMessage,
          zipCodeErrorMessage,
        },
      });
    }
  };

  addressNotAdded = (e) => {
    e.preventDefault();

    let { name, street, city, state, country, zipcode, phone } = this.state;

    name = name.trim();
    phone = phone.trim();
    street = street.trim();
    city = city.trim();
    state = state.trim();
    country = country.trim();
    zipcode = zipcode.trim();

    let stateErrorMessage = "";
    let zipCodeErrorMessage = "";

    //Check US states
    const US_States = this.US_States_List();

    if (state === "") {
      stateErrorMessage = "Required. Enter State.";
    }

    let result = US_States.find((us_state) => {
      return (
        state.toUpperCase() === us_state.name ||
        state.toUpperCase() === us_state.abbreviation
      );
    });

    if (result === undefined) {
      stateErrorMessage = "Not a valid state.";
    }

    // Check zipcode
    const zipCodePatt = new RegExp("^\\d{5}(-\\d{4})?$");

    if (zipcode === "") {
      zipCodeErrorMessage = "Required. Enter Zip Code.";
    } else if (!zipCodePatt.test(zipcode)) {
      zipCodeErrorMessage = "Not a valid zip code format.";
    }

    if (stateErrorMessage === "" && zipCodeErrorMessage === "") {
      if (state.length === 2) {
        state = state.toUpperCase();
      } else {
        state = this.capitalize(state);
      }

      country = country.toUpperCase();

      this.setState({
        modalSelected: "block",
        displayAddress: "none",
        modalShow: "none",
        addressNameSel: this.state.addressName,
        streetSel: this.state.street,
        citySel: this.state.city,
        stateSel: this.state.state,
        countrySel: this.state.country,
        zipcodeSel: this.state.zipcode,
        phoneSel: this.state.phone,
        errorMessages: "",
      });
    } else {
      this.setState({
        errorMessages: {
          stateErrorMessage,
          zipCodeErrorMessage,
        },
      });
    }
  };

  editAddress = (e) => {
    e.preventDefault();

    let {
      editedId,
      name,
      street,
      city,
      state,
      country,
      zipcode,
      phone,
    } = this.state;

    name = name.trim();
    phone = phone.trim();
    street = street.trim();
    city = city.trim();
    state = state.trim();
    country = country.trim();
    zipcode = zipcode.trim();

    let stateErrorMessage = "";
    let zipCodeErrorMessage = "";

    //Check US states
    const US_States = this.US_States_List();

    if (state === "") {
      stateErrorMessage = "Required. Enter State.";
    }

    let result = US_States.find((us_state) => {
      return (
        state.toUpperCase() === us_state.name ||
        state.toUpperCase() === us_state.abbreviation
      );
    });

    if (result === undefined) {
      stateErrorMessage = "Not a valid state.";
    }

    // Check zipcode
    const zipCodePatt = new RegExp("^\\d{5}(-\\d{4})?$");

    if (zipcode === "") {
      zipCodeErrorMessage = "Required. Enter Zip Code.";
    } else if (!zipCodePatt.test(zipcode)) {
      zipCodeErrorMessage = "Not a valid zip code format.";
    }

    if (stateErrorMessage === "" && zipCodeErrorMessage === "") {
      if (state.length === 2) {
        state = state.toUpperCase();
      } else {
        state = this.capitalize(state);
      }

      country = country.toUpperCase();

      let payload = {
        address_id: editedId,
        addressName: name,
        street,
        city,
        state,
        country,
        zipcode,
        phone,
      };

      this.props.addAddress(payload);

      this.setState({
        errorMessages: "",
      });
    } else {
      this.setState({
        errorMessages: {
          stateErrorMessage,
          zipCodeErrorMessage,
        },
      });
    }
  };

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/cart" />;
    }
    return (
      <div>
        {redirectVar}

        {/*Modal for order status*/}
        <div
          className="modal modal-custom mt-5"
          align="center"
          style={{ display: this.state.modalOrder }}
        >
          <div
            className="modal-content modal-content-custom col-5"
            style={{ fontFamily: "Suisse" }}
          >
            <div className="container">
              <span
                className="close image-edit-avatar"
                onClick={(e) => {
                  this.setState({ redirect: true });
                }}
              >
                &times;
              </span>
              {this.props.status === 200 ? (
                <h4>Order placed successfully</h4>
              ) : (
                <h4>Failed to place order</h4>
              )}
            </div>
          </div>
        </div>
        {/*End of order status modal*/}

        {/* Below block displays the selected Address */}
        <div
          className="container mt-5"
          style={{ display: this.state.modalSelected }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="m-3">Ship to below Address</h2>
            </div>

            {/*block to place order*/}
            <div className="m-3">
              {this.props.paymentSelectModal === "block" ? (
                this.state.modalSelected === "block" ? (
                  <div
                    className="a-button a-button-primary-proceed a-spacing-medium"
                    onClick={() => {
                      this.setState({ modalOrder: "block" });
                      this.props.proceedToOrder({
                        Address_details: `${this.state.streetSel},${this.state.stateSel},${this.state.countrySel},${this.state.zipcodeSel}`,
                        payment: {
                          cardName: this.props.cardName,
                          cardNumber: this.props.cardNumber,
                          expirationDate: this.props.expirationDate,
                          cvv: this.props.cvv,
                        },
                      });
                    }}
                  >
                    <span className="proceed-order-text-style">
                      Proceed to Order
                    </span>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            {/*End of order block*/}
          </div>
          <div className="col-3 mx-3 rest-desktop-address-tile-checkout-selected">
            <div style={{ height: "153px" }}>
              <div className="" style={{ fontSize: "16px", fontWeight: "700" }}>
                {this.capitalize(this.state.addressNameSel)}
              </div>
              <div style={{ fontSize: "13px" }}>
                {this.capitalize(this.state.streetSel)}
              </div>
              <div style={{ fontSize: "13px" }}>
                {this.capitalize(this.state.citySel)}
              </div>
              <div style={{ fontSize: "13px" }}>{this.state.stateSel}</div>
              <div style={{ fontSize: "13px" }}>{this.state.countrySel}</div>
              <div style={{ fontSize: "13px" }}>
                Zip: {this.state.zipcodeSel}
              </div>
              <div style={{ fontSize: "13px" }}>
                Phone number: {this.state.phoneSel}
              </div>
            </div>
            <div className="ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
              <span
                className="a-button-inner a-button-text"
                onClick={() => {
                  this.setState({
                    modalSelected: "none",
                    displayAddress: "block",
                  });
                }}
              >
                Select another address
              </span>
            </div>
          </div>
        </div>
        {/* End of the selected address block */}

        <div
          className="container mt-5"
          style={{ display: this.state.displayAddress }}
        >
          <h2 className="m-3">Your Addresses</h2>

          {/* Below block displays array of addresses */}
          {this.props.addressArray ? (
            <div className="d-flex scroll">
              <div
                className="col-3 mx-3 image-edit-avatar first-desktop-address-tile-checkout align-content-center"
                onClick={(e) => {
                  this.setState({ modalShow: "block" });
                }}
              >
                <div className="a-box-inner">
                  <div className="a-box-inner a-padding-extra-large" />
                  <div className="address-plus-icon a-padding-extra-large" />
                  <h3 style={{ color: "#767676" }}>Add Address</h3>
                </div>
              </div>

              {this.props.addressArray.addresses.map((address) => (
                <div
                  className="col-3 rest-desktop-address-tile-checkout"
                  key={address._id}
                >
                  <div style={{ height: "160px" }}>
                    <div
                      className=""
                      style={{ fontSize: "16px", fontWeight: "700" }}
                    >
                      {this.capitalize(address.addressName)}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      {this.capitalize(address.street)}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      {this.capitalize(address.city)}
                    </div>
                    <div style={{ fontSize: "13px" }}>{address.state}</div>
                    <div style={{ fontSize: "13px" }}>{address.country}</div>
                    <div style={{ fontSize: "13px" }}>
                      Zip: {address.zipcode}
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      Phone number: {address.phone}
                    </div>
                  </div>
                  <div className="ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
                    <span
                      className="a-button-inner a-button-text"
                      onClick={() => {
                        this.setState({
                          modalSelected: "block",
                          displayAddress: "none",
                          addressNameSel: address.addressName,
                          streetSel: address.street,
                          citySel: address.city,
                          stateSel: address.state,
                          countrySel: address.country,
                          zipcodeSel: address.zipcode,
                          phoneSel: address.phone,
                        });
                      }}
                    >
                      Deliver to this address
                    </span>
                  </div>
                  <div className="d-flex justify-content-between row-edit-delete">
                    <div className="edit-button-style">
                      <div
                        className="btn button-style-edit button-style-edit-delete"
                        onClick={(e) => {
                          this.setState({ modalShowEdit: "block" });
                          this.setState({ editaddress: address });
                          this.setState({ editedId: address._id }, () => {
                            console.log(this.state.editedId);
                            console.log(this.state.editaddress);
                          });
                        }}
                      >
                        Edit
                      </div>
                    </div>
                    <div className="delete-button-style">
                      <div
                        className="btn button-style-delete button-style-edit-delete"
                        onClick={(e) => {
                          this.setState({ editedId: address._id }, () => {
                            this.deleteAddress();
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
          {/* End of array of addresses */}

          {/* Modal for adding address */}
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
                  onClick={(e) => {
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
                    Add Address
                  </h3>
                </div>
                <form onSubmit={this.addAddress}>
                  <div className="form-group col-md-11">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                      required
                    />
                  </div>

                  <div className="form-group col-md-11">
                    <div>
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        Street
                      </label>
                    </div>

                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      Please enter Street
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className="form-control"
                      placeholder="Eg. 190 Ryland Street"
                      onChange={(e) => {
                        this.setState({ street: e.target.value });
                      }}
                      required
                    />
                  </div>
                  <div className="col-md-11 d-flex p-0">
                    <div className="form-group col-md-6 ">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        placeholder="Eg. California"
                        onChange={(e) => {
                          this.setState({ state: e.target.value });
                        }}
                        required
                      />
                      <p className="state-errormessage">
                        {this.state.errorMessages.stateErrorMessage}
                      </p>
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        placeholder="Eg. USA"
                        onChange={(e) => {
                          this.setState({
                            country: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-11 d-flex p-0">
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="Enter city"
                        onChange={(e) => {
                          this.setState({ city: e.target.value });
                        }}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        Zipcode
                      </label>
                      <input
                        id="zipcode"
                        name="zipcode"
                        className="form-control"
                        placeholder="Enter Zipcode"
                        onChange={(e) => {
                          this.setState({ zipcode: e.target.value });
                        }}
                        required
                      />
                      <p className="zipcode-errormessage">
                        {this.state.errorMessages.zipCodeErrorMessage}
                      </p>
                    </div>
                  </div>
                  <div className="form-group col-md-11">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phnumber"
                      name="phnumber"
                      className="form-control"
                      placeholder="Enter Phone number"
                      onChange={(e) => {
                        this.setState({ phone: e.target.value });
                      }}
                      required
                    />
                  </div>
                  <div className="form-group col-md-8 m-3">
                    <input
                      type="submit"
                      onClick={() => {
                        this.setState({
                          addressNameSel: this.state.addressName,
                          streetSel: this.state.street,
                          citySel: this.state.city,
                          stateSel: this.state.state,
                          countrySel: this.state.country,
                          zipcodeSel: this.state.zipcode,
                          phoneSel: this.state.phone,
                        });
                      }}
                      value="Add and Select"
                      className="btn btn sprite mr-2"
                    />
                    <input
                      type="button"
                      value="Select without adding"
                      className="btn btn sprite"
                      onClick={this.addressNotAdded}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* End of add address modal */}

          {/* Modal for editing address */}
          <div
            className="modal modal-custom mt-5 editmodal"
            align="center"
            style={{ display: this.state.modalShowEdit }}
          >
            <div
              className="modal-content modal-content-custom col-5"
              style={{ fontFamily: "Suisse" }}
            >
              <div className="container">
                <span
                  className="close image-edit-avatar"
                  onClick={(e) => {
                    this.setState({ modalShowEdit: "none" });
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
                    Edit Address
                  </h3>
                </div>
                <form onSubmit={this.editAddress}>
                  <div className="form-group col-md-11">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder={this.state.editaddress.addressName}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group col-md-11">
                    <div>
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        Street
                      </label>
                    </div>

                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      Please enter Street
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className="form-control"
                      placeholder={this.state.editaddress.street}
                      onChange={(e) => {
                        this.setState({ street: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-11 d-flex p-0">
                    <div className="form-group col-md-6 ">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        placeholder={this.state.editaddress.state}
                        onChange={(e) => {
                          this.setState({ state: e.target.value });
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        placeholder={this.state.editaddress.country}
                        onChange={(e) => {
                          this.setState({
                            country: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-11 d-flex p-0">
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder={this.state.editaddress.city}
                        onChange={(e) => {
                          this.setState({ city: e.target.value });
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        Zipcode
                      </label>
                      <input
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        className="form-control"
                        placeholder={this.state.editaddress.zipcode}
                        onChange={(e) => {
                          this.setState({ zipcode: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-11">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phnumber"
                      name="phnumber"
                      className="form-control"
                      placeholder={this.state.editaddress.phone}
                      onChange={(e) => {
                        this.setState({ phone: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-8 m-3">
                    <input type="submit" className="btn btn sprite" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* End of edit address modal */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    paymentSelectModal: state.customerProfileReducer.paymentSelectModal,
    cardName: state.customerProfileReducer.cardName,
    cardNumber: state.customerProfileReducer.cardNumber,
    expirationDate: state.customerProfileReducer.expirationDate,
    cvv: state.customerProfileReducer.cvv,
    status: state.customerCheckoutReducer.status,
  };
};
export default connect(mapStateToProps)(SelectAddress);
