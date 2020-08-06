import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Select, Button, Row, Col, Form, notification } from "antd";

import * as helper from "../../../../helper/helper";
import * as actions from "../../actions";
import ReactQuill from "react-quill";

const { Option } = Select;

// Utils

const initialState = {
  isLoading: false,
  description: "",
};

// Component
const EmailBroadcasting = () => {
  const [state, set] = useState(initialState);
  const dispatch = useDispatch();
  const form = Form.useForm()[0];
  const { isLoading } = state;
  const setState = (obj) => set({ ...state, ...obj });

  const handleChangeDescription = (value) => setState({ description: value });
  const { description } = state;

  async function handleSubmit(values) {
    try {
      if (!state.description) {
        notification.error({
          description: "Description is required!",
          message: "Unprocessable Entity",
        });
        return;
      }

      setState({ isLoading: true });
      const data = {
        ...values,
        description: state.description,
      };
      await dispatch(actions.notificationBroadcasting(data));
      setState({ isLoading: false });
      form.resetFields();
      setState({ description: "" });
    } catch (err) {
      setState({ isLoading: false });
    }
  }

  return (
    <Form
      name="createEmailBroadCasting"
      form={form}
      onFinish={handleSubmit}
      className="form-elements-style vendor-tabs-wrapper"
      initialValues={{
        sendTo: "users",
      }}
      colon={false}
    >
      <div className="white-row-setting">
        <div className="promoData-data">
          <Row gutter={20}>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                label={helper._("Send To", "en")}
                name="sendTo"
                rules={[
                  {
                    required: true,
                    message: "Send To is Required",
                  },
                ]}
              >
                <Select>
                  <Option value="users">Users</Option>
                  <Option value="admins">Admins</Option>
                  <Option value="both">Both</Option>
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
                name="subject"
                label={helper._("Subject", "en")}
                rules={[
                  {
                    required: true,
                    message: "Subject is Required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 24 }}
              lg={{ span: 24 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <label>Description</label>
              <ReactQuill
                onChange={handleChangeDescription}
                value={description}
              />
              <ul>
                <li>[name] = name of the user</li>
              </ul>
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
        ></Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="text-right btn-mob-full">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Send
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default EmailBroadcasting;
