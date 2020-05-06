import React from "react";
import { Card } from "react-bootstrap";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import configPath from "../../../../configApp";

const Plot = createPlotlyComponent(Plotly);

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [],
      y: [],
      z: [],
    };
  }

  componentDidMount() {
    let url = `/seller/analytics/report2/` + localStorage.getItem("emailId");
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.props.handleClose();
          alert("Successfully added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Card>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ title: "A Fancy Plot" }}
        />
      </Card>
    );
  }
}

export default ProductContainer;
