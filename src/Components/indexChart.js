import React, { Component } from "react";
import { io } from "socket.io-client";
import API from "../Service/API";

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Paper from "@material-ui/core/Paper";

import "../CSS/IndexChartStyle.css";
import TimePeriod from "./timePeriod";
import BeforeSevenDays from "./BeforeSevenDays";
import ErrCode from "./errCode";
const socket = io("http://172.18.0.135:5008");

export default class indexChart extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      data_request: [],
      data_report: [],
      data_tenorder: [],
      data_checkorderCancel: [],
      greater_one: [],
    };

    socket.on("udp", (data) => {
      this.setState({
        data_report: data[0],
      });
    });
  }

  componentDidMount() {
    socket.emit("server");

    this.greaterthanbox();
    this.calendar();
    this.dataRequest();
  }

  dataRequest = () => {
    let headSum3OBJ = [];
    let convertReq = "";
    let sliceLineSpaceReq = "";
    let reqHead = {};
    let doubleSliceAll = "";

    this.API.lastestOrder().then((req) => {
      // let regex = ('\n' , " ");
      for (let i = 0; i < req.data.length; i++) {
        // แก้ไขฟอร์ม text ให้เป็นฟอร์ม Str ที่ถูกต้อง
        convertReq = req.data[i].request;
        // console.log(convertReq);
        sliceLineSpaceReq = convertReq
          .replaceAll(/(?:\r\n|\r|\n)/g, " ")
          .replaceAll(/ /g, " ");

        let data1 = sliceLineSpaceReq.search("createordertime");
        let data2 = data1 - 1;
        let data3 = "{".concat(sliceLineSpaceReq.slice(data2));
        // console.log(data2.length);

        doubleSliceAll = data3.replaceAll('" TN', " Inch TN");
        // console.log(doubleSliceAll);
        // console.log(sliceLineSpaceReq);
        if (doubleSliceAll) {
          try {
            reqHead = JSON.parse(doubleSliceAll);
            // console.log(reqHead);
          } catch (err) {
            console.log(err); // error in the above string (in this case, yes)!
          }
        }

        headSum3OBJ.push({
          order_id: req.data[i].order_id,
          reqItems: reqHead.items[0].itemname,
          status: req.data[i].status,
          createTime: reqHead.createordertime.slice(11),
        });

        this.setState({
          data_request: headSum3OBJ,
        });
      }

      // console.log(this.state.data_request);
    });
  };

  greaterthanbox = () => {
    this.API.greaterthanbox().then((value) => {
      this.setState({
        greater_one: value.data,
      });
      // console.log(value);
    });
  };

  calendar = () => {
    let newDate = new Date().getMonth() + 1;

    if (newDate === 1) {
      return "มกราคม";
    } else if (newDate === 2) {
      return "กุมภาพันธ์";
    } else if (newDate === 3) {
      return "มีนาคม";
    } else if (newDate === 4) {
      return "เมษายน";
    } else if (newDate === 5) {
      return "พฤษภาคม";
    } else if (newDate === 6) {
      return "มิถุนายน";
    } else if (newDate === 7) {
      return "กรกฎาคม";
    } else if (newDate === 8) {
      return "สิงหาคม";
    } else if (newDate === 9) {
      return "กันยายน";
    } else if (newDate === 10) {
      return "ตุลาคม";
    } else if (newDate === 11) {
      return "พฤศจิกายน";
    } else if (newDate === 12) {
      return "ธันวาคม";
    } else {
      console.log("Month is error");
    }
  };

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="2" style={{ display: "grid" }}>
            <MDBRow>
              <MDBCol md="12">
                <Paper className="paper-dashboard">
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li>รายการวันนี้</li>
                    <li className="count-dashboard">
                      {this.state.data_report.boxofday}{" "}
                      <li style={{ fontSize: "18px", color: "#0f0" }}>
                        รายการ
                      </li>
                    </li>
                  </ul>
                </Paper>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <Paper className="paper-dashboard">
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li>รายการส่งสำเร็จ</li>
                    <li
                      className="count-dashboard"
                      style={{ fontSize: "50px" }}
                    >
                      {this.state.data_report.passorder}{" "}
                      <li style={{ fontSize: "18px", color: "#0f0" }}>
                        รายการ
                      </li>
                    </li>
                  </ul>
                </Paper>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <Paper className="paper-dashboard">
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li>รายการยกเลิก</li>
                    <li className="count-dashboard">
                      {this.state.data_report.ordercancel}{" "}
                      <li style={{ fontSize: "18px", color: "#0f0" }}>
                        รายการ
                      </li>
                    </li>
                  </ul>
                </Paper>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <Paper className="paper-dashboard">
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li>{this.calendar()}</li>
                    <li className="count-dashboard">
                      {new Intl.NumberFormat().format(
                        this.state.data_report.sendofmonth
                      )}
                      <li style={{ fontSize: "18px", color: "#0f0" }}>
                        รายการ
                      </li>
                    </li>
                  </ul>
                </Paper>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="10">
            <MDBRow>
              <MDBCol md="6">
                <Paper className="border-dash">
                  <BeforeSevenDays />
                </Paper>
              </MDBCol>

              <MDBCol md="6">
                <Paper className="border-dash">
                  <TimePeriod />
                </Paper>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <Paper className="border-dash" style={{ height: "49vh" }}>
                  <center>
                    <h5 style={{ color: "#33b5e5" }}>10 รายการล่าสุด</h5>
                  </center>

                  {this.state.data_request.map((dataReq, index) => {
                    // console.log(dataReq.status);
                    return dataReq.status ? (
                      <>
                        <tr>
                          <td style={{ fontSize: "15px", color: "#fff" }}>
                            {dataReq.order_id}
                          </td>

                          <td style={{ color: "#fff" }}>
                            &nbsp;&nbsp;:&nbsp;&nbsp;{" "}
                          </td>

                          <td
                            style={{
                              textAlign: "left",
                              fontSize: "15px",
                              color: "#fff",
                            }}
                          >
                            {dataReq.reqItems}
                          </td>
                          <td>&nbsp;</td>

                          <td
                            style={{
                              textAlign: "left",
                              fontSize: "15px",
                              color: "#0f0",
                            }}
                          >
                            {dataReq.createTime}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td
                            className="warning-orderID"
                            style={{ fontSize: "15px", color: "red" }}
                          >
                            {dataReq.order_id}
                          </td>
                          <td>&nbsp;</td>

                          <td
                            className="warning-orderID"
                            style={{ color: "red" }}
                          >
                            &nbsp;:{" "}
                          </td>
                          <td
                            className="warning-orderID"
                            style={{
                              textAlign: "left",
                              fontSize: "15px",
                              color: "red",
                            }}
                          >
                            {dataReq.reqItems}
                          </td>
                          <td>&nbsp;</td>

                          <td
                            className="warning-orderID"
                            style={{
                              textAlign: "left",
                              fontSize: "15px",
                              color: "red",
                            }}
                          >
                            {dataReq.createTime}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </Paper>
              </MDBCol>

              <MDBCol md="3">
                <Paper className="border-dash" style={{ height: "49vh" }}>
                  <center>
                    <h5 style={{ color: "#33b5e5" }}>ออเดอร์มากกว่า 1 กล่อง</h5>
                  </center>

                  {this.state.greater_one.map((greater, index) => {
                    return (
                      <>
                        <tr>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                          <td style={{ color: "#fff" }}>{greater.code}</td>
                          <td style={{ color: "#fff" }}>
                            &nbsp;&nbsp;:&nbsp;&nbsp;
                          </td>
                          <td style={{ color: "#fff" }}>จำนวน</td>
                          <td style={{ color: "#fff" }}>&nbsp;</td>
                          <td style={{ color: "#fff" }}>{greater.boxin}</td>
                          <td style={{ color: "#fff" }}>/</td>
                          <td style={{ color: "#fff" }}>{greater.box}</td>
                          <td style={{ color: "#fff" }}>&nbsp;</td>
                          <td style={{ color: "#fff" }}>กล่อง</td>
                        </tr>
                      </>
                    );
                  })}
                </Paper>
              </MDBCol>

              <MDBCol md="3">
                <Paper className="border-dash" style={{ height: "49vh" }}>
                  <center>
                    <h5 style={{ color: "#33b5e5" }}>ออเดอร์ที่พบปัญหา</h5>
                  </center>
                  {/* <ErrCode /> */}
                  <ErrCode />
                </Paper>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
