import React, { useEffect, useState } from "react";
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
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import api from "../../config/api";
import { uploadImageToCloudinary } from "../../utils/upload";
import { showSuccessToast } from "../../config/configToast";
import { removeInformation } from "../../redux/feature/userSlice";

const Profile: React.FC = () => {
  // Kiểu cho File
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  // State preview ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // State lưu danh sách file ảnh upload (AntD)
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // State lưu dữ liệu người dùng
  const [data, setData] = useState<any>({});
  // State/form control của AntD
  const [form] = Form.useForm();
  // Thêm state để lưu URL ảnh (avatar)
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  // Lấy user từ Redux

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu tài khoản từ API
  const fetchAccountData = async () => {
    try {
      const response = await api.get("Accounts/GetCurrentAccount");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Gọi fetchAccountData khi component mount
  useEffect(() => {
    fetchAccountData();
  }, []);

  // Khi `data` thay đổi => set giá trị form
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        email: data.email,
        address: data.address,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday ? dayjs(data.birthday) : null,
        avatar: data.avatar, // server có thể trả về link ảnh cũ (nếu có)
      });
      // Nếu server trả về link ảnh => set vào state để hiển thị
      if (data.avatar) {
        setAvatarUrl(data.avatar);
        // Đồng thời hiển thị fileList để preview
        setFileList([
          {
            uid: "-1",
            name: "avatar",
            url: data.avatar,
          },
        ]);
      }
    }
  }, [data, form]);

  // Hàm đọc file thành base64 để preview
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  // Xử lý preview khi click vào ảnh
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  // Xử lý khi thay đổi fileList (AntD)
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  // Hàm upload ảnh lên Cloudinary
  const handleFileUpload = async ({ file }: { file: File }) => {
    const imageUrl = await uploadImageToCloudinary(file);
    if (imageUrl) {
      message.success("Upload ảnh thành công!");
      // Cập nhật fileList để hiển thị
      setFileList([{ uid: "-1", name: file.name, url: imageUrl }]);
      // Lưu URL ảnh vào state
      setAvatarUrl(imageUrl);
      // Lưu luôn vào Form field "avatar"
      form.setFieldsValue({ avatar: imageUrl });
    } else {
      message.error("Upload ảnh thất bại, vui lòng thử lại!");
    }
  };

  // Hàm logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeInformation())
    message.success("Bạn đã đăng xuất!");
    navigate("/login");
  };

  // Nút quay lại
  const handleHome = () => {
    navigate("/");
  };

  // Hàm xử lý khi form submit
  const onFinish = async (values: any) => {
    try {
      console.log("Form values:", values);
      // Gọi API update
      await api.put("/Accounts/UpdateAccountInfo", values);
      showSuccessToast("Update success");
      message.success("Cập nhật thông tin thành công!");
      // Fetch lại dữ liệu mới
      fetchAccountData();
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật!");
      console.error(error);
    }
  };

  return (
    <div className="profile-page">
      <h2 style={{ textAlign: "center" }}>Thông tin cá nhân</h2>
      {/* Upload Avatar */}
      <div
        className="image-upload"
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <Upload
          className="custom-upload"
          customRequest={({ file }) => handleFileUpload({ file: file as File })}
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={1}
        >
          {fileList.length >= 1 ? null : (
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          )}
        </Upload>
        {/* Preview khi click vào ảnh */}
        {previewImage && (
          <Image
            style={{ width: "200% ", height: "200%" }}
            className="custom-image"
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

      {/* Form hiển thị thông tin người dùng */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="form-user"
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Tên" name="lastName">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ngày sinh" name="birthday">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Họ" name="firstName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Trường ẩn để giữ URL avatar, nếu cần */}
        <Form.Item name="avatar" style={{ display: "none" }}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item>
          <div className="button-left">
            {/* Khi bấm "Lưu thay đổi", form sẽ gọi onFinish */}
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
