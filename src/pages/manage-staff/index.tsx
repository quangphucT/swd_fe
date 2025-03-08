import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Card, Typography, Row, Col, Table, Popconfirm, Image } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
import { useForm } from "antd/es/form/Form";

const { Title } = Typography;

const ManageStaff = () => {
    const [loading, setLoading] = useState(false);
    const [dataStaff, setDataStaff] = useState([])
    const [form] = useForm();
    const fetchDataStaff = async () => {
        try {
            const response = await api.get("Accounts/getAllStaff")
            setDataStaff(response.data.staff)
        } catch (error) {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchDataStaff();
    }, [])
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                birthday: values.birthday.format("YYYY-MM-DD"),
            };
            await api.post("Accounts/SignUpDoctor", formattedValues);
            toast.success("Tạo tài khoản nhân viên thành công!");
            form.resetFields();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (value) => <Image src={value} width={120} />
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return (
                    <Popconfirm onConfirm={() => { handleDeleteStaff(id) }} title="Bạn có chắc muốn xóa tài khoản này không?">
                        <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary">Block Staff</Button>
                    </Popconfirm>
                )
            }
        },

    ]
    const handleDeleteStaff = () => {

    }
    return (
        <div>
            <div className="manage-doctor-container">
                <Card className="manage-doctor-card">
                    <Title level={2} className="title">
                        <UserAddOutlined /> Tạo Tài Khoản Nhân viên
                    </Title>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ!" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" dependencies={["password"]} rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ngày sinh" name="birthday" rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}>
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="submit-btn">
                                Tạo tài khoản
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </div>
            <Table title={() => "Manage staff"} columns={columns} dataSource={dataStaff} />
        </div>
    );
};

export default ManageStaff;
