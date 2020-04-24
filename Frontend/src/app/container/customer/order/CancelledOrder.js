import React, { Component } from 'react';
import OrderHeader from './OrderHeader'

class CancelledOrder extends Component {
    state = { 
        navarr:["#0066c0","#0066c0","black"]
     }
    render() { 
        return ( 
            <div className='container'>
            <OrderHeader navarr={this.state.navarr}></OrderHeader>
            </div>
         );
    }
}
 
export default CancelledOrder;