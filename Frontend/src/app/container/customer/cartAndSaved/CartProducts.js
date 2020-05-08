import React, { Component } from "react";
import { Container, Image, Dropdown, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class CartProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCartPrice: 0,
      redirect: false
    };
    this.updateCartHandler = this.updateCartHandler.bind(this);
  }
  setRedirect = () => {
    this.setState({ redirect: true });
  };
  renderRedirect = () => {
    if (this.state.redirect) return <Redirect to="/checkout" />;
  };
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps called of CartProducts.js");
    console.log("nextProps of CartProducts.js");
    console.log(nextProps);
    let totalPrice = 0,
      totalQuantity = 0;
    for (const eachCartProduct of nextProps.cartProductsArr) {
      totalQuantity += eachCartProduct.quantity;
      if (eachCartProduct.giftFlag === "false") {
        totalPrice += eachCartProduct.quantity * eachCartProduct.productPrice;
      } else {
        // adding 0.5 if a product is a gift. Multiplying by quantity of that item.
        totalPrice +=
          eachCartProduct.quantity * eachCartProduct.productPrice +
          eachCartProduct.quantity * 0.5;
      }
    }
    this.setState({
      totalQuantity: totalQuantity,
      totalCartPrice: totalPrice
    });
  }

  updateCartHandler(
    quantity,
    productId,
    giftFlag,
    giftMessage,
    individualProductPrice
  ) {
    // console.log('Inside updateCartHandler');
    // console.log(quantity);
    // console.log(productId);
    this.props.updateCart({
      id: localStorage.getItem("ID"),
      productId: productId,
      quantity: quantity,
      individualProductPrice: individualProductPrice,
      giftFlag: giftFlag,
      giftMessage
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) redirectVar = <Redirect to="/checkout" />;
    return (
      <div>
        <Container>
          {redirectVar}
          <Row>
            <Col md={9}>
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
                          {/* <label for="giftCheckBox"> This is a gift</label>
                      {product.giftFlag === "true" && (
                        <form
                          onSubmit={e => {
                            e.preventDefault();

                            this.updateCartHandler(
                              product.quantity,
                              product._id,
                              "true",
                              e.target["giftMessage"].value,
                              product.productPrice
                            );
                          }}
                        >
                          <div className="mb-2">
                            <input
                              type="text"
                              name="giftMessage"
                              placeholder={
                                product.giftMessage !== "" ? (
                                  product.giftMessage
                                ) : (
                                  "Enter New Message"
                                )
                              }
                              size="70"
                            />{" "}
                            <input type="submit" value="Submit" on />
                          </div>
                        </form>
                      )} */}
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
                            <div
                              className="mr-5 price_style"
                              title="Adds $0.5 per quantity"
                            >
                              ${product.totalProductPrice}
                            </div>
                          </div>
                          <div class="stock_style">In stock</div>
                          <div
                            class="checkbox_style"
                            title="Will add $0.5 per quantity of gift"
                          >
                            <input
                              type="checkbox"
                              id="giftCheckBox"
                              name="giftCheckBox"
                              checked={product.giftFlag === "true"}
                              onChange={() => {
                                if (product.giftFlag === "true") {
                                  this.updateCartHandler(
                                    product.quantity,
                                    product._id,
                                    "false",
                                    "",
                                    product.productPrice
                                  );
                                } else {
                                  this.updateCartHandler(
                                    product.quantity,
                                    product._id,
                                    "true",
                                    "",
                                    product.productPrice
                                  );
                                }
                              }}
                            />
                            <label for="giftCheckBox"> This is a gift</label>
                            {product.giftFlag === "true" && (
                              <form
                                onSubmit={e => {
                                  //e.preventDefault();
                                  this.updateCartHandler(
                                    product.quantity,
                                    product._id,
                                    "true",
                                    e.target["giftMessage"].value,
                                    product.productPrice
                                  );
                                }}
                              >
                                <div className="mb-2">
                                  <input
                                    type="text"
                                    name="giftMessage"
                                    placeholder={
                                      product.giftMessage !== "" ? (
                                        product.giftMessage
                                      ) : (
                                        "Enter New Message"
                                      )
                                    }
                                    size="70"
                                    required
                                  />{" "}
                                  <input type="submit" value="Submit" on />
                                </div>
                              </form>
                            )}
                          </div>
                          <div className="action_style">
                            <span className="mr-2">
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
                                    padding: "2px 12px 2px 13px"
                                  }}
                                >
                                  Qty: {product.quantity}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        1,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    1
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        2,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    2
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        3,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    3
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        4,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    4
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        5,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    5
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        6,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    6
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        7,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    7
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        8,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    8
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        9,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    9
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href="#"
                                    onClick={() =>
                                      this.updateCartHandler(
                                        10,
                                        product._id,
                                        product.giftFlag,
                                        product.giftMessage,
                                        product.productPrice
                                      )}
                                  >
                                    10
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                            <div>
                              <span
                                className="mr-2 delete_style"
                                onClick={() => {
                                  this.props.deleteCartProduct({
                                    data: {
                                      data: {
                                        id: localStorage.getItem("ID"),
                                        _id: product._id
                                      }
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
                                    id: localStorage.getItem("ID"),
                                    productId: product._id
                                  });
                                }}
                              >
                                Move to Save For Later
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="style__divider___1j_Fp mt-2" />
                    </div>
                  ))
                ) : (
                  ""
                )}
                <div>
                  <div class="d-flex">
                    <div
                      class="col-2"
                      style={{
                        width: "12.499999995%",
                        flex: "0 0 12.499%",
                        maxWidth: "12.499%"
                      }}
                    />
                    <div
                      class="col-10"
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "17px"
                      }}
                    >
                      <div align="right">
                        <span className="subtotal">Subtotal: </span>
                        <span
                          className="mr-5 price_style"
                          title="Includes $0.5 per quantity of gift, if any"
                        >
                          ${parseFloat(this.state.totalCartPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="style__divider___1j_Fp mt-2" />
              </div>
            </Col>
            <Col md={3}>
              {this.state.totalQuantity !== 0 ? (
                <div className="checkout-box-style mt-5">
                  <b style={{ fontSize: "15px" }}>
                    Subtotal ( {this.state.totalQuantity} items) :
                    <span className="price_style">
                      ${parseFloat(this.state.totalCartPrice).toFixed(2)}
                    </span>
                  </b>
                  <div className=" mt-2 ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
                    <span
                      className="addToCart a-button-inner a-button-text "
                      onClick={() => {
                        this.setRedirect();
                      }}
                    >
                      Proceed to checkout
                    </span>
                  </div>
                </div>
              ) : (
                <div className="checkout-box-style mt-5">
                  <div className=" mt-2 ship-to-this-address a-button a-button-primary a-button-span12 a-spacing-medium  ">
                    <span
                      className="addToCart a-button-inner a-button-text unable-proceed-style"
                      onClick={() => {}}
                    >
                      Proceed to checkout
                    </span>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CartProducts;
