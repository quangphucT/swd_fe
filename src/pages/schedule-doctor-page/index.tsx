import './index.scss';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import api from '../../config/api';

const ScheduleOfDoctor = () => {
    const [appointments, setAppointments] = useState([]);
    const [visible, setVisible] = useState(false)
    const [bookingId, setBookingId] = useState(null)
    const [form] = useForm();
    const fetchingData = async () => {
        try {
            const response = await api.get("Doctor/GetDoctorSchedule")
            setAppointments(response.data)
        } catch (error) {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchingData()
    }, []);

    const columns = [
        {
            title: 'Mã Đặt Lịch',
            dataIndex: 'bookingId',
            key: 'bookingId',
        },
        {
            title: 'Thời Gian',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
            render: (text) => new Date(text).toLocaleString()
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Mã Bệnh Nhân',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: '',
            dataIndex: 'bookingId',
            key: 'bookingId',
            render: (bookingId) => {
                return (
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Button style={{ fontSize: '15px', fontWeight: '500', height: '45px', border: '2px solid #ccc' }}>Xem thông tin bệnh nhân</Button>
                        <Button onClick={() => { handleOpenModal(bookingId) }} style={{ fontSize: '15px', fontWeight: '500', height: '45px', border: '2px solid #ccc' }}>Đánh giá</Button>
                    </div>
                )
            }
        }
    ];
    const handleOpenModal = (bookingId) => {
        setVisible(true)
        setBookingId(bookingId)
    }
    const handleCloseModal = () => {
        setVisible(false)
        form.resetFields();
        setBookingId(null)
    }
    const handleSubmit = async (values) => {
        console.log("VALUES:", values)
        try {
            const response = await api.put(`Doctor/UpdateBookingDetails/${bookingId}`, values)
            notification.success({
                message: "Thành công!",
                description: "Bạn đã tạo đánh giá thành công.",
                duration: 5,
            });
            form.resetFields();
            setBookingId(null);
            setVisible(false)
        } catch (error) {
            toast.error("Error")
        }
    }
    return (
        <div className="schedule-container">
            <h2>Lịch Khám Bệnh</h2>
            <Table dataSource={appointments} columns={columns} rowKey="bookingId" />
            <Modal
                title="Đánh giá tình trạng bệnh nhân"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Ghi chú"
                        name="note"
                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập ghi chú..." />
                    </Form.Item>

                    <Form.Item
                        label="Đơn thuốc"
                        name="prescription"
                        rules={[{ required: true, message: 'Vui lòng nhập đơn thuốc' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập đơn thuốc..." />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={() => { form.submit() }}>
                            Gửi đánh giá
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ScheduleOfDoctor;
