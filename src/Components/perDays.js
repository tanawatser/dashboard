import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default class PerDays extends React.Component {
  state = {
    dataDoughnut: {
      labels: ["จำนวนการสั่ง", "จำนวนที่ยกเลิก"],
      datasets: [
        {
          data: [300, 50,],
          backgroundColor: [
            "#46BFBD",
            "#F7464A",
  
          ],
          hoverBackgroundColor: [
            "#5AD3D1",
            "#FF5A5E",
       
          ],
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">ข้อมูลรายวัน</h3>
        <Doughnut
          data={this.state.dataDoughnut}
          options={{ responsive: true }}
        />
      </MDBContainer>
    );
  }
}
