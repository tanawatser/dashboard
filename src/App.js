import React, { Component } from "react";
import { Layout } from "antd";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authenlogin from "./Service/Authenlogin";
import Loginsystem from "./Pages/Loginsystem";
import PathRoute from "./Route";

import Sidebar from "./Components/Sidebar";
import "./App.css";
import LogoSm from "./Assets/Image/logo-sm.png";
import LogoBig from "./Assets/Image/logo.png";

const { Content, Sider } = Layout;


class App extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ 
      collapsed : !this.state.collapsed
    });
  };

  render() {
    const Auth = new Authenlogin();
    const { collapsed } = this.state;
    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          {Auth.loggedIn() ? (
            <Router>
                 
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}
              >
                  <img
              src={this.state.collapsed ? LogoSm : LogoBig}
              className={this.state.collapsed ? "logoSm" : "logoBig"}
            />
                <Sidebar />
              </Sider>
              <>
                <Layout className="site-layout">
                  <Content className="site-layout">
                  <Switch>
                  {PathRoute.map((PathRoute, index) => {
                    return (
                      <Route
                        key={index}
                        path={PathRoute.path}
                        exact={PathRoute.exact}
                        children={<PathRoute.main />}
                      />
                    );
                  })}
                </Switch>
                  </Content>
                </Layout>

               
              </>
            </Router>
          ) : (
            <Loginsystem />
          )}
        </Layout>
      </>
    );
  }
}

export default App;
