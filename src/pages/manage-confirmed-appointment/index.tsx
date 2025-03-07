import { Button, Image, notification, Popconfirm, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";

const ManageConfirmedAppointments = () => {
    const [data, setData] = useState([]);

    const fetchingConfirmedAppointment = async () => {
        try {
            const response = await api.get("Staff/GetAllConfirmedAppointments");
            setData(response.data);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingConfirmedAppointment();
    }, []);


    const columns: Column[] = [
        {
            title: "BookingId",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "TimeSlot",
            dataIndex: "timeSlot",
            key: "timeSlot",
            render: (timeSlot) => dayjs(timeSlot).format("DD-MM-YYYY HH:mm")
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "CustomerId",
            dataIndex: "customerId",
            key: "customerId",
        },
        {
            title: "DoctorAvatar",
            dataIndex: "doctorAvatar",
            key: "doctorAvatar",
            render: (doctorAvatar) => <Image src={doctorAvatar} alt="image" width={150} />
        },
        {
            title: "Doctorname",
            dataIndex: "Doctorname",
            key: "Doctorname",
            render: (_, record) => `${record.doctorFirstName} ${record.doctorLastName}`,
            align: "center",
        },
        {
            title: "Action",
            dataIndex: "bookingId",
            key: "bookingId",
            render: (bookingId) => {
                return (
                    <div style={{ display: 'flex', gap: '20px' }}>


                        <Popconfirm onConfirm={() => { handleCancelBooking(bookingId) }} title="Bạn có chắc xác nhận lịch booking của customer?">
                            <button className="confirm-btn" >
                                Cancel Booking
                            </button>
                        </Popconfirm>

                    </div>
                );
            },
        },
    ];

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await api.put(`Staff/CancelAppointment/${bookingId}`)
            notification.success({
                message: "Thành công!",
                description: "Bạn đã hủy lịch hẹn thành công.",
                duration: 5,
            });
            fetchingConfirmedAppointment();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return <div className="manage-account">
        <div className="table-container">
            <Table title={() => "Manage confirmedAppointments"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>
    </div>;
};

export default ManageConfirmedAppointments;
