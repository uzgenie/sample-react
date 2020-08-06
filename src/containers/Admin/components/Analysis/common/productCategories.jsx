import React from "react";
import { Select,Spin } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

export const ProductCategories = (props) => {
  let { productCategory, productCategoryFun } = props;
  let Allcategories = useSelector((state) => state.comparison.Allcategories);
  let loading = (Allcategories) ? false : true;
  Allcategories = (!Allcategories) ? [] : Allcategories;

  return (
    <Spin spinning={loading}>
    <Select
      defaultValue={productCategory}
      style={{ width: "100%" }}
      onSelect={(cat) => {
        productCategoryFun(cat);
      }}
    >
      <Option value="All"> All</Option>
      {Allcategories.map((cat,index)=><Option key={cat.name} value={cat.name}> {cat.name}</Option>)}
    </Select>
    </Spin>
  );
};
