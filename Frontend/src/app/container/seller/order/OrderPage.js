import React, { Component } from "react";
import "../../../../style/Order.css";
import "./tracking.css";
import OrderHeader from "./OrderHeader";
import { connect } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";

import {
  getSellerOrders,
  cancelSellerOrderProducts,
} from "../../../../action/Seller/sellerOrderAction/sellerOrderAction";
const _ = require("underscore");
class SellerOrderPage extends Component {
  state = {
    modifiedorderarray: [],
    value: "",
    cancelmsg: "",
    navarr: ["black", "#0066c0", "#0066c0"],
    modalShowOrder: "none",
    orderdetails: "",
    modalTracking: "none",
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState(
      {
        modifiedorderarray: _.groupBy(nextProps.orders, "order_id"),
      },
      () => {
        console.log(this.state.modifiedorderarray[1]);
        console.log(Array.from(this.state.modifiedorderarray));
        for (var k in this.state.modifiedorderarray) {
          console.log(this.state.modifiedorderarray[k]);
        }
      }
    );

    if (nextProps.cancelmsg) {
      this.setState({ cancelmsg: nextProps.cancelmsg });
    }
  }

  componentWillMount() {
    this.props.getSellerOrders();
  }

  cancelOrderProducts = (e) => {
    e.preventDefault();
    console.log("in here");
    console.log(this.state.cancelOrderProduct._id);
    let payload = {
      _id: this.state.cancelOrderProduct._id,
    };
    this.props.cancelSellerOrderProducts(payload);
  };

