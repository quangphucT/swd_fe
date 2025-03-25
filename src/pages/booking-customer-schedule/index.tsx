import { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Image, notification, Carousel } from "antd";
import { toast } from "react-toastify";
import api from "../../config/api";
import dayjs from "dayjs";
import "./index.scss";

const ScheduleCustomerBooking = () => {
    const [dataSchedule, setDataSchedule] = useState([]);
    const [bookingId, setBookingId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [dataNote, setDataNote] = useState({});

    const fetchDataScheduleBookingCustomer = async () => {
        try {
            const response = await api.get("Booking/GetCustomerAppointments");
    
            // Kiểm tra nếu có ghi chú từ bác sĩ
            const updatedData = await Promise.all(response.data.map(async (item) => {
                try {
                    const noteResponse = await api.get(`Booking/GetResultBooking/${item.bookingId}`);
                    return { ...item, hasNote: !!noteResponse.data.note };
                } catch {
                    return { ...item, hasNote: false };
                }
            }));
    
            setDataSchedule(updatedData);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    

    useEffect(() => {
        fetchDataScheduleBookingCustomer();
    }, []);

    const handleCancelBookingSchedule = (id) => {
        setBookingId(id);
        setOpenModal(true);
    };

    const handleConfirmCancel = async () => {
        try {
            await api.put(`Booking/CancelAppointment/${bookingId}`);
            toast.success("Hủy lịch hẹn thành công!");
            setOpenModal(false);
            setBookingId(null);
            fetchDataScheduleBookingCustomer();
        } catch (error) {
            notification.warning({
                message: "Bạn không thể hủy lịch hẹn",
                description: "Bạn cần liên hệ với nhân viên để hỗ trợ",
                duration: 5,
            });
            setOpenModal(false);
        }
    };

    const handleOpenModalDanhGia = async (id) => {
        setOpenNote(true);
        try {
            const response = await api.get(`Booking/GetResultBooking/${id}`);
            setDataNote(response.data);
        } catch (error) {
            notification.warning({
                message: "Bạn chưa có note từ bác sĩ",
                description: "Hãy check lại sau",
                duration: 5,
            });
        }
    };

    const handleCloseNoteModal = () => {
        setOpenNote(false);
    };

    const columns = [
        {
            title: "ID Lịch",
            dataIndex: "bookingId",
            key: "bookingId",
            align: "center",
        },
        {
            title: "Thời gian",
            dataIndex: "timeSlot",
            key: "timeSlot",
            render: (timeSlot) => dayjs(timeSlot).format("DD/MM/YYYY HH:mm"),
            align: "center",
        },
        {
            title: "Avatar chuyên viên",
            dataIndex: "doctorAvatar",
            key: "doctorAvatar",
            render: (doctorAvatar) => <Image src={doctorAvatar} alt="avatar-doctor" width={100} />,
            align: "center",
        },
        {
            title: "Tên chuyên viên",
            dataIndex: "fullName",
            key: "fullName",
            render: (_, record) => `${record.doctorFirstName} ${record.doctorLastName}`,
            align: "center",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status) => {
                let color = status === "Confirmed" ? "green" : status === "Pending" ? "gold" : "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Hành Động",
            dataIndex: "bookingId",
            key: "bookingId",
            align: "center",
            render: (id, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    {/* Ẩn nút nếu đã có ghi chú từ bác sĩ */}
                    {!record.hasNote && (
                        <Button
                            onClick={() => handleCancelBookingSchedule(id)}
                            className="button-cancel-schedule"
                            disabled={record.status === "Cancelled"}
                        >
                            Hủy lịch hẹn
                        </Button>
                    )}
                    <Button
                        onClick={() => handleOpenModalDanhGia(id)}
                        className="button-cancel-schedule"
                        disabled={record.status === "Cancelled"}
                    >
                        Xem ghi chú từ bác sĩ
                    </Button>
                </div>
            ),
        },
        
    ];

    return (
        <div className="schedule-container">
            <h2>Lịch Tư Vấn Cùng Chuyên Viên</h2>
           
          
            <Table
                dataSource={dataSchedule}
                columns={columns}
                rowKey="bookingId"
                pagination={{ pageSize: 5 }}
                bordered
            />

            <Modal
                title="Xác nhận hủy lịch"
                open={openModal}
                onOk={handleConfirmCancel}
                onCancel={() => setOpenModal(false)}
                okText="Xác nhận hủy"
                cancelText="Hủy bỏ"
            >
                <p className="modal-text">Bạn có chắc chắn muốn hủy lịch hẹn này không?</p>
            </Modal>

            <Modal
                title="Ghi chú từ bác sĩ"
                open={openNote}
                onCancel={handleCloseNoteModal}
                footer={[
                    <Button key="close" type="primary" onClick={handleCloseNoteModal}>Đóng</Button>
                ]}
                className="note-modal"
            >
                <div className="note-content">
                    <p><strong>Ghi chú:</strong> {dataNote.note}</p>
                    <p><strong>Đơn thuốc:</strong> {dataNote.prescription}</p>
                </div>
            </Modal>
        </div>
    );
};

export default ScheduleCustomerBooking;