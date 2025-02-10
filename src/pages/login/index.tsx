import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { signInWithPopup } from "firebase/auth";
import api from "../../config/api";
import { login } from "../../redux/features/userSlice";
import { auth, provider } from "../../config/firebase";

function LoginPopup() {
  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("Accounts/SignIn", values);
      if (response?.data) {
        const user = response.data;
        dispatch(login(user));
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.roleEnum);
        toast.success("Login success");

        switch (user.roleEnum) {
          case "STAFF":
            navigate("/staff");
            break;
          case "MANAGER":
            navigate("/manager");
            break;
          case "ADMIN":
            navigate("/admin");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      toast.error(navigator.onLine ? "Login failed" : "No internet connection");
      form.resetFields();
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          const response = await api.post("/loginGG", {
            token: await result.user.getIdToken(),
          });

          if (response?.data) {
            const user = response.data;
            dispatch(login(user));
            localStorage.setItem("token", user.token);
            localStorage.setItem("role", user.role);
            toast.success("Login success");
            navigate("/");
          } else {
            toast.error("Invalid response from server");
          }
        } catch {
          toast.error("Login with Google failed");
        }
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="loginPage">
      <div className="loginPage__left">
        <h2>Đăng Nhập</h2>
        <Form onFinish={onFinish} form={form} layout="vertical" autoComplete="off">
          <Form.Item name="email" rules={[{ required: true, message: "Hãy nhập tên người dùng!" }]}>
            <Input placeholder="Tên đăng nhập *" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}>
            <Input.Password className="passwordcss" placeholder="Mật khẩu *" />
          </Form.Item>
          <span onClick={() => navigate("/forget-password")} className="forget-password">
            Quên Mật Khẩu?
          </span>
          <Form.Item>
            <Button htmlType="submit" className="btnStyle">Đăng Nhập</Button>
          </Form.Item>
          <div className="or-divider"><span>Or</span></div>
          <Form.Item>
            <Button onClick={handleLoginGoogle} className="google-button">
              <img src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK" alt="Google" />
              Đăng nhập bằng Google
            </Button>
          </Form.Item>
        </Form>
        <p className="login-footer">
          Bạn không có tài khoản? <Link to="/register">Đăng kí</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPopup;
