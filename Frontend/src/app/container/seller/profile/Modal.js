import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ModalPicture = (props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          onChange={props.profileFileUploadHandler}
          type="file"
          name="profilePicture"
          id="profilePicture"
          accept="image/*"
        />
        <p className="errormessage">{props.errormessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancel" onClick={props.close}>
          Close
        </Button>
        <Button className="save" onClick={props.onUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPicture;
