import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  registerCustomer,
  refreshFlags
} from "./../../../action/UserAction/registerCustomerAction";
import "./register.css";

class RegisterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      matchPassword: true
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("inside handleSubmit");
    if (this.state.password1 !== this.state.password2) {
      console.log("pass1", this.state.password1);
      console.log("pass2", this.state.password2);
      console.log("inside incorrect");
      this.setState({ matchPassword: false });
    } else this.props.registerCustomer(this.state);
  };

  componentWillMount() {
    this.props.refreshFlags({ res: "", registerFlag: false });
  }

  render() {
    let printError = "";
    if (!this.state.matchPassword) {
      printError = "Password Mismatch!!!";
    }
    if (!this.props.registerFlag) {
      printError = this.props.res;
      console.log("Error is : ", printError);
    } else {
      console.log("Registerd Customer");
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
              <h1 className="heading margin-top">Join the Amazon community</h1>
              <p style={{ fontSize: "18px", margin: "6px" }}>
                Discover latest and most affordable products based on your
                interest.
              </p>
              <a href="/registerSeller">
                Do you want to sell? Create an account here.
              </a>
            </div>

            <div
              className="col-md-6 content margin-top"
              style={{ margin: "20px" }}
            >
              <form onSubmit={this.handleSubmit}>
                <div className="form-group col-10">
                  <label style={{ fontWeight: "bold" }}>Name</label>
                  <input
                    name="name"
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-10">
                  <label style={{ fontWeight: "bold" }}>Email-ID</label>
                  <input
                    name="email"
                    onChange={e => this.setState({ email: e.target.value })}
                    type="text"
                    placeholder="Enter your Email ID"
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
                      pattern="(?=.*\d)(?=.*[^\w])(?=.*[A-Za-z]).{8,}"
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
                <input type="submit" className="btn btn btn-style m-3" />
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
  console.log(state.userReducer);
  return {
    res: state.userReducer.res || "",
    registerFlag: state.userReducer.registerFlag || false
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerCustomer: payload => dispatch(registerCustomer(payload)),
    refreshFlags: payload => dispatch(refreshFlags(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCustomer);
