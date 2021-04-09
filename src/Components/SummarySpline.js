import React from "react";
import API from "../Service/API";

import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default class SummarySpline extends React.Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      dataAPI: [],
    };
  }
  componentDidMount() {
    this.summaryOfmonth();
  }

  summaryOfmonth = () => {
    const monthNull = [];
    let sum = [];
    let varibleDataSetstate = [];
    monthNull.push({ month: 1, count: 0 });
    this.API.summaryorder().then((value) => {
      for (let i = 0; i < value.data.length; i++) {
        varibleDataSetstate = [...varibleDataSetstate, value.data[i]];
      }
      // console.log(monthNull);
      // console.log(varibleDataSetstate);
      sum = monthNull.concat(varibleDataSetstate);
      // console.log(sum);

      for (let i = 0; i < sum.length; i++) {
        this.setState({
          dataAPI: [...this.state.dataAPI,sum[i].count],
        });
      }
    });
  };

  render() {
    // console.log(this.state.dataAPI);

    const dataBar = {
      labels: [
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์",
        "วันอาทิตย์",
       
      ],
      datasets: [
        {
          label: "จำนวนส่งแต่ละวัน",
          data: this.state.dataAPI,
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
          ],
        },
      ],
    };
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <MDBContainer>
        <h3 className="mt-4">ยอดส่งย้อนหลัง 7 วัน</h3>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    );
  }
}
