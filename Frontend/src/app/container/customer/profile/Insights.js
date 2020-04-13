import React, { Component } from "react";

class Insights extends Component {
  state = {};
  render() {
    return (
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
              <div className="d-flex mt-3" style={{ justifyContent: "center" }}>
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
        </div>
        <div className="col-6 p-0">
          <div className="card" >
            <div className="card-body">
              <h4 className="card-title">Commuity Activity</h4>
              <hr />
              <div className='card' style={{padding:'10px'}}>
              <h5 className="card-subtitle mb-2 d-flex">
                <div
                  className="circular-avatar-image-comment m-3 image-edit-avatar"
                  onClick={(e) => {
                    this.setState({ showeditpicbutton: "block" });
                  }}
                >
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/ac0da431-c7a3-4385-91e4-874d495c7a1c._CR0,0,375,375_UX460_.jpg"
                    alt=""
                    className="avatar-image-comment"
                    style={{ "background-size": "contain" }}
                  ></img>
                </div>
                <div className="mt-4"> Puneet Jyot</div>
                <div className="mt-1">
                  <h6
                    className="text-muted mt-4 ml-2"
                    style={{ fontSize: "13px" }}
                  >
                    reviewed a product- 20/03/2019
                  </h6>
                </div>
              </h5>

              <hr className="p-0"></hr>
              <div className="d-flex">
                <p className="card-text">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                </p>
                <p
                  className="mx-2"
                  style={{ color: "#c45500", fontWeight: "bold" }}
                >
                  Verified Purchase
                </p>
              </div>
             
                
                  <h6 className="card-title">Perfectly keeps hair in shape</h6>
                  <p className="card-text ">
                    A spray gel that makes hair not too hard but helps in
                    keeping the hair style in shape. It also gives out nice
                    fragrance and I don't think it is anything damageful to the
                    hair. But anyways I would recommend anyone looking to buy
                    hair spray gel for themselves.
                  </p>
                 <div className='card'>
                  <div className='card-body d-flex'>
                  <div className='profile-at-product-image-container upload-photo'>
                  <img alt="" src="https://m.media-amazon.com/images/I/51b7VgD5BPL.jpg" class="profile-at-product-image"></img>
                  </div>
                  <div className='upload-photo'>
                  <span className='mr-2'>Aussie Spray Gel, with Bamboo & Kakadu Plum, Headstrong Volume</span>
                  
                  <ion-icon  name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star-half"></ion-icon>
                  </div>
                  </div>
                 </div>
               
                 </div>
                 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Insights;
