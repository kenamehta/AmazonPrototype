import React, { Component } from "react";
import { getAdminOrders } from "../../../../action/admin/orderAction";
import { connect } from "react-redux";

class OrderHeader extends Component {
  state = {
    color: "red",
    statusvalue: "empty",
    sellerFilter: "empty",
  };
  sellerNameChangeHandler = () => {
    console.log(this.state.statusv);
    let payload={
      statusFilter:this.state.statusvalue,
      sellerNameFilter:this.state.sellerFilter
    }
    this.props.getAdminOrders(payload);
  };
  handleStatusChange = () => {
    console.log(this.state.statusv);
    let payload={
      statusFilter:this.state.statusvalue,
      sellerNameFilter:this.state.sellerFilter
    }
    this.props.getAdminOrders(payload);
  
  };
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          {" "}
          <h2 className="p-4" style={{ fontWeight: "500" }}>
            Your Orders
          </h2>
          <div className="p-4 d-flex">
            <label class="sr-only" for="inlineFormInputName2">
              Seller Name
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder="Enter Seller Name"
              onChange={(e) => {
                this.setState({ sellerFilter: e.target.value||'empty' }, () => {
                  this.sellerNameChangeHandler();
                });
              }}
            />
            <select
              className="form-control mb-2 mr-sm-2"
              value={this.state.statusvalue}
              onChange={(e) => {
                this.setState(
                  { statusvalue: e.target.value||'empty' },
                  () => this.handleStatusChange()
                );
              }}
            >
              <option value="empty">Select Status</option>
              <option value="1">Order Placed</option>
              <option value="2">Packaging</option>
              <option value="3">Out for Shipping</option>
              <option value="4">Package Arrived</option>
              <option value="5">Out for delivery</option>
              <option value="6">Delivered</option>
            </select>
          </div>
        </div>

        <div className="">
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active mx-5">
                  <a
                    className="nav-link "
                    href="/customer/orders"
                    style={{ color: this.props.navarr[0] }}
                  >
                    Orders <span className="sr-only"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    orders: state.adminOrderReducer.orders || [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAdminOrders: (payload) => dispatch(getAdminOrders(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHeader);
