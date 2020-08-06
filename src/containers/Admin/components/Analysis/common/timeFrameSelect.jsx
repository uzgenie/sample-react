import React, { useState } from "react";
import { Select, Modal, Row, Col, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

export const TimeFrameSelect = (props) => {
  let { getApiData, Apitype } = props;
  let [modalVisable, modalvisableFun] = useState(false);
  let [interval, intervalFun] = React.useState("day-0");
  return (
    <div className="timeFrame-select">
      <Select
        defaultValue={interval}
        style={{ width: "100%" }}
        onChange={(type) => {
          if (type !== "createNew") {
            intervalFun(type);
            let temp = type.split("-");
            getApiData(Apitype, temp[0], parseInt(temp[1]));
          } else {
            modalvisableFun(true);
          }
        }}
      >
        <Option value="day-0">Today</Option>
        <Option value="day-1">Yesterday</Option>
        <Option value="day-7">7 days</Option>
        <Option value="month-1">30 days</Option>
        <Option value="month-3">3 months</Option>
        <Option value="month-6">6 months</Option>
        <Option value="year-1">Annual</Option>
        <Option value="createNew">Custom Date Range </Option>
      </Select>
      <RangeModal
        modalVisable={modalVisable}
        modalvisableFun={modalvisableFun}
        getApiData={getApiData}
        Apitype={Apitype}
      />
    </div>
  );
};

export const RangeModal = ({
  modalVisable,
  modalvisableFun,
  getApiData,
  Apitype,
}) => {
  let [dataRange, dataRangeHook] = React.useState(null);
  return (
    <Modal
      title="Select"
      visible={modalVisable}
      onOk={() => {
        if (dataRange && typeof getApiData === "function") {
          getApiData(Apitype, "", 0, dataRange[0], dataRange[1]);
        }
        modalvisableFun(false);
      }}
      okText="Ok"
      onCancel={() => modalvisableFun(false)}
    >
      <Row gutter={20}>
        <Col
          xl={{ span: 24 }}
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <RangePicker
            onChange={(dates, dateString) => {
              dataRangeHook(dateString);
            }}
            format="YYYY-MM-DD"
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                //style.border = '1px solid #1890ff';
                // style.borderRadius = '50%';
              }
              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
