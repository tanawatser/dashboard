import React, { Component } from "react";
import Authenlogin from "../Service/Authenlogin";
import API from "../Service/API";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

import LogoJIB from "../Assets/Image/Logo_Login.png";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import "../CSS/background.css";

export default class Loginsystem extends Component {
  constructor(props) {
    super(props);
    this.Authenlogin = new Authenlogin();
    this.API = new API();

    this.state = {
      open: false,
      program_name: "Logistics Report",
      username: "",
      password: "",
      
    };
  }

  componentDidMount() {
    if (this.Authenlogin.loggedIn()) {
      window.location.href = "/";
      this.setState({
        open: true,
      });
    }
  
  
  }

  setVal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  OnSubmit = () => {
    this.setState({ open: true });
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        open: false,
        username: "",
        password: "",
      });
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "กรุณากรอกรหัสพนักงานและรหัสผ่านให้ครบถูกต้อง",

        icon: "error",
        timer: 5000,
      });
    } else {
      this.Authenlogin.login(this.state.username, this.state.password).then(
        (res) => {
          // console.log(res);
          if (res.accessapp) {
            setTimeout(() => {
              this.setState({ open: false });
              window.location.href = "/";
            }, 500);
          } else {
            this.setState({
              open: false,
              username: "",
              password: "",
            });
            Swal.fire({
              title: "พบข้อผิดพลาด!",
              text:
                "หากท่านเข้าใช้งานไม่ได้หรือลืมรหัสผ่าน กรุณาติดต่อเจ้าหน้าที่ MIS",
              icon: "error",
              timer: 10000,
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <>
        <Loading status={this.state.open} />
        <div className="background-login">
          <Grid container>
            <Grid item xl={4} lg={4} md={3} sm={2} xs={12}></Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={6}
              sm={8}
              xs={12}
              style={{ paddingTop: "50px" }}
            >
              <center>
                <MDBCard
                  className="mdb-card-login"
                  style={{
                    width: "80%",
                    borderRadius: "20px",
                    // backgroundColor: [Config.color],
                    // opacity: "0.8",
                  }}
                >
                  <div
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      paddingLeft: "5px",
                    }}
                  >
                    <center>
                      <img
                        src={LogoJIB}
                        alt=""
                        width="300px"
                        style={{ paddingTop: "40px" }}
                      />
                    </center>
                  </div>
                  <br />
                  <div style={{ paddingBottom: "25px" }}></div>
                  <MDBCardBody
                    style={{
                      backgroundColor: "#9e9e9e",
                      opacity: "0.8",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ padding: "25px" }}
                    >
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "35px",
                          // padding: "35px",
                        }}
                      >
                        {this.state.program_name}
                      </span>
                    </Typography>
                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label="รหัสพนักงาน"
                        autoComplete="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.setVal}
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) {
                            this.OnSubmit();
                          } else {
                            console.log("pls fix code in loginsystem.js");
                          }
                        }}
                      />
                    </div>
                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="รหัสผ่าน"
                        type="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.setVal}
                        onSubmit={this.OnSubmit}
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) {
                            this.OnSubmit();
                          } else {
                            console.log("pls fix code in loginsystem.js");
                          }
                        }}
                      />
                    </div>

                    <MDBBtn
                      color="primary"
                      style={{
                        color: "#fff",
                        borderRadius: "5px",
                        fontSize: "16px",
                        margin: "20px",
                        padding: "10px",
                      }}
                      onClick={this.OnSubmit}
                    >
                      เข้าสู่ระบบ
                    </MDBBtn>
                  </MDBCardBody>
                  <span style={{ opacity: "0.6", color: "#000" }}>
                    JIB Logistics Report Version 1.0
                  </span>
                </MDBCard>
              </center>
            </Grid>
            <Grid item xl={4} lg={4} md={3} sm={2} xs={12}></Grid>
          </Grid>
        </div>
      </>
    );
  }
}
