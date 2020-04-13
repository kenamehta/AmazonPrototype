import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { registerStudent } from "./../../actions/registerAction";

class RegisterStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      college_name: "",
      matchPassword: true
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("inside handleSubmit");
    if (this.state.password1 != this.state.password2) {
      console.log("pass1", this.state.password1);
      console.log("pass2", this.state.password2);
      console.log("inside incorrect");
      this.setState({ matchPassword: false });
    }
    this.props.registerStudent(this.state);
  };
  render() {
    let printError = "";
    if (!this.state.matchPassword) {
      printError = "Password Mismatch!!!";
    }
    if (!this.props.registerFlag) {
      printError = this.props.res;
      console.log("Error is : ", printError);
    } else {
      console.log("Registerd Student");
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div
              className="col-md-5 col-md-offset-1 content"
              style={{ margin: "20px" }}
            >
              <h1 className="heading margin-top">
                Join the Amazon community
              </h1>
              <p style={{ fontSize: "18px", margin: "6px" }}>
                Discover latest and most affordable products based on your
                interests.
              </p>
              <a href="/registerCompany">
                Do you want to buy? Create an account here.
              </a>
            </div>

            <div
              className="col-md-6 content margin-top"
              style={{ margin: "20px" }}
            >
              <form onSubmit={this.handleSubmit}>
                <div className="form-group col-10">
                  <label style={{ fontWeight: "bold" }}>School</label>
                  <input
                    name="school"
                    onChange={e =>
                      this.setState({ college_name: e.target.value })}
                    type="text"
                    placeholder="Enter School"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-10">
                  <label style={{ fontWeight: "bold" }}>Name</label>
                  <input
                    name="name"
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text"
                    placeholder="Enter Student's full name"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-10">
                  <label style={{ fontWeight: "bold" }}>Email</label>
                  <input
                    name="email"
                    onChange={e => this.setState({ email: e.target.value })}
                    type="email"
                    placeholder="Enter Email-Id"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-10 d-flex p-0">
                  <div className="form-group col-6">
                    <label style={{ fontWeight: "bold" }}>Password</label>
                    <input
                      name="password1"
                      onChange={e =>
                        this.setState({ password1: e.target.value })}
                      type="password"
                      required
                      placeholder="Enter Password"
                      className="form-control"
                      pattern="(?=.*\d)(?=.*[^\w])(?=.*[A-Z]).{8,}"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label style={{ fontWeight: "bold" }}>
                      Re-enter Password
                    </label>
                    <input
                      name="password2"
                      onChange={e =>
                        this.setState({ password2: e.target.value })}
                      type="password"
                      required
                      placeholder="Verify Password"
                      className="form-control"
                    />
                  </div>
                </div>
                <input type="submit" className="btn btn btn-success m-3" />
                <div>
                  <h4 style={{ color: "red", fontWeight: "800" }}>
                    {printError}
                  </h4>
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
  console.log(state.registerReducer);
  return {
    res: state.registerReducer.res,
    registerFlag: state.registerReducer.registerFlag
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerStudent: payload => dispatch(registerStudent(payload))
  };
};

//export RegisterStudent Component
export default connect(mapStateToProps, mapDispatchToProps)(RegisterStudent);
