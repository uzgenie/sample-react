import React from "react";

import {
  CaretDownFilled,
  PieChartFilled,
  PushpinTwoTone,
  BarChartOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Tabs, Select, Collapse, Modal, Button } from "antd";
import Inventory from "./Inventory";
import { SalesAndProfit } from "./SalesAndProfit";
import { NetProfit } from "./NetProfit";
import { _ } from "../../../../helper/helper";
// import { Sales } from "./Sales";
// import { Expenses } from "./Expenses";
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

export const Trends = (props) => {
  let { getAPIData, callback, active } = props;

  return (
    <div className="nest-tabs comaprison-inner-tabs trends-tab12 nest-tabs12">
      <Tabs activeKey={active} onChange={callback} size="large">
        <TabPane
          tab={<div className="tab-content">{_("Inventory", "en")}</div>}
          key="inventory_trend"
        >
          <Inventory getAPIData={getAPIData} />
        </TabPane>

        <TabPane
          tab={<div className="tab-content">{_("Sale & Profit", "en")}</div>}
          key="sale_and_profit"
        >
          <SalesAndProfit getAPIData={getAPIData} />
        </TabPane>

        <TabPane
          tab={<div className="tab-content">{_("Net Profit", "en")}</div>}
          key="net_profit"
        >
          <NetProfit getAPIData={getAPIData} />
        </TabPane>
      </Tabs>
    </div>
  );
};
