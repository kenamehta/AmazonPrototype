import React, { Component } from 'react';

class OrderHeader extends Component {
    state = { 
      color:"red"
     }
    render() { 
        return ( <div>
              <h2 className='p-4' style={{fontWeight:"500"}}>Your Orders</h2>
       
       <div className=''>
       <nav className="navbar navbar-expand-lg navbar-light">
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>
 <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
   <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
     <li className="nav-item active mx-5">
       <a className="nav-link " href="/seller/order"  style={{color:this.props.navarr[0]}} >Orders <span className="sr-only"></span></a>
     </li>
     <li className="nav-item mx-5">
       <a className="nav-link link-color" style={{color:this.props.navarr[1]}} href="/seller/openorders"><span>Open orders</span></a>
     </li>
     <li className="nav-item mx-5">
       <a className="nav-link link-color" style={{color:this.props.navarr[2]}} href="/seller/cancelledorders"><span>Delivered and Cancelled orders</span></a>
     </li>
   </ul>
   
 </div>
</nav>
<hr/>
       </div>
        </div> );
    }
}
 
export default OrderHeader;