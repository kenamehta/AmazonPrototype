import React, { Component } from "react";
import "../../../../style/Order.css";
import OrderHeader from "./OrderHeader";
class OrderPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="container">
          <OrderHeader></OrderHeader>
          <b>14 orders placed in past</b>

          <div>
            <div className="card mt-3">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Order Placed{" "}
                  </span>
                  <br />
                  <span className="m-0" style={{ fontWeight: "300" }}>
                    {" "}
                    April 19,2020
                  </span>
                </div>
                <div>
                  {" "}
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Ship To{" "}
                  </span>
                  <br />
                  <span
                    className="m-0 link-color"
                    style={{ fontWeight: "300" }}
                  >
                    {" "}
                    Pranav
                  </span>
                </div>
                <div>
                  {" "}
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Total{" "}
                  </span>
                  <br />
                  <span className="m-0" style={{ fontWeight: "300" }}>
                    {" "}
                    $23
                  </span>
                </div>
              </div>

              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "green",
                  }}
                >
                  Arriving Thursday
                </h4>
                <div className="card-body d-flex">
                  <div className="profile-at-product-image-container upload-photo">
                    <img
                      alt=""
                      src="https://images-na.ssl-images-amazon.com/images/I/31mT1paJNML._SY90_.jpg"
                      class="profile-at-product-image"
                    />
                  </div>
                  <div className="upload-photo">
                    <span className="mr-2">
                    Hibbent No Leaking Design Metal Bidet T-adapter with Shut-off Valve,Tool-free Installation by Hand Tighten Nut, 3-way Toilet Tee Connector Water Diver
                    </span>
                    <div>
                    <span style={{fontWeight:'500',fontSize:'12px',color:'#555'}}>Sold by: <span className='upload-photo-order' style={{color:'#0066c0',fontSize:'15px'}}>  Intelligent3H US</span></span>
                    </div>
               <div className='mt-3'>
                <a className='pb-2' href="#!" style={{backgroundColor:'#e7e9ec'}} className="btn btn upload-photo-order">
               <span > <ion-icon  name="reload-outline"></ion-icon></span><span> Buy it again</span>
                </a>
                </div>
                   
                  </div>
                </div>
               
              </div>
              <div className="card-footer link-color">Archive Order</div>
            </div>
          </div>
          <div>
            <div className="card mt-3">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Order Placed{" "}
                  </span>
                  <br />
                  <span className="m-0" style={{ fontWeight: "300" }}>
                    {" "}
                    April 19,2020
                  </span>
                </div>
                <div>
                  {" "}
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Ship To{" "}
                  </span>
                  <br />
                  <span
                    className="m-0 link-color"
                    style={{ fontWeight: "300" }}
                  >
                    {" "}
                    Pranav
                  </span>
                </div>
                <div>
                  {" "}
                  <span
                    className="m-0"
                    style={{ fontWeight: "300", color: "#555" }}
                  >
                    Total{" "}
                  </span>
                  <br />
                  <span className="m-0" style={{ fontWeight: "300" }}>
                    {" "}
                    $23
                  </span>
                </div>
              </div>

              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "green",
                  }}
                >
                  Arriving Thursday
                </h4>
                <div className="card-body d-flex">
                  <div className="profile-at-product-image-container upload-photo">
                    <img
                      alt=""
                      src="https://images-na.ssl-images-amazon.com/images/I/31mT1paJNML._SY90_.jpg"
                      class="profile-at-product-image"
                    />
                  </div>
                  <div className="upload-photo">
                    <span className="mr-2">
                    Hibbent No Leaking Design Metal Bidet T-adapter with Shut-off Valve,Tool-free Installation by Hand Tighten Nut, 3-way Toilet Tee Connector Water Diver
                    </span>
                    <div>
                    <span style={{fontWeight:'500',fontSize:'12px',color:'#555'}}>Sold by: <span className='upload-photo-order' style={{color:'#0066c0',fontSize:'15px'}}>  Intelligent3H US</span></span>
                    </div>
               <div className='mt-3'>
                <a className='pb-2' href="#!" style={{backgroundColor:'#e7e9ec'}} className="btn btn upload-photo-order">
               <span > <ion-icon  name="reload-outline"></ion-icon></span><span> Buy it again</span>
                </a>
                </div>
                   
                  </div>
                </div>
               
              </div>
              <div className="card-footer link-color">Archive Order</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderPage;
