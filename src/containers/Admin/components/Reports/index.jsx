import React, { Fragment } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Select } from "antd";

const { Option } = Select;

const Report = () => {
  return (
    <Fragment>
      <div className="reports-wrapper">
        <div className="heading-main">
          <h1>Reports</h1>
        </div>

        <Row gutter={20} className="mg-lr-10">
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="col-pad-0"
          >
            <Form.Item className="name-field-full">
              <Select
                defaultValue="All Categories"
                style={{ width: "100%" }}
                // onChange={this.handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="col-pad-0"
          >
            <Form.Item className="name-field-full">
              <Select
                defaultValue="Anually"
                style={{ width: "100%" }}
                // onChange={this.handleChange}
              >
                <Option value="anually">Anually</Option>
                <Option value="semi-anually">Semi Anually</Option>
                <Option value="quarterly">Quarterly</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="col-pad-0"
          >
            <Form.Item className="name-field-full">
              <Select
                defaultValue="2018"
                style={{ width: "100%" }}
                // onChange={this.handleChange}
              >
                <Option value="2018">2018</Option>
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item className="name-field-full">
              <p>(compared to Jan 1 - Dec 31, 2017)</p>
            </Form.Item>
          </Col>
        </Row>
        <div className="boxes-color-white">
          <Row gutter={20} type="flex" className="mg-lr-10">
            <Col
              xl={{ span: 6 }}
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="col-pad-0"
            >
              <div className="border-box text-center square-box-ui">
                <p>
                  <strong>Orders</strong>
                </p>
                <h3>125</h3>
                <p>
                  <ArrowDownOutlined />
                  <span>23.53%</span>
                </p>
              </div>
            </Col>
            <Col
              xl={{ span: 6 }}
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="col-pad-0"
            >
              <div className="border-box text-center square-box-ui red-color">
                <p>
                  <strong>Revenue</strong>
                </p>
                <h3>250,530 SAR </h3>
                <p>
                  <ArrowDownOutlined />
                  <span>23.53%</span>
                </p>
              </div>
            </Col>
            <Col
              xl={{ span: 6 }}
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="col-pad-0"
            >
              <div className="border-box text-center square-box-ui red-color">
                <p>
                  <strong>Orders</strong>
                </p>
                <h3>125</h3>
                <p>
                  <ArrowUpOutlined />
                  <span>23.53%</span>
                </p>
              </div>
            </Col>
            <Col
              xl={{ span: 6 }}
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="col-pad-0"
            >
              <div className="border-box text-center square-box-ui">
                <p>
                  <strong>Orders</strong>
                </p>
                <h3>125</h3>
                <p>
                  <ArrowUpOutlined />
                  <span>23.53%</span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="mg-top-24">
          <Row gutter={20} className="mg-lr-10">
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="border-box report-card-white-bg"
            >
              <div className="report-card-styling">
                <div className="card-header">
                  <h4> VAT REPORT</h4>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Total</strong>
                  </p>
                  <ul>
                    <li>
                      <span>20,748 SAR</span>
                      <span className="blue-text">
                        <ArrowUpOutlined />
                        2.96%
                      </span>
                    </li>
                    <li>
                      <span>Excepteur sint occaecat</span>
                      <span> 10,657 SAR</span>
                    </li>
                    <li>
                      <span>Cupidatat non</span>
                      <span>8,275 SAR</span>
                    </li>
                    <li>
                      <span>Proident</span>
                      <span>8,275 SAR</span>
                    </li>
                  </ul>
                  <div className="card-btn text-center">
                    <a href="#">View More</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="border-box report-card-white-bg"
            >
              <div className="report-card-styling">
                <div className="card-header">
                  <h4>INCOME STATEMENT</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam
                  </p>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Total</strong>
                  </p>
                  <ul>
                    <li>
                      <span>20,748 SAR</span>
                      <span className="red-text">
                        <ArrowUpOutlined />
                        2.96%
                      </span>
                    </li>
                    <li>
                      <span>Excepteur sint occaecat</span>
                      <span> 10,657 SAR</span>
                    </li>
                    <li>
                      <span>Cupidatat non</span>
                      <span>8,275 SAR</span>
                    </li>
                    <li>
                      <span>Proident</span>
                      <span>8,275 SAR</span>
                    </li>
                  </ul>
                  <div className="card-btn text-center">
                    <a href="#">View More</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="border-box report-card-white-bg"
            >
              <div className="report-card-styling">
                <div className="card-header">
                  <h4> VAT REPORT</h4>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Total</strong>
                  </p>
                  <ul>
                    <li>
                      <span>20,748 SAR</span>
                      <span className="blue-text">
                        <ArrowUpOutlined />
                        2.96%
                      </span>
                    </li>
                    <li>
                      <span>Excepteur sint occaecat</span>
                      <span> 10,657 SAR</span>
                    </li>
                    <li>
                      <span>Cupidatat non</span>
                      <span>8,275 SAR</span>
                    </li>
                    <li>
                      <span>Proident</span>
                      <span>8,275 SAR</span>
                    </li>
                  </ul>
                  <div className="card-btn text-center">
                    <a href="#">View More</a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};
export default Report;
