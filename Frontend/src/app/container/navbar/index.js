import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
//import { UserType, Logout } from "../../actions";
import { logOut } from "./../../../action/UserAction/logoutAction";
import { getCategory } from "./../../../action/ProductAction/productCategory";
import {
  getAllProducts,
  updateProductSearch,
  updateProductSort,
  updateProductFilter
} from "../../../action/ProductAction/productAction";
import { getSavedAndCartProducts } from "../../../action/customer/savedAndCartProducts/getSavedAndCartProducts";

import { getProfile } from "../../../action/customerprofileaction/profileAction";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      category: "All",
      search: "",
      reDirect: "",
      name: "",
      cart: 0
    };
  }

  handleLogout = () => {
    this.props.logOut({ loginFlag: false });
  };

  dispatchAction = () => {
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: "",
      sellerName: "",
      productName: "",
      productCategory: "",
      minPrice: 0,
      maxPrice: 2500,
      minRating: "",
      maxRating: ""
    };
    this.props.getAllProducts(data);
    this.props.updateProductSearch("", "", "");
    this.props.updateProductSort("rating", "desc");
    this.props.updateProductFilter("", 0, 2500);
  };

  componentDidMount() {
    this.dispatchAction();
    this.props.getCategory();
    if (localStorage.getItem("category") === "customer")
      this.props.getProfile();
    if (this.props.cart)
      this.setState({
        cart: this.props.cart.cartCnt
      });
    if (this.props.custprof)
      this.setState({
        name: this.props.custprof.mainCustomer.name
      });
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (prevProps.productSearch !== this.props.productSearch) {
      console.log("Hello");
      this.setState({
        reDirect: ""
      });
    }
    if (prevProps.productSearch.seller !== this.props.productSearch.seller) {
      console.log("Hello");
      this.setState({
        category: "All",
        search: ""
      });
    }
    if (this.props.custprof !== prevProps.custprof) {
      let totalCartItems = 0;
      if (this.props.custprof.mainCustomer)
        for (let each of this.props.custprof.mainCustomer.cartProducts) {
          totalCartItems += each.quantity;
        }
      this.setState({
        name: this.props.custprof.mainCustomer.name,
        cart: totalCartItems
      });
    }
    if (this.props.cart.cartCnt !== prevProps.cart.cartCnt) {
      this.setState({
        cart: this.props.cart.cartCnt
      });
    }
    if (this.props.categorys !== prevProps.categorys) {
      this.props.getCategory();
    }
  }

  onSearch = () => {
    let cat = "";
    if (this.state.category !== "All") cat = this.state.category;
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: "",
      sellerName: "",
      productName: this.state.search,
      productCategory: cat,
      minPrice: 0,
      maxPrice: 2500,
      minRating: "",
      maxRating: ""
    };
    this.props.getAllProducts(data);
    this.props.updateProductSearch(this.state.search, this.state.category, "");
    this.props.updateProductSort("rating", "desc");
    this.props.updateProductFilter("", 0, 2500);
    var path = window.location.pathname.split("/")[1];
    if (path !== "productlist" && path !== "productlisting")
      this.setState({
        reDirect: "redirect"
      });
  };

  render() {
    var xnav;
    let redirectVar = null;
    let Applications = null,
      eventsApp = null;
    if (this.state.reDirect === "redirect") {
      redirectVar = <Redirect to="/productlist" />;
    }
    let cat = this.props.category.map(({ _id, name }) => {
      return (
        <Dropdown.Item
          key={_id}
          value={name}
          onClick={e => {
            this.setState({
              category: name
            });
          }}
        >
          {name}
        </Dropdown.Item>
      );
    });
    if (localStorage.getItem("loginFlag")) {
      if (localStorage.getItem("category") === "seller") {
        xnav = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  id="input-group-dropdown-1"
                  className="grey bradius025"
                  title={this.state.category}
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  style={{ borderRadius: 0 + "px" }}
                  value={this.state.search}
                  onChange={e => {
                    this.setState({ search: e.target.value });
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    className="sprite"
                    onClick={this.onSearch}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link
                to="/productlisting"
                style={{ float: "left" }}
                className="custom-nav"
                onClick={this.dispatchAction}
              >
                My
                <br />
                <b className="nav-text">Products</b>
              </Link>
              <Link
                to="/seller/order"
                style={{ float: "left" }}
                className="custom-nav"
                onClick={this.dispatchAction}
              >
                My
                <br />
                <b className="nav-text">Orders</b>
              </Link>
              <Link
                to="/seller/reports"
                style={{ float: "left" }}
                className="custom-nav"
              >
                My
                <br />
                <b className="nav-text">Reports</b>
              </Link>
              <NavDropdown
                title={
                  <div style={{ display: "inline-block" }}>
                    Hello {this.props.profile.name}
                    <br />
                    <span>
                      <b className="nav-text">Accounts &amp; List</b>
                    </span>
                  </div>
                }
                className="custom-nav"
                id="collasible-nav-dropdown"
                style={{ display: "Block", color: "#FFF" }}
              >
                <NavDropdown.Item>
                  <Link to="/seller/profile" onClick={this.dispatchAction}>
                    Profile
                  </Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/" onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        );
      } else if (localStorage.getItem("category") === "admin") {
        xnav = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="mr-auto" style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%", display: "none" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title="All"
                  id="input-group-dropdown-1"
                  className="grey bradius025"
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  style={{ borderRadius: 0 + "px" }}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" className="sprite">
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link
                to="/admin/inventory"
                style={{ float: "left" }}
                className="custom-nav"
              >
                Amazon
                <br />
                <b className="nav-text">Inventory</b>
              </Link>
              <Link
                to="/admin/seller"
                style={{ float: "left" }}
                className="custom-nav"
              >
                All
                <br />
                <b className="nav-text">Seller</b>
              </Link>
              <Link
                to="/admin/order"
                style={{ float: "left" }}
                className="custom-nav"
              >
                All
                <br />
                <b className="nav-text">Orders</b>
              </Link>
              <Link
                to="/admin/dashboard"
                style={{ float: "left" }}
                className="custom-nav"
              >
                My
                <br />
                <b className="nav-text">Dashboard</b>
              </Link>
              <NavDropdown
                title={
                  <div style={{ display: "inline-block" }}>
                    Admin
                    <br />
                    <span>
                      <b className="nav-text">Dashboard &amp; Logout</b>
                    </span>
                  </div>
                }
                className="custom-nav"
                id="collasible-nav-dropdown"
                style={{ display: "Block", color: "#FFF" }}
              >
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/" onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        );
      } else {
        xnav = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  id="input-group-dropdown-1"
                  className="grey bradius025"
                  title={this.state.category}
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  style={{ borderRadius: 0 + "px" }}
                  value={this.state.search}
                  onChange={e => {
                    this.setState({ search: e.target.value });
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    className="sprite"
                    onClick={this.onSearch}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link
                to="/productlisting"
                style={{ float: "left" }}
                className="custom-nav"
                onClick={this.dispatchAction}
              >
                All
                <br />
                <b className="nav-text">Products</b>
              </Link>
              <Link
                to="/customer/orders"
                style={{ float: "left" }}
                className="custom-nav"
              >
                My
                <br />
                <b className="nav-text">Order</b>
              </Link>
              <NavDropdown
                className="custom-nav"
                title={
                  <div style={{ display: "inline-block", color: "#FFF" }}>
                    Hello {this.state.name}
                    <br />
                    <span>
                      <b className="nav-text">Accounts &amp; List</b>
                    </span>
                  </div>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/customer/profile">Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/" onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                to="/cart"
                style={{ position: "relative", whiteSpace: "nowrap" }}
                className="custom-nav"
              >
                <span id="num-item">{this.state.cart}</span>
                <div className="cart" />
                <span id="span-cart">Cart</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        );
      }
    } else {
      xnav = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-3"
              style={{ display: "none" }}
            />
          </Form>
          <Nav activeKey="/login">
            <Link to="/login" className="custom-nav">
              Login
            </Link>
            <Link to="/registerCustomer" className="custom-nav">
              Create Account
            </Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
    return (
      <div className="container-fluid bluebeacon">
        {redirectVar}
        <div>
          <Navbar expand="lg">
            <Navbar.Brand style={{ marginRight: 70 + "px" }}>
              <img src="/logo.png" height="40" alt="amazon-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {xnav}
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  console.log("In navbar");
  return {
    custprof: state.customerProfileReducer.profiledata.data,
    profile: state.profile.user,
    category: state.categoryReducer.category,
    productSearch: state.product.productSearch,
    cart: state.savedAndCartProductReducer,
    categorys: state.category.categorys
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOut: payload => dispatch(logOut(payload)),
    getCategory: () => dispatch(getCategory()),
    getAllProducts: payload => dispatch(getAllProducts(payload)),
    updateProductSearch: (search, category, seller) =>
      dispatch(updateProductSearch(search, category, seller)),
    updateProductFilter: (rating, minPrice, maxPrice) =>
      dispatch(updateProductFilter(rating, minPrice, maxPrice)),
    updateProductSort: (sortType, sort) =>
      dispatch(updateProductSort(sortType, sort)),
    getSavedAndCartProducts: () => dispatch(getSavedAndCartProducts()),
    getProfile: () => dispatch(getProfile())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
