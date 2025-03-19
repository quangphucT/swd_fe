import { useState } from "react";
import { Form, Input, Button,  message } from "antd";

import "./index.scss";
import api from "../../config/api";
const UpdateAccountProfile = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.put("Accounts/UpdateAccountInfo", values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-account-profile">
      <h2>Update Profile</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}> 
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}> 
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> 
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}> 
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item name="birthday" label="Birthday">
          <Input type="date" />
        </Form.Item>

        <Form.Item name="avatar" label="Avatar">
           <Input placeholder="Upload url image"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAccountProfile;