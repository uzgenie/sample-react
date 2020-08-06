import React from "react";
import { Select, Spin } from "antd";
import { _ } from "../../../helper/helper";
import { useSelector } from "react-redux";
const { Option } = Select;
let intervalDefault = {
  from: "0000-00-00",
  to: "0000-00-00",
  interval: "day",
  count: 0,
};
export const ProductCategories = (props) => {
  let {
    productCategory,
    productCategoryFun,
    interval = intervalDefault,
    getAPIData = () => {},
    Apitype = "",
  } = props;
  let Allcategories = useSelector((state) => state.comparison.Allcategories);
  let loading = Allcategories ? false : true;
  Allcategories = !Allcategories ? [] : Allcategories;

  return (
    <Spin spinning={loading}>
      <Select
        defaultValue={productCategory}
        style={{ width: "100%" }}
        onSelect={(cat) => {
          productCategoryFun(cat);
          getAPIData(
            Apitype,
            interval.interval,
            interval.count,
            interval.from,
            interval.to,
            cat
          );
        }}
      >
        <Option value=""> All</Option>
        {Allcategories.map((cat, index) => (
          <Option key={cat.id} value={cat.id}>
            {" "}
            {cat.name}
          </Option>
        ))}
      </Select>
    </Spin>
  );
};
