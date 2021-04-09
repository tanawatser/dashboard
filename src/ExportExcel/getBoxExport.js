import React, { Component } from "react";

import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import excelButton from "../Assets/Image/excel-button.png";
import "../CSS/reportStyle.css";
export default class getBoxExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getFullYear() +
        543,
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
        fileName={"Report_Box_order_วันที่ " + this.state.date + ".xlsx"}
        ref={(exporter) => {
          this._exporter = exporter;
        }}
      >
        <ExcelExportColumn field="code" title="เลขแทร็คกิ้ง" width={200} />
        <ExcelExportColumn field="send" title="สถานะการส่ง" width={100} />
        <ExcelExportColumn field="box" title="จำนวนกล่องทั้งหมด" width={120} />
        <ExcelExportColumn
          field="boxin"
          title="จำนวนกล่องที่เข้าสู่ระบบ"
          width={120}
        />
        <ExcelExportColumn field="weight" title="น้ำหนัก" width={100} />
        <ExcelExportColumn field="items" title="สินค้า" width={50} />
        <ExcelExportColumn field="date" title="เวลารับเข้าระบบ" width={100} />
      </ExcelExport>
    </div>
    )
    
  }
}
