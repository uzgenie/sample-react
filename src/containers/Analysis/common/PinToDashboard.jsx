import React, { useState } from "react";
import { pinToDashboard } from "./../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { PushpinTwoTone, ClearOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const PinToDashboard = (props) => {
  let { type = "", chartType = "" } = props;
  const dispatch = useDispatch();
  let pinning = useSelector((state) => state.comparison.pinning);
  let pinned = useSelector((state) => state.getSettingUserSingleData.data);
  let [thisPinning, thisPinningHook] = useState(false);
  let [thisPinned, thisPinnedHook] = useState(false);
  pinned = pinned.dashboardData !== undefined ? pinned.dashboardData : [];

  pinned.forEach((e, value) => {
    if (e.name == type && e.active && e.graphType == chartType) {
      thisPinned = true;
      return;
    }
  });

  //thisPinning = pinning[type] !== undefined;

  return (
    <Spin spinning={thisPinning}>
      <div
        className="dashboard-pin"
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(pinToDashboard(type, chartType, !thisPinned));
          thisPinningHook(true);
        }}
      >
        {!thisPinned && <PushpinTwoTone />}
        {!thisPinned && "Pin To Dashboard"}

        {thisPinned && <ClearOutlined />}
        {thisPinned && " Unpin From Dashboard"}
      </div>
    </Spin>
  );
};
export default PinToDashboard;
