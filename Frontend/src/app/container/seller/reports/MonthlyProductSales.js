import React from "react";
import "./reports.css";
import { Card } from "react-bootstrap";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import configPath from "../../../../configApp";

const Plot = createPlotlyComponent(Plotly);

class MonthlyProductSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      month: [],
      year: [],
      totalPrice: [],
      totalQuantity: [],
    };
  }

  componentDidMount() {
    let url = `/seller/analytics/report2/` + localStorage.getItem("emailId");
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          let m = [];
          let y = [];
          let tp = [];
          let tq = [];
          response.data.results.map((result) => {
            m.push(result.month);
            y.push(result.year);
            tp.push(result.totalProductPrice);
            tq.push(result.totalProductQuantity);
          });

          this.setState({
            month: m,
            year: y,
            totalPrice: tp,
            totalQuantity: tq,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Card style={{ width: "80%", margin: "0 auto" }}>
        <Plot
          data={[
            {
              x: this.state.month,
              y: this.state.totalPrice,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              yaxis: "y2",
              name: "Total Price",
            },
            {
              type: "bar",
              x: this.state.month,
              y: this.state.totalQuantity,
              name: "Total Quantity",
            },
          ]}
          layout={{
            borderwidth: "5px",
            height: "500px",
            title: "Monthly Product Sales",
            autosize: true,
            xaxis: {
              title: "Months",
              showgrid: false,
            },
            yaxis: { title: "Total Quantity", showgrid: false },
            yaxis2: {
              title: "Total Price",
              titlefont: { color: "rgb(148, 103, 189)" },
              tickfont: { color: "rgb(148, 103, 189)" },
              overlaying: "y",
              side: "right",
              showgrid: false,
            },
          }}
          config={{ responsive: true }}
        />
      </Card>
    );
  }
}

export default MonthlyProductSales;
