import React from "react";
import { Container, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {
        min: 5,
        max: 10,
      },
    };
  }

  render() {
    return (
      <Container style={{ borderRight: "1px solid #CCC" }}>
        <Form.Group controlId='formSearchSeller' style={{ marginTop: "10px" }}>
          <Form.Label style={{ fontWeight: 800 }}>Search By Seller</Form.Label>
          <Form.Control type='text' placeholder='Seller Name' />
        </Form.Group>
        <div>
          <p style={{ fontWeight: 800, margin: "10px 0 5px 0" }}>
            Avg. Customer Review
          </p>
          <div>
            <StarRatings
              rating={5}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
          </div>
          <StarRatings
            rating={4}
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='#FBB730'
            starEmptyColor='#FFF'
          />
          <span style={{ fontSize: "14px", fontWeight: "700" }}> & Up</span>
          <StarRatings
            rating={3}
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='#FBB730'
            starEmptyColor='#FFF'
          />
          <span style={{ fontSize: "14px", fontWeight: "700" }}> & Up</span>
          <StarRatings
            rating={2}
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='#FBB730'
            starEmptyColor='#FFF'
          />
          <span style={{ fontSize: "14px", fontWeight: "700" }}> & Up</span>
          <StarRatings
            rating={1}
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='#FBB730'
            starEmptyColor='#FFF'
          />
          <span style={{ fontSize: "14px", fontWeight: "700" }}> & Up</span>
        </div>
        <div>
          <p style={{ fontWeight: 800, margin: "10px 0 15px 0" }}>Price</p>
          <InputRange
            draggableTrack
            maxValue={20}
            minValue={0}
            onChange={(value) => this.setState({ price: value })}
            onChangeComplete={(value) => console.log(value)}
            value={this.state.price}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.allProducts,
});

export default connect(mapStateToProps)(Filter);
