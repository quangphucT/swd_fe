import "./index.scss";
import { Button, Col, Input, Row, Form, Space, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import api from "../../config/api";

function Register() {
  const [form] = useForm();
  const navigate = useNavigate();
  const dateFormat = "YYYY-MM-DD";

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      await api.post("/Accounts/SignUp", values);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
      form.resetFields();
    }
  };

  return (
    <div className="registerPage">
      <div className="floatingBackground"></div>
      <div className="registerPage__formContainer">
        <h2 className="register_title">Đăng Ký</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={20}>
            {/* Cột 1 */}
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Hãy nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email *" />
              </Form.Item>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
              >
                <Input placeholder="Nhập tên đăng nhập *" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu *"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="firstname"
                label="Tên Riêng"
                rules={[{ required: true, message: "Hãy nhập tên riêng!" }]}
              >
                <Input placeholder="Nhập tên riêng *" />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Tên Họ"
                rules={[{ required: true, message: "Hãy nhập tên họ!" }]}
              >
                <Input placeholder="Nhập tên họ *" />
              </Form.Item>
            </Col>

            {/* Cột 2 */}
            <Col xs={24} md={12}>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Hãy xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return !value || getFieldValue("password") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu *"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa Chỉ"
                rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
              >
                <Input placeholder="Nhập địa chỉ *" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Hãy nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại *" />
              </Form.Item>
              <Form.Item
                name="birthday"
                label="Ngày sinh"
                rules={[{ required: true, message: "Hãy nhập ngày sinh!" }]}
              >
                {/* <Input placeholder="Nhập ngày sinh *" /> */}
                <DatePicker format="YYYY-MM-DD" needConfirm />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space className="full-width">
              <Button htmlType="submit" className="btnStyle">
                Đăng Ký
              </Button>
            </Space>
          </Form.Item>

          <p className="signin">
            Đã có tài khoản? <Link to="/Login">Đăng nhập</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
