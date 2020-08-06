import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts);

export const BedayeahGraphs = (props) => {
  let { type = "donut", data = [] } = props;
  if (data.length === 0) {
    return <></>;
  }

  return <HighchartsReact highcharts={Highcharts} options={data} />;
};
