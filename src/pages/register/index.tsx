import "./index.scss";
import { Button, Col, Input, Row, Form, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import api from "../../config/api";

function Register() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api.post("/register", values);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error: any) {
      toast.error("Đăng ký thất bại!");
      form.resetFields();
    }
  };

  return (
    <div className="registerPage">
      <div className="floatingBackground"></div>
      <div className="registerPage__formContainer">
        <h2 className="register_title">Đăng Ký</h2>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={20}>
            {/* Cột 1 */}
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: "Hãy nhập email!" }]}>
                <Input placeholder="Nhập email *" />
              </Form.Item>
              <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}>
                <Input placeholder="Nhập tên đăng nhập *" />
              </Form.Item>
              <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}>
                <Input.Password placeholder="Nhập mật khẩu *" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>

            {/* Cột 2 */}
            <Col xs={24} md={12}>
              <Form.Item name="confirmPassword" label="Xác nhận mật khẩu" dependencies={['password']} rules={[
                { required: true, message: "Hãy xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value ? Promise.resolve() : Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}>
                <Input.Password placeholder="Nhập lại mật khẩu *" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
              <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: "Hãy nhập họ và tên!" }]}>
                <Input placeholder="Nhập họ và tên *" />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}>
                <Input placeholder="Nhập số điện thoại *" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space className="full-width">
              <Button htmlType="submit" className="btnStyle">Đăng Ký</Button>
            </Space>
          </Form.Item>

          <p className="signin">Đã có tài khoản? <Link to="/Login">Đăng nhập</Link></p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
