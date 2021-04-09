import React, { Component } from "react";
import Loading from "../Components/Loading";
import { Clock, Box } from "grommet";

import {
  MDBRow,
  MDBCol,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBLink,
  MDBNavbarNav,
} from "mdbreact";

import PerDays from "../Components/perDays";
import PerWeeks from "../Components/perWeeks";
import PerMonth from "../Components/perMonth";
import PerYears from "../Components/perYears";
import IndexChart from "../Components/indexChart";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data_report: [],

      activeItemPills: "1",

      dataBar: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "% of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
            ],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);
  }

  togglePills = (tab) => () => {
    const { activePills } = this.state;
    if (activePills !== tab) {
      this.setState({
        activeItemPills: tab,
      });
    }
  };

  render() {
    const { activeItemPills } = this.state;
    return (
      <div>
        <Loading status={this.state.loading} />

        <MDBRow>
          <MDBCol md="12">
            <MDBNav
              className="nav-pills"
              style={{ margin: "1.5rem", height: "70px", alignItems: "center" }}
            >
              <MDBNavItem>
                <MDBLink
                  active={activeItemPills === "1"}
                  onClick={this.togglePills("1")}
                >
                  หน้าแรก
                </MDBLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBLink
                  active={activeItemPills === "2"}
                  onClick={this.togglePills("2")}
                >
                  รายปี
                </MDBLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBLink
                  active={activeItemPills === "3"}
                  onClick={this.togglePills("3")}
                >
                  รายเดือน
                </MDBLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBLink
                  active={activeItemPills === "4"}
                  onClick={this.togglePills("4")}
                >
                  รายสัปดาห์
                </MDBLink>
              </MDBNavItem>

              <MDBNavItem>
                <MDBLink
                  active={activeItemPills === "5"}
                  onClick={this.togglePills("5")}
                >
                  รายวัน
                </MDBLink>
              </MDBNavItem>

              <MDBNavbarNav right>
                <MDBNavItem>
                  <Clock type="digital" style={{ color: "#007bff" }} />
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBNav>
            <MDBTabContent activeItem={activeItemPills}>
              <MDBTabPane tabId="1">
                <IndexChart />
              </MDBTabPane>

              <MDBTabPane tabId="2">
                <PerYears />
              </MDBTabPane>

              <MDBTabPane tabId="3">
                <PerMonth />
              </MDBTabPane>

              <MDBTabPane tabId="4">
                <PerWeeks />
              </MDBTabPane>

              <MDBTabPane tabId="5">
                <PerDays />
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
