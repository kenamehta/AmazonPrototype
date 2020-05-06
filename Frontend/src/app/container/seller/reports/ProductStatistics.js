import React from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import configPath from "../../../../configApp";

class ProductStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      productsInfo: "",
    };
  }

  componentDidMount() {
    let url = `/seller/analytics/report1/` + localStorage.getItem("emailId");
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          let productsInfo;
          productsInfo = response.data.report1Arr.map((product) => (
            <tr>
              <td>{product.productName}</td>
              <td style={{ textAlign: "right" }}>
                {product.totalProductPrice}
              </td>
              <td style={{ textAlign: "right" }}>
                {product.totalProductQuantity}
              </td>
            </tr>
          ));

          this.setState({
            productsInfo,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          margin: "0 auto",
          height: "500px",
          maxHeight: "500px",
          overflow: "auto",
          marginBottom: "10px",
        }}
      >
        <Table responsive striped bordered style={{ width: "100%" }}>
          <thead style={{ backgroundColor: "#232f3e", color: "#ffffff" }}>
            <tr>
              <th>Product Name</th>
              <th>Amount Earned</th>
              <th>Quantity Sold</th>
            </tr>
          </thead>
          <tbody>{this.state.productsInfo}</tbody>
        </Table>
      </div>
    );
  }
}

export default ProductStatistics;
