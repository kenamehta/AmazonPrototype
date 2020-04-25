import React from "react";
import "./ProductsList.css";
import { Card, Row, Pagination, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../../../action/ProductAction/productAction";

class List extends React.Component {
  render() {
    console.log("this.props.product in list.js in productsList");
    console.log(this.props.product);

    const active = this.props.product.page;
    let items = [];

    for (let number = 1; number <= this.props.product.pages; number++) {
      items.push(
        <Pagination.Item
          className='pagination'
          key={number}
          active={number === active}
          id={number}
          onClick={(e) => {
            // console.log(e.target);
            // console.log(e.target.id);
            // console.log(typeof e.target.id);
            // console.log(typeof active);
            let newPageNumber = parseInt(e.target.id);
            if (newPageNumber !== active) {
              const data = {
                page: newPageNumber,
                orderOn: "",
                order: "",
                sellerEmailId: "",
                sellerName: "",
                productName: "",
                productCategory: "",
                minPrice: "",
                maxPrice: "",
                minRating: "",
                maxRating: "",
              };
              this.props.dispatch(getAllProducts(data));
            }
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    const cards = this.props.product.docs.map(
      ({
        _id,
        sellerName,
        productName,
        productPrice,
        averageRating,
        photos,
      }) => {
        let num = "";
        let dec = "";
        productPrice = productPrice.toString();
        if (productPrice.indexOf(".") !== -1) {
          num = productPrice.split(".")[0];
          dec = productPrice.split(".")[1];
        } else {
          num = productPrice;
          dec = "0";
        }
        return (
          <Col xl={2} lg={3} md={4} sm={5} xs={12} className='line'>
            <Card key={_id} style={{ border: "none" }} className='class-style'>
              <div style={{ height: "200px", width: "150px", margin: "auto" }}>
                <span class='helper'></span>

                <Card.Img
                  variant='top'
                  src={photos[0]}
                  style={{ width: "150px", verticalAlign: "middle" }}
                />
              </div>
              <Card.Body>
                <Card.Title style={{ marginBottom: "0" }}>
                  <Link className='product-title' to={`/productPage/${_id}`}>
                    {productName}
                  </Link>
                </Card.Title>
                <Card.Text
                  style={{
                    marginBottom: "0",
                    fontSize: "14px",
                    fontWeight: "200",
                  }}
                  // className="margin-auto-custom"
                >
                  {sellerName}
                </Card.Text>
                <div
                // className="margin-auto-custom"
                >
                  <StarRatings
                    rating={averageRating}
                    starDimension='16px'
                    starSpacing='2px'
                    starRatedColor='#FBB730'
                    starEmptyColor='#FFF'
                  />
                </div>
                <Card.Text
                  // className="margin-auto-custom"
                  style={{ color: "#000" }}
                >
                  <p className='price-style'>
                    <p aria-hidden='true'>
                      <p
                        className='a-price-symbol'
                        style={{
                          verticalAlign: "super",
                          top: "-.5em",
                          fontSize: "12px",
                          fontWeight: "400",
                          display: "inline",
                        }}
                      >
                        $
                      </p>
                      <p
                        className='a-price-whole'
                        style={{ fontSize: "21px", display: "inline" }}
                      >
                        {num}
                      </p>
                      <p
                        className='a-price-fraction'
                        style={{
                          verticalAlign: "super",
                          top: "-.5em",
                          fontSize: "12px",
                          fontWeight: "400",
                          display: "inline",
                        }}
                      >
                        {dec}
                      </p>
                    </p>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    );
    return (
      <div style={{ marginTop: "10px" }}>
        <Row xl={12} lg={12} md={12} sm={12} xs={12}>
          {cards}
        </Row>
        <Row lg={12} md={12} sm={12} xs={12} className='line2'>
          <Pagination style={{ margin: "10px auto" }}>{items}</Pagination>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.allProducts,
});

export default connect(mapStateToProps)(List);
