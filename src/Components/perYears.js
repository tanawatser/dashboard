import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default class PerYears extends React.Component {
  state = {
    dataLine: {
      labels: ["2550", "2551", "2552","2553", "2554", "2555", "2556" ,"2557","2558","2559","2560","2561","2562","2563","2564"],
      datasets: [
        {
          label: "จำนวนรายการสั่ง",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 56, 55, 40,],
        },
        {
          label: "จำนวนรายการยกเลิก",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [10, 18, 10, 19, 16, 19, 10,10, 15, 16, 17, 10,16, 19, 15],
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">ข้อมูลรายปี</h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}
