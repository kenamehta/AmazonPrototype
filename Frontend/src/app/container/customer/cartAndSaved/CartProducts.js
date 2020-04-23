import React, { Component } from "react";
import { Container, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


class CartProducts extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <div className="mt-3">
          <h5>Shopping Cart ({this.props.cartCnt} Items)</h5>
          <div className="style__divider___1j_Fp mt-2" />

          {this.props.cartProductsArr ? (
            this.props.cartProductsArr.map(product => (
              <div>
                <div className="d-flex">
                  <div
                    className="col-2"
                    style={{
                      width: "12.499999995%",
                      flex: "0 0 12.499%",
                      maxWidth: "12.499%"
                    }}
                  >
                    <Image
                      src={product ? product.photos[0] : ""}
                      className="productImg"
                      style={{
                        //width: "130px",
                        height: "130px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        margin: "auto 0"
                      }}
                    />
                  </div>
                  <div
                    className="col-10"
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      fontSize: "17px"
                    }}
                  >
                    <div className="justify-content-between d-flex">
                      <div>
                        <Link
                          className="name_style"
                          to={`/productPage/${product._id}`}
                        >
                          {product.productName}
                        </Link>
                      </div>
                      <div className="mr-5 price_style">
                        ${product.productPrice}
                      </div>
                    </div>
                    <div class="stock_style">In stock</div>
                    <div className="pt-2 action_style">
                      <span className = "mr-2">
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
                      </span>
                      <span className="mr-2">|</span>
                      <span
                        className="mr-2 delete_style"
                        onClick={() => {
                          this.props.deleteCartProduct({
                            data: {
                              data: { id:localStorage.getItem("ID"),
                                      _id: product._id }
                            }
                          });
                        }}
                      >
                        Delete
                      </span>
                      <span className="mr-2">|</span>
                      <span
                        className="move_style"
                        onClick={() => {
                          this.props.moveCartToSaved({
                            id:localStorage.getItem("ID"),
                            productId: product._id 
                          });
                        }}
                      >
                        Move to Save For Later
                      </span>
                    </div>
                  </div>
                </div>
                <div className="style__divider___1j_Fp mt-2" />
              </div>
            ))
          ) : (
            ""
          )}
        </div>
      </Container>
    );
  }
}

export default CartProducts;
