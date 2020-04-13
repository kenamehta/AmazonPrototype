import React, { Component } from "react";

class Insights extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="col-6 p-0">
          <div class="card" align="center">
            <div class="card-body">
              <p
                style={{ fontSize: "16px", fontWeight: "500" }}
                class="card-title"
              >
                Insights
              </p>
              <div className="d-flex mt-3" style={{ justifyContent: "center" }}>
                <div className="mx-3" align="center">
                  <h5>5</h5>
                  <p>Helpful Votes</p>
                  <p>
                    <i>Public</i>
                  </p>
                </div>
                <div>
                  <h5>3</h5>
                  <p className="mt-1">Helpful Votes</p>
                  <p className="mt-1">
                    <i>Reviews</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
            
        </div>
      </div>
    );
  }
}

export default Insights;
