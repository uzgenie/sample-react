import React from "react";

import {
  CaretDownFilled,
  PieChartFilled,
  PushpinTwoTone,
  BarChartOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Tabs, Row, Col, Select, Spin } from "antd";
import { BedayeahGraphs } from "./../../common/graphs";
import { TimeFrameSelect } from "./../../common/timeFrameSelect";
import { _ } from "../../../../helper/helper";
import PinToDashboard from "./../../common/PinToDashboard";
import { InventoryPlotter } from "./plotters/InventoryPlotter";
import { ProductCategories } from "./../../common/productCategories";

import { ChartCollapse } from "./../../common/Collapse";
import { useSelector } from "react-redux";

const { Option } = Select;

export const Inventory = (props) => {
  let { getAPIData, chartOnly = false, graphType = "donut" } = props;

  let [chartType, chartTypeFun] = React.useState(graphType);
  let [productCategory, productCategoryFun] = React.useState("");
  let [interval, intervalHook] = React.useState({
    from: "0000-00-00",
    to: "0000-00-00",
    interval: "day",
    count: 0,
  });

  let [productStatus, productStatusFun] = React.useState(0);
  let APIData = useSelector((state) => state.comparison.inventory);
  let loading = APIData ? false : true;
  APIData = APIData ? APIData : [];

  let { chartData, products, selectedProducts = [] } = InventoryPlotter(
    APIData,
    chartType,
    productCategory,
    productStatus
  );

  //===============  Selected Product ===============

  const setSelectedProducts = (product) => {
    if (selectedProducts.includes(product)) {
      selectedProducts.splice(selectedProducts.indexOf(product), 1);
    } else {
      selectedProducts.push(product);
    }
  };

  //===============  Selected Product ===============

  if (chartOnly === true) {
    return <BedayeahGraphs data={chartData} />;
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
            <ProductCategories
              productCategory={productCategory}
              productCategoryFun={productCategoryFun}
              interval={interval}
              Apitype="get_inventory"
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
            <Select
              defaultValue={_("All Status", "en")}
              style={{ width: "100%" }}
              onChange={(status) => {
                productStatusFun(status);
              }}
            >
              <Option value={0}>{_("Select Prodcuct Status", "en")}</Option>
              <Option value="Active">{_("Active", "en")}</Option>
              <Option value="Low Stock">{_("Low Stock", "en")}</Option>
              <Option value="Out of Stock">{_("Out of Stock", "en")}</Option>
              <Option value="Discontinued">{_("Discontinued", "en")}</Option>
              <Option value="On Back Order">{_("On Back Order", "en")}</Option>
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
            <TimeFrameSelect
              productCategory={productCategory}
              interval={interval}
              intervalHook={intervalHook}
              getApiData={getAPIData}
              Apitype="get_inventory"
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
              <BarChartOutlined
                onClick={() => chartTypeFun("column")}
                style={{ marginRight: "10px" }}
              />

              <PieChartFilled onClick={() => chartTypeFun("donut")} />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <BedayeahGraphs data={chartData} />
        </Col>
        <Col
          xl={{ span: 16 }}
          lg={{ span: 16 }}
          md={{ span: 16 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="custom-tab-setting">
            <ChartCollapse
              products={products}
              setSelectedProducts={setSelectedProducts}
              selectedProducts={selectedProducts}
            />
          </div>
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
          <PinToDashboard type="inventory" chartType={chartType} />
        </Col>
      </Row>
    </Spin>
  );
};
