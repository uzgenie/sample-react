import moment from "moment";

//====================  Comparison Expenses  ======================
export const salesAndProfitColumnData = (
  xDataSales,
  xDataExpenses,
  yDataSales,
  yDataExpenses
) => ({
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
    categories: xDataSales, // x axis names
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
      data: yDataSales,
    },
    {
      name: "P2",
      color: "#1ca",
      data: yDataExpenses,
    },
  ],
});

export const salesAndProfitAreaData = (
  xDataSales,
  xDataExpenses,
  yDataSales,
  yDataExpenses
) => ({
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
    labels: xDataSales,
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
    labels: yDataSales,
    //   {
    //     formatter: function () {
    //       return this.value / 1000 + "k";
    //     },
    //   },
  },
  tooltip: {
    pointFormat: "{series.name}  <b>{point.y:,.0f}</b><br/>{point.x}",
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
      name: "Sales",
      /// color:"",
      data: yDataSales,
    },
    {
      name: "Profit",
      color: "#ea5b5b",
      data: yDataExpenses,
    },
  ],
});

export const salesAndProfitPlotter = (APIData, chartType) => {
  APIData = APIData ? APIData : { sales: [], expenses: [] };
  const { sales, expenses } = APIData;
  console.log("this is the apiData in sales and expenses", APIData);
  const salesdata = sales.filter((item) => item.newOrderQuantity);
  const expensesdata = expenses.filter((item) => item.totalAmount);
  const formatedSalesData = salesdata.reduce((acc, value) => {
    const date = value.orderCreatedDate.toString();
    console.log("this si teh date", date);
    if (acc[date]) {
      acc[date] = acc[date] + value.newOrderQuantity;
      return acc;
    }
    acc[date] = value.newOrderQuantity;
    return acc;
  }, {});
  const formatedExpensesData = expensesdata.reduce((acc, value) => {
    const date = value.createdAt.toString();
    console.log("this si teh date", date);
    if (acc[date]) {
      acc[date] = acc[date] + value.totalAmount;
      return acc;
    }
    acc[date] = value.totalAmount;
    return acc;
  }, {});
  console.log("this is the formated Sales daTa", formatedSalesData);
  console.log("this is the formated Sales daTa", formatedExpensesData);
  const xDataSales = Object.keys(formatedSalesData).map((item) =>
    moment(item).format("YYYY-MM-DD")
  );
  const yDataSales = Object.values(formatedSalesData).map((item) =>
    item ? item : 0
  );

  const xDataExpenses = Object.keys(formatedExpensesData).map((item) =>
    moment(item).format("YYYY-MM-DD")
  );
  const yDataExpenses = Object.values(formatedExpensesData).map((item) =>
    item ? item : 0
  );

  let salesAndProfitDonut = JSON.parse(
    JSON.stringify(
      salesAndProfitAreaData(
        xDataSales,
        xDataExpenses,
        yDataSales,
        yDataExpenses
      )
    )
  );
  let salesAndProfitColumn = JSON.parse(
    JSON.stringify(
      salesAndProfitColumnData(
        xDataSales,
        xDataExpenses,
        yDataSales,
        yDataExpenses
      )
    )
  );

  let chartData =
    chartType === "area" ? salesAndProfitDonut : salesAndProfitColumn;
  let expensesSum = 0;
  let salesSum = 0;
  return { chartData, expensesSum, salesSum };
};
