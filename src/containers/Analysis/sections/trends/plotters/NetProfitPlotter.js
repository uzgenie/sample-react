//====================  Comparison Expenses  ======================
import moment from "moment";
export const NetProfitColumnData = (xdata, ydata) => ({
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
    categories: xdata, // x axis names
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
      name: "Profit Or Loss",
      color: "#1cafbd",
      data: ydata,
    },
  ],
});

export const NetProfitAreaData = (xdata, ydata) => ({
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
    labels: {
      formatter: function () {
        return this.value; // clean, unformatted number for year
      },
    },
    accessibility: {
      rangeDescription: "Range: 1940 to 2017.",
    },
  },
  yAxis: {
    title: {
      text: "Net Profit",
    },
    labels: xdata,
    // {
    //   formatter: function () {
    //     return this.value / 1000 + "k";
    //   },
    // },
  },
  tooltip: {
    pointFormat: "{series.name} {point.y:,.0f} {point.x}",
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
      name: "Net Profit",
      data: ydata,
    },
  ],
});

export const NetProfitPlotter = (APIData, chartType) => {
  APIData = APIData ? APIData : [];
  const data = APIData.filter((item) => item.createdAt);
  const formatedData = data.reduce((acc, value) => {
    const date = value.createdAt.toString();
    console.log("this si teh date", date);
    if (acc[date]) {
      acc[date] = acc[date] + value.netProfitOrLoss;
      return acc;
    }
    acc[date] = value.netProfitOrLoss;
    return acc;
  }, {});
  console.log("this is the formated daTa", formatedData);
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

  let NetProfitDonut = JSON.parse(
    JSON.stringify(NetProfitAreaData(xdata, ydata))
  );
  let NetProfitColumn = JSON.parse(
    JSON.stringify(NetProfitColumnData(data, ydata))
  );

  let chartData = chartType === "area" ? NetProfitDonut : NetProfitColumn;

  return { chartData };
};
