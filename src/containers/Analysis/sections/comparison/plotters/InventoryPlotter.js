//====================  Comparison Expenses  ======================
import moment from "moment";
import { randomColor } from "./../../../helpers/color";
export const SalesColumnData = (xData = [], yData = []) => ({
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
  ],
});

export const SalesDonutData = (data) => ({
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
      data: data,
    },
  ],
});

export const InventoryPlotter = (
  APIData,
  chartType,
  category,
  productStatus
) => {
  let products = [],
    selectedProducts = [];
  const data = APIData.filter((item) => item.quantity && item.createdAt);
  const formatedData = data.reduce((acc, value) => {
    if (productStatus !== 0 && value.status !== productStatus) return acc;

    const date = value.createdAt.toString();
    products.push({
      name: value.name,
      id: value.id,
      text: "",
      color: randomColor(),
      quantity: value.quantity,
    });
    selectedProducts.push(value.id);
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

  let SalesDonut = JSON.parse(JSON.stringify(SalesDonutData(donutData)));
  let SalesColumn = JSON.parse(JSON.stringify(SalesColumnData(xdata, ydata)));

  let chartData = chartType === "donut" ? SalesDonut : SalesColumn;

  return { chartData, products, selectedProducts };
};
