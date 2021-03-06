import React from "react";

import {
  PieChartFilled,
  PushpinTwoTone,
  BarChartOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Spin } from "antd";
import { BedayeahGraphs } from "./../../common/graphs";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import PinToDashboard from "./../../common/PinToDashboard";
import { useSelector } from "react-redux";

import { NetProfitPlotter } from "./plotters/NetProfitPlotter";
let sw1 = true;
function toggle() {
  sw1 = !sw1;
}

export const NetProfit = (props) => {
  let { getAPIData,chartOnly=false,graphType="area" } = props;
  let [chartType, chartTypeFun] = React.useState(graphType);
  let APIData = useSelector((state) => state.tredns.net_profit);
  let loading = APIData ? false : true;

  let { chartData } = NetProfitPlotter(APIData, chartType);

  if(chartOnly === true){
    return ( <BedayeahGraphs data={chartData}   />);
  }
  return (
    <Spin spinning={loading}>
      <Row gutter={20} className="generic-tabs-setting">
        <Col
          xl={{ span: 21 }}
          lg={{ span: 21 }}
          md={{ span: 21 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Form.Item className="name-field-full">
            <Row gutter={20}>
              <Col
                xl={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <TimeFrameSelect
                  getApiData={getAPIData}
                  Apitype="get_net_profit"
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="charts-icon text-right">
            <AreaChartOutlined
              onClick={() => chartTypeFun("area")}
              style={{ marginRight: "10px" }}
              className={sw1 ? "active-border" : ""}
            />
            <BarChartOutlined
              onClick={() => chartTypeFun("column")}
              className={sw1 ? "active-border" : ""}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col
          xl={{ span: 24 }}
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <BedayeahGraphs data={chartData} />
        </Col>
      </Row>
      <Row gutter={20} className="mg-top-24">
        <Col
          xl={{ span: 16 }}
          lg={{ span: 16 }}
          md={{ span: 16 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <PinToDashboard type="net_profit" chartType={chartType} />
        </Col>
      </Row>
    </Spin>
  );
};
