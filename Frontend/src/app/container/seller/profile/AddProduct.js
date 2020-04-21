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
      fileName: "",
      name: "",
      nameError: "",
      category: "",
      categoryError: "",
      price: "",
      priceError: "",
      desc: "",
      descError: "",
      nameExist: false,
    };
    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.checkNameEventHandler = this.checkNameEventHandler.bind(this);
  }

  checkNameEventHandler(e) {
    console.log(e);
    if (this.state.name === "") {
      e.preventDefault();
      this.setState({
        nameError: "Product name is mandatory",
      });
    } else {
      axios
        .get(
          configPath.api_host +
            `/product/seller/existProduct/` +
            this.state.name
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            e.preventDefault();
            this.setState({
              nameError:
                "Product name already present, Please enter a new product name",
              nameExist: true,
            });
          }
        })
        .catch((error) => {
          e.preventDefault();
          this.setState({
            nameError: "",
            nameExist: false,
          });
        });
    }
  }

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    //console.log(this.state);
    let error = 0;
    if (this.state.name === "") {
      this.setState({
        nameError: "Name is mandatory",
      });
      error = 1;
    }
    if (this.state.category === "") {
      this.setState({
        categoryError: "Category is mandatory",
      });
      error = 1;
    }
    if (this.state.price === "") {
      this.setState({
        priceError: "Price is mandatory",
      });
      error = 1;
    }
    if (this.state.desc === "") {
      this.setState({
        descError: "Description is mandatory",
      });
      error = 1;
    }
    if (this.state.file === null) {
      this.setState({
        fileError: "File is mandatory",
      });
      error = 1;
    } else if (this.state.file.length > 5) {
      this.setState({
        fileError: "Max 5 files can be uploaded",
      });
      error = 1;
    }
    if (error === 0 && this.state.nameExist === false) {
      const fd = new FormData();
      fd.append("sellerId", this.props.profile.userId);
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
            <Form.Group controlId='formBasicName'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={this.state.name}
                onBlur={this.checkNameEventHandler}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
              <Form.Text style={{ color: "red" }}>
                {this.state.nameError}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicCategory'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={this.state.category}
                onChange={(e) => {
                  this.setState({ category: e.target.value });
                }}
                as='select'
              >
                {cat}
              </Form.Control>
              <Form.Text style={{ color: "red" }}>
                {this.state.categoryError}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={this.state.price}
                onChange={(e) => {
                  this.setState({ price: e.target.value });
                }}
              />
              <Form.Text style={{ color: "red" }}>
                {this.state.priceError}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicDesc'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={this.state.desc}
                onChange={(e) => {
                  this.setState({ desc: e.target.value });
                }}
              />
              <Form.Text style={{ color: "red" }}>
                {this.state.descError}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type='file'
                multiple
                onChange={(e) => this.handleFile(e)}
              />
              <Form.Text style={{ color: "red" }}>
                {this.state.fileError}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='cancel'
              onClick={(e) => {
                this.props.handleClose();
                this.setState({
                  file: null,
                  fileError: "",
                  name: "",
                  nameError: "",
                  category: "",
                  categoryError: "",
                  price: "",
                  priceError: "",
                  desc: "",
                  descError: "",
                  nameExist: false,
                });
              }}
            >
              Close
            </Button>
            <Button className='save' type='submit'>
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
