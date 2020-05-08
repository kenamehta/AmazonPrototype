import React, { Component } from "react";
import "../../../../style/ProfilePic.css";
import { connect } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
} from "../../../../action/customerprofileaction/profileAction";

class SavedAddress extends Component {
  state = {
    modalShow: "none",
    modalShowEdit: "none",
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
    // e.target.reset();
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
    e.target.reset();
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
    return (
      <div className="container mt-5" style={{ display: "block" }}>
        <h2 className="m-3">Your Addresses</h2>
        {this.props.addressArray ? (
          <div className="my-4 d-flex scroll">
            <div
              className="col-3 mx-3 image-edit-avatar first-desktop-address-tile align-content-center"
              onClick={(e) => {
                this.setState({
                  modalShow: "block",
                });
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
                className="col-3 mx-3 rest-desktop-address-tile"
                key={address._id}
              >
                <h5
                  className="pt-4"
                  style={{ fontSize: "13px", fontWeight: "700" }}
                >
                  {this.capitalize(address.addressName)}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  {this.capitalize(address.street)}
                </h5>
                <h5 style={{ fontSize: "13px" }}>
                  {this.capitalize(address.city)}
                </h5>
                <h5 style={{ fontSize: "13px" }}>{address.state}</h5>
                <h5 style={{ fontSize: "13px" }}>{address.country}</h5>
                <h5 style={{ fontSize: "13px" }}>Zip: {address.zipcode}</h5>
                <h5 style={{ fontSize: "13px" }}>
                  Phone number: {address.phone}
                </h5>
                <span
                  className="link-color image-edit-avatar"
                  style={{
                    fontSize: "13px",
                    bottom: "20px",
                    left: "22px",
                    position: "absolute",
                  }}
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
                </span>
                <span
                  className="link-color image-edit-avatar"
                  style={{
                    fontSize: "13px",
                    bottom: "20px",
                    left: "62px",
                    position: "absolute",
                  }}
                  onClick={(e) => {
                    this.setState({ editedId: address._id }, () => {
                      this.deleteAddress();
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
                onClick={(e) => {
                  this.setState({
                    modalShow: "none",
                  });
                  this.setState({ addSuccessMsg: "", errorMessages: "" });
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
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                  <input type="submit" className="btn btn sprite" />
                </div>
              </form>
            </div>
          </div>
        </div>

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
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Zipcode
                    </label>
                    <input
                      id="zipcode"
                      name="zipcode"
                      className="form-control"
                      placeholder={this.state.editaddress.zipcode}
                      onChange={(e) => {
                        this.setState({ zipcode: e.target.value });
                      }}
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
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    addressArray: state.customerProfileReducer.addressArray,
    msgSuccess: state.customerProfileReducer.msgSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: () => dispatch(getAddress()),
    addAddress: (payload) => dispatch(addAddress(payload)),
    deleteAddress: (payload) => dispatch(deleteAddress(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedAddress);
