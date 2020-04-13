import React from 'react';
import BasicProfile from './BasicProfile';
import { connect } from 'react-redux';

class SellerProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    let sellerVisitingOwnProfile = true;
    if(this.props.match.params.id){
      sellerVisitingOwnProfile = false;
    }
    return(
      <div>
        <div>
          <BasicProfile sellerVisitingOwnProfile = {sellerVisitingOwnProfile} sellerEmailId = {this.props.match.params.id}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.user,
});

export default connect(mapStateToProps,{ })(SellerProfile);