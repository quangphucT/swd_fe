import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";
//import { useDispatch } from "react-redux";
// import api from "../../config/api";

// import { auth, googleProvider } from "../../config/firebase";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LoginPopup() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

    const onFinish = async (values:any ) => {
      try {
        const response = await api.post("/login", values);
        if (response && response.data) {
          const user = response.data;
          console.log(user);
          //dispatch(login(user));
          localStorage.setItem("token", user.token); // Save token to localStorage
          localStorage.setItem("role", user.roleEnum); // Save role to localStorage
          toast.success("Login success");
          if (user.roleEnum === "STAFF") {
            navigate("/staff");
          } else if (user.roleEnum === "MANAGER") {
            navigate("/manager");
          } else if (user.roleEnum === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Invalid response from server");
        }
      } catch (error :any) {
        if (!navigator.onLine) {
          toast.error("No internet connection");
        } else {
          toast.error("Login failed");
          console.log(error.response ? error.response.data.error : error.message);
        }
        form.resetFields();
      }
    };

  //   const handleLoginGoogle = () => {
  //     signInWithPopup(auth, googleProvider)
  //       .then(async (result) => {
  //         const token = result.user.accessToken;
  //         try {
  //           const response = await api.post("/loginGG", { token: token });
  //           console.log(response.data)
  //           if (response && response.data) {
  //             const user = response.data;
  //             dispatch(login(user));
  //             localStorage.setItem("token", user.token); // Save token to localStorage
  //             localStorage.setItem("role", user.role); // Save role to localStorage
  //             toast.success("Login success");
  //             navigate("/");
  //           } else {
  //             toast.error("Invalid response from server");
  //           }
  //         } catch (error) {
  //           toast.error("Login with Google failed");
  //           console.log(
  //             error.response ? error.response.data.error : error.message
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error("Google login failed");
  //         console.log(error);
  //       });
  //   };

  return (
    <div className="loginPage">
      <div className="loginPage__left ">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            paddingLeft: "100px",
          }}
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <h2
            style={{ textAlign: "start", fontSize: "40px", fontWeight: "1000" }}
          >
            Đăng Nhập
          </h2>
          <Form.Item
            name="Username"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên người dùng!",
              },
            ]}
          >
            <Input
              
              placeholder="Tên đăng nhập *"
            />
          </Form.Item>
          <div>
            <Form.Item
              name="Password"
              style={{ marginBottom: "10px"}}
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                className="passwordcss"
                placeholder="Mật khẩu *"
              />
            </Form.Item>
            <div>
              <span
                onClick={() => navigate("/forget-password")}
                style={{ cursor: "pointer" }}
                className="forget-password"
              >
                Quên Mật Khẩu?
              </span>
            </div>
          </div>

          <Form.Item>
            <Space>
              <Button
                htmlType="submit"
                className="btnStyle"
                //form={form}
                onClick={() => form.submit()}
              >
                Đăng Nhập
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <div className="or-divider">
              <span className="or-text">Or</span>
            </div>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                //onClick={handleLoginGoogle}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  borderRadius: "20px",
                }}
                //form={form}
              >
                <img
                  width={30}
                  src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                  alt=""
                />
                Đăng nhập bằng Google
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <p className="login-footer">
          Bạn không có tài khoản? <Link to="/register">Đăng kí</Link>
        </p>
      </div>
      <div className="loginPage__right">
        <img src="/img/login.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPopup;
