import { Button, Modal, Popconfirm, Table } from 'antd';
import './index.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/api';

const ManageConfirmAdvanceBooking = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false)
    const [visibleDescription, setVisibleDescription] = useState(null);
    const fetchingData = async () => {
        try {
            const response = await api.get("Appointment/GetConfirmedAppointmentsWithTracking");
            setData(response.data);
        } catch (error) {
            toast.error(error.response?.data || "Có lỗi xảy ra khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        fetchingData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'appointmentId',
            key: 'appointmentId',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Gói dịch vụ',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Ngày confirm',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Lịch trình',
            dataIndex: 'packageTracking',
            key: 'packageTracking',
            render: (packageTracking) => (
                <Table
                    columns={trackingColumns}
                    dataSource={packageTracking.map((t, index) => ({ ...t, key: index }))}
                    pagination={false}
                    size="small"
                />
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'appointmentId',
            key: 'appointmentId',
            render: (appointmentId) => {
                return (
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => { handleDeleteId(appointmentId) }}> <Button type='primary' style={{ height: '45px' }}>Xóa</Button></Popconfirm>
                )
            }
        },
    ];

    const trackingColumns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Khung giờ',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <>
                    {text ? (
                        text.length > 10 ? (
                            <>
                                {text.slice(0, 10)}...
                                <Button type="link" onClick={() => setVisibleDescription(record)}>Xem thêm</Button>
                            </>
                        ) : (
                            text
                        )
                    ) : (
                        <i>CHưa có mô tả</i>
                    )}
                </>
            ),
        },
    ];

    const handleDeleteId = async (id) => {
        try {
            await api.delete(`Appointment/DeleteCompletedAppointment/${id}`)
            toast.success("Xóa thành công")
            fetchingData();
        } catch (error) {
            toast.error("Không thể xóa do còn lộ trình chưa hoàn thành")
        }
    }
    return (
        <div>
            <Table columns={columns} dataSource={data.map(item => ({ ...item, key: item.appointmentId }))} />
      
            <Modal
                title="Chi tiết mô tả"
                open={!!visibleDescription}
                onCancel={() => setVisibleDescription(null)}
                footer={null}
            >
                <textarea
                    value={visibleDescription?.description || ''}
                    rows={5}
                    style={{ width: '100%' }}
                    readOnly
                />
            </Modal>
        </div>
    );
};

export default ManageConfirmAdvanceBooking;
