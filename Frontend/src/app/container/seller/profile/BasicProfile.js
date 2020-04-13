import React from 'react';
import './BasicProfile.css';
//import configPath from "./../../../../configApp";
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
    if(!this.props.sellerVisitingOwnProfile) {
      window.alert('Seller Visiting his profile');
      this.props.getSellerProfile({ emailId: localStorage.getItem('emailId') });
    } else {
      window.alert('Somebody else visiting seller profile');
      this.props.getSellerProfile({ emailId: this.props.sellerEmailId });
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('NextProps in SellerProfile.js');
    console.log(nextProps);
    if(nextProps.profile){
      const { profile } = nextProps;
      this.setState({
        basicDetails:profile
      }, () => {
        if (!this.props.sellerVisitingOwnProfile) {
          localStorage.setItem('profilePictureUrl', this.state.basicDetails.profilePictureUrl);
        }
      });
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
                        src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/ac0da431-c7a3-4385-91e4-874d495c7a1c._CR0,0,375,375_UX460_.jpg"
                        alt={this.state.basicDetails.profilePictureUrl}
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
                      <button className="btn btn-secondary">Upload</button>
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
                      <form onSubmit={this.updateName}
                        class="form-inline"
                        style={{ justifyContent: "center" }}
                      >
                        <input type="text" className="form-control"></input>
                        <button
                          className="btn btn-secondary ml-2"
                        >
                          Cancel
                        </button>
                        <input
                          type="submit"
                          className="btn sprite ml-1"
                          value="Save"
                          onChange={(e)=>{
                              e.preventDefault();
                              this.setState({editedName:e.target.value})
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ editNameButton: "block" });
                            this.setState({ showText: "none" });
                          }}
                        ></input>
                      </form>
                    </div>

                    <h6>New Delhi</h6>
                    <h6>Delhi</h6>
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