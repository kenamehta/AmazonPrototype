import React, { Component } from 'react';
import ProfilePic from './ProfilePic'
import  Insights from "./Insights";

class CustomerProfile extends Component {
    state = {  }
    render() { 
        return ( <div>
        <ProfilePic></ProfilePic>
        <Insights></Insights>
        </div> );
    }
}
 
export default CustomerProfile;