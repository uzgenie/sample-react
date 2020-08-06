import React, { useState } from "react";

import { CaretDownFilled } from "@ant-design/icons";

import "@ant-design/compatible/assets/index.css";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

export const ChartCollapse = (props) => {
  let { products,setSelectedProducts } = props;
  products = !products ? [] : products;
  



  return (
    <Collapse
      defaultActiveKey={["1"]}
      onChange={() => {}}
      expandIconPosition={() => {}}
      expandIcon={({ isActive }) => (
        <CaretDownFilled rotate={isActive ? 180 : 0} />
      )}
    >
      {products.map((product, index) => (
        <Panel header={<Header product={product} setSelectedProducts={setSelectedProducts}  />} key={index}>
          <div className="pannel-innerData">
            <ul>
              <li>
                <span>{product.text}</span>
                <span>{product.value}%</span>
              </li>
            </ul>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

const Header = ({product,setSelectedProducts}) => {
  let {id,name,color,value} = product;

  let [check,checkHook] = useState(false);
  return (
    <div className="panel-header-wrap">
      <div className="custom-box">
        <span
          style={{ backgroundColor: color }}
          className="small-box "
        ></span>
        <Checkbox
          value={id}
          checked={check}
          onClick={(e) => {
            checkHook(!check);
            setSelectedProducts(e.target.value);
            
          }}
        >
          {name}
        </Checkbox>

        <span className="percentage-data">{value}%</span>
      </div>
    </div>
  );
};
