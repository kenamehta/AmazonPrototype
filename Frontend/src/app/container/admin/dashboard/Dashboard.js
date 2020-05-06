import React from "react";
import { Container, Row, Col } from "reactstrap";
import Top5SoldProduct from "./Top5SoldProducts";
import OrderPerDay from "./OrderPerDay";
import Top5Seller from "./Top5Seller";
import Top5Customer from "./Top5Customer";
import Top10RatedProducts from "./Top10RatedProducts";
import Top10ViewedProducts from "./Top10ViewedProducts";

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{ marginTop: "20px" }}>
          <Col lg={6}>
            <OrderPerDay />
          </Col>
          <Col lg={6}>
            <Top5SoldProduct />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col lg={6}>
            <Top5Seller />
          </Col>
          <Col lg={6}>
            <Top5Customer />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col lg={12}>
            <Top10ViewedProducts />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Col lg={12}>
            <Top10RatedProducts />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
