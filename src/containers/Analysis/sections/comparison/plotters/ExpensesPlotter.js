//====================  Comparison Expenses  ======================
export const ComparisonExpensesColumnData = {
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
      name: "One Time Bill",
      color: "#1cafbd",
      data: [],
    },
    {
      name: "Recurring Bill",
      color: "#0b065c",
      data: [],
    },
  ],
};

export const ComparisonExpensesPieData = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f} SAR</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "SAR",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} SAR",
      },
    },
  },
  series: [
    {
      name: "",
      colorByPoint: true,
      data: [
        {
          name: "One Time Bill",
          y: 0,
          color: "#1cafbd",
        },
        {
          name: "Recurring Bill",
          y: 0,
          color: "#0b065c",
        },
      ],
    },
  ],
};

export const expensesPlotter = (ExpensesAPIData, chartType, billType) => {
  // const formattedData = ExpensesAPIData.reduce((acc, value) => {});
  let recurringData = [],
    oneTimeBillData = [],
    XAxisData = [];

    

  let ComparisonExpensesColumn = JSON.parse(
    JSON.stringify(ComparisonExpensesColumnData)
  );
  let ComparisonExpensesPie = JSON.parse(
    JSON.stringify(ComparisonExpensesPieData)
  );
  ExpensesAPIData.forEach((item, index) => {
    if (item.type === "recurring") {
      recurringData.push(item.totalAmount);
    } else if (item.type === "oneTime") {
      oneTimeBillData.push(item.totalAmount);
    }
    const date = item.issueDate || item.createdAt;
    XAxisData.push(date);
  });

  let recurringSum = recurringData.reduce((a, b) => a + b, 0);
  let oneTimeBillSum = oneTimeBillData.reduce((a, b) => a + b, 0);

  ComparisonExpensesColumn["xAxis"]["categories"] = XAxisData;
  ComparisonExpensesColumn["series"][0]["data"] = oneTimeBillData;
  ComparisonExpensesColumn["series"][1]["data"] = recurringData;

  ComparisonExpensesPie["series"][0]["data"][0].y = oneTimeBillSum;
  ComparisonExpensesPie["series"][0]["data"][1].y = recurringSum;

  if (billType === "oneTime") {
    delete ComparisonExpensesColumn["series"][1];
    delete ComparisonExpensesPie["series"][0]["data"][1];
    recurringSum = null;
  } else if (billType === "recurringBill") {
    delete ComparisonExpensesColumn["series"][0];
    delete ComparisonExpensesPie["series"][0]["data"][0];
    oneTimeBillSum = null;
  }

  let chartData =
    chartType === "column" ? ComparisonExpensesColumn : ComparisonExpensesPie;

  return {
    chartData: chartData,
    recurringSum: recurringSum,
    oneTimeBillSum: oneTimeBillSum,
  };
};
