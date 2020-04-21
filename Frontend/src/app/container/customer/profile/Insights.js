import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";

class Insights extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.profileData.data ? (
          <div className="container d-flex">
            <div className="col-6 p-0">
              <div class="card" align="center">
                <div class="card-body">
                  <p
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    class="card-title"
                  >
                    Insights
                  </p>
                  <div
                    className="d-flex mt-3"
                    style={{ justifyContent: "center" }}
                  >
                    <div className="mx-3" align="center">
                      <h5>5</h5>
                      <p>Helpful Votes</p>
                      <p>
                        <i>Public</i>
                      </p>
                    </div>
                    <div>
                      <h5>3</h5>
                      <p className="mt-1">Reviews</p>
                      <p className="mt-1">
                        <i>Public</i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" align="center">
                <div></div>
                <div className="card-body">
                  <h4 className="card-title">Ordering and shopping preferences</h4>
                  <div className='d-flex m-3 justify-content-center'>
                    <div className="upload-photo mr-2">
                    <Link to="/addressandpayment" >
                    <span className='link-color'>Your Addresses and payment options</span>
                    </Link>
                    </div>

                    {/* <div className="upload-photo ml-2">
                    <Link to="/paymentcard" >
                   <span className='link-color'>Your Payment options</span> 
                   </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 p-0">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Commuity Activity</h4>
                  <hr />
                  {this.props.profileData.data.insights.map(comment=>(

                 
                  <div className="card" style={{ padding: "10px" }}>
                    <h5 className="card-subtitle mb-2 d-flex">
                      <div
                        className="circular-avatar-image-comment m-3 image-edit-avatar"
                        onClick={(e) => {
                          this.setState({ showeditpicbutton: "block" });
                        }}
                      >
                        <img
                          src={
                            this.props.profileData.data.mainCustomer
                              .profilePictureUrl
                          }
                          alt=""
                          className="avatar-image-comment"
                          style={{ "background-size": "contain" }}
                        />
                      </div>
                      <div className="mt-4">
                        {" "}
                        {this.props.profileData.data.mainCustomer.name}
                      </div>
                      <div className="mt-1">
                        <h6
                          className="text-muted mt-4 ml-2"
                          style={{ fontSize: "13px" }}
                        >
                          {/* reviewed a product- {this.props.profileData.data.insights} */}
                          reviewed a product- {comment.createdAt.split("T")[0]}
                        </h6>
                      </div>
                    </h5>

                    <hr className="p-0" />
                    <div className="d-flex">
                      <p className="card-text">
                        <ion-icon name="star" />
                        <ion-icon name="star" />
                        <ion-icon name="star" />
                        <ion-icon name="star" />
                        <ion-icon name="star" />
                      </p>
                      <p
                        className="mx-2"
                        style={{ color: "#c45500", fontWeight: "bold" }}
                      >
                        Verified Purchase
                      </p>
                    </div>

                    <h6 className="card-title">
                      Perfectly keeps hair in shape
                    </h6>
                    <p className="card-text ">
                    {comment.comment}
                    </p>
                    <div className="card">
                      <div className="card-body d-flex">
                        <div className="profile-at-product-image-container upload-photo">
                          <img
                            alt=""
                            src="https://m.media-amazon.com/images/I/51b7VgD5BPL.jpg"
                            class="profile-at-product-image"
                          />
                        </div>
                        <div className="upload-photo">
                          <span className="mr-2">
                            Aussie Spray Gel, with Bamboo & Kakadu Plum,
                            Headstrong Volume
                          </span>

                          <ion-icon name="star" />
                          <ion-icon name="star" />
                          <ion-icon name="star" />
                          <ion-icon name="star" />
                          <ion-icon name="star-half" />
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Insights;
