import React, { Component } from "react";
import API from "../Service/API";
import LoginputTable from "../DataTable/LogInputTable";
import LoginExport from "../ExportExcel/getInExport";
import Loading from "../Components/Loading";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../CSS/reportStyle.css";

export default class InputReport extends Component {
  constructor() {
    super();
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

    this.getLoginput();
  }

  getLoginput = () => {
    this.API.getLogin().then((value) => {
      this.dataReport(value);
    });
  };

  setTime = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  dataReport = (data) => {
    let total = data.data;
    let arr = [];
    for (let i = 0; i < total.length; i++) {
      let sp_time = total[i].date.split("T");
      total[i].date = sp_time[0];
      total[i].weight = total[i].weight + " kg";
      arr.push(total[i]);
    }

    this.setState({
      data_report: arr,
    });
    console.log(this.state.data_report);
  };

  getloginbydate = () => {
    if (this.state.time_start !== "" && this.state.time_stop !== "") {
      this.API.getLoginBydate(this.state.time_start, this.state.time_stop)
        .then((res) => {
          this.dataReport(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.getLoginput();
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
            onClick={this.getloginbydate}
          >
            ค้นหา
          </Button>

          <Button
            className="export-excel"
            variant="contained"
            style={{ width: "100px", height: "50%" }}
          >
            <LoginExport
              className="export-excel"
              data={this.state.data_report}
            />
          </Button>
          <div></div>
        </div>
        <LoginputTable data={this.state.data_report} />
      </>
    );
  }
}
