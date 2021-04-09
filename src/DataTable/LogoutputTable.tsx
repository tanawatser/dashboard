import React from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.darkblue.css";

import JqxGrid, {
  IGridProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
export default class LogoutTable extends React.PureComponent<any, IGridProps> {
  private myGrid = React.createRef<JqxGrid>();
  
  public render() {
    const columns: any =[
      {
        text: "ลำดับ",
        datafield: "id",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "รหัสสั่งสินค้า",
        datafield: "order_id",
        width: "25%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "ประเภท",
        datafield: "type",
        width: "25%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "สถานะการส่ง",
        datafield: "status",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
     
      {
        text: "วันที่รับเข้าระบบ",
        datafield: "date",
        width: "20%",
        align: "center",
        cellsalign: "center",
        editable: false,
        filterable:false

      },
     
    ]
    const source: any = {
      datafields: [
        { name: "id", type: "string" },
        { name: "order_id", type: "string" },
        { name: "type", type: "string" },
        { name: "status", type: "string" },
        { name: "date", type: "string" },
      ],
      sortcolumn:'date',
      sortdirection: 'desc',
      datatype: 'array',
      localdata:this.props.data
  };
      return (
        <JqxGrid
          ref={this.myGrid}
          width='99.8%'
          height='700px'
          source={new jqx.dataAdapter(source)}
          pageable={true}
          pagesizeoptions={[5,10,20,50,100]}
          pagesize={20}
          autoheight={false}
          columns={columns}
          theme="darkblue"
          editable={false}
          enabletooltips={false}
          selectionmode={'singlecell'}
          editmode={'click'}
          columnsresize={false}
          sortable={false}
          filterable={true}
          showfilterrow={true}
          />
      );
  }
}