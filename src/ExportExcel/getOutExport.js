import React, { Component } from "react";

import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import excelButton from "../Assets/Image/excel-button.png";
import "../CSS/reportStyle.css";

export default class getOutExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        (new Date().getFullYear() + 543),
    };
  }

  _exporter;
  export = () => {
    this._exporter.save();
  };
  render() {
    return(
      <div>
      <img
        alt=""
        className="export-excel"
        src={excelButton}
        style={{ width: "100px" }}
        onClick={this.export}
      />

      <ExcelExport
        data={this.props.data}
        fileName={"Report_J&T_วันที่ " + this.state.date + ".xlsx"}
        ref={(exporter) => {
          this._exporter = exporter;
        }}
      >
        <ExcelExportColumn field="id" title="เลขที่" width={50} />
        <ExcelExportColumn
          field="order_id"
          title="รหัสสั่งสินค้า"
          width={200}
        />
        <ExcelExportColumn field="type" title="ประเภท" width={100} />
        <ExcelExportColumn field="status" title="สถานะ" width={100} />
        <ExcelExportColumn field="date" title="เวลารับเข้าระบบ" width={100} />
      </ExcelExport>
    </div>
    )
   
  }
}
