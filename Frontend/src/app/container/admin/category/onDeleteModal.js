import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import {
  addCategory,
  deleteCategory,
} from "./../../../../action/admin/categoryActions.js";

class CategoryModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onSubmit = (e) => {
    const newCategory = {
      name: this.state.name,
    };

    this.props.addCategory(newCategory);

    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "5px", marginTop: "5px" }}
          onClick={this.toggle}
        >
          {" "}
          Add a new Category
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Add a new Category</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="category">This category can not be deleted</Label>
                {/* <Input
                  type="text"
                  name="name"
                  id="category"
                  placeholder="Add category"
                  onChange={this.onChange}
                ></Input> */}
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={this.onSubmit}
                >
                  {" "}
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category,
});
export default connect(mapStateToProps, { addCategory })(CategoryModal);
