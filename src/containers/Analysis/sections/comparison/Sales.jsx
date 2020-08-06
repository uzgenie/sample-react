import React from "react";

import {
  PieChartFilled,
  BarChartOutlined,
  FunctionOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Select, Spin } from "antd";
import { salesPlotter } from "./plotters/SalesPlotter";
import { ChartCollapse } from "./../../common/Collapse";
import { BedayeahGraphs } from "./../../common/graphs";
import { _ } from "../../../../helper/helper";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import { ProductCategories } from "./../../common/productCategories";
import PinToDashboard from "./../../common/PinToDashboard";
import { useSelector } from "react-redux";
const { Option } = Select;
let sw1 = true;
function toggle() {
  sw1 = !sw1;
}
export const Sales = (props) => {
  let { getAPIData, chartOnly = false, graphType = "donut" } = props;

  let [chartType, chartTypeFun] = React.useState(graphType);
  let [productType, productTypeFun] = React.useState(0);
  let [productCategory, productCategoryFun] = React.useState("");
  let [interval, intervalHook] = React.useState({
    from: "0000-00-00",
    to: "0000-00-00",
    interval: "day",
    count: 0,
  });
  let [foraceUpdate, foraceUpdateHook] = React.useState(false);

  let salesAPIData = useSelector((state) => state.comparison.sales);
  let loading = salesAPIData ? false : true;
  salesAPIData = salesAPIData ? salesAPIData : [];

  var { chartData, products, selectedProducts = [] } = salesPlotter(
    salesAPIData,
    chartType,
    productType,
    productCategory
  );

  //===============  Selected Product ===============

  const setSelectedProducts = (product) => {
    if (selectedProducts.includes(product)) {
      selectedProducts.splice(selectedProducts.indexOf(product), 1);
    } else {
      selectedProducts.push(product);
    }

    let data = salesPlotter(
      salesAPIData,
      chartType,
      productType,
      productCategory,
      selectedProducts
    );
    console.log("chartData1", chartData);
    chartData = data.chartData;
  };

  if (chartOnly) {
    return (
      <Spin spinning={loading}>
        <BedayeahGraphs data={chartData} />
      </Spin>
    );
  }

  //===============  Selected Product ===============

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
            <Select
              defaultValue={_("Products and services", "en")}
              style={{ width: "100%" }}
              onChange={(type) => {
                productTypeFun(type);
              }}
            >
              <Option value={0}>{_("Products & Services", "en")}</Option>
              <Option value="product">{_("Products only", "en")}</Option>
              <Option value="service">{_("Services only", "en")}</Option>
            </Select>
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
            <ProductCategories
              productCategory={productCategory}
              productCategoryFun={productCategoryFun}
              interval={interval}
              Apitype="get_sales"
              getAPIData={getAPIData}
            />
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
            {/* <DatePicker
            onChange={onChange}
            style={{ display: "block" }}
          /> */}
            <TimeFrameSelect
              productCategory={productCategory}
              getApiData={getAPIData}
              Apitype="get_sales"
              interval={interval}
              intervalHook={intervalHook}
            />
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
            <div className="charts-icon text-right">
              <PieChartFilled
                onClick={() => chartTypeFun("donut")}
                style={{ marginRight: "10px" }}
                className={sw1 ? "active-border" : ""}
              />
              <BarChartOutlined
                onClick={() => chartTypeFun("column")}
                className={!sw1 ? "active-border" : ""}
              />
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
              foraceUpdateAll={{ foraceUpdate, foraceUpdateHook }}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <p>
          <PinToDashboard type={_("sales", "en")} chartType={chartType} />
        </p>
      </Row>
    </Spin>
  );
};
