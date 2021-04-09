import React from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.darkblue.css";


import JqxGrid, {
  IGridProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
export default class LogInputTable extends React.PureComponent<any, IGridProps> {
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
        text: "รหัสกล่อง",
        datafield: "code",
        width: "30%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "จำนวนกล่องทั้งหมด",
        datafield: "box",
        width: "10%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "น้ำหนักกล่อง",
        datafield: "weight",
        width: "15%",
        align: "center",
        cellsalign: "center",
        editable: false,
      },
      {
        text: "จำนวนสินค้าในกล่อง",
        datafield: "items",
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
        { name: "id", type: "string" },
        { name: "code", type: "string" },
        { name: "box", type: "string" },
        { name: "weight", type: "string" },
        { name: "items", type: "string" },
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