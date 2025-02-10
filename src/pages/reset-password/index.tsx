import "./index.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Input, Row, Space } from "antd";

import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import axios from "axios";
function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onFinish = async (values) => {
    try {
    await axios.post(
        "http://152.42.226.77:8080/api/reset-password",
        {
          password: values.newPassword,
        },
        config
      );
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error("Error resetting password");
      console.log(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f0f2f5",
        paddingTop: "4px",
      }}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="form-ResetPassword">
          <Form
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
            style={{
              paddingLeft: "5vw",
            }}
            onFinish={onFinish}
          >
            <h2 className="resetpassword_title">Đặt lại mật khẩu</h2>
            <h4>
              Vui lòng nhập mật khẩu mới của bạn. Bạn sẽ có thể đăng nhập bằng
              mật khẩu mới này.
            </h4>
            <Form.Item
              labelCol={{ span: "24" }}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password !",
                },
              ]}
            >
              <Input placeholder="Mật khẩu mới" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: "16"}}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Mật khẩu xác nhận" />
            </Form.Item>
            {/* offset: 8, bi daý sang phai 8 cot */}
            <Form.Item
              wrapperCol={{ span: 16, offset: 6 }}
              style={{ paddingTop: "10px" }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="img-forgetpassword" style={{ width: "48%" }}>
          <Image src="/img/login.png" />
        </div>
      </Col>
    </Row>
  );
}

export default ResetPassword;
