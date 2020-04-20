import React from "react";
import "./ProductPage.css";
import { Container, Image, Col } from "react-bootstrap";
import { connect } from "react-redux";
// import { getProduct } from "../../../../action/ProductAction/productAction";

class ProductPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "5e9c885e24f691220b95ef2a",
      currImage: "",
    };
  }

  changeImage = (photo) => {
    this.setState({
      currImage: photo,
    });
  };

  render() {
    let photos = "";
    let img = "";
    if (this.props.product) {
      img = this.props.product.photos[0];

      photos = this.props.product.photos.map((photo) => (
        <div className="miniphoto" onMouseEnter={() => this.changeImage(photo)}>
          <Image
            style={{ margin: "9px auto" }}
            src={`${photo}`}
            alt="product"
          ></Image>
        </div>
      ));
    }

    if (this.state.currImage !== "") {
      img = this.state.currImage;
    }

    console.log(this.state);
    console.log(img);
    return (
      <>
        <Col md={1} xs={1} sm={1} lg={1} xl={1} style={{ height: "500px" }}>
          <Container>{photos}</Container>
        </Col>
        <Col md={5} xs={11} sm={11} lg={4} xl={3}>
          <Image
            src={img}
            className="bigImage"
            style={{
              // width: "500px",
              height: "500px",
              paddingTop: "27px",
              paddingBottom: "27px",
              margin: "auto 0",
            }}
          />
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

export default connect(mapStateToProps)(ProductPictures);
