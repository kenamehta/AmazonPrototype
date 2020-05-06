import React from "react";
import { Container, Row, Col } from "reactstrap";
import Top5SoldProduct from "./Top5SoldProducts";
import OrderPerDay from "./OrderPerDay";

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
      </Container>
    );
  }
}

export default Dashboard;
