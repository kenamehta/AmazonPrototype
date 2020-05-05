import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MonthlyProductSales from "./MonthlyProductSales";
import ProductStatistics from "./ProductStatistics";

class ReportContainer extends React.Component {
  render() {
    return (
      <>
        <Row
          xs={12}
          md={12}
          sm={12}
          lg={12}
          xl={12}
          style={{ marginTop: "30px", height: "500px" }}
        >
          <MonthlyProductSales />
        </Row>
        <Row xs={12} md={12} sm={12} lg={12} xl={12}>
          <ProductStatistics />
        </Row>
      </>
    );
  }
}

export default ReportContainer;
