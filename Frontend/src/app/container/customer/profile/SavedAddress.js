import React, { Component } from "react";
import "../../../../style/ProfilePic.css";


import {
   addAddress,deleteAddress
   
  } from "../../../../action/customerprofileaction/profileAction";
  

class SavedAddress extends Component {
  state = {
    modalShow: "none",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  };

  addAddress = (e) => {
      e.preventDefault();
    let payload = {
      addressName: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
    };

    this.props.addAddress(payload);
  };

  render() {
    return (
      <div className="container mt-5" style={{ display: "block" }}>
        <div className="row">
          <h2 className="m-3">Your Addresses</h2>
          <div className="my-4 d-flex">
            <div
              className="col-4 mx-3 image-edit-avatar first-desktop-address-tile align-content-center"
              onClick={(e) => {
                this.setState({ modalShow: "block" });
              }}
            >
              <div className="a-box-inner a-padding-extra-large">
                <div className="a-box-inner a-padding-extra-large"></div>
                <div className="address-plus-icon"></div>
                <h3 style={{ color: "#767676" }}>Add Address</h3>
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
                  position: "absolute",
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
                  position: "absolute",
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
                  position: "absolute",
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
                  position: "absolute",
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
                position: "absolute",
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
                position: "absolute",
              }}
            >
              Delete
            </span>
          </div>
        </div>
        
        <div className="modal mt-5" align='center' style={{ display: this.state.modalShow }}>
              <div
                className="modal-content col-5"
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
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
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
                      ></input>
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
                      ></input>
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
                        ></input>
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
                        ></input>
                      </div>
                    </div>
                    <div className="form-group col-md-11">
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
                        onChange={(e) => {
                          this.setState({ zipcode: e.target.value });
                        }}
                        required
                      ></input>
                    </div>
                    <div className="form-group col-md-11">
                      <label
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
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
                      ></input>
                    </div>
                    <div className="form-group col-md-8 m-3">
                      <input
                        type="submit"
                        className="btn btn btn-primary"
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>

      </div>
    );
  }
}

export default SavedAddress;
