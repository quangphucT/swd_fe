import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

import { useForm } from "antd/es/form/Form";
import { signInWithPopup } from "firebase/auth";
import api from "../../config/api";

import { auth, provider } from "../../config/firebase";
import { showSuccessToast } from "../../config/configToast";
import { useDispatch } from "react-redux";
import { saveInformation } from "../../redux/feature/userSlice";
import { useEffect } from "react";

function LoginPopup() {
  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("Accounts/SignIn", values);
      if (response?.data) {
        const user = response.data;
        const userRole = user.user.roles?.[0] || "USER";
        dispatch(saveInformation(user));
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", userRole);
        console.log(response);
        showSuccessToast("Login success");

        switch (userRole) {
          case "Staff":
            navigate("/dashboard");
            break;
          case "Manager":
            navigate("/dashboard");
            break;
          case "Admin":
            navigate("/dashboard");
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

  //const handleLoginGoogle = () => {
  // signInWithPopup(auth, provider)
  //   .then(async (result) => {
  //     try {
  //       const response = await api.post("/loginGG", {
  //         token: await result.user.getIdToken(),
  //       });

  //       if (response?.data) {
  //         const user = response.data;

  //         localStorage.setItem("token", user.token);
  //         localStorage.setItem("role", user.role);
  //         toast.success("Login success");
  //         navigate("/");
  //       } else {
  //         toast.error("Invalid response from server");
  //       }
  //     } catch {
  //       toast.error("Login with Google failed");
  //     }
  //   })
  //   .catch(() => toast.error("Google login failed"));
  //};

  // Xử lý đăng nhập bằng Google
  const handleLoginGoogle = () => {
    window.location.href = "https://localhost:7004/api/Accounts/login-google";
  };

  // Lấy token từ URL sau khi Google xác thực thành công
  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await api.get("/Accounts/signin-google");
          console.log(response);
          if (response.data.token) {
            const token = response.data.token;

            localStorage.setItem("token", token);
            dispatch(saveInformation(response.data));
            navigate("/home");

            showSuccessToast("Đăng nhập Google thành công");
          } else {
            toast.error("Không nhận được token từ server");
          }
        } catch (error) {
          console.error("Lỗi khi lấy token:", error);
          toast.error("Lỗi khi xác thực Google");
        }
      }
    };

    fetchToken();
  }, [dispatch, navigate]);

  return (
    <div className="loginPage">
      <div className="loginPage__left">
        <h2>Đăng Nhập</h2>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên người dùng!" }]}
          >
            <Input placeholder="Tên đăng nhập *" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password className="passwordcss" placeholder="Mật khẩu *" />
          </Form.Item>
          <span
            onClick={() => navigate("/forget-password")}
            className="forget-password"
          >
            Quên Mật Khẩu?
          </span>
          <Form.Item>
            <Button htmlType="submit" className="btnStyle">
              Đăng Nhập
            </Button>
          </Form.Item>
          <div className="or-divider">
            <span>Or</span>
          </div>
          <Form.Item>
            <Button onClick={handleLoginGoogle} className="google-button">
              <img
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                alt="Google"
              />
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
