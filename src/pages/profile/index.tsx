import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Row,
  Col,
  GetProp,
  UploadProps,
  UploadFile,
  Image,
} from "antd";
import {
  UploadOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/userSlice";
import "./index.scss";
const Profile: React.FC = () => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu người dùng từ Redux store
  const userData = useSelector(selectUser);
  const user = userData?.user; // Lấy thông tin user bên trong
  console.log("User in Profile:", user);

  const handleLogout = () => {
    dispatch(logout()); // Xóa user khỏi Redux store
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    localStorage.removeItem("role"); // Xóa vai trò
    message.success("Bạn đã đăng xuất!");
    navigate("/login"); // Chuyển về trang login
  };
  const handleHome = () => {
    navigate("/");
  };
  const onFinish = (values: any) => {
    console.log("Updated Profile:", values);
    message.success("Cập nhật thông tin thành công!");
  };

  return (
    <div className="profile-page">
      <h2 style={{ textAlign: "center" }}>Thông tin cá nhân</h2>

      {/* Upload Avatar */}
      <div className="image-upload"
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 ,}}
      >
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={1} // Chỉ cho phép upload 1 ảnh
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>

      {/* Kiểm tra nếu user đã đăng nhập */}

      <Form
        layout="vertical"
        initialValues={{ ...user, birthday: dayjs(user.birthday) }}
        onFinish={onFinish}
        className="form-user"
      >
        <Row gutter={24}>
          {/* Cột 1 */}
          <Col xs={24} md={12}>
            <Form.Item label="Tên tài khoản" name="userName">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
          </Col>
          {/* Cột 2 */}
          <Col xs={24} md={12}>
            <Form.Item label="Ngày sinh" name="birthday">
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs(user.birthday)}
              />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input />
            </Form.Item>
            <div className="Name">
              <Form.Item label="Họ" name="firstName" style={{ flex: 1 }}>
                <Input />
              </Form.Item>
              <Form.Item label="Tên" name="lastName" style={{ flex: 1 }}>
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/* Nút Save */}
        <Form.Item>
          <div className="button-left">
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              Lưu thay đổi
            </Button>
            <Button onClick={handleLogout} danger icon={<LogoutOutlined />}>
              Đăng xuất
            </Button>
            <Button
              type="default"
              className="ant-btn-default"
              onClick={handleHome}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
