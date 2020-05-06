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
    let url = `/admin/analytics/report1/`;
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          let x = [];
          let y = [];
          response.data.adminReport1.map(({ count, count_date }) => {
            x.push(count_date);
            y.push(count);
          });
          this.setState({
            x: x,
            y: y,
          });
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
              x: this.state.x,
              y: this.state.y,
              type: "scatter",
              mode: "lines+markers",
              line: { color: "#febd69" },
            },
          ]}
          layout={{
            title: "Daily Orders",
            yaxis: { rangemode: "tozero", autorange: true },
          }}
        />
      </Card>
    );
  }
}

export default ProductContainer;
