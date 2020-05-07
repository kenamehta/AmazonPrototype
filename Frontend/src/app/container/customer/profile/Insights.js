import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
import StarRatings from "react-star-ratings";


class Insights extends Component {
  state = {};
  render() {
    let avgRating = 0;
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
                  {this.props.profileData.data.insights?this.props.profileData.data.insights.map(comment=>(

                 
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
                    <StarRatings
                        rating={comment.rating}
                        starRatedColor="#f0c14b"
                        starEmptyColor="rgb(255, 255, 255)"
                        starDimension="16px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                      />
                      <p
                        className="mx-2"
                        style={{ color: "#c45500", fontWeight: "bold" }}
                      >
                        Verified Purchase
                      </p>
                    </div>

                    <h6 className="card-title">
                      {comment.title}
                    </h6>
                    <p className="card-text ">
                    {comment.comment}
                    </p>
                    <div className="card">
                      <div className="card-body d-flex">
                        <div className="profile-at-product-image-container upload-photo">
                        <Link
                                className="name_style"
                                to={`/productPage/${comment.product[0]._id}`}
                              >
                               <img
                            alt=""
                            src={comment.product[0].photos[0]}
                            class="profile-at-product-image"
                          />
                              </Link>
                         
                        </div>
                        <div className="upload-photo">
                        <Link
                                className="name_style"
                                to={`/productPage/${comment.product[0]._id}`}
                              >
                             <span className="mr-2">
                            {comment.product[0].productName}
                          </span>
                              </Link>
                         
<div>
                          <StarRatings
              rating={comment.product[0].averageRating}
              starRatedColor="#f0c14b"
              starEmptyColor="rgb(255, 255, 255)"
              starDimension="16px"
              starSpacing="1px"
              numberOfStars={5}
              name="rating"
            />
            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )):""}
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
