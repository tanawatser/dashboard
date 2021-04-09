import React, { Component } from "react";

import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import excelButton from "../Assets/Image/excel-button.png";
import "../CSS/reportStyle.css";

export default class getInExport extends Component {
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
    return (
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
          fileName={"Report_Packing_วันที่ " + this.state.date + ".xlsx"}
          ref={(exporter) => {
            this._exporter = exporter;
          }}
        >
          <ExcelExportColumn field="id" title="เลขที่" width={50} />
          <ExcelExportColumn field="code" title="รหัสกล่อง" width={200} />
          <ExcelExportColumn
            field="box"
            title="จำนวนกล่องทั้งหมด"
            width={100}
          />
          <ExcelExportColumn
            field="items"
            title="จำนวนสินค้าในกล่อง"
            width={100}
          />
          <ExcelExportColumn field="weight" title="น้ำหนักกล่อง" width={100} />
        </ExcelExport>
      </div>
    );
  }
}
