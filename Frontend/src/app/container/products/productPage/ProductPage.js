import React from "react";
import "./ProductPage.css";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductPictures from "./ProductPictures";
import ProductBuySection from "./ProductBuySection";
import ProductReview from "./ProductReview";
import StarRatings from "react-star-ratings";
import ModalReview from "./AddReviewModal";
import {
  //Redirect,
  Link,
} from "react-router-dom";

import {
  getProduct,
  addComment,
} from "../../../../action/ProductAction/productAction";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    //console.log('props in productpage.js')
    //console.log(props);
    this.state = {
      productId: this.props.match.params.id,
      show: false,
      rating: 0,
      reviewTitle: null,
      review: null,
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getProduct(this.state.productId));
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });

    //console.log(e.target.id);
    //console.log(e.target.value);
  };

  changeRating = (r) => {
    this.setState({
      rating: r,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
      rating: 0,
      reviewTitle: null,
      review: null,
      errorMessage: "",
    });
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      show: true,
    });
  };

  onAddReview = (e) => {
    e.preventDefault();

    let error = "";
    let trimmedReviewTitle = "";
    let trimmedReview = "";
    if (this.state.reviewTitle !== null) {
      trimmedReviewTitle = this.state.reviewTitle;
    }

    if (this.state.review !== null) {
      trimmedReview = this.state.review;
    }

    if (trimmedReviewTitle === "" || this.state.reviewTitle === null) {
      error = "Required. Enter review title.";
    } else if (this.state.rating === 0) {
      error = "Required. Select rating.";
    } else if (trimmedReview === "" || this.state.review === null) {
      error = "Required. Enter review comment.";
    }

    if (error === "") {
      const data = {
        productId: this.state.productId,
        customerId: localStorage.getItem("ID"),
        title: this.state.reviewTitle,
        comment: this.state.review,
        rating: this.state.rating,
      };
      this.props.dispatch(addComment(data));

      this.handleClose();
    } else {
      this.setState({
        errorMessage: error,
      });
    }
  };

  render() {
    //Check if customer is signed in if not redirect to login page
    let title = "";
    let seller = "";
    let sellerEmailId = "";
    let sellerId = "";
    let avgRating = 0;
    let numOfRatings = 0;
    let price = 0;
    let description = "";
    let reviews = "";
    let add = "";
    if (localStorage.getItem("category") == "seller") {
      add = (
        <Button
          className='bluebeacon addProductButton'
          style={{
            float: "right",
            borderRadius: 15 + "px",
            borderColor: "#232f3e",
            right: 40,
            bottom: 30,
            position: "fixed",
            fontSize: 20 + "px",
          }}
          onClick={this.handleShow}
        >
          Add Product
        </Button>
      );
    }
    if (this.props.product) {
      title = this.props.product.productName;
      seller = this.props.product.sellerName;
      sellerEmailId = this.props.product.sellerEmailId;
      sellerId = this.props.product.sellerId;
      avgRating = this.props.product.averageRating;
      numOfRatings = this.props.product.comments.length;
      price = this.props.product.productPrice;
      description = this.props.product.productDescription;
      reviews = this.props.product.comments.map((comment) => (
        <ProductReview key={comment._id} comment={comment}></ProductReview>
      ));
    }
    console.log("Render called inside productpage.js");

    return (
      <Container fluid style={{ minWidth: "500px" }}>
        <ModalReview
          show={this.state.show}
          close={this.handleClose}
          rating={this.state.rating}
          changeRating={this.changeRating}
          onChangeHandler={this.onChangeHandler}
          onAddReview={this.onAddReview}
          errorMessage={this.state.errorMessage}
        />
        <Row sm={1} xs={1} md={1} style={{ marginTop: "3%" }}>
          <ProductPictures></ProductPictures>
          <Col md={6} lg={5} xl={6}>
            <h1 className='title'>{title}</h1>
            <h1 className='seller'>
              by{" "}
              <Link
                className='sellerLink'
                to={`/seller/profile/${sellerEmailId}`}
              >
                {seller}
              </Link>
            </h1>
            <StarRatings
              rating={avgRating}
              starRatedColor='#f0c14b'
              starEmptyColor='rgb(255, 255, 255)'
              starDimension='16px'
              starSpacing='1px'
              numberOfStars={5}
              name='rating'
            />
            <h1
              className='seller'
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              {`${numOfRatings} ratings`}
            </h1>
            <hr></hr>
            <h1 style={{ color: "#555", fontSize: "13px", padding: "0 3px" }}>
              Price: <p className='price'>{`$${price}`}</p>
            </h1>
            <h1 className='seller'>{description}</h1>
          </Col>
          <Col lg={2} xl={2}>
            <ProductBuySection></ProductBuySection>
          </Col>
        </Row>
        <hr></hr>
        <Row sm={1} xs={1} md={2}>
          <Col lg={5} xl={4}>
            <h2 className='subtitle'>Customer reviews</h2>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              <StarRatings
                rating={avgRating}
                starRatedColor='#f0c14b'
                starEmptyColor='rgb(255, 255, 255)'
                starDimension='20px'
                starSpacing='1px'
                numberOfStars={5}
                name='rating'
              />
              <h1 className='avgStars'>{`${avgRating} out of 5`}</h1>
            </div>
            <hr></hr>
            <h3 className='sub-subtitle'>Review this product</h3>
            <h1 className='seller' style={{ marginBottom: "18px" }}>
              Share your thoughts with other customers
            </h1>
            <Button className='addReviewButton' onClick={this.handleShow}>
              Write a Costumer Review
            </Button>
          </Col>
          <Col lg={7} xl={8}>
            {reviews}
          </Col>
        </Row>
        {add}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

export default connect(mapStateToProps)(ProductPage);
