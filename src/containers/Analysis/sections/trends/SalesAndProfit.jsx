import React from "react";

import {
  PieChartFilled,
  BarChartOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Spin } from "antd";
import { BedayeahGraphs } from "./../../common/graphs";
import { useSelector } from "react-redux";

import { _ } from "../../../../helper/helper";
import PinToDashboard from "./../../common/PinToDashboard";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import { salesAndProfitPlotter } from "./plotters/salesAndProfitPlotter";

export const SalesAndProfit = (props) => {
  let { getAPIData,chartOnly=false,graphType="area" } = props;
  let [chartType, chartTypeFun] = React.useState(graphType);

  let APIData = useSelector((state) => state.tredns.sale_and_profit);
  let loading = APIData ? false : true;
 
  let { chartData,expensesSum,salesSum} = salesAndProfitPlotter(APIData, chartType);

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
                  Apitype="get_sale_and_profit"
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
          <Form.Item className="name-field-full">
            <div className="charts-icon text-right">
              <AreaChartOutlined
                onClick={() => chartTypeFun("area")}
                style={{ marginRight: "10px" }}
              />
              <BarChartOutlined onClick={() => chartTypeFun("column")} />
            </div>
          </Form.Item>
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
          <PinToDashboard type="expenses" chartType={chartType} />
        </Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Row>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <div className="graph-text text-center">
                <p>
                  <span className="small-square light-blue-bg"></span>
                  <strong>{_("Sales", "en")}</strong>
                </p>
                <span>
                  {salesSum}
                  {_("SAR", "en")}
                </span>
              </div>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <div className="graph-text text-center">
                <p>
                  <span className="small-square red-bg"></span>
                  <strong> {_("Expenses", "en")} </strong>
                </p>
                <span>
                  {expensesSum} {_("SAR", "en")}
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
