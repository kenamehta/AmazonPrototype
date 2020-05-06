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
    };
  }

  componentDidMount() {
    let url = `/admin/analytics/report3/`;
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          let x = [];
          let y = [];
          response.data.adminReport3.map(({ sales, sellerName }) => {
            x.push(sellerName);
            y.push(sales);
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
    console.log(this.state);
    return (
      <Card>
        <Plot
          data={[
            {
              x: this.state.x,
              y: this.state.y,
              type: "bar",
              marker: {
                color: "#232f3e",
              },
            },
          ]}
          layout={{ title: "Top 5 sellers based on sale amount" }}
        />
      </Card>
    );
  }
}

export default ProductContainer;
