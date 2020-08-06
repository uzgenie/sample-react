import React, { useState } from "react";
import { _ } from "../../../helper/helper";
import { Select, Modal, Row, Col, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

export const TimeFrameSelect = (props) => {
  let { getApiData, Apitype,interval={},intervalHook=()=>{} ,productCategory=""} = props;
  let [modalVisable, modalvisableFun] = useState(false);
  let [intervalInner, intervalInnerHook] = React.useState("day-0");
 
  return (
    <div className="timeFrame-select">
      <Select
        defaultValue={intervalInner}
        style={{ width: "100%" }}
        onChange={(type) => {
          if (type !== "createNew") {
            intervalInnerHook(type);
            let temp = type.split("-");
            interval.interval = temp[0];
            interval.count = parseInt(temp[1]);
            interval.from ="0000-00-00"
            interval.to="0000-00-00"
            intervalHook(interval);
            
            getApiData(Apitype, temp[0], parseInt(temp[1]),"0000-00-00","0000-00-00",productCategory);
          } else {
            modalvisableFun(true);
          }
        }}
      >
        <Option value="day-0">{_("Today", "en")}</Option>
        <Option value="day-1">{_("Yesterday", "en")}</Option>
        <Option value="day-7">{_("7 days", "en")}</Option>
        <Option value="month-1">{_("30 days", "en")}</Option>
        <Option value="month-3">{_("3 months", "en")}</Option>
        <Option value="month-6">{_("6 months", "en")}</Option>
        <Option value="year-1">{_("Annual", "en")}</Option>
        <Option value="createNew">{_("Custom Date Range", "en")} </Option>
      </Select>
      <RangeModal
        modalVisable={modalVisable}
        modalvisableFun={modalvisableFun}
        getApiData={getApiData}
        Apitype={Apitype}
        interval={interval}
        intervalHook={intervalHook}
        productCategory={productCategory}
      />
    </div>
  );
};

export const RangeModal = ({
  modalVisable,
  modalvisableFun,
  getApiData,
  Apitype,
  interval={},intervalHook=()=>{},
  productCategory
}) => {
  let [dataRange, dataRangeHook] = React.useState(null);
  return (
    <Modal
      title={_("Select", "en")}
      visible={modalVisable}
      onOk={() => {
        if (dataRange && typeof getApiData === "function") {
          interval["from"] = dataRange[0];
          interval["to"] = dataRange[1];
          interval.interval ="";
            interval.count = 0;
          intervalHook(interval);
          getApiData(Apitype, "", 0, dataRange[0], dataRange[1],productCategory);
        }
        modalvisableFun(false);
      }}
      okText={_("Ok", "en")}
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
