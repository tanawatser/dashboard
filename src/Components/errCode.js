import React, { Component } from "react";
import API from "../Service/API";
import { MDBRow, MDBCol } from "mdbreact";
import ReturnCode from "../Components/returnCode.json";

export default class errCode extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      statusErrorCode: [],
      returnCodeName: [],
    };
  }
  componentDidMount() {
    this.errCodeName();
  }
  errCodeName = () => {
    let convert2Res = "";
    let dataResponse = [];

    this.API.errcode().then((err) => {
      for (let i = 0; i < err.data.length; i++) {
        convert2Res = JSON.parse(err.data[i].response);

        dataResponse.push({
          reasonCode: convert2Res.responseitems[0].reason,
          orderID: err.data[i].order_id,
        });
        this.errReturnCode(dataResponse);
      }
      // console.log(this.state.statusErrorCode);
    });
  };

  errReturnCode = (arr1) => {
    // console.log(arr1);
    let arr = arr1;
    let arrJson = ReturnCode.returnCode;
    let data = [];
    arr.forEach((se) => {
      let data1 = arrJson.find((i) => i.Code === se.reasonCode);
      if (data1) {
        data.push({ orderId: se.orderID, TextErr: data1.Err });
      }
      this.setState({
        statusErrorCode: data,
      });
      // console.log(this.state.statusErrorCode);
    });
  };
  render() {
    return (
      <div>
        <MDBRow>
          <MDBCol size="6" md="12">
            {this.state.statusErrorCode.map((order_problem, index) => {
              return (
                <>
                  <tr>
                    <td style={{ color: "red", fontSize: "16px" }}>
                      {order_problem.orderId}
                    </td>
                    <td style={{ color: "red" }}>&nbsp;&nbsp;:&nbsp;&nbsp;</td>
                    <td style={{ color: "red", fontSize: "16px" }}>
                      {order_problem.TextErr}
                    </td>
                  </tr>
                </>
              );
            })}
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
