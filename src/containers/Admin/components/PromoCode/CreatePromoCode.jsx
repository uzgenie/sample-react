import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import {
  Input,
  Select,
  Button,
  Row,
  Col,
  Form,
  DatePicker,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import * as helper from "../../../../helper/helper";
import { randomString } from "./utils";
import * as actions from "../../actions";
import { useEffect } from "react";

const { Option } = Select;

// Utils

const initialState = {
  isLoading: false,
  singlePromo: {},
};

// Component
const CreatePromoCode = ({ history, edit, location, match, ...rest }) => {
  const [state, set] = useState(initialState);
  const dispatch = useDispatch();
  const form = Form.useForm()[0];
  const { isLoading, singlePromo } = state;
  const id = match.params.id;
  const setState = (obj) => set({ ...state, ...obj });
  async function getSinglePromoCode() {
    let data = {};
    if (edit && match.params.id) {
      data = await actions.getSinglePromoCode(match.params.id);
      setState({
        singlePromo: data,
      });
    }
    delete data.id;
    form.setFieldsValue({
      ...data,
      expirationDate: moment(data.expirationDate),
    });
  }
  useEffect(() => {
    getSinglePromoCode();
  }, []);

  async function handleSubmit(values) {
    try {
      setState({ isLoading: true });
      const data = {
        ...values,
        expirationDate: moment(values.expirationDate).format("YYYY-MM-DD"),
        amount: parseInt(values.amount),
        useCount: parseInt(values.useCount),
      };
      id
        ? await dispatch(actions.updatePromoCode(data, id))
        : await dispatch(actions.createPromoCode(data));
      // setState({ isLoading: false });
      // form.resetFields();
      history.push("/promoCodes");
    } catch (err) {
      console.log("this is error comes", JSON.stringify(err.response));
      setState({ isLoading: false });
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <Form
      {...formItemLayout}
      name="createPromoCode"
      form={form}
      onFinish={handleSubmit}
      className="form-elements-style vendor-tabs-wrapper"
      initialValues={{
        code: randomString(10),
        useCount: 1,
      }}
    >
      <div className="white-row-setting">
        <div className="promoData-data">
          {/* <div className="section-separater"></div> */}
          <Row gutter={20}>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                label={helper._("Code", "en")}
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Code is Required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                name="amount"
                label={helper._("Amount", "en")}
                rules={[
                  {
                    required: true,
                    message: "Amount is Required",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                name="type"
                label={helper._("Type", "en")}
                rules={[
                  {
                    required: true,
                    message: "Type is Required",
                  },
                ]}
              >
                <Select>
                  <Option value="percentage">Percentage</Option>
                  <Option value="currency">Currency</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                name="expirationDate"
                label={helper._("Expiration Date", "en")}
                rules={[
                  {
                    required: true,
                    message: "expiry date is Required",
                  },
                ]}
              >
                <DatePicker style={{ display: "block" }} />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                name="useCount"
                label={helper._("Use Count", "en")}
                rules={[
                  {
                    required: true,
                    message: "useCount is Required",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
      <div className="clearfix"></div>
      <Row gutter={20} className="mt-5">
        <Col
          xl={{ span: 16 }}
          lg={{ span: 16 }}
          md={{ span: 16 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="text-left btn-mob-full">
            <Link to="/vendors" className="ant-btn">
              <LeftOutlined /> Back
            </Link>
          </div>
        </Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="text-right btn-mob-full">
            {/* <a
              onClick={(e) => handleSubmit(e)}
              className="btn cstm-btn-primary mr-1"
              disabled={isLoading}
              // htmlType="submit"
            >
              Save and Next
            </a> */}

            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save and close
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePromoCode;
