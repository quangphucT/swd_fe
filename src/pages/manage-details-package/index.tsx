import { toast } from 'react-toastify';
import './index.scss';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import api from '../../config/api';
import { useForm } from 'antd/es/form/Form';

const ManageDetailsPackage = () => {
    const [form] = useForm();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const fetchingGetAllPackingSession = async () => {
        try {
            const response = await api.get('Package/GetAllPackageSessions');
            setData(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi lấy dữ liệu');
        }
    };

    useEffect(() => {
        fetchingGetAllPackingSession();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'COMBO ID',
            dataIndex: 'packageId',
            key: 'packageId',
            width: 100,
        },
        {
            title: 'Buổi 1',
            dataIndex: 'timeSlot1',
            key: 'timeSlot1',
        },
        {
            title: 'Buổi 2',
            dataIndex: 'timeSlot2',
            key: 'timeSlot2',
        },
        {
            title: 'Buổi 3',
            dataIndex: 'timeSlot3',
            key: 'timeSlot3',
        },
        {
            title: 'Buổi 4',
            dataIndex: 'timeSlot4',
            key: 'timeSlot4',
        },
        {
            title: 'Mô tả buổi 1',
            dataIndex: 'description1',
            key: 'description1',
        },
        {
            title: 'Mô tả buổi 2',
            dataIndex: 'description2',
            key: 'description2',
        },
        {
            title: 'Mô tả buổi 3',
            dataIndex: 'description3',
            key: 'description3',
        },
        {
            title: 'Mô tả buổi 4',
            dataIndex: 'description4',
            key: 'description4',
        },
        {
            title: 'Action',
            dataIndex: 'packageId',
            key: 'packageId',
            render: (_, record) => {
                return (
                    <Button type='primary' onClick={() => { setOpen(true); form.setFieldsValue(record) }}>Cập nhật</Button>
                )
            }
        },
    ];
    const handleSubmit = async (values) => {
        try {
            await api.put(`Package/UpdatePackageSession/${values.packageId}`, values);
            toast.success("Cập nhật thành công!")
            setOpen(false);
            form.resetFields();
            fetchingGetAllPackingSession();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="manage-details-package">
            <h2>Quản lý chi tiết gói khám</h2>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />
            <Modal onOk={() => { form.submit() }} open={open} title="Cập nhật thông tin" onCancel={() => { setOpen(false); form.resetFields() }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="packageId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian buổi 1" name="timeSlot1" rules={[{ required: true, message: 'Vui lòng nhập thời gian buổi 1' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian buổi 2" name="timeSlot2" rules={[{ required: true, message: 'Vui lòng nhập thời gian buổi 2' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian buổi 3" name="timeSlot3" rules={[{ required: true, message: 'Vui lòng nhập thời gian buổi 3' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian buổi 4" name="timeSlot4" rules={[{ required: true, message: 'Vui lòng nhập thời gian buổi 4' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả buổi 1" name="description1">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Mô tả buổi 2" name="description2">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Mô tả buổi 3" name="description3">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Mô tả buổi 4" name="description4">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageDetailsPackage;
