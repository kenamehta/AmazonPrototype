import React from "react";
import { Card, Row, Pagination } from "react-bootstrap";
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
          <Card
            key={_id}
            style={{
              width: "18rem",
              border: "0",
              borderBottom: "1px solid rgba(0,0,0,.125)",
            }}
          >
            <div style={{ height: "200px", width: "150px", margin: "auto" }}>
              <span class='helper'></span>

              <Card.Img
                variant='top'
                src={photos[0]}
                style={{ width: "150px", verticalAlign: "middle" }}
              />
            </div>
            <Card.Body>
              <Card.Text
                className='margin-auto-custom'
                style={{ color: "#000", fontSize: "14px", fontWeight: 700 }}
              >
                {sellerName}
              </Card.Text>
              <Card.Title
                className='margin-auto-custom'
                style={{ color: "#000", fontSize: "18px", fontWeight: 500 }}
              >
                <Link to={`/productPage/${_id}`}>{productName}</Link>
              </Card.Title>
              <div className='margin-auto-custom'>
                <StarRatings
                  rating={averageRating}
                  starDimension='20px'
                  starSpacing='2px'
                  starRatedColor='#FBB730'
                  starEmptyColor='#FFF'
                />
              </div>
              <Card.Text
                className='margin-auto-custom'
                style={{ color: "#000" }}
              >
                <span className='a-price'>
                  <span aria-hidden='true'>
                    <span className='a-price-symbol'>$</span>
                    <span className='a-price-whole'>
                      {num}
                      <span className='a-price-decimal'>.</span>
                    </span>
                    <span className='a-price-fraction'>{dec}</span>
                  </span>
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }
    );
    return (
      <div style={{ marginTop: "10px" }}>
        <Row>
          {cards}
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
