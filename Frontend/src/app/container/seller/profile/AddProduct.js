/*eslint-disable */

import React from "react";
import "./BasicProfile.css";
import configPath from "./../../../../configApp";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getCategory } from "../../../../action/ProductAction/productCategory";
import axios from "axios";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: "",
      category: "",
      price: "",
      desc: "",
    };
    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    //console.log(this.state);
    if (
      this.state.name === "" ||
      this.state.category === "" ||
      this.state.price === "" ||
      this.state.desc === "" ||
      this.state.file === null
    ) {
      window.alert("Please enter all fields");
    } else if (this.state.file.length > 5) {
      window.alert("Max 5 uploads allowed");
    } else {
      const fd = new FormData();
      fd.append("emailId", this.props.profile.emailId);
      fd.append("sellerName", this.props.profile.name);
      fd.append("productName", this.state.name);
      fd.append("productCategory", this.state.category);
      fd.append("productPrice", this.state.price);
      fd.append("productDescription", this.state.desc);
      for (let i = 0; i <= this.state.file.length; i++) {
        fd.append("file" + i, this.state.file[i]);
      }
      axios
        .post(configPath.api_host + `/product/seller/addProduct`, fd)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.props.handleClose();
            alert("Successfully added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleFile(e) {
    //console.log(e.target.files);
    this.setState({ file: e.target.files });
  }

  render() {
    //console.log(this.props.category);
    let cat = this.props.category.map(({ _id, name }) => {
      return <option key={_id}>{name}</option>;
    });
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.editProfileHandlerSubmit}>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={this.state.category}
                onChange={(e) => {
                  this.setState({ category: e.target.value });
                }}
                as="select"
              >
                {cat}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={this.state.price}
                onChange={(e) => {
                  this.setState({ price: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDesc">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.desc}
                onChange={(e) => {
                  this.setState({ desc: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => this.handleFile(e)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="cancel" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button className="save" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
  category: state.categoryReducer.category,
});

export default connect(mapStateToProps, { getCategory })(AddProduct);
