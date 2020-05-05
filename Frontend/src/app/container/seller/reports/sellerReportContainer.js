import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SellerReports from "./productReports";
// import { ProductSales } from "./productSales";

class ReportContainer extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{ marginTop: "30px" }}>
          <Col xs={6}>
            <SellerReports />
          </Col>
          <Col xs={6}>
            {/* <ProductSales /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReportContainer;
