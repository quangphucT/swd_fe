import { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Col, Row } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/api';
import './index.scss';
import { formatMoneyToVND } from '../../currency/currency';
import { ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Carousel from '../../components/carousel-chuyen-sau';


const { Title } = Typography;

const BookingTakeCare = () => {
    const [combos, setCombos] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mySchedule, setMySchedule] = useState([]);
    const [visible, setVisible] = useState(false);
    const [comboDetails, setComboDetails] = useState(null);

    const fetchMySchedule = async () => {
        try {
            const response = await api.get("Appointment/GetMyTracking");
            setMySchedule(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const fetchAllCombos = async () => {
        try {
            const response = await api.get('Package/GetAllPackages');
            setCombos(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi lấy danh sách combo');
        }
    };

    useEffect(() => {
        fetchMySchedule();
        fetchAllCombos();
    }, []);

    const showConfirmModal = (combo) => {
        setSelectedCombo(combo);
        setIsModalVisible(true);
    };

    const handleBooking = async () => {
        if (!selectedCombo) return;
        try {
            await api.post("Appointment/CreateAppointment", {
                packageId: selectedCombo.id
            });
            toast.success(`Bạn đã chọn đặt lịch combo: ${selectedCombo.name}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi đặt lịch');
        }
        setIsModalVisible(false);
    };

    const handleShowDetailsPackage = async (record) => {
        try {
            const response = await api.get(`Package/GetPackageSessions/${record.id}`);
            setComboDetails(response.data[0]);
            setVisible(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi lấy chi tiết combo');
        }
    };

    const columns = [
        {
            title: 'Tên Combo',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{formatMoneyToVND(price)}</span>,
        },
        {
            title: 'Số Buổi',
            dataIndex: 'sessions',
            key: 'sessions',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={status === 'active' ? 'status-active' : 'status-inactive'}>
                    {status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            ),
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => showConfirmModal(record)}>
                        Đặt Lịch
                    </Button>
                    <Button onClick={() => handleShowDetailsPackage(record)}>
                        Xem Chi Tiết Từng Buổi
                    </Button>
                </Space>
            ),
        },
    ];

    const scheduleColumns = [
        {
            title: 'Tên combo',
            dataIndex: 'packageName',
            key: 'packageName'
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Khung Giờ',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={status === 'In Progress' ? 'status-active' : 'status-inactive'}>
                    {status === 'In Progress' ? 'Đang Tiến Hành' : 'Hoàn Thành'}
                </span>
            ),
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <Card className="booking-take-care">
            <Carousel />
            <Row gutter={30}>
                <Col span={17}>
                    <Title style={{ margin: '30px 0' }} level={2} className="title">Danh Sách Combo Chăm Sóc Da Chuyên Sâu</Title>
                    <Table columns={columns} dataSource={combos} rowKey="id" pagination={{ pageSize: 5 }} />
                </Col>
                <Col span={7}>
                    <Card style={{display: 'flex', alignItems: 'center', height: '100%'}} className="contact-info">
                        <Title style={{fontSize: '20px'}}>🏥 Trung tâm chăm sóc da</Title>
                        <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                        <p><strong>Hotline:</strong> 0335 784 107</p>
                    </Card>
                </Col>
            </Row>

            <Title level={2} className="title">Lịch trình điều trị của bạn 📅</Title>
            {mySchedule.length > 0 && (
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: '#ffebee',
                    color: '#d32f2f',
                    fontWeight: 'bold',
                    borderRadius: '8px'
                }}>
                    📞 Nếu bạn muốn hủy lịch trình, vui lòng liên hệ với chúng tôi qua hotline: <strong> 0335 784 107</strong>
                </p>

            )}
            <Table columns={scheduleColumns} dataSource={mySchedule} />

            {/* Modal Xác Nhận Đặt Lịch */}
            <Modal
                title="Xác Nhận Đặt Lịch"
                visible={isModalVisible}
                onOk={handleBooking}
                onCancel={() => setIsModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn đặt lịch combo: <strong>{selectedCombo?.name}</strong> không?</p>
            </Modal>

            {/* Modal Chi Tiết Combo */}
            {/* Modal Chi Tiết Combo */}
            {/* Modal Chi Tiết Combo */}
            <Modal
                title={<span style={{ fontWeight: 'bold', color: '#fff' }}>Chi Tiết Lịch Trình Của Mỗi Buổi</span>}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="close" type="primary" onClick={() => setVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={1000} // Mở rộng modal
            >
                {comboDetails ? (
                    <div className="combo-details">
                        <Title level={3} style={{ color: '#1e88e5', textAlign: 'center' }}>
                            {comboDetails.name}
                        </Title>
                        <Card bordered={false} className="combo-card">
                            <div className="session-container">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="session-item">
                                        <div className="session-header">
                                            <ClockCircleOutlined style={{ color: '#ff9800', marginRight: 8 }} />
                                            <strong>Buổi {i}:</strong>
                                        </div>
                                        <div className="session-info">
                                            <FileTextOutlined style={{ marginRight: 6 }} />
                                            <span>{comboDetails[`description${i}`] || 'Không có thông tin'}</span>
                                        </div>
                                        <div className="session-time">
                                            ⏰ {comboDetails[`timeSlot${i}`] || 'Chưa có'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                ) : (
                    <p>Không có thông tin chi tiết.</p>
                )}
            </Modal>


        </Card>
    );
};

export default BookingTakeCare;
