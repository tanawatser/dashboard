import React, { Component } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class extends Component {
  render() {
    return (
      <div>
        <Backdrop
          open={this.props.status}
          style={{ zIndex: "999", color: "Menu" }}
        >
          {this.props.text ? (
            <>
              <CircularProgress color="inherit" />
              <h1>&nbsp;&nbsp;{this.props.text}</h1>
            </>
          ) : (
            <>
              <div className="box-loading">
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>

                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}
        </Backdrop>
      </div>
    );
  }
}
