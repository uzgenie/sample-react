import React, { Fragment } from "react";
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

import { Comparison } from "./sections/comparison";
import { _ } from "../../helper/helper";
import { Trends } from "./sections/trends";
import {
  getAPIData,
  getProductCategories,
  setActiveTab,
} from "./actions/actions";
import {
  currentlyActiveTabFromURL,
  insertParam,
} from "./helpers/dataFormatter";
import { connect } from "react-redux";

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "main_sales",
      comparisonActiveTab: "sales",
      trendsActiveTab: "inventory_trend",
    };
  }

  componentDidMount = () => {
    let fromURL = currentlyActiveTabFromURL();

    if (fromURL.length === 0) {
      this.props.getAPIData("get_" + this.props.activeTab[1], "day", 0);
    } else {
      this.props.setActiveTab(fromURL[0], fromURL[1]);
      this.props.getAPIData("get_" + fromURL[1], "day", 0);
    }
    this.props.getProductCategories();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.activeTab[0] !== this.props.activeTab[0] ||
      prevProps.activeTab[1] !== this.props.activeTab[1]
    ) {
      this.props.getAPIData("get_" + this.props.activeTab[1], "day", 0);
    }
  };

  changeMainTab = (key) => {
    let activeTab = [];
    if (key === "main_inventory_trend") {
      this.props.setActiveTab("main_inventory_trend", "inventory_trend");
      insertParam("main_inventory_trend", "inventory_trend");
    } else {
      this.props.setActiveTab("main_sales", "sales");
      insertParam("main_sales", "sales");
    }
  };

  //===========   Comparison Tab CallBacks

  comparisonTabClicked = (key) => {
    this.props.setActiveTab("main_sales", key);
    insertParam("main_sales", key);
  };

  //===========   Trends Tab CallBacks

  trendsTabClicked = (key) => {
    this.props.setActiveTab("main_inventory_trend", key);
    insertParam("main_inventory_trend", key);
  };

  render() {
    return (
      <Fragment>
        <div className="heading-main">
          <h1>{_("Analysis", "en")} </h1>
        </div>
        <div className="white-row-setting analysis-wrapper padd-top-0">
          <div className="generic-blue-tabs">
            <Tabs
              className="vendor-data__ vendor-tabs-main-wrap"
              activeKey={this.props.activeTab[0]}
              onChange={this.changeMainTab}
            >
              <TabPane
                tab={<div className="tab-content">{_("Comparison", "en")}</div>}
                key="main_sales"
              >
                <Comparison
                  callback={this.comparisonTabClicked}
                  getAPIData={this.props.getAPIData}
                  active={this.props.activeTab[1]}
                />
              </TabPane>

              <TabPane
                tab={<div className="tab-content">{_("Trends", "en")}</div>}
                key="main_inventory_trend"
              >
                <Trends
                  callback={this.trendsTabClicked}
                  getAPIData={this.props.getAPIData}
                  active={this.props.activeTab[1]}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    expensesData: state.comparison.expenses,
    activeTab: state.tredns.activeTab,
  };
}

export default connect(mapStateToProps, {
  getAPIData: getAPIData,
  getProductCategories: getProductCategories,
  setActiveTab: setActiveTab,
})(Analysis);
