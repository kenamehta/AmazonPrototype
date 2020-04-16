import React, { Component } from "react";
import "../../../../style/ProfilePic.css";
class ProfilePic extends Component {
  state = {
    showeditpicbutton: "none",
    editnamebutton: "block",
    showText: "none",
    editedName: "",
    editedCity: "",
    editedState: "",
    selectedFile: ""
  };

  updateProfile = e => {
    console.log("in editing name");
    console.log(this.state.editedName);

    e.preventDefault();
    let data = {
      name: this.state.editedName,
      city: this.state.editedCity,
      state: this.state.editedState,
      email: localStorage.getItem("emailId")
    };
    this.props.updateProfile(data);
    this.setState({ editnamebutton: "block" });
    this.setState({ showText: "none" });
  };
  profileFileUploadHandler(e) {
    this.setState(
      {
        selectedFile: e.target.files[0]
      },
      () => {
        console.log(this.state.selectedFile);
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        {this.props.profileData.data ? (
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 col-md-offset-1 shadow_style">
                <div>
                  <div className="card">
                    <div align="center" className="m-2 ">
                      <div
                        className="circular-avatar-image m-3 image-edit-avatar"
                        onClick={e => {
                          this.setState({ showeditpicbutton: "block" });
                        }}
                      >
                        <img
                          src={
                            this.props.profileData.data.mainCustomer
                              .profilePictureUrl
                          }
                          alt=""
                          class="avatar-image"
                          style={{ "background-size": "contain" }}
                        />
                        <div className="image-edit-popover-trigger-holder">
                          <div>
                            <img
                              alt=""
                              src="//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/camera-desktop-4aba2c5ff428bad7bee93a2e61a2ad5128cbdd58b770618a1fd108abca1e2f31.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-3 mt-3"
                        style={{ display: this.state.showeditpicbutton }}
                      >
                        {/* <div className='a-popover-inner'>
                <div className='a-row'> */}
                        <Input
                          type="file"
                          name="profilePicture"
                          id="profilePicture"
                          accept="image/*"
                          onChange={e => {
                            this.setState(
                              { selectedFile: e.target.files[0] },
                              () => {
                                console.log(this.state.selectedFile);
                              }
                            );
                          }}
                        />
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            if (this.state.selectedFile === null) {
                              window.alert("Please select a file");
                            } else {
                              console.log(
                                "Uploading new seller profile picture"
                              );
                              const fd = new FormData();
                              fd.append("id", localStorage.getItem("ID"));
                              fd.append("file", this.state.selectedFile);
                              this.props.updateProfilePicture(fd);
                            }
                          }}
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                    {/* <div>
                    <span className="upload-photo">
                        Delete
                    </span>
                </div> */}

                    {/* </div>
               </div> */}

                    <div className="card-body " align="center">
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <div style={{ display: this.state.editnamebutton }}>
                          <h3>
                            {this.props.profileData.data.mainCustomer.name}
                          </h3>
                          <h6>New Delhi</h6>
                          <h6>Delhi</h6>
                        </div>
                        <img
                          alt=""
                          style={{ display: this.state.editnamebutton }}
                          className="edit-name-icon"
                          onClick={e => {
                            this.setState({ editnamebutton: "none" });
                            this.setState({ showText: "block" });
                          }}
                          src="//d1k8kvpjaf8geh.cloudfront.net/gp/profile/assets/icon_edit-0d9b7d9307686accef07de74ec135cb0c9847bd4a0cd810eeccb730723bc5b5c.png"
                        />
                      </div>

                      <div
                        className="m-3"
                        style={{ display: this.state.showText }}
                      >
                        <form
                          onSubmit={this.updateProfile}
                          class="form-inline"
                          style={{ justifyContent: "center" }}
                        >
                          <div className="col-9 m-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter name"
                              onChange={e => {
                                e.preventDefault();
                                this.setState({ editedName: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-9 m-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter City"
                              onChange={e => {
                                e.preventDefault();
                                this.setState({ editedCity: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-12 m-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter State"
                              onChange={e => {
                                e.preventDefault();
                                this.setState({ editedState: e.target.value });
                              }}
                            />
                          </div>
                          <div className="mt-3">
                            <button className="btn btn-secondary ml-2">
                              Cancel
                            </button>
                            <input
                              type="submit"
                              className="btn sprite ml-1"
                              value="Save"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ProfilePic;
