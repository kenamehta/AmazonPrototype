import React from "react";
import "./ProductPage.css";
import { Container, Button, Dropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

class ProductBuySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "5e9c885e24f691220b95ef2a",
      qty: 1,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addToCart = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Container className="buyContainer">
        <Dropdown>
          <Dropdown.Toggle
            style={{
              color: "#111",
              fontSize: "11px",
              backgroundColor: "rgb(231, 233, 236)",
              borderRadius: "3px",
              borderColor: "#adb1b8 #a2a6ac #8d9096",
              borderStyle: "solid",
              borderWidth: "1px",
              cursor: "pointer",
              display: "inline-block",
              textAlign: "center",
              textDecoration: "none",
              verticalAlign: "middle",
              padding: "2px 12px 2px 13px",
            }}
          >
            Qty: {this.state.qty}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 1 })}>
              1
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 2 })}>
              2
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 3 })}>
              3
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 4 })}>
              4
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button className="addToCart" onClick={this.addToCart}>
          <FaShoppingCart
            className="bluebeacon"
            style={{
              color: "#fff",
              position: "absolute",
              top: "2px",
              left: "2px",
              height: "28px",
              width: "25px",
              backgroundPosition: "-35px -5px",
              padding: "3px",
              border: "solid 1px #232f3e",
              borderRadius: "3px",
            }}
          />
          Add to Cart
        </Button>
      </Container>
    );
  }
}

export default ProductBuySection;
