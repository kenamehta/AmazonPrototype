import React from "react";
import { Card } from "react-bootstrap";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import configPath from "../../../../configApp";

const Plot = createPlotlyComponent(Plotly);
const date = new Date();
const currentYear = date.getFullYear();

class MonthlyProductSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      year: currentYear,
      totalPrice: [],
      totalQuantity: [],
    };
  }

  componentDidMount() {
    
    let sellerEmail = "";
    if (this.props.sellerVisitingOwnProfile) {
      
      sellerEmail = localStorage.getItem("emailId");
    } else {
      
      sellerEmail = this.props.sellerEmailId;
    }
    let url = `/seller/analytics/report2/` + sellerEmail;
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log('Response for monthly Product sales');
        console.log(response);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          let tp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          let tq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          response.data.results.map((result) => {
            this.state.months.map((month) => {
              if (month.toLowerCase() === result.month.toLowerCase()) {
                var i = this.state.months.indexOf(month);
                tp[i] = result.totalProductPrice;
                tq[i] = result.totalProductQuantity;
              }
            });
          });

          this.setState({
            year: (response.data.results.length>0)?response.data.results[0].year:currentYear,
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
      <Card style={{ width: "100%", margin: "0 200px", border: "none" }}>
        <Plot
          data={[
            {
              x: this.state.months,
              y: this.state.totalPrice,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "#f08804" },
              line: { width: "6" },
              yaxis: "y2",
              name: "Total Price",
              tickfont: { color: "#000000" },
            },
            {
              type: "bar",
              x: this.state.months,
              y: this.state.totalQuantity,
              name: "Total Quantity",
              marker: { color: "#232f3e" },
            },
          ]}
          layout={{
            margin: { l: 100, r: 200 },
            plot_bgcolor: "#ffffff",
            paper_bgcolor: "#d3d3d3",
            title: `MONTHLY PRODUCT SALES - ${this.state.year}`,
            titlefont: { color: "#000000", size: "24", family: "Arial" },
            autosize: true,
            xaxis: {
              tickfont: { color: "#000000", size: "16", family: "Arial" },
              showgrid: true,
            },
            yaxis: {
              title: "Total Quantity",
              titlefont: { color: "#000000", size: "16", family: "Arial" },
              tickfont: { color: "#000000", size: "16", family: "Arial" },
              showgrid: false,
              rangemode: "tozero",
            },
            yaxis2: {
              title: "Total Price",
              titlefont: { color: "#000000", size: "16", family: "Arial" },
              tickfont: { color: "#000000", size: "16", family: "Arial" },
              overlaying: "y",
              side: "right",
              showgrid: false,
              rangemode: "tozero",
            },
            legend: {
              font: { color: "#000000", size: "16", family: "Arial" },
              borderwidth: "3",
              bordercolor: "#000000",
              autosize: true,
            },
          }}
          config={{ responsive: true }}
        />
      </Card>
    );
  }
}

export default MonthlyProductSales;
