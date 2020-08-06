import React, { useEffect, Fragment } from "react";
import { Table, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import columns from "./columns";
import * as actions from "../../actions";

const PromoCode = ({ history }) => {
  const reduxDispatcher = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.promoCodes);
  useEffect(() => {
    reduxDispatcher(actions.getPromoCodes());
    return () => {};
  }, []);
  const handleEditDelete = async (id, action) =>
    action === "edit"
      ? history.push(`/editPromo/${id}`)
      : await reduxDispatcher(actions.deletePromoCode(id));
  return (
    <Fragment>
      <div className="filter-section promocode-filter">
        <Row gutter={20}>
          <Col
            xl={{ span: 18 }}
            lg={{ span: 18 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="heading-main">
              <h1>Promo Codes</h1>
            </div>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="text-align-mobile text-right">
              <Link to="/createPromo" className="btn btn-warning">
                Add New Code <PlusOutlined />
              </Link>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns({ handleEditDelete })}
          dataSource={data}
          loading={isLoading}
          className="promoCode-table"
        />
      </div>
    </Fragment>
  );
};

export default PromoCode;
