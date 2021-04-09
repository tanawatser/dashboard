import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import API from "../Service/API";

import ChkTime from "./timePeriodCheck.json";

export default class timePeriod extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      countOfItems: [],
      sumOrderPeriod: [],
      time: [],
      label: [
        "08.00",
        "09.00",
        "10.00",
        "11.00",
        "12.00",
        "13.00",
        "14.00",
        "15.00",
        "16.00",
        "17.00",
        "18.00",
      ],

      date:
        new Date().getDate +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        (new Date().getFullYear() + 543),
    };
  }

  componentDidMount() {
    this.dataPeriodAPI();
  }

  dataPeriodAPI = () => {
    let chktime = ChkTime.time;
    let periodTime = [];
    // console.log(chktime);
    this.API.timeperiodHr().then((objPeriod) => {
      let periodTime1 = [];
      for (let i = 0; i < objPeriod.data.length; i++) {
        periodTime1 = [...periodTime1, objPeriod.data[i]];
        // console.log(objPeriod.data[i].countOfItems);
      }

      periodTime = periodTime1;
      // console.log(periodTime);
      let data = [];
      chktime.forEach((se) => {
        let data1 = periodTime.find((i) => i.timeOclock === se.timeOclock);
        if (data1) {
          data.push(data1.countOfItems);
        } else {
          // console.log(data);
          data.push(0);
        }
      });

      // console.log(data);
      this.setState({
        countOfItems: data,
      });
    });

    // console.log(periodTime);
  };

  render() {
    const options = {
      legend: {
        labels: {
          fontColor: "#fff",
        },
      },

      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "white",
            },
            gridLines: {
              display: true,
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "white",
              stepSize: 20,
              max: 100,
            },
            gridLines: {
              display: true,
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
        ],
      },
    };
    const dataLine = {
      labels: this.state.label,

      datasets: [
        {
          label: "จำนวนการส่ง / ชั่วโมง",

          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, 0.2)",
          borderColor: "#33b5e5",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,158)",
          pointBorderColor: "rgb(255, 26, 136)",
          borderWidth: 3,
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.countOfItems,
        },
      ],
    };

    return (
      <MDBContainer>
        <h5 style={{ color: "#33b5e5" }}>ข้อมูลการส่งแต่ละชั่วโมง</h5>
        <div className="time-period">
          <Line data={dataLine} options={options} />
        </div>
      </MDBContainer>
    );
  }
}
