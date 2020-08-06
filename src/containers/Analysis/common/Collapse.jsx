import React, { useState } from "react";

import { CaretDownFilled } from "@ant-design/icons";

import "@ant-design/compatible/assets/index.css";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

export const ChartCollapse = (props) => {
  let { products,setSelectedProducts,selectedProducts =[],foraceUpdateAll={} } = props;
  products = !products ? [] : products;
  



  return (
    <Collapse
      
      onChange={() => {}}
      expandIconPosition={() => {}}
      expandIcon={({ isActive }) => (
        <CaretDownFilled rotate={isActive ? 180 : 0} />
      )}
    >
      {products.map((product, index) => (
        <Panel header={<Header product={product} foraceUpdateAll={foraceUpdateAll} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts}  />} key={product.id}>
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

const Header = ({product,setSelectedProducts,selectedProducts,foraceUpdateAll}) => {
  let {id,name,color,value,quantity} = product;
  let selected = (selectedProducts.includes(id));
  let {foraceUpdate, foraceUpdateHook} = foraceUpdateAll;

  let [check,checkHook] = useState(selected);
  return (
    <div className="panel-header-wrap">
      <div className="custom-box">
        <span
          style={{ backgroundColor: color }}
          className="small-box "
        ></span>
       {/**  <Checkbox
          value={id}
          checked={check}
          onClick={(e) => {
            checkHook(!check);
            setSelectedProducts(e.target.value);
          //  foraceUpdateHook(!foraceUpdate)
            
          }}
        > 
          
        </Checkbox>*/}
        {name}

        <span className="percentage-data">{quantity}</span>
      </div>
    </div>
  );
};
