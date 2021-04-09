import InputReport from "./Pages/InputReport";
import BoxReport from "./Pages/BoxReport";
import OutputReport from "./Pages/OutputReport";
import Homepage from "./Pages/Homepage";
import IndexChart from './Components/indexChart';

const route = [
  {
    path: "/",
    exact: true,
    name: "Homepage",
    main: () => <Homepage />,
  },
  {
    path: "/getinputreport",
    name: "InputReport",
    main: () => <InputReport />,
  },
  {
    path: "/getboxreport",
    name: "BoxReport",
    main: () => <BoxReport />,
  },
  {
    path: "/getoutputreport",
    name: "OutputReport",
    main: () => <OutputReport />,
  },

];

export default route;
