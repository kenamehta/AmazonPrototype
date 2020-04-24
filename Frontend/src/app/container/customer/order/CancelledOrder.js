import React, { Component } from 'react';
import OrderHeader from './OrderHeader'

class CancelledOrder extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='container'>
            <OrderHeader/>
            </div>
         );
    }
}
 
export default CancelledOrder;