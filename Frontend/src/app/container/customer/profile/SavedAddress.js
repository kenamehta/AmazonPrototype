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
    editaddress:'',
    editedId:'',
    addSuccessMsg:''

  };

  componentWillMount() {
    this.props.getAddress();
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.msgSuccess)
      { 
          this.setState({addSuccessMsg:nextProps.msgSuccess})

      }
  }

  deleteAddress= () =>{
     let payload={
          data:{
            address_id:this.state.editedId
          }
      }
       this.props.deleteAddress(payload)
  }

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

  editAddress= (e) =>{
    e.preventDefault();
    let payload = {
        address_id:this.state.editedId,
      addressName: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
    };

    this.props.addAddress(payload);
  }

  render() {
    return (
      <div className="container mt-5" style={{ display: "block" }}>
        <h2 className="m-3">Your Addresses</h2>
        {this.props.addressArray ? (
          <div className="my-4 d-flex scroll">
            <div
              className="col-3 mx-3 image-edit-avatar first-desktop-address-tile align-content-center"
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
            {this.props.addressArray.addresses.map((address) => (
              <div
                className="col-3 mx-3 rest-desktop-address-tile"
                key={address._id}
              >
                <h5
                  className="pt-4"
                  style={{ fontSize: "13px", fontWeight: "700" }}
                >
                  {address.addressName}
                </h5>
                <h5 style={{ fontSize: "13px" }}>{address.street}</h5>
                <h5 style={{ fontSize: "13px" }}>{address.city}</h5>
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
                    this.setState({editaddress:address})
                    this.setState({editedId:address._id},()=>{
                        console.log(this.state.editedId);
                        console.log(this.state.editaddress)
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
                    
                    this.setState({editedId:address._id},()=>{
                        this.deleteAddress();
                        console.log(this.state.editedId)
                    })
                    
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
          className="modal mt-5"
          align="center"
          style={{ display: this.state.modalShow }}
        >
          <div className="modal-content col-5" style={{ fontFamily: "Suisse" }}>
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
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                  ></input>
                </div>
                <div className="form-group col-md-8 m-3">
                  <input type="submit" className="btn btn sprite"></input>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal mt-5 editmodal"
          align="center"
          style={{ display: this.state.modalShowEdit }}
        >
          <div className="modal-content col-5" style={{ fontFamily: "Suisse" }}>
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
                    placeholder={this.state.editaddress.street}
                    onChange={(e) => {
                      this.setState({ street: e.target.value });
                    }}
                    
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
                      placeholder={this.state.editaddress.state}
                      onChange={(e) => {
                        this.setState({ state: e.target.value });
                      }}
                      
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
                      placeholder={this.state.editaddress.country}
                      onChange={(e) => {
                        this.setState({
                          country: e.target.value,
                        });
                      }}
                      
                    ></input>
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
                      
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                      
                    ></input>
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
                    
                  ></input>
                </div>
                <div className="form-group col-md-8 m-3">
                  <input type="submit" className="btn btn sprite"></input>
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
    msgSuccess: state.customerProfileReducer.msgSuccess
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
