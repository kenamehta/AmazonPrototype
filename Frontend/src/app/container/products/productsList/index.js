import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./filter";
import Sort from "./sort";
import List from "./list";

class ProductListContainer extends React.Component {
  render() {
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
      </Container>
    );
  }
}

export default ProductListContainer;
