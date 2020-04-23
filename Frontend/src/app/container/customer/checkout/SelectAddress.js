import React, { Component } from "react";

class SelectAddress extends Component {
  state = {
    modalShow: "none",
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
    addSuccessMsg: ""
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
        address_id: this.state.editedId
      }
    };
    this.props.deleteAddress(payload);
  };

  addAddress = e => {
    e.preventDefault();
    let payload = {
      addressName: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    };

    this.props.addAddress(payload);
  };

  editAddress = e => {
    e.preventDefault();
    let payload = {
      address_id: this.state.editedId,
      addressName: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    };

    this.props.addAddress(payload);
  };

  render() {
    return (
      <div>
        {/* Below block displays the selected Address */}
        <div
          className="container mt-5"
          style={{ display: this.state.modalSelected }}
        >
          <h2 className="m-3">Ship to below Address</h2>
          <div className="col-3 mx-3 rest-desktop-address-tile-checkout-selected">
            <div style={{ height: "153px" }}>
              <div className="" style={{ fontSize: "16px", fontWeight: "700" }}>
                {this.state.addressNameSel}
              </div>
              <div style={{ fontSize: "13px" }}>{this.state.streetSel}</div>
              <div style={{ fontSize: "13px" }}>{this.state.citySel}</div>
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
                    displayAddress: "block"
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
          {this.props.addressArray ? (
            <div className="d-flex scroll">
              <div
                className="col-3 mx-3 image-edit-avatar first-desktop-address-tile-checkout align-content-center"
                onClick={e => {
                  this.setState({ modalShow: "block" });
                }}
              >
                <div className="a-box-inner">
                  <div className="a-box-inner a-padding-extra-large" />
                  <div className="address-plus-icon a-padding-extra-large" />
                  <h3 style={{ color: "#767676" }}>Add Address</h3>
                </div>
              </div>

              {this.props.addressArray.addresses.map(address => (
                <div
                  className="col-3 rest-desktop-address-tile-checkout"
                  key={address._id}
                >
                  <div style={{ height: "160px" }}>
                    <div
                      className=""
                      style={{ fontSize: "16px", fontWeight: "700" }}
                    >
                      {address.addressName}
                    </div>
                    <div style={{ fontSize: "13px" }}>{address.street}</div>
                    <div style={{ fontSize: "13px" }}>{address.city}</div>
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
                          phoneSel: address.phone
                        });
                      }}
                    >
                      Deliver to this address
                    </span>
                  </div>
                  <div className="d-flex justify-content-between row-edit-delete">
                    <div className="edit-button-style">
                      <div
                        className="btn button-style-edit-delete"
                        onClick={e => {
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
                        className="btn button-style-edit-delete"
                        onClick={e => {
                          this.setState({ editedId: address._id }, () => {
                            this.deleteAddress();
                            console.log(this.state.editedId);
                          });
                        }}
                      >
                        Delete
                      </div>
                    </div>
                    <div />
                  </div>
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
                      onChange={e => {
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
                          marginBottom: "5px"
                        }}
                      >
                        Street
                      </label>
                    </div>

                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "13px",
                        marginBottom: "5px"
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
                      onChange={e => {
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
                          marginBottom: "5px"
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
                        onChange={e => {
                          this.setState({ state: e.target.value });
                        }}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
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
                        onChange={e => {
                          this.setState({
                            country: e.target.value
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
                        onChange={e => {
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
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        className="form-control"
                        placeholder="Enter Zipcode"
                        onChange={e => {
                          this.setState({ zipcode: e.target.value });
                        }}
                        required
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
                      placeholder="Enter Phone number"
                      onChange={e => {
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
                          modalSelected: "block",
                          displayAddress: "none",
                          addressNameSel: this.state.addressName,
                          streetSel: this.state.street,
                          citySel: this.state.city,
                          stateSel: this.state.state,
                          countrySel: this.state.country,
                          zipcodeSel: this.state.zipcode,
                          phoneSel: this.state.phone
                        });
                      }}
                      value="Add and Select"
                      className="btn btn sprite mr-2"
                    />
                    <input
                      type="button"
                      value="Select without adding"
                      className="btn btn sprite"
                      onClick={() => {
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
                          phoneSel: this.state.phone
                        });
                      }}
                    />
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
                  onClick={e => {
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
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group col-md-11">
                    <div>
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
                        }}
                      >
                        Street
                      </label>
                    </div>

                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "13px",
                        marginBottom: "5px"
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
                      onChange={e => {
                        this.setState({ street: e.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-11 d-flex p-0">
                    <div className="form-group col-md-6 ">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
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
                        onChange={e => {
                          this.setState({ state: e.target.value });
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
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
                        onChange={e => {
                          this.setState({
                            country: e.target.value
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
                        onChange={e => {
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
                        onChange={e => {
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
                      onChange={e => {
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
      </div>
    );
  }
}

export default SelectAddress;
