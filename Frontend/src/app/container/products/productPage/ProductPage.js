import React from "react";
import "./ProductPage.css";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductPictures from "./ProductPictures";
import ProductBuySection from "./ProductBuySection";
import ProductReview from "./ProductReview";
import StarRatings from "react-star-ratings";
import {
  //Redirect,
  Link,
} from "react-router-dom";

import { getProduct } from "../../../../action/ProductAction/productAction";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productId: "5e9c885e24f691220b95ef2a" };
  }

  componentDidMount() {
    this.props.dispatch(getProduct(this.state.productId));
  }

  render() {
    //Check if customer is signed in if not redirect to login page
    let title = "";
    let seller = "";
    let avgRating = 0;
    let numOfRatings = 0;
    let price = 0;
    let description = "";
    let reviews = "";
    if (this.props.product) {
      title = this.props.product.productName;
      seller = this.props.product.sellerName;
      avgRating = this.props.product.averageRating;
      numOfRatings = this.props.product.comments.length;
      price = this.props.product.productPrice;
      description = this.props.product.productDescription;
      reviews = this.props.product.comments.map((comment) => (
        <ProductReview key={comment._id} comment={comment}></ProductReview>
      ));
    }

    return (
      <Container fluid>
        <Row sm={1} xs={1} md={1} style={{ marginTop: "3%" }}>
          <ProductPictures></ProductPictures>
          <Col md={6} lg={5} xl={6}>
            <h1 className="title">{title}</h1>
            <h1 className="seller">
              by <Link className="sellerLink">{seller}</Link>
            </h1>
            <StarRatings
              rating={avgRating}
              starRatedColor="#f0c14b"
              starEmptyColor="rgb(255, 255, 255)"
              starDimension="16px"
              starSpacing="1px"
              numberOfStars={5}
              name="rating"
            />
            <h1
              className="seller"
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              {`${numOfRatings} ratings`}
            </h1>
            <hr></hr>
            <h1 style={{ color: "#555", fontSize: "13px", padding: "0 3px" }}>
              Price: <p className="price">{`$${price}`}</p>
            </h1>
            <h1 className="seller">{description}</h1>
          </Col>
          <Col lg={2} xl={2}>
            <ProductBuySection></ProductBuySection>
          </Col>
        </Row>
        <hr></hr>
        <Row sm={1} xs={1} md={2}>
          <Col lg={5} xl={4}>
            <h2>Customer reviews</h2>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              <StarRatings
                rating={avgRating}
                starRatedColor="#f0c14b"
                starEmptyColor="rgb(255, 255, 255)"
                starDimension="20px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
              <h1 className="avgStars">{`${avgRating} out of 5`}</h1>
            </div>
            <hr></hr>
            <h3>Review this product</h3>
            <h1 className="seller" style={{ marginBottom: "18px" }}>
              Share your thoughts with other customers
            </h1>
            <Button className="addReviewButton">Write a Costumer Review</Button>
          </Col>
          <Col lg={7} xl={8}>
            {reviews}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

export default connect(mapStateToProps)(ProductPage);
