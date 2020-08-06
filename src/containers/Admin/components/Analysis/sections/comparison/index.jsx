import React from "react";
import "@ant-design/compatible/assets/index.css";
import { Sales } from "./Sales";

export const Comparison = (props) => {
  let { getAPIData } = props;
  return (
    <div className="nest-tabs comaprison-inner-tabs">
      <Sales getAPIData={getAPIData} />
    </div>
  );
};
