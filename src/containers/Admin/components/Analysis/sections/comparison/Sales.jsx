import React from "react";

import { PieChartFilled, BarChartOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Spin } from "antd";
import { salesPlotter } from "./plotters/SalesPlotter";
import { ChartCollapse } from "./../../common/Collapse";
import { BedayeahGraphs } from "./../../common/graphs";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import PinToDashboard from "./../../common/PinToDashboard";
import { useSelector } from "react-redux";

export const Sales = (props) => {
  //===============  Selected Product ===============
  let selectedProducts = [];
  const setSelectedProducts = (product) => {
    if (selectedProducts.includes(product)) {
      selectedProducts.splice(selectedProducts.indexOf(product), 1);
    } else {
      selectedProducts.push(product);
    }
  };

  //===============  Selected Product ===============

  let { getAPIData } = props;

  let [chartType, chartTypeFun] = React.useState("donut");
  let [productType, productTypeFun] = React.useState(null);
  let [productCategory, productCategoryFun] = React.useState("All");

  let salesAPIData = useSelector((state) => state.comparison.sales);
  let loading = salesAPIData ? false : true;
  salesAPIData = salesAPIData ? salesAPIData : [];

  let { chartData, products } = salesPlotter(
    salesAPIData,
    chartType,
    productType,
    productCategory
  );

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
            <TimeFrameSelect getApiData={getAPIData} Apitype="get_sales" />
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
              <PieChartFilled
                onClick={() => chartTypeFun("donut")}
                style={{ marginRight: "10px" }}
              />
              <BarChartOutlined onClick={() => chartTypeFun("column")} />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col
          xl={{ span: 10 }}
          lg={{ span: 10 }}
          md={{ span: 10 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <BedayeahGraphs data={chartData} />
        </Col>
        <Col
          xl={{ span: 14 }}
          lg={{ span: 14 }}
          md={{ span: 14 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="custom-tab-setting">
            <ChartCollapse
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <p>
          <PinToDashboard />
        </p>
      </Row>
    </Spin>
  );
};
