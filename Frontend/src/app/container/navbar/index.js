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
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  //Redirect,
  Link,
} from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
//import { UserType, Logout } from "../../actions";
import { logOut } from "./../../../action/UserAction/logoutAction";
import { getCategory } from "./../../../action/ProductAction/productCategory";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.props.logOut({ loginFlag: false });
    /*localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    localStorage.removeItem('token');*/
    //this.props.dispatch(Logout());
  };

  componentDidMount() {
    this.props.getCategory();
  }

  render() {
    var xnav;
    let redirectVar = null;
    let Applications = null,
      eventsApp = null;
    //if (localStorage.getItem("token")) {
    //redirectVar = <Redirect to='/home' />;
    /* For profile pcture
      if (this.props.getType == 'Student') {
        if (this.props.studentProfile.profile_pic) {
          prof_pic =
            `http://localhost:8000/prof_pic/` +
            this.props.studentProfile.profile_pic +
            `.jpeg`;
        }
      } else {
        if (this.props.compProfile.prof_pic) {
          prof_pic =
            `http://localhost:8000/prof_pic/` +
            this.props.compProfile.prof_pic +
            `.png`;
        }
      }*/
    //} else redirectVar = <Redirect to="/login" />;
    let cat = this.props.category.map(({ _id, name }) => {
      return <Dropdown.Item key={_id}>{name}</Dropdown.Item>;
    });
    if (localStorage.getItem("loginFlag")) {
      if (localStorage.getItem("category") == "seller") {
        xnav = (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline style={{ width: 70 + "%" }}>
              <DropdownButton
                as={InputGroup.Prepend}
                variant='outline-secondary'
                title='All'
                id='input-group-dropdown-1'
                className='grey bradius025'
              >
                {cat}
              </DropdownButton>
              <InputGroup style={{ width: 90 + "%" }}>
                <FormControl
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                  style={{ borderRadius: 0 + "px" }}
                />
                <InputGroup.Append>
                  <Button variant='outline-secondary' className='sprite'>
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link to='/home' className='custom-nav' style={{ float: "left" }}>
                My
                <br />
                <b>Products</b>
              </Link>
              <NavDropdown
                title={
                  <div style={{ display: "inline-block" }}>
                    Hello Pranav
                    <br />
                    <span>
                      <b>Accounts &amp; List</b>
                    </span>
                  </div>
                }
                className='custom-nav'
                id='collasible-nav-dropdown'
                style={{ display: "Block", color: "#FFF" }}
              >
                <NavDropdown.Item>
                  <Link to='/customer/profile'>Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/seller/profile'>Seller Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/' onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        );
      } else {
        xnav = (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant='outline-secondary'
                  title='All'
                  id='input-group-dropdown-1'
                  className='grey bradius025'
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                  style={{ borderRadius: 0 + "px" }}
                />
                <InputGroup.Append>
                  <Button variant='outline-secondary' className='sprite'>
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link to='/home' style={{ float: "left" }} className='custom-nav'>
                All
                <br />
                <b>Products</b>
              </Link>
              <Link
                to='/events'
                style={{ float: "left" }}
                className='custom-nav'
              >
                My
                <br />
                <b>Order</b>
              </Link>
              <NavDropdown
                className='custom-nav'
                title={
                  <div style={{ display: "inline-block", color: "#FFF" }}>
                    Hello Pranav
                    <br />
                    <span>
                      <b>Accounts &amp; List</b>
                    </span>
                  </div>
                }
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item>
                  <Link to='/customer/profile'>Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/seller/profile'>Seller Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/' onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                to='/all_students'
                style={{ position: "relative", whiteSpace: "nowrap" }}
                className='custom-nav'
              >
                <span id='num-item'>0</span>
                <div className='cart'></div>
                <span id='span-cart'>Cart</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        );
      }
    } else {
      xnav = (
        <Navbar.Collapse id='basic-navbar-nav'>
          <Form inline className='mr-auto'>
            <FormControl
              type='text'
              placeholder='Search'
              className='mr-sm-3'
              style={{ display: "none" }}
            />
          </Form>
          <Nav activeKey='/login'>
            <Link to='/login' className='custom-nav'>
              Login
            </Link>
            <Link to='/registerCustomer' className='custom-nav'>
              Create Account
            </Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
    return (
      <div className='container-fluid bluebeacon'>
        {redirectVar}
        <div>
          <Navbar expand='lg'>
            <Navbar.Brand style={{ marginRight: 70 + "px" }}>
              <img src='/logo.png' height='40' alt='amazon-logo' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            {xnav}
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  console.log("In navbar");
  return {
    getProfileInfo: state.getProfileInfo,
    getType: state.getType,
    getCompProfile: state.getCompProfile,
    category: state.categoryReducer.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (payload) => dispatch(logOut(payload)),
    getCategory: () => dispatch(getCategory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
