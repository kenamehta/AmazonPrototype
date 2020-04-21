/*eslint-disable */

import React from "react";
import "./BasicProfile.css";
import configPath from "./../../../../configApp";
import {
  Button,
  Card,
  Image,
  Row,
  Form,
  Container,
  Col,
} from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalPicture from "./Modal";
import { connect } from "react-redux";
import {
  getSellerProfile,
  updateSellerProfilePicture,
  updateSellerDetails,
} from "../../../../action/Seller/Profile/profileAction";

class BasicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPicButton: "none",
      editNameButton: "block",
      showText: "none",
      basicDetails: "",
      selectedFile: null,
      show: false,
      errorMessage: "",
    };
    this.capitalize = this.capitalize.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.sellerVisitingOwnProfile) {
      console.log("Seller Visiting his profile");
      this.props.getSellerProfile({ emailId: localStorage.getItem("emailId") });
    } else {
      console.log("Somebody else visiting seller profile");
      this.props.getSellerProfile({ emailId: this.props.sellerEmailId });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("NextProps in SellerProfile.js");
    console.log(nextProps);
    if (nextProps.profile) {
      const { profile } = nextProps;
      this.setState(
        {
          basicDetails: profile,
          editNameButton: "block",
          showText: "none",
        }
        // , () => {
        //   if (!this.props.sellerVisitingOwnProfile) {
        //     localStorage.setItem('profilePictureUrl', this.state.basicDetails.profilePictureUrl);
        //   }
        // }
      );
    }
  }

  profileFileUploadHandler(e) {
    this.setState(
      {
        selectedFile: e.target.files[0],
      },
      () => {
        console.log(this.state.selectedFile);
      }
    );
  }

  onChangeHandler(e) {
    e.preventDefault();
    let oldState = this.state;
    this.setState({
      //[e.target.name]: e.target.value,
      basicDetails: {
        ...oldState.basicDetails,
        [e.target.id]: e.target.value,
      },
    });

    //console.log(e.target.id);
    //console.log(e.target.value);
  }

  capitalize(word, splitParam = " ") {
    if (word) {
      word = word.split(splitParam).map((eachWord) =>
        eachWord
          .split(" ")
          .map((each) => each.charAt(0).toUpperCase() + each.substring(1))
          .join(" ")
      );
      word = word.join(splitParam);
      return word;
    }
    return "";
  }

  handleClose = () => {
    this.setState({
      show: false,
      errorMessage: "",
    });
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      show: true,
    });
  };

  onUpload = (e) => {
    e.preventDefault();
    if (this.state.selectedFile === null) {
      //window.alert("Please select a file");
      this.setState({
        errorMessage: "Please select a file",
      });
    } else {
      console.log("Uploading new seller profile picture");
      const fd = new FormData();
      fd.append("id", localStorage.getItem("ID"));
      fd.append("emailId", localStorage.getItem("emailId"));
      fd.append("file", this.state.selectedFile);
      this.props.updateSellerProfilePicture(fd);
    }
  };

  render() {
    let profilePictureUrl = configPath.api_host + "/default.png";
    if (
      this.state.basicDetails.profilePictureUrl &&
      this.state.basicDetails.profilePictureUrl !== "default.png"
    )
      profilePictureUrl = this.state.basicDetails.profilePictureUrl;

    let sellerPhoto = "";

    if (this.props.sellerVisitingOwnProfile) {
      sellerPhoto = (
        <Row style={{ position: "relative" }}>
          <Image
            className='ProfilePicImage'
            src={profilePictureUrl}
            roundedcircle='true'
          />
          <Button className='ProfilePicButtononImage' onClick={this.handleShow}>
            <Row>
              <FaCamera size={25} style={{ margin: "0 auto" }} />
            </Row>
            <Row>
              <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                Change Photo
              </h5>
            </Row>
          </Button>
        </Row>
      );
    } else {
      sellerPhoto = (
        <>
          <Image
            className='ProfilePicImage'
            src={profilePictureUrl}
            roundedcircle='true'
          />
        </>
      );
    }

    let button = "";
    if (this.props.sellerVisitingOwnProfile) {
      button = (
        <Button
          className='editbutton'
          onClick={(e) => {
            this.setState({ editNameButton: "none" });
            this.setState({ showText: "block" });
          }}
        >
          <MdEdit style={{ color: "black" }} />
        </Button>
      );
    }

    return (
      <Card className='ProfileCard'>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          profileFileUploadHandler={this.profileFileUploadHandler}
          errorMessage={this.state.errorMessage}
        />
        {sellerPhoto}
        <Container
          style={{ display: this.state.editNameButton, paddingTop: "25px" }}
        >
          <Card.Title
            style={{
              fontSize: "34px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {this.capitalize(this.props.profile.name)} {button}
          </Card.Title>
          <Card.Subtitle
            style={{
              fontSize: "18px",
              textAlign: "center",
              lineHeight: "1.5em",
            }}
          >
            {this.capitalize(this.props.profile.street)} <br></br>
            {`${this.capitalize(this.props.profile.city)} ${this.capitalize(
              this.props.profile.state
            )} ${this.capitalize(this.props.profile.country)} ${this.capitalize(
              this.props.profile.zipcode
            )}`}{" "}
            <br></br>
            {`Phone Number: ${this.capitalize(this.props.profile.phone)}`}
          </Card.Subtitle>
        </Container>
        <Container
          style={{
            width: "50%",
            display: this.state.showText,
            paddingTop: "25px",
          }}
        >
          <Row>
            <Col md={12}>
              <Form.Group controlId='name'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.name}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId='street'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.street}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId='city'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.city}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='state'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.state}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId='country'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.country}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='zipcode'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.zipcode}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId='phone'>
                <Form.Control
                  onChange={this.onChangeHandler}
                  type='text'
                  className='form-control'
                  value={this.state.basicDetails.phone}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              className='cancel'
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  basicDetails: this.props.profile,
                  editNameButton: "block",
                  showText: "none",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              className='save'
              onClick={(e) => {
                e.preventDefault();
                const data = {
                  id: localStorage.getItem("ID"),
                  emailId: localStorage.getItem("emailId"),
                  name: this.state.basicDetails.name,
                  phone: this.state.basicDetails.phone,
                  street: this.state.basicDetails.street,
                  city: this.state.basicDetails.city,
                  state: this.state.basicDetails.state,
                  country: this.state.basicDetails.country,
                  zipcode: this.state.basicDetails.zipcode,
                };
                //console.log(data);
                this.props.updateSellerDetails(data);
              }}
            >
              Save
            </Button>
          </Card.Footer>
        </Container>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps, {
  getSellerProfile,
  updateSellerProfilePicture,
  updateSellerDetails,
})(BasicProfile);
