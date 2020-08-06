import moment from "moment";
import { randomColor } from "./../../../helpers/color";

//====================  Comparison Expenses  ======================

function SalesColumnData(xData, yData) {
  return {
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
  };
}

export const SalesDonutData = (donutData) => ({
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
      data: donutData,
    },
  ],
});

export const salesPlotter = (
  APIData,
  chartType,
  productType,
  productCategory,
  selectedProductsfromUI
) => {
  let selectedProducts = selectedProductsfromUI || [];

  let products = [];

  const data = APIData.filter((item) => item.newOrderQuantity);

  const formatedData = data.reduce((acc, value) => {
    if (productType !== 0 && productType !== value.type) return acc;

    // let includeProduct = (selectedProductsfromUI === undefined || selectedProductsfromUI.includes(value.id));
    // if(selectedProductsfromUI === undefined)
    // selectedProducts.push(value.id);

    // if(!includeProduct)
    // return acc;

    products.push({
      name: value.name,
      id: value.id,
      text: "",
      color: randomColor(),
      quantity: value.quantity,
    });

    const date = value.orderCreatedDate.toString();

    if (acc[date]) {
      acc[date] = acc[date] + value.newOrderQuantity;
      return acc;
    }
    acc[date] = value.newOrderQuantity;
    return acc;
  }, {});

  const xdata = Object.keys(formatedData).map((item) =>
    moment(item).format("YYYY-MM-DD")
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
