import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, refreshFlags } from "./../../../action/UserAction/loginAction";
import "./loginStyle.css";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      category: "customer",
      email: "",
      password: "",
      authFlag: false,
      errorNumber: "",
      res: "",
      inLogin: true,
      loginFlag: ""
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     loginFlag: this.props.loginFlag
  //   });
  // }

  componentWillMount() {
    this.setState({
      loginFlag: this.props.loginFlag
    });
    this.props.refreshFlags({ res: "", registerFlag: false });
  }

  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    console.log("inside submit Login handler");
    //prevent page from refresh
    e.preventDefault();
    localStorage.setItem("category", this.state.category);
    const userData = {
      category: this.state.category,
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    this.props.login(userData);
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let printError = null;
    if (!this.props.loginFlag) {
      printError = this.props.res;
      console.log("Error is : ", printError);
    } else {
      console.log("logged in");
      localStorage.removeItem("ID");
      localStorage.removeItem("IDToken");
      localStorage.setItem("ID", this.props.mongooseId);
      localStorage.setItem("IDToken", this.props.idToken);
      if (this.state.category === "customer") {
        return <Redirect to="/customer/profile" />;
      } else if (this.state.category === "seller") {
        return <Redirect to="/seller/profile" />;
      } else {
        return <Redirect to="/admin/profile" />;
      }
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <div className="login-form mt-5">
            <div className="main-div">
              <div className="panel">
                <h2>Sign-In</h2>
                <p>Please enter your email and password</p>
              </div>
              <div className="form-group">
                <p>
                  <label>Select category</label>
                  <select
                    className="ml-2"
                    value={this.state.category}
                    onChange={e => {
                      this.setState({
                        category: e.target.value
                      });
                    }}
                    id="myList"
                  >
                    <option value="customer" name="customer">
                      Customer
                    </option>
                    <option value="seller" name="seller">
                      Seller
                    </option>
                    <option value="admin" name="admin">
                      Admin
                    </option>
                  </select>
                </p>
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    this.setState({
                      email: e.target.value
                    });
                  }}
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => {
                    this.setState({
                      password: e.target.value
                    });
                  }}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button onClick={this.submitLogin} className="btn btn-style">
                Login
              </button>
              <h3 style={{ color: "red" }}>{printError}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Login id in mapStateToProps ", state.userReducer.id);
  return {
    mongooseId: state.userReducer.mongooseId || "",
    idToken: state.userReducer.idToken || "",
    res: state.userReducer.res || "",
    loginFlag: state.userReducer.loginFlag || false
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(login(payload)),
    refreshFlags: payload => dispatch(refreshFlags(payload))
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
