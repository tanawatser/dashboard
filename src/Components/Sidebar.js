import React, { Component } from "react";
import Authenlogin from "../Service/Authenlogin";

import { Link } from "react-router-dom";

import { Layout, Menu, Divider } from "antd";
import {
  ProjectOutlined,
  HomeOutlined,
  DropboxOutlined,
  FileDoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";

import Swal from "sweetalert2";
import "../CSS/Sidebar.css";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.Authenlogin = new Authenlogin();
    this.state = {
      profile: {},
      // collapsed: true,
    };
  }

  componentDidMount() {
    if (this.Authenlogin.loggedIn()) {
      let profile = this.Authenlogin.getProfile();
      this.setState({
        profile: profile,
      });
    }
  }

  // onCollapse = (collapsed) => {
  //   this.setState({ collapsed });
  // };

  Logout = () => {
    Swal.fire({
      title: "ต้องการออกจากระบบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        this.Authenlogin.logout();
        window.location.href = "/login";
      }
    });
  };
  render() {
    return (
      <>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">หน้าแรก</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/getinputreport">รายงานแพ็คกิง</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<DropboxOutlined />}>
            <Link to="/getboxreport">รายงานกล่องออเดอร์</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<FileDoneOutlined />}>
            <Link to="/getoutputreport">รายงานการจัดส่ง J&T</Link>
          </Menu.Item>

          <Divider />
          <Menu.Item
            onClick={this.Logout}
            key="5"
            icon={<LoginOutlined style={{ color: "red" }} />}
          >
            ออกจากระบบ
          </Menu.Item>
        </Menu>

      </>
    );
  }
}
