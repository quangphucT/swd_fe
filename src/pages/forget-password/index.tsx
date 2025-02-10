import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, Input, Row, Space } from "antd";

import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
function ForgetPassword() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await api.post("/forget-password", values);
      setSubmitted(true);
      toast.success("Reset password link has been sent to your email");
    } catch (error: any) {
      toast.error("Error sending reset link");
      console.log(error.response ? error.response.data.error : error.message);
      form.resetFields();
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{ maxHeight: "100vh", overflow: "hidden" ,backgroundColor: "#f0f2f5" ,paddingTop:"4px" }}
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
        <div className="form-forgetpassword">
          <Form
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
            onFinish={onFinish}
          >
            <h2 className="forgetpassword_title">Quên Mật Khẩu</h2>
            <h4>
              Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được liên kết an
              toàn để đặt lại mật khẩu được gửi đến gmail của bạn.
            </h4>
            <Form.Item
              name="email"
              wrapperCol={{ span: 16, offset: 6 }}
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email của bạn !",
                },
              ]}
            >
              <Input placeholder="Hãy nhập email của bạn *" style={{marginBottom:"10px"}}/>
            </Form.Item>
            {/* offset: 8, bi daý sang phai 8 cot */}
            <Form.Item wrapperCol={{ span: 16, offset: 6 }}style={{paddingTop:"10px"}}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back to login
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
        <div className="img-forgetpassword" style={{width:"48%"}}>
          <Image src="/img/login.png" />
        </div>
      </Col>
    </Row>
  );
}

export default ForgetPassword;
