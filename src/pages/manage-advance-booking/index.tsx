import { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Popconfirm } from 'antd';
import api from '../../config/api';
import './index.scss';

const ManageAdvanceBooking = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('Appointment/GetAllAppointments');
            setAppointments(response.data);
        } catch (error) {
            message.error(error.response?.data || 'Lỗi khi lấy danh sách đặt lịch');
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleConfirm = async (id: number) => {
        try {
            await api.put(`Appointment/ConfirmAppointment/${id}`);
            message.success('Đã xác nhận lịch hẹn!');
            fetchAppointments();
        } catch (error) {
            message.error(error.response?.data || 'Lỗi khi xác nhận lịch hẹn');
        }
    };

    const handleCancel = async (id: number) => {
        try {
            await api.put(`Appointment/CancelAppointment/${id}`);
            message.success('Đã hủy lịch hẹn!');
            fetchAppointments();
        } catch (error) {
            message.error(error.response?.data || 'Lỗi khi hủy lịch hẹn');
        }
    };

    const statusColors: Record<string, string> = {
        Pending: 'orange',
        Confirmed: 'green',
        Canceled: 'red',
    };

    const columns = [
        {
            title: 'Mã Đặt Lịch',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã Người Dùng',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Mã Gói Khám',
            dataIndex: 'packageId',
            key: 'packageId',
        },
        {
            title: 'Ngày duyệt',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={statusColors[status] || 'blue'}>{status}</Tag>,
        },
        {
            title: 'Hành Động',
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    {record.status === 'Pending' && (
                        <Popconfirm
                            title="Bạn có chắc muốn xác nhận lịch hẹn này không?"
                            onConfirm={() => handleConfirm(record.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <Button type="primary">Xác nhận</Button>
                        </Popconfirm>
                    )}
                    {record.status !== 'Cancelled' && record.status !== 'Pending' && (
                        <Popconfirm
                            title="Bạn có chắc muốn hủy lịch hẹn này không?"
                            onConfirm={() => handleCancel(record.id)}
                            okText="Hủy lịch"
                            cancelText="Đóng"
                        >
                            <Button danger>Hủy</Button>
                        </Popconfirm>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="manage-advance-booking">
            <h2>Quản lý đặt lịch chuyên sâu</h2>
            <Table columns={columns} dataSource={appointments} rowKey="id" />
        </div>
    );
};

export default ManageAdvanceBooking;
