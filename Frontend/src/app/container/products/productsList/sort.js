import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllProducts,
  updateProductSort,
} from "../../../../action/ProductAction/productAction";

class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      rating: "",
      minPrice: "",
      maxPrice: "",
      sort: "Rating: High to Low",
    };
  }

  componentWillUpdate(prevProps) {
    if (
      prevProps.search !== this.props.search ||
      prevProps.filter !== this.props.filter
    )
      this.setState({
        sort: "Rating: High to Low",
      });
  }

  componentDidMount() {
    this.setState({
      search: this.props.search.search,
    });
  }

  applySort = (value) => {
    let sortType = "";
    let sort = "";
    let val = value.split(":");
    let cat = "";
    this.setState({
      sort: value,
    });
    if (val[0] === "Rating") {
      if (val[1] === "High to Low") {
        sortType = "rating";
        sort = "desc";
      } else {
        sortType = "rating";
        sort = "asc";
      }
    }
    if (val[0] === "Price") {
      if (val[1] === "High to Low") {
        sortType = "price";
        sort = "desc";
      } else {
        sortType = "price";
        sort = "asc";
      }
    }
    this.props.dispatch(updateProductSort(sortType, sort));
    if (this.props.search.category !== "All") cat = this.props.search.category;
    const data = {
      page: 1,
      orderOn: sortType,
      order: sort,
      sellerEmailId: "",
      sellerName: "",
      productName: this.props.search.search,
      productCategory: cat,
      minPrice: this.props.filter.minPrice,
      maxPrice: this.props.filter.maxPrice,
      minRating: this.props.filter.rating,
      maxRating: 5,
    };
    this.props.dispatch(getAllProducts(data));
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.search.search !== this.props.search.search ||
      prevProps.search.seller !== this.props.search.seller
    ) {
      if (this.props.search.search === "")
        this.setState({
          search: this.props.search.seller,
        });
      else
        this.setState({
          search: this.props.search.search,
        });
    }
  }

  render() {
    const prop = this.props.product;
    let search;
    if (this.state.search === "") search = "All Products";
    else search = this.state.search;
    return (
      <Row className='custom-sort'>
        <Col lg={6} md={6} sm={6} xs={12}>
          <p
            style={{
              margin: "10px 0 10px auto",
              fontWeight: "500",
              fontSize: "13px",
            }}
          >
            {prop.page}-{prop.limit} of over {prop.total} results from "
            <span style={{ color: "#D56625", fontWeight: "700" }}>
              {search}
            </span>
            "
          </p>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Form.Group
            controlId='productFilter'
            style={{ width: "15%", margin: "10px 0 10px auto" }}
          >
            <Form.Control
              as='select'
              style={{
                padding: "0px",
                background: "#e7e9ec",
                borderColor: "#ADB1B8 #A2A6AC #8D9096",
                fontSize: "11px",
                height: "calc(0.5em + .75rem + 2px)",
              }}
              value={this.state.sort}
              onChange={(e) => {
                this.applySort(e.target.value);
              }}
            >
              <option value='Rating:High to Low'>Rating:High to Low</option>
              <option value='Rating:Low to High'>Rating:Low to High</option>
              <option value='Price:High to Low'>Price:High to Low</option>
              <option value='Price:Low to High'>Price:Low to High</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.allProducts,
  search: state.product.productSearch,
  filter: state.product.productFilter,
});

export default connect(mapStateToProps)(Sort);
