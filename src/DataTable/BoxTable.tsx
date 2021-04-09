import React from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.darkblue.css";

import JqxGrid, {
  IGridProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
export default class BoxTable extends React.PureComponent<any, IGridProps> {
  private myGrid = React.createRef<JqxGrid>();
  public componentDidMount(): void {
    this.myGrid.current!.sortby('เลขแทร็คกิ้ง','desc');
  }
   
  public render() {
    const columns: any =[
      {
        text: "เลขแทร็คกิ้ง",
        datafield: "code",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
     
      {
        text: "จำนวนกล่องทั้งหมด",
        datafield: "box",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "จำนวนกล่องที่เข้าสู่ระบบ",
        datafield: "boxin",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "น้ำหนัก",
        datafield: "weight",
        width: "10%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "สินค้า",
        datafield: "items",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "สถานะการส่ง",
        datafield: "send",
        width: "10%",
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
        { name: "code", type: "string" },
        { name: "box", type: "string" },
        { name: "boxin", type: "string" },
        { name: "weight", type: "string" },
        { name: "items", type: "string" },
        { name: "send", type: "string" },
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