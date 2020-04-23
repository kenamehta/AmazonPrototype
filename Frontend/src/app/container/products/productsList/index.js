import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Filter from "./filter";
import Sort from "./sort";
import List from "./list";
import { connect } from "react-redux";
import AddProduct from "../../seller/profile/AddProduct";

class ProductListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setShow: false };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  render() {
    var add;
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
    return (
      <Container fluid>
        <Sort />
        <Row>
          <Col lg={2} md={2} sm={2} xs={12}>
            <Filter />
          </Col>
          <Col lg={10} md={10} sm={10} xs={12}>
            <List />
          </Col>
        </Row>
        {add}
        <AddProduct show={this.state.setShow} handleClose={this.handleClose} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.allProducts,
});

export default connect(mapStateToProps)(ProductListContainer);
