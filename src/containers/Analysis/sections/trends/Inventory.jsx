import React from "react";

import {
  PieChartFilled,
  PushpinTwoTone,
  BarChartOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Select, Spin } from "antd";
import { BedayeahGraphs } from "./../../common/graphs";

import PinToDashboard from "./../../common/PinToDashboard";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import { inventoryPlotter } from "./plotters/InventoryPlotter";
import { useSelector } from "react-redux";

const { Option } = Select;
 const Inventory = (props) => {
  let { getAPIData,chartOnly=false ,graphType="area"} = props;
  let [chartType, chartTypeFun] = React.useState(graphType);
  let APIData = useSelector((state) => state.tredns.inventory_trend);
  let loading = APIData ? false : true;

  let { chartData} = inventoryPlotter(APIData, chartType);
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
          <Row gutter={20}>
            <Col
              xl={{ span: 7 }}
              lg={{ span: 7 }}
              md={{ span: 7 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item className="name-field-full">
                <TimeFrameSelect
                  getApiData={getAPIData}
                  Apitype="get_inventory_trend"
                />
              </Form.Item>
            </Col>
          </Row>
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
              <BarChartOutlined
                onClick={() => chartTypeFun("column")}
                style={{ marginRight: "10px" }}
              />
              <AreaChartOutlined onClick={() => chartTypeFun("area")} />
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
          <PinToDashboard type="inventory_trend" chartType={chartType} />
        </Col>
      </Row>
    </Spin>
  );
};


export default Inventory;
