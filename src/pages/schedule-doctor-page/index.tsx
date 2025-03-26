import './index.scss';
import { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Modal, notification, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import api from '../../config/api';
import { debounce } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';

const ScheduleOfDoctor = () => {
    const [appointments, setAppointments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [searchPhone, setSearchPhone] = useState('');

    const [form] = useForm();

    // 🔹 Hàm tìm kiếm bệnh nhân theo số điện thoại
    const fetchCustomerByPhone = async (phone) => {
        if (!phone) {
            fetchingData(); // Nếu không nhập số, tải lại danh sách tất cả lịch khám
            return;
        }
        try {
            const response = await api.get(`Doctor/SearchBookingByPhone?phoneNumber=${phone}`);
            setAppointments(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Không tìm thấy bệnh nhân.");
            setAppointments([]);
        }
    };

    // 🔹 Lấy toàn bộ lịch khám của bác sĩ
    const fetchingData = async () => {
        try {
            const response = await api.get("Doctor/GetDoctorSchedule");
            setAppointments(response.data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách lịch khám.");
        }
    };

    useEffect(() => {
        fetchingData();
    }, []);

    // 🔹 Xử lý nhập số điện thoại với debounce (tránh gọi API liên tục)
    const handleSearchChange = debounce((value) => {
        setSearchPhone(value);
        fetchCustomerByPhone(value);
    }, 500); // Độ trễ 500ms

    // 🔹 Cấu hình bảng hiển thị danh sách lịch khám
    const columns = [
        { title: 'Mã Đặt Lịch', dataIndex: 'bookingId', key: 'bookingId' },
        {
            title: 'Thời Gian',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
            render: (text) => new Date(text).toLocaleString()
        },
        { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
        { title: 'Mã Bệnh Nhân', dataIndex: 'customerId', key: 'customerId' },
        { title: 'Tên Bệnh Nhân', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Số Điện Thoại Bệnh Nhân', dataIndex: 'customerPhone', key: 'customerPhone' },
        {
            title: 'Avatar Bệnh Nhân',
            dataIndex: 'customerAvatar',
            key: 'customerAvatar',
            render: (customerAvatar) => (
                <Image src={customerAvatar} width={80} alt='Avatar' />
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'bookingId',
            key: 'bookingId',
            render: (bookingId) => (
                <Button onClick={() => handleOpenModal(bookingId)}>Đánh giá</Button>
            )
        }
    ];

    // 🔹 Mở modal đánh giá
    const handleOpenModal = (bookingId) => {
        setVisible(true);
        setBookingId(bookingId);
    };

    // 🔹 Đóng modal
    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
        setBookingId(null);
    };

    // 🔹 Gửi đánh giá
    const handleSubmit = async (values) => {
        try {
            await api.put(`Doctor/UpdateBookingDetails/${bookingId}`, values);
            notification.success({
                message: "Thành công!",
                description: "Bạn đã tạo đánh giá thành công.",
                duration: 5,
            });
            form.resetFields();
            setBookingId(null);
            setVisible(false);
        } catch (error) {
            toast.error("Lỗi khi gửi đánh giá.");
        }
    };

    return (
        <div className="schedule-container">
            <h2>Lịch Khám Bệnh</h2>

            {/* 🔹 Thanh tìm kiếm số điện thoại */}
            {/* 🔹 Thanh tìm kiếm được cải tiến */}
            <div className="search-bar">
                <p className="search-label">🔍 Tìm kiếm thông tin bệnh nhân</p>
                <Input
                    placeholder="Nhập số điện thoại bệnh nhân..."
                    prefix={<SearchOutlined style={{ color: '#1e88e5' }} />}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* 🔹 Bảng lịch khám */}
            <Table dataSource={appointments} columns={columns} rowKey="bookingId" />

            {/* 🔹 Modal đánh giá bệnh nhân */}
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
                        <Button type="primary" onClick={() => form.submit()}>
                            Gửi đánh giá
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ScheduleOfDoctor;
