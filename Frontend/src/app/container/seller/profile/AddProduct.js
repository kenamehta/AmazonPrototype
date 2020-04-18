/*eslint-disable */

import React from "react";
import "./BasicProfile.css";
import configPath from "./../../../../configApp";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFile = (e) => {
    console.log(e.target.files);
    if (e.target.files.length < 6) this.setState({ file: e.target.files });
    else {
      e.preventDefault();
      console.log(e.target.files);
      alert("Please select less than 5 files");
      return;
    }
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type='text' placeholder='Enter product name' />
            </Form.Group>

            <Form.Group controlId='formBasicCategory'>
              <Form.Label>Category</Form.Label>
              <Form.Control as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='text' placeholder='Enter price' />
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Upload</Form.Label>
              <Form.Control
                type='file'
                multiple
                onChange={(e) => this.handleFile(e)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicDesc'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control as='textarea' rows='3' />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary'>Close</Button>
            <Button variant='primary' type='submit'>
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddProduct;
