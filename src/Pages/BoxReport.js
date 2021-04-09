import React, { Component } from "react";
import API from "../Service/API";

import BoxTable from "../DataTable/BoxTable";
import BoxExport from "../ExportExcel/getBoxExport";
import Loading from "../Components/Loading";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../CSS/reportStyle.css";
export default class BoxReport extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      loading: true,
      data_report: [],
      time_start: "",
      time_stop: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);

    this.getBox();
  }
  getBox = () => {
    this.API.getBox().then((value) => {
      this.boxReport(value);
    });
  };

  setTime = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  boxReport = (data) => {
    let total = data.data;
    let arr = [];
    for (let i = 0; i < total.length; i++) {
      let sp_time = total[i].date.split("T");
      total[i].date = sp_time[0];
      total[i].weight = total[i].weight + " kg";
      if (total[i].send === "true") {
        total[i].send = "สำเร็จ";
      } else if (total[i].send === "false") {
        total[i].send = "รอกล่องพัสดุ";
      }
      // console.log(total[i].send)
      arr.push(total[i]);
    }
    this.setState({
      data_report: arr,
    });
    // console.log(this.state.data_report);
  };

  getboxbydate = () => {
    if (this.state.time_start !== "" && this.state.time_stop !== "") {
      this.API.getboxbydate(this.state.time_start, this.state.time_stop).then(
        (res) => {
          this.boxReport(res);
        }
      );
    } else {
      this.getBox();
    }
  };
  render() {
    return (
      <>
        <Loading status={this.state.loading} />
        <div className="root-input">
          <div></div>

          <TextField
            className="item-input"
            id="date"
            label="วันเริ่มต้น"
            type="date"
            name="time_start"
            value={this.state.time_start}
            onChange={this.setTime}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            className="item-input"
            id="date"
            label="วันสิ้นสุด"
            type="date"
            name="time_stop"
            value={this.state.time_stop}
            onChange={this.setTime}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            className="item-input"
            style={{ width: "70px", height: "50%" }}
            variant="contained"
            onClick={this.getboxbydate}
          >
            ค้นหา
          </Button>

          <Button
            className="export-excel"
            variant="contained"
            style={{ width: "100px", height: "50%" }}
          >
            <BoxExport className="export-excel" data={this.state.data_report} />
          </Button>
          <div></div>
        </div>
        <BoxTable data={this.state.data_report} />
      </>
    );
  }
}
