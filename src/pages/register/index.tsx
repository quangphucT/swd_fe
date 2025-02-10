import React from "react";
import "./index.scss";
import { Button, Col, Image, Input, Row, Space } from "antd";
import { Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";
import api from "../../../../banthuoc/src/config/api";
import { toast } from "react-toastify";

function Register() {
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await api.post("/register", values);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error: any) {
      toast.error("Registration failed");
      console.log(error.response.data.error);
      form.resetFields();
    }
  };
  return (
    <Row
      align="middle"
      justify="center"
      // gutter={30}
      style={{ maxHeight: "100vh", overflow: "hidden",backgroundColor: "#f0f2f5" }}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div >
          <Form
            //onFinish={onFinish}
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              paddingLeft: "5vw",
            }}
          >
            <h2 className="register_title">Đăng Ký</h2>

            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ email *" />
            </Form.Item>

            <Form.Item
              name="Username"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên đăng nhập!",
                },
              ]}
            >
              <Input placeholder="Tên đăng nhập *" />
            </Form.Item>

            <Form.Item
              className="password_confirm"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu *"
                className="passwordcss"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={true}
              />
            </Form.Item>
            <Form.Item
              className="password_confirm"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Hãy xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu *"
                className="passwordcss"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={true}
              />
            </Form.Item>
            <Form.Item
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên người dùng!",
                },
              ]}
            >
              <Input placeholder="Tên người dùng *" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập địa chỉ!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ *" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại *" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  className="btnStyle"
                  onClick={() => form.submit()}
                >
                  Đăng Ký
                </Button>
              </Space>
            </Form.Item>

            <Form.Item>
              <p className="signin">
                Đã có tài khoản rồi ? <Link to="/Login">Đăng nhập</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col
        span={8}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="img-register">
          <Image src="/img/login.png" />
        </div>
      </Col>
    </Row>
  );
}

export default Register;
