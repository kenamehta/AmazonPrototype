import React from "react";
import "./ProductPage.css";
import { Container, Button, Dropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { connect } from "react-redux";

import { addToSaveForLater } from "../../../../action/customer/savedAndCartProducts/addToSaveForLater";
import { addToCart } from "../../../../action/customer/savedAndCartProducts/addToCart";

class ProductBuySection extends React.Component {
  constructor(props) {
    super(props);
    //console.log('props in productbuysections.js');
    //console.log(props);
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
    const data = {
      id:localStorage.getItem("ID"),
      productId:this.props.product._id,
      sellerEmailId:this.props.product.sellerEmailId,
      quantity:this.state.qty
    }
    
    this.props.dispatch(addToCart(data));
    this.setState({ qty: 1 });
  };

  addToSaveForLater = (e) => {
    e.preventDefault();
    const data = {
      id:localStorage.getItem("ID"),
      productId:this.props.product._id,
      sellerEmailId:this.props.product.sellerEmailId
    }
    this.props.dispatch(addToSaveForLater(data));
  };

  render() {
    console.log('Render of ProductBuySection called');
    console.log(this.props);
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
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 5 })}>
              5
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 6 })}>
              6
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 7 })}>
              7
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 8 })}>
              8
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 9 })}>
              9
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.setState({ qty: 10 })}>
              10
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
        <Button className="addToSaveForLater" onClick={this.addToSaveForLater}>
          <MdWatchLater
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
          Save for Later
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});


export default connect(mapStateToProps)(ProductBuySection);


//export default ProductBuySection;
