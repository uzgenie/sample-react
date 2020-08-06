//====================  Comparison Expenses  ======================
export const SalesColumnData = {
  chart: {
    type: "column",
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    categories: [], // x axis names
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} SAR</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: "P1",
      color: "#1cafbd",
      data: [10],
    },
    {
      name: "P2",
      color: "#1ca",
      data: [30],
    },
  ],
};

export const SalesDonutData = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  plotOptions: {
    pie: {
      innerSize: 200,
      depth: 45,
    },
  },
  series: [
    {
      name: "Products",
      data: [
        ["p1", 100],
        ["p2", 20],
      ],
    },
  ],
};

let products = [
  {id:"p1", name: "p1", value: 12, text: "abc", color: "orange" },
  {id:"p2", name: "p2", value: 14, text: "xyz", color: "green" },
];

export const salesPlotter = (
  APIData,
  chartType,
  productType,
  productCategory
) => {
  let SalesDonut = JSON.parse(JSON.stringify(SalesDonutData));
  let SalesColumn = JSON.parse(JSON.stringify(SalesColumnData));

  let chartData = chartType === "donut" ? SalesDonut : SalesColumn;

  return { chartData, products };
};
