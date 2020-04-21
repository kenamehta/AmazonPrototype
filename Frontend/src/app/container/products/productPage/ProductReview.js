import React from "react";
import "./ProductPage.css";
import { Container, Image } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

class ProductReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "5e9c885e24f691220b95ef2a",
    };
  }

  render() {
    let rating = this.props.comment.rating;
    let comment = this.props.comment.comment;
    let date = this.props.comment.createdAt;
    let title = this.props.comment.title;
    let customerPicture = this.props.comment.customerProfilePictureUrl;
    let customerName = this.props.comment.customerName;
    let customerId = this.props.comment.customerId;

    let day = "";
    let month = "";
    let year = "";

    if (date) {
      date = date.split("T")[0];
      year = date.split("-")[0];
      month = date.split("-")[1];
      day = date.split("-")[2];
    }

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    date = `${months[month - 1]} ${day}, ${year}`;

    return (
      <Container style={{ margin: "0 0 25px 0" }}>
        <div>
          <Image
            className="customerImage"
            src={customerPicture}
            roundedcircle="true"
          />
          <Link
            to={`/customer/profile/${customerId}`}
            style={{
              fontSize: "13px",
              lineHeight: "19px",
              fontWeight: "100",
              color: "#111",
              display: "inline-block",
              cursor: "pointer",
              paddingLeft: "10px",
              verticalAlign: "middle",
              textDecoration: "none",
            }}
          >
            {customerName}
          </Link>
        </div>
        <StarRatings
          rating={rating}
          starRatedColor="#f0c14b"
          starEmptyColor="rgb(255, 255, 255)"
          starDimension="16px"
          starSpacing="1px"
          numberOfStars={5}
          name="rating"
        />
        <h1 className="commentTitle">{title}</h1>
        <p
          style={{
            fontSize: "13px",
            lineHeight: "19px",
            color: "#555",
            marginBottom: "1px",
          }}
        >{`Created on ${date}`}</p>
        <p className="seller">{comment}</p>
      </Container>
    );
  }
}

export default ProductReview;
