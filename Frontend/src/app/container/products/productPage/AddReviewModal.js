import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import StarRatings from "react-star-ratings";

const ModalReview = (props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="reviewTitle">
          <Form.Label className="labels">Review Title</Form.Label>
          <Form.Control onChange={props.onChangeHandler} name="reviewTitle" />
        </Form.Group>
        <Form.Label className="labels" style={{ marginBottom: "0" }}>
          Rating
        </Form.Label>
        <StarRatings
          rating={props.rating}
          isSelectable={true}
          starRatedColor="#f0c14b"
          starEmptyColor="rgb(255, 255, 255)"
          starHoverColor="#ed9220"
          starDimension="20px"
          starSpacing="1px"
          changeRating={(rating) => props.changeRating(rating)}
          numberOfStars={5}
          name="rating"
        />
        <Form.Group controlId="review">
          <Form.Label className="labels" style={{ marginTop: "1rem" }}>
            Review
          </Form.Label>
          <Form.Control
            as="textarea"
            onChange={props.onChangeHandler}
            name="review"
            type="text"
            rows="3"
            autoFocus
          />
        </Form.Group>
        <p className="errormessage">{props.errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancel" onClick={props.close}>
          Close
        </Button>
        <Button className="save" onClick={props.onAddReview}>
          Add Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReview;
