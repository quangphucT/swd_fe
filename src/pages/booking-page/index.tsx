import { useEffect, useState } from 'react';
import { Select, Card, Button, Modal, notification, Col, Row, Avatar, Carousel, Image } from 'antd';
import Carousels from '../../components/carousel-chuyen-sau';
import { toast } from 'react-toastify';
import api from '../../config/api';
import dayjs from 'dayjs';
import './index.scss';

const BookingPage = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [dataDoctor, setDataDoctor] = useState([]);
    const [slotList, setSlotList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchingDataDoctor = async () => {
        try {
            const response = await api.get("Booking/GetAllDoctors");
            // Lọc danh sách chỉ lấy chuyên viên có email chứa "chuyenvien"
            const filteredDoctors = response.data.filter(doctor => doctor.email.includes("chuyenvien"));
            setDataDoctor(filteredDoctors);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const fetchSlotfromDoctorId = async () => {
        if (!selectedDoctor) return;
        try {
            const response = await api.get(`Booking/GetAvailableBookings/${selectedDoctor}`);
            const validSlots = response.data.filter(slot =>
                dayjs(slot.timeSlot).isAfter(dayjs())
            );
            setSlotList(validSlots);
        } catch (error) {
            toast.error("Không thể tải danh sách lịch trống.");
        }
    };

    const handleOk = async () => {
        try {
            await api.post("Booking/RequestAppointment", { bookingId: selectedSlot });
            notification.success({
                message: "Thành công!",
                description: "Bạn đã đặt lịch hẹn thành công.",
                duration: 5,
            });
            setIsModalOpen(false);
            setSelectedSlot(null);
            fetchSlotfromDoctorId();
        } catch (error) {
            toast.error(error.response?.data?.message || "Đặt lịch thất bại!");
        }
    };

    useEffect(() => {
        fetchingDataDoctor();
    }, []);

    useEffect(() => {
        fetchSlotfromDoctorId();
    }, [selectedDoctor]);

    return (
        <div className="booking-container">
           <div style={{width: '1200px', margin: '0px auto', paddingBottom: '50px'}}>
           <Carousels  />
           </div>
            <Row gutter={24}>
                <Col span={5}>
                    <h3>🩺 Chọn bác sĩ</h3>
                    <div className="doctor-list">
                        {dataDoctor.map((doctor) => (
                            <Card
                                key={doctor.id}
                                className={`doctor-card ${selectedDoctor === doctor.id ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedDoctor(doctor.id);
                                    setSelectedSlot(null);
                                }}
                            >
                                <Avatar
                                    size={64}
                                    src={doctor.avatar || "https://via.placeholder.com/64"}
                                    alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                                />
                                <p>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</p>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col span={19}>
                    <div>
                        <h2>📅 Đặt lịch khám</h2>
                        {selectedSlot && (
                            <Button onClick={() => setIsModalOpen(true)} type="primary" className="confirm-button">
                                ✅ Xác nhận lịch hẹn
                            </Button>
                        )}
                    </div>
                    {selectedDoctor ? (
                        <div className="slots-container">
                            <h3>Danh sách lịch trống</h3>
                            <div className="slots">
                                {slotList.length > 0 ? (
                                    slotList.map((slot) => {
                                        const startTime = dayjs(slot.timeSlot);
                                        const endTime = startTime.add(1, 'hour');

                                        return (
                                            <Card
                                                key={slot.bookingId}
                                                className={`slot-card ${selectedSlot === slot.bookingId ? 'selected' : ''}`}
                                                onClick={() => setSelectedSlot(slot.bookingId)}
                                            >
                                                {startTime.format("📅 DD-MM-YYYY ⏰ hh:mm A")} - {endTime.format("hh:mm A")}
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <p>Không có lịch trống.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Vui lòng chọn bác sĩ để xem lịch trống.</p>
                    )}
                    <Modal
                        title="🔔 Xác nhận đặt lịch"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="✅ Xác nhận đặt lịch"
                        cancelText="❌ Hủy"
                    >
                        <p style={{ fontSize: '16px' }}>📌 Bạn có chắc chắn muốn đặt lịch hẹn với khung giờ này không?</p>
                    </Modal>
                </Col>
            </Row>
        </div>
    );
};

export default BookingPage;
