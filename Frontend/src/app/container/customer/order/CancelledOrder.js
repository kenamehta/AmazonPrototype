import React, { Component } from 'react';
import OrderHeader from './OrderHeader'
import { connect } from "react-redux";
import { getCancelOrders } from "../../../../action/customerprofileaction/customerOrderAction";
import { Link } from "react-router-dom";

const _ = require("underscore");

class CancelledOrder extends Component {
    state = { 
        navarr:["#0066c0","#0066c0","black"],
        modifiedorderarray: []
     }
componentWillMount(){
    this.props.getCancelOrders()
}
     componentWillReceiveProps(nextProps) {
        console.log(nextProps)
          this.setState({
            modifiedorderarray: _.groupBy(nextProps.orders, "order_id"),
          },()=>{
          console.log(this.state.modifiedorderarray[1])
            console.log(Array.from(this.state.modifiedorderarray))
            for(var k in this.state.modifiedorderarray){
              console.log(this.state.modifiedorderarray[k])
            }
      
           
          });
        }



    render() { 

        const items=[]

for(let k in this.state.modifiedorderarray)
{
  items.push(
    <div>
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <div>
          {this.state.modifiedorderarray.length}
            <span
              className="m-0"
              style={{ fontWeight: "300", color: "#555" }}
            >
              Order Placed{" "}
            </span>
            <br />
            <span className="m-0" style={{ fontWeight: "300" }}>
              {" "}
              {this.state.modifiedorderarray[k][0]?this.state.modifiedorderarray[k][0].Order.createdAt.split("T")[0]:''}
            </span>
          </div>
          <div>
            {" "}
            <span
              className="m-0"
              style={{ fontWeight: "300", color: "#555" }}
            >
              Ship To{" "}
            </span>
            <br />
            <span
              className="m-0 link-color"
              style={{ fontWeight: "300" }}
            >
              {" "}
              {this.state.modifiedorderarray[k][0].customer_email_id}
            </span>
          </div>
          <div>
            {" "}
            <span
              className="m-0"
              style={{ fontWeight: "300", color: "#555" }}
            >
              Total{" "}
            </span>
            <br />
            <span className="m-0" style={{ fontWeight: "300" }}>
              {" "}
              ${this.state.modifiedorderarray[k][0].TotalPrice}
            </span>
          </div>
        </div>
    {this.state.modifiedorderarray[k].map(i=>(

    
        <div key={i._id} className="card-body">
         
          <div className="card-body d-flex justify-content-between">
          <div className='d-flex'>
          <div className="profile-at-product-image-container upload-photo">
                    <Link
                                className="name_style"
                                to={`/productPage/${i.Product_id}`}
                              >
                                 <img
                        alt=""
                        src={i.products.photos[0]}
                        className="profile-at-product-image"
                      />
                              </Link>
                      
                     
                    </div>
                    <div className="upload-photo">
                    <Link
                                className="name_style"
                                to={`/productPage/${i.Product_id}`}
                              >
                               <span className="mr-2">{i.products.productName}</span>
                               
                              </Link>
                     
              <div>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#555",
                  }}
                >
                  Sold by:{" "}
                  <span
                    className="upload-photo-order"
                    style={{ color: "#0066c0", fontSize: "15px" }}
                  >
                    {" "}
                    {i.products.sellerName}
                  </span>
                </span>
              </div>
              <div className="mt-3">
                <a
                  className="pb-2"
                  href="#!"
                  style={{ backgroundColor: "#e7e9ec" }}
                  className="btn btn upload-photo-order"
                >
                  <span>
                    {" "}
                    <ion-icon name="reload-outline"></ion-icon>
                  </span>
                  <Link
                                className="name_style"
                                to={`/productPage/${i.Product_id}`}
                              >
                              <span> Buy it again</span>
                               
                              </Link>
                 
                </a>
              </div>
            </div>
            </div>
            
          </div>
        </div>
        ))}
        <div className="card-footer link-color" style={{color:'blue'}}>Archive Order</div>
      </div>
    </div>
 )
}

        return ( 
            <div className='container'>
            <OrderHeader navarr={this.state.navarr}></OrderHeader>
            <b>{this.props.orders?this.props.orders.length:''} orders cancelled in past</b>
         
         {true?(
           <div>
          {items}
           </div>
         ) : (
           ""
         )}
            </div>
         );
    }
}
 
const mapStateToProps = (state) => {
    console.log(state);
    return {
      orders: state.customerOrderReducer.cancelorders,
      
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      getCancelOrders: () => dispatch(getCancelOrders()),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CancelledOrder);