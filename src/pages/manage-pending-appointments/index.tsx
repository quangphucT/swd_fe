import { Button, Image, notification, Popconfirm, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";

const ManagePendingAppointments = () => {
    const [data, setData] = useState([]);

    const fetchingPendingAppointment = async () => {
        try {
            const response = await api.get("Staff/GetPendingAppointments");
            setData(response.data);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingPendingAppointment();
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


                        <Popconfirm onConfirm={() => { handleConfirmBooking(bookingId) }} title="Bạn có chắc xác nhận lịch booking của customer?">
                            <button className="confirm-btn" >
                                Confirm Booking
                            </button>
                        </Popconfirm>

                    </div>
                );
            },
        },
    ];

    const handleConfirmBooking = async (bookingId) => {
        try {
            const response = await api.put(`Staff/ConfirmAppointment/${bookingId}`)
            notification.success({
                message: "Thành công!",
                description: "Bạn đã confirm lịch hẹn thành công.",
                duration: 5,
            });
            fetchingPendingAppointment();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return <div className="manage-account">
        <div className="table-container">
            <Table title={() => "Manage pendingAppointments"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>
    </div>;
};

export default ManagePendingAppointments;
