import React, { useState } from "react";

import { useSelector } from "react-redux";

import { expensesPlotter } from "./plotters/ExpensesPlotter";
import { PieChartFilled, BarChartOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Select, Spin } from "antd";
import { BedayeahGraphs } from "./../../common/graphs";
import { _ } from "../../../../helper/helper";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import PinToDashboard from "./../../common/PinToDashboard";

const { Option } = Select;

export const Expernses = (props) => {
  let { getAPIData, chartOnly = false, graphType = "column" } = props;

  let [chartType, chartTypeFun] = useState(graphType);
  let [billType, billTypeFun] = useState("AllBills");

  let ExpensesAPIData = useSelector((state) => state.comparison.expenses);
  let loading = ExpensesAPIData ? false : true;

  ExpensesAPIData = ExpensesAPIData ? ExpensesAPIData : [];

  let { chartData, recurringSum, oneTimeBillSum } = expensesPlotter(
    ExpensesAPIData,
    chartType,
    billType
  );

  if (chartOnly === true) {
    return <BedayeahGraphs type={chartType} data={chartData} />;
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={20} className="generic-tabs-setting">
        <Col
          xl={{ span: 6 }}
          lg={{ span: 6 }}
          md={{ span: 6 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Form.Item className="name-field-full">
            {chartType !== "pie" && (
              <Select
                defaultValue={billType}
                style={{ width: "100%" }}
                onChange={(type) => {
                  billTypeFun(type);
                }}
              >
                <Option value="AllBills">{_("All Bills", "en")}</Option>
                <Option value="recurringBill">
                  {_("Recurring Bills", "en")}
                </Option>
                <Option value="oneTime">{_("One time Bills", "en")}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col
          xl={{ span: 6 }}
          lg={{ span: 6 }}
          md={{ span: 6 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Form.Item className="name-field-full">
            <TimeFrameSelect getApiData={getAPIData} Apitype="get_expenses" />
            {/* <Select
              defaultValue={interval}
              style={{ width: "100%" }}
              onChange={(type)=>{intervalFun(type); let temp  = type.split("-");  getExpenses(temp[0],parseInt(temp[1]))   }}
            >
              <Option value="day-0">Today</Option>
              <Option value="day-1">Yesterday</Option>
              <Option value="day-7">7 days</Option>
              <Option value="month-1">30 days</Option>
              <Option value="month-3">3 months</Option>
              <Option value="month-6">6 months</Option>
              <Option value="year-1">Annual</Option>
              
           </Select> */}
          </Form.Item>
        </Col>
        <Col
          xl={{ span: 6 }}
          lg={{ span: 6 }}
          md={{ span: 6 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        ></Col>
        <Col
          xl={{ span: 6 }}
          lg={{ span: 6 }}
          md={{ span: 6 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Form.Item className="name-field-full">
            <div className="charts-icon text-right">
              {billType === "AllBills" && (
                <PieChartFilled
                  onClick={() => chartTypeFun("pie")}
                  style={{ marginRight: "10px" }}
                />
              )}
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
          {!loading && <BedayeahGraphs type={chartType} data={chartData} />}
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
          <PinToDashboard type="sales_expenses" chartType={chartType} />
        </Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          {/* <Row>
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
                  <strong>{_("One Time Bill", "en")}</strong>
                </p>
                <span>
                  {oneTimeBillSum}
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
                  <span className="small-square purple-bg"></span>
                  <strong>{_("Recurring Bill", "en")}</strong>
                </p>
                <span>
                  {recurringSum}
                  {_("SAR", "en")}
                </span>
              </div>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Spin>
  );
};
