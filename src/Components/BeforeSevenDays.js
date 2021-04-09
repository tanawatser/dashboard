import React from "react";
import API from "../Service/API";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default class BeforeSevenDays extends React.Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      dataBefore7days: [],
      date7days: [],
    };
  }
  componentDidMount() {
    this.beforeSevenDays();
    this.dateDays();
  }

  beforeSevenDays = () => {
    this.API.beforesevendays().then((dataDays) => {
      for (let i = 0; i < dataDays.data.length; i++) {
        this.setState({
          dataBefore7days: [
            ...this.state.dataBefore7days,
            dataDays.data[i].count,
          ],
        });
      }
    });
  };

  dateDays = () => {
    this.API.beforesevendays().then((everyDays) => {
   
      for (let i = 0; i < everyDays.data.length; i++) {
        // console.log(everyDays);
        this.setState({
          date7days: [...this.state.date7days, everyDays.data[i].date],
        });
      }
    });
  };

  render() {
    const dataBar = {
      labels: this.state.date7days,

      datasets: [
        {
          label: "จำนวนการจัดส่งแต่ละวัน",
          data: this.state.dataBefore7days,

          backgroundColor: [
            "rgba(255, 20,147,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
            "rgba(255, 0,0,0.4)",
          ],
          borderWidth: 3,
          borderColor: [
            "rgba(255, 20, 147, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
            "rgba(255, 0, 0, 1)",
          ],
        },
      ],
    };
    const barChartOptions = {
      legend: {
        labels: {
          fontColor: "#fff",
        },
      },
      scales: {
        xAxes: [
          {
            barPercentage: 1,
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
            gridLines: {
              display: true,
              color: "rgba(255, 255, 255, 0.2)",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "white",
              stepSize: 20,
              max: 100,
            },
          },
        ],
      },
    };
    return (
      <MDBContainer>
        <h5 style={{ color: "#33b5e5" }}>ข้อมูลการส่งย้อนหลัง 7 วัน</h5>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    );
  }
}