  render() {
    const items = [];

    for (let k in this.state.modifiedorderarray) {
      items.push(
        <div>
          <div className='card mt-3'>
            <div className='card-header d-flex justify-content-between'>
              <div>
                {this.state.modifiedorderarray.length}
                <span
                  className='m-0'
                  style={{ fontWeight: "300", color: "#555" }}
                >
                  Order Placed{" "}
                </span>
                <br />
                <span className='m-0' style={{ fontWeight: "300" }}>
                  {" "}
                  {
                    <Moment format='D MMM YYYY'>
                      {
                        this.state.modifiedorderarray[
                          k
                        ][0].Order.createdAt.split("T")[0]
                      }
                    </Moment>
                  }
                </span>
              </div>
              <div>
                {" "}
                <span
                  className='m-0'
                  style={{ fontWeight: "300", color: "#555" }}
                >
                  Ship To{" "}
                </span>
                <br />
                <span className='m-0 link-color' style={{ fontWeight: "300" }}>
                  {" "}
                  {this.state.modifiedorderarray[k][0].customer_email_id}
                </span>
              </div>
              <div>
                {" "}
                <span
                  className='m-0'
                  style={{ fontWeight: "300", color: "#555" }}
                >
                  Total{" "}
                </span>
                <br />
                <span className='m-0' style={{ fontWeight: "300" }}>
                  {" "}
                  ${this.state.modifiedorderarray[k][0].Order.totalOrderPrice}
                </span>
              </div>
            </div>
            {this.state.modifiedorderarray[k].map((i) => (
              <div key={i._id} className='card-body'>
                <div className='card-body d-flex justify-content-between'>
                  <div className='d-flex'>
                    <div className='profile-at-product-image-container upload-photo'>
                      <Link
                        className='name_style'
                        to={`/productPage/${i.Product_id}`}
                      >
                        <img
                          alt=''
                          src={i.products.photos[0]}
                          className='profile-at-product-image'
                        />
                      </Link>
                    </div>
                    <div className='upload-photo'>
                      <Link
                        className='name_style'
                        to={`/productPage/${i.Product_id}`}
                      >
                        <span className='mr-2'>{i.products.productName}</span>
                      </Link>

                      <div>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#555",
                          }}
                        >
                          Sold by:{" "}
                          <span
                            className='upload-photo-order'
                            style={{ color: "#0066c0", fontSize: "15px" }}
                          >
                            {" "}
                            {i.products.sellerName}
                          </span>
                        </span>
                      </div>
                      <div className='mt-3'>
                        <a
                          className='pb-2'
                          href='#!'
                          style={{ backgroundColor: "#e7e9ec" }}
                          className='btn btn upload-photo-order'
                        >
                          <span>
                            {" "}
                            <ion-icon name='reload-outline' />
                          </span>

                          <Link
                            className='name_style'
                            to={`/productPage/${i.Product_id}`}
                          >
                            <span> Buy it again</span>
                          </Link>
                        </a>
                      </div>
                    </div>
                  </div>
                  {i.Status != "Delivered" ? (
                    <div>
                      <button
                        className='a-button-order p-2 btn-sm'
                        style={{ width: "70%" }}
                        onClick={(e) => {
                          this.setState({
                            cancelOrderProduct: i,
                          });
                          this.setState({ modalShow: "block" });
                        }}
                      >
                        Cancel Request
                      </button>
                      {/*Tracking button - Kena*/}
                      <button
                        className='a-button-order p-2 mt-1 btn-sm'
                        style={{ width: "70%" }}
                        onClick={(e) => {
                          this.setState({ modalTracking: "block" });
                        }}
                      >
                        Status
                      </button>
                      {/*Tracking*/}
                      {/*Tracking - Kena*/}
                      <div
                        className='modal modal-custom-tracking mt-5'
                        align='center'
                        style={{ display: this.state.modalTracking }}
                      >
                        <div
                          className='modal-content modal-content-custom'
                          style={{ fontFamily: "Suisse" }}
                        >
                          <div className='container'>
                            <span
                              className=' ml-2 close image-edit-avatar'
                              onClick={(e) => {
                                this.setState({ modalTracking: "none" });
                              }}
                            >
                              &times;
                            </span>
                            <div className='card card-tracking'>
                              <div className='row d-flex justify-content-between px-3 top-tracking'>
                                <div className='d-flex'>
                                  <div style={{ fontSize: "14px" }}>
                                    ORDER{" "}
                                    <span className='text-primary font-weight-bold'>
                                      {i.order_id}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className='d-flex flex-column text-sm-right'
                                  style={{ fontSize: "14px" }}
                                >
                                  {/* <p className="mb-0">
                                    Expected Arrival <span>01/12/19</span>
                                  </p> */}
                                  <p>
                                    USPS{" "}
                                    <span className='font-weight-bold'>
                                      234094567242423422898
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className='row d-flex justify-content-center'>
                                <div className='col-12'>
                                  <ul
                                    id='progressbar-tracking'
                                    className='text-center'
                                  >
                                    {this.props.statusArr.map((status) =>
                                      status.flag === 1 ? (
                                        <li className='active step0-tracking li-tracking' />
                                      ) : (
                                        <li className='step0-tracking li-tracking' />
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                              <div className='row justify-content-between top-tracking'>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/9nnc9Et.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Order
                                      <br />
                                      Placed
                                    </p>
                                  </div>
                                </div>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/u1AzR7w.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Packaging
                                    </p>
                                  </div>
                                </div>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/TkPm63y.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Out for
                                      <br />
                                      Shipping
                                    </p>
                                  </div>
                                </div>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/u1AzR7w.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Package
                                      <br />
                                      Arrived
                                    </p>
                                  </div>
                                </div>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/TkPm63y.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Out for
                                      <br />
                                      Delivery
                                    </p>
                                  </div>
                                </div>
                                <div className='row d-flex icon-content-tracking'>
                                  {" "}
                                  <img
                                    className='icon-tracking'
                                    src='https://i.imgur.com/HdsziHP.png'
                                  />
                                  <div className='d-flex flex-column'>
                                    <p className='font-weight-bold'>
                                      Order
                                      <br />
                                      Delivered
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                      {/*End of tracking*/}
                    </div>
                  ) : (
                    <div>
                      <h5 style={{ color: "green" }}> Delivered</h5>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className='d-flex card-footer link-color'>
              <div
                className='ml-3 upload-photo-order'
                onClick={(e) => {
                  this.setState({ modalShowOrder: "block" }, () => {
                    this.setState({
                      orderdetails: this.state.modifiedorderarray[k][0],
                    });
                  });
                }}
                style={{ color: "blue" }}
              >
                Order Details
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className='container'>
          <OrderHeader navarr={this.state.navarr} />
          <b>{this.props.orders.length} orders placed in past</b>

          {true ? <div>{items}</div> : ""}
        </div>
        <div
          className='modal modal-custom mt-5'
          align='center'
          style={{ display: this.state.modalShow }}
        >
          <div
            className='modal-content modal-content-custom col-5'
            style={{ fontFamily: "Suisse" }}
          >
            <div className='container'>
              <span
                className='close image-edit-avatar'
                onClick={(e) => {
                  this.setState({ modalShow: "none" });
                  this.setState({ cancelmsg: "" });
                  this.setState({ editcard: "" });
                  this.setState({ value: "" });
                }}
              >
                &times;
              </span>
              {this.state.cancelmsg ? (
                <p style={{ color: "green" }}>{this.state.cancelmsg}</p>
              ) : (
                ""
              )}
              <div align='center'>
                <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Cancel Orders
                </h3>
              </div>
              <form onSubmit={this.cancelOrderProducts}>
                {this.state.cancelOrderProduct ? (
                  <div className='card'>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                          <div className='profile-at-product-image-container upload-photo'>
                            <img
                              alt=''
                              src={
                                this.state.cancelOrderProduct.products.photos[0]
                              }
                              className='profile-at-product-image'
                            />
                          </div>

                          <div className=''>
                            <span className=''>
                              {
                                this.state.cancelOrderProduct.products
                                  .productName
                              }
                            </span>
                            <div className=''>
                              <span
                                style={{
                                  fontWeight: "500",
                                  fontSize: "12px",
                                  color: "#555",
                                }}
                              >
                                Sold by:{" "}
                                <span
                                  className=''
                                  style={{ color: "#0066c0", fontSize: "15px" }}
                                >
                                  {" "}
                                  {
                                    this.state.cancelOrderProduct.products
                                      .sellerName
                                  }
                                </span>
                              </span>
                            </div>
                            <div>
                              <span
                                style={{
                                  fontWeight: "500",
                                  fontSize: "12px",
                                  color: "#555",
                                }}
                              >
                                Order Place on:{" "}
                                <span
                                  className='upload-photo-order'
                                  style={{ color: "#0066c0", fontSize: "15px" }}
                                >
                                  {" "}
                                  {
                                    this.state.cancelOrderProduct.createdAt.split(
                                      "T"
                                    )[0]
                                  }
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label>
                            <input
                              type='radio'
                              value='option1'
                              checked={this.state.value}
                              onClick={(e) => this.setState({ value: "true" })}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className='form-group col-md-8 m-3'>
                  <input
                    disabled={!this.state.value}
                    type='submit'
                    value='Cancel Order'
                    className='btn btn sprite'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className='modal modal-custom mt-5'
          align='center'
          style={{ display: this.state.modalShowOrder }}
        >
          <div
            className='modal-content modal-content-custom'
            style={{ fontFamily: "Suisse" }}
          >
            <div className='container'>
              <span
                className=' ml-2 close image-edit-avatar'
                onClick={(e) => {
                  this.setState({ modalShowOrder: "none" });
                }}
              >
                &times;
              </span>

              <div class='card'>
                <div class='card-header' align='left'>
                  <h2>Order Details</h2>
                  <h6 style={{ fontWeight: "200" }}>
                    Ordered on{" "}
                    <Moment format='D MMM YYYY'>
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.createdAt.split("T")[0]
                        : ""}
                    </Moment>
                  </h6>
                </div>
                <div class='card-body d-flex justify-content-between'>
                  {/* <h4 class="card-title">Special title treatment</h4> */}
                  <div className='col-3'>
                    <h6 style={{ fontWeight: "700" }}>Shipping address</h6>
                    <h6 style={{ fontWeight: "400" }}>
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.Address_details
                        : ""}
                    </h6>
                  </div>
                  <div className='col-3'>
                    <h6 style={{ fontWeight: "700" }}>Mailing address</h6>
                    <h6 style={{ fontWeight: "400" }}>
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.Address_details
                        : ""}
                    </h6>
                  </div>
                  <div className='col-3'>
                    <h6 style={{ fontWeight: "700" }}>Payment Card</h6>
                    <h6 style={{ fontWeight: "400" }}>
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.cardName
                        : ""}
                    </h6>
                    <h6 style={{ fontWeight: "400" }}>
                      <span className='ml-1'>
                        <img src='https://images-na.ssl-images-amazon.com/images/G/01/checkout/payselect/card-logos-small/mc._CB485935095_.gif' />
                      </span>{" "}
                      XXXX
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.cardNumber.slice(-4)
                        : ""}
                    </h6>
                    <h6 style={{ fontWeight: "400" }}>
                      {this.state.orderdetails
                        ? this.state.orderdetails.Order.validThru
                        : ""}
                    </h6>
                  </div>
                </div>
                <div class='card-footer link-color'>Get Invoice</div>
              </div>
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
    orders: state.sellerOrderReducer.orders,
    cancelmsg: state.sellerOrderReducer.cancelmsg,
    statusArr: state.trackingReducer.statusArr || [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSellerOrders: () => dispatch(getSellerOrders()),
    cancelSellerOrderProducts: (payload) =>
      dispatch(cancelSellerOrderProducts(payload)),
    //getTracking: (payload) => dispatch(getTracking(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerOrderPage);
