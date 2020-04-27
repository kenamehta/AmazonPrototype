import React from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import {
  updateProductFilter,
  getAllProducts,
  updateProductSearch,
  updateProductSort,
} from "../../../../action/ProductAction/productAction";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {
        min: 0,
        max: 2500,
      },
      stars: 0,
      starsActive0: "star-inactive",
      starsActive1: "star-inactive",
      starsActive2: "star-inactive",
      starsActive3: "star-inactive",
      starsActive4: "star-inactive",
      seller: "",
    };
  }

  componentWillUpdate(prevProps) {
    if (prevProps.search !== this.props.search)
      this.setState({
        starsActive1: "star-inactive",
        starsActive2: "star-inactive",
        starsActive3: "star-inactive",
        starsActive4: "star-inactive",
        price: {
          min: 0,
          max: 2500,
        },
      });
  }

  onSearch = () => {
    let cat = "";
    if (this.state.category !== "All") cat = this.state.category;
    this.setState({
      starsActive0: "star-inactive",
      starsActive1: "star-inactive",
      starsActive2: "star-inactive",
      starsActive3: "star-inactive",
      starsActive4: "star-inactive",
      price: {
        min: 0,
        max: 2500,
      },
    });
    const data = {
      page: 1,
      orderOn: "rating",
      order: "desc",
      sellerEmailId: "",
      sellerName: this.state.seller,
      productName: "",
      productCategory: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      maxRating: "",
    };
    this.props.dispatch(getAllProducts(data));
    this.props.dispatch(updateProductSearch("", "", this.state.seller));
    this.props.dispatch(updateProductSort("rating", "desc"));
    this.props.dispatch(updateProductFilter("", "", ""));
  };

  applyFilter(filter, x) {
    let cat = "";
    if (this.props.search.category !== "All") cat = this.props.search.category;

    if (filter === "stars") {
      this.setState({
        starsActive0: "star-inactive",
        starsActive1: "star-inactive",
        starsActive2: "star-inactive",
        starsActive3: "star-inactive",
        starsActive4: "star-inactive",
      });
      if (x == 0) {
        this.setState({
          starsActive0: "star-active",
        });
      }
      if (x == 1) {
        this.setState({
          starsActive1: "star-active",
        });
      }
      if (x == 2) {
        this.setState({
          starsActive2: "star-active",
        });
      }
      if (x == 3) {
        this.setState({
          starsActive3: "star-active",
        });
      }
      if (x == 4) {
        this.setState({
          starsActive4: "star-active",
        });
      }
      this.setState({ stars: x });
      this.props.dispatch(
        updateProductFilter(x, this.state.price.min, this.state.price.max)
      );
      const data = {
        page: 1,
        orderOn: "rating",
        order: "desc",
        sellerEmailId: "",
        sellerName: "",
        productName: this.props.search.search,
        productCategory: cat,
        minPrice: this.state.price.min,
        maxPrice: this.state.price.max,
        minRating: x,
        maxRating: 5,
      };
      this.props.dispatch(getAllProducts(data));
    }
    if (filter === "slider") {
      this.setState({ price: x });
      this.props.dispatch(updateProductFilter(this.state.stars, x.min, x.max));
      const data = {
        page: 1,
        orderOn: "rating",
        order: "desc",
        sellerEmailId: "",
        sellerName: "",
        productName: this.props.search.search,
        productCategory: cat,
        minPrice: x.min,
        maxPrice: x.max,
        minRating: this.state.stars,
        maxRating: 5,
      };
      this.props.dispatch(getAllProducts(data));
    }
  }

  render() {
    return (
      <Container style={{ borderRight: "1px solid #CCC" }}>
        <Form.Label style={{ fontWeight: 800, marginTop: "10px" }}>
          Search By Seller
        </Form.Label>
        <InputGroup>
          <Form.Control
            type='text'
            placeholder='Seller Name'
            onChange={(e) => {
              this.setState({ seller: e.target.value });
            }}
          />
          <InputGroup.Append>
            <Button
              variant='outline-secondary'
              className='sprite'
              onClick={this.onSearch}
            >
              <FaSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div>
          <p style={{ fontWeight: 800, margin: "10px 0 5px 0" }}>
            Avg. Customer Review
          </p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.applyFilter("stars", 4);
            }}
          >
            <StarRatings
              rating={4}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
            <span
              style={{ fontSize: "14px" }}
              className={this.state.starsActive4}
            >
              {" "}
              &amp; Up
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.applyFilter("stars", 3);
            }}
          >
            <StarRatings
              rating={3}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
            <span
              style={{ fontSize: "14px" }}
              className={this.state.starsActive3}
            >
              {" "}
              &amp; Up
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.applyFilter("stars", 2);
            }}
          >
            <StarRatings
              rating={2}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
            <span
              style={{ fontSize: "14px" }}
              className={this.state.starsActive2}
            >
              {" "}
              &amp; Up
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.applyFilter("stars", 1);
            }}
          >
            <StarRatings
              rating={1}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
            <span
              style={{ fontSize: "14px" }}
              className={this.state.starsActive1}
            >
              {" "}
              &amp; Up
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.applyFilter("stars", 0);
            }}
          >
            <StarRatings
              rating={0}
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='#FBB730'
              starEmptyColor='#FFF'
            />
            <span
              style={{ fontSize: "14px" }}
              className={this.state.starsActive0}
            >
              {" "}
              &amp; Up
            </span>
          </div>
        </div>
        <div>
          <p style={{ fontWeight: 800, margin: "10px 0 15px 0" }}>Price</p>
          <InputRange
            draggableTrack
            maxValue={3000}
            minValue={0}
            onChange={(value) => {
              this.applyFilter("slider", value);
            }}
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
  search: state.product.productSearch,
});

export default connect(mapStateToProps)(Filter);
