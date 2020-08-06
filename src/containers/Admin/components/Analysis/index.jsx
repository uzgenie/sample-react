import React, { Fragment } from "react";

import "@ant-design/compatible/assets/index.css";

import { Comparison } from "./sections/comparison";
import { getAPIData, getProductCategories } from "./actions/actions";
import { connect } from "react-redux";

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
    this.props.getAPIData("get_" + this.state.comparisonActiveTab, "day", 0);
    this.props.getProductCategories();
  };

  changeMainTab = (key) => {
    this.setState({ activeTab: key });
    this.props.getAPIData("get_" + this.state.comparisonActiveTab, "day", 0);
  };

  //===========   Comparison Tab CallBacks

  comparisonTabClicked = (key) => {
    this.setState({ comparisonActiveTab: key });
    this.props.getAPIData("get_" + key, "day", 0);
  };

  render() {
    return (
      <Fragment>
        <div className="heading-main">
          <h1>Analysis</h1>
        </div>
        <div className="white-row-setting analysis-wrapper">
          <div className="generic-blue-tabs">
            <Comparison
              callback={this.comparisonTabClicked}
              getAPIData={this.props.getAPIData}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    expensesData: state.comparison.expenses,
  };
}
export default connect(mapStateToProps, {
  getAPIData: getAPIData,
  getProductCategories: getProductCategories,
})(Analysis);
