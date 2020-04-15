import React from 'react';
import './BasicProfile.css';
import configPath from "./../../../../configApp";
import {
  Col, Button, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getSellerProfile, updateSellerProfilePicture, updateSellerDetails } from '../../../../action/UserAction/profileAction';


class BasicProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showEditPicButton: 'none',
      editNameButton: 'block',
      showText: 'none',
      basicDetails:'',
      selectedFile: null,
    }
    this.capitalize = this.capitalize.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
  }

  componentDidMount(){
    if(this.props.sellerVisitingOwnProfile) {
      console.log('Seller Visiting his profile');
      this.props.getSellerProfile({ emailId: localStorage.getItem('emailId') });
    } else {
      console.log('Somebody else visiting seller profile');
      this.props.getSellerProfile({ emailId: this.props.sellerEmailId });
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('NextProps in SellerProfile.js');
    console.log(nextProps);
    if(nextProps.profile){
      const { profile } = nextProps;
      this.setState({
        basicDetails:profile,
        editNameButton: 'block',
        showText: 'none',
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
    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      console.log(this.state.selectedFile);
    });
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  render(){
    let profilePictureUrl = configPath.api_host+'/default.png';
    if(this.state.basicDetails.profilePictureUrl && this.state.basicDetails.profilePictureUrl !== 'default.png')
      profilePictureUrl = this.state.basicDetails.profilePictureUrl;
    return(
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-12 col-md-offset-1 shadow_style">
              <div>
                <div className="card">
                  <div align="center" className="m-2 ">
                    <div
                      className="circular-avatar-image m-3 image-edit-avatar"
                      onClick={(e) => {
                        this.setState({ showEditPicButton: "block" });
                      }}
                    >
                      <img
                        src={profilePictureUrl}
                        alt="Profile Picture"
                        class="avatar-image"
                        style={{ "background-size": "contain" }}
                      ></img>
                      <div className="image-edit-popover-trigger-holder">
                        <div>
                          <img
                            alt=""
                            src="//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/camera-desktop-4aba2c5ff428bad7bee93a2e61a2ad5128cbdd58b770618a1fd108abca1e2f31.png"
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div
                      className="ml-3 mt-3"
                      style={{ display: this.state.showEditPicButton }}
                    >
                      {/* <button className="btn btn-secondary">Upload</button> */}
                      <Input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={this.profileFileUploadHandler} />
                      <button className="btn btn-secondary" 
                        onClick={(e)=>{
                          if(this.state.selectedFile === null){
                            window.alert('Please select a file');
                          } else {
                            console.log('Uploading new seller profile picture');
                            const fd = new FormData();
                            fd.append('emailId', localStorage.getItem('emailId'));
                            fd.append('file',this.state.selectedFile);
                            this.props.updateSellerProfilePicture(fd);
                          }
                        }}>
                          Upload
                      </button>
                    </div>
                  </div>
                  <div className="card-body " align="center">
                    <div className="d-flex" style={{ justifyContent: "center" }}>
                      <div style={{ display: this.state.editNameButton }}>
                        <h3>{this.capitalize(this.state.basicDetails.name)}</h3>
                      </div>
                      <img
                        alt=""
                        style={{ display: this.state.editNameButton }}
                        className="edit-name-icon"
                        onClick={(e) => {
                          this.setState({ editNameButton: "none" });
                          this.setState({ showText: "block" });
                        }}
                        src="//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/icon_edit-0d9b7d9307686accef07de74ec135cb0c9847bd4a0cd810eeccb730723bc5b5c.png"
                      ></img>
                    </div>

                    <div className="m-3" style={{ display: this.state.showText }}>
                      <form onSubmit={(e)=>{
                        e.preventDefault();
                        const data = {
                          emailId:localStorage.getItem('emailId'),
                          name:this.state.basicDetails.name,
                          phone:this.state.basicDetails.phone,
                          street:this.state.basicDetails.street,
                          city:this.state.basicDetails.city,
                          state:this.state.basicDetails.state,
                          country:this.state.basicDetails.country,
                          zipcode:this.state.basicDetails.zipcode
                        }
                        this.props.updateSellerDetails(data);
                        }
                      }
                        class="form-inline"
                        style={{ justifyContent: "center" }}
                      >
                        <input type="text" className="form-control" placeholder="New Name"
                        value = {this.state.basicDetails.name}
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({
                            basicDetails:{
                              ...oldState.basicDetails,
                              name:e.target.value
                            }
                           });
                        }}></input>
                        <input type="text" className="form-control" placeholder="Street Address"
                        required
                        value = {this.state.basicDetails.street} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({
                            basicDetails: {
                              ...oldState.basicDetails,
                              street:e.target.value
                            }
                           });
                        }}></input>
                        <input type="text" className="form-control" placeholder="City"
                        required
                        value = {this.state.basicDetails.city} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({ 
                            basicDetails:{
                              ...oldState.basicDetails,
                              city:e.target.value
                            }
                           });
                        }}></input>
                        <input type="text" className="form-control" placeholder="State"
                        required
                        value = {this.state.basicDetails.state} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({ 
                            basicDetails:{
                              ...oldState.basicDetails,
                              state:e.target.value
                            }
                           });
                        }}></input>
                        <input type="text" className="form-control" placeholder="Country"
                        required
                        value = {this.state.basicDetails.country} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({ 
                            basicDetails:{
                              ...oldState.basicDetails,
                              country:e.target.value
                            }
                           });
                        }}></input>
                        <input type="number" className="form-control" placeholder="ZipCode"
                        required
                        value = {this.state.basicDetails.zipcode} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({ 
                            basicDetails:{
                              ...oldState.basicDetails,
                              zipcode:e.target.value
                            }
                           });
                        }}></input>
                        <input type="number" className="form-control" placeholder="Phone"
                        required
                        value = {this.state.basicDetails.phone} 
                        onChange={(e) => {
                          e.preventDefault();
                          let oldState = this.state
                          this.setState({ 
                            basicDetails:{
                              ...oldState.basicDetails,
                              phone:e.target.value
                            }
                           });
                        }}></input>
                        <button className="btn btn-secondary ml-2">Cancel</button>
                        <input
                          type="submit"
                          className="btn sprite ml-1"
                          value="Save"
                        ></input>
                      </form>
                    </div>
                    <div style={{ display: this.state.editNameButton }}>
                      <h6>{this.capitalize(this.state.basicDetails.street)}</h6>
                      <h6>{this.capitalize(this.state.basicDetails.city)}, {this.capitalize(this.state.basicDetails.state)}, {this.capitalize(this.state.basicDetails.country)}, {this.capitalize(this.state.basicDetails.zipcode)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps,{ getSellerProfile, updateSellerProfilePicture, updateSellerDetails })(BasicProfile);