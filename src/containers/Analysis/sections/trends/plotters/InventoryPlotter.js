//====================  Comparison Expenses  ======================
import moment from "moment";
export const inventoryColumnData = (xData = [], yData = []) => ({
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
    categories: xData, // x axis names
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
      data: yData,
    },
    // {
    //   name: "P2",
    //   color: "#1ca",
    //   data: [30],
    // },
  ],
});

export const inventoryAreaData = (xdata, ydata) => ({
  chart: {
    type: "area",
  },
  accessibility: {
    description: "",
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    allowDecimals: false,
    labels: xdata,
    // {
    //   formatter: function () {
    //     return this.value; // clean, unformatted number for year
    //   },
    // },
    accessibility: {
      rangeDescription: "",
    },
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      formatter: function () {
        return this.value / 1000 + "k";
      },
    },
  },
  tooltip: {
    pointFormat: "{series.name}  <b>{point.y:,.0f}</b><br/> {point.x}",
  },
  plotOptions: {
    area: {
      pointStart: 1940,
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
  },
  series: [
    {
      name: "Inventory",
      data: ydata,
    },
  ],
});

export const inventoryPlotter = (APIData = [], chartType) => {
  APIData = APIData ? APIData : [];
  const data = APIData.filter((item) => item.quantity && item.createdAt);
  const formatedData = data.reduce((acc, value) => {
    const date = value.createdAt.toString();
    if (acc[date]) {
      acc[date] = acc[date] + value.quantity;
      return acc;
    }
    acc[date] = value.quantity;
    return acc;
  }, {});
  const xdata = Object.keys(formatedData).map(
    (item) => item && moment(item).format("YYYY-MM-DD")
  );
  const ydata = Object.values(formatedData).map((item) => (item ? item : 0));

  let donutData = [];

  xdata.length &&
    xdata.forEach((item, index) => {
      let arr = [];
      arr[0] = item;
      arr[1] = ydata[index];
      donutData.push(arr);
    });

  let inventoryDonut = JSON.parse(
    JSON.stringify(inventoryAreaData(xdata, ydata))
  );
  let inventoryColumn = JSON.parse(
    JSON.stringify(inventoryColumnData(xdata, ydata))
  );

  let chartData = chartType === "area" ? inventoryDonut : inventoryColumn;

  return { chartData };
};
