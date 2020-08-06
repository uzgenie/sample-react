import React from "react";
import "@ant-design/compatible/assets/index.css";
import {
  Tabs,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  Collapse,
  Modal,
  Button,
} from "antd";
import { Sales } from "./Sales";
import { _ } from "../../../../helper/helper";
import { Expernses } from "./Expenses";
import { Inventory } from "./Inventory";

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

export const Comparison = (props) => {
  let { callback, active, getAPIData } = props;
  return (
    <div className="nest-tabs comaprison-inner-tabs">
      <Tabs activeKey={active} onChange={callback} size="large">
        <TabPane
          tab={<div className="tab-content">{_("Sales", "en")}</div>}
          key="sales"
        >
          <Sales getAPIData={getAPIData} />
        </TabPane>
        <TabPane
          tab={<div className="tab-content">{_("Expenses", "en")}</div>}
          key="expenses"
        >
          <Expernses getAPIData={getAPIData} />
        </TabPane>
        <TabPane
          tab={<div className="tab-content">{_("Inventory", "en")}</div>}
          key="inventory"
        >
          <Inventory getAPIData={getAPIData} />
        </TabPane>
      </Tabs>
    </div>
  );
};
