import {  Button, Image, notification, Popconfirm, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
// admin
const ManageCustomer = () => {
    const [data, setData] = useState([]);

    const fetchingDataAccount = async () => {
        try {
            const response = await api.get("Manager/GetAllCustomers");
            setData(response.data);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingDataAccount();
    }, []);

    // const toggleBlockStatus = (id) => {
    //     setData((prevData) =>
    //         prevData.map((item) =>
    //             item.id === id ? { ...item, isBlocked: !item.isBlocked } : item
    //         )
    //     );
    // };

    const columns: Column[] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (value) => <Image src={value} width={100} />,
        },
        {
            title: "Birthday",
            dataIndex: "birthday",
            key: "birthday",
            render: (value) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (id, record) => {
                return (
                    <div>
                        {record.status === "Active" ?  <Popconfirm onConfirm={() => { handleDeleteStaff(id) }} title="Bạn có chắc muốn Block tài khoản này không?">
                            <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary">Block Staff</Button>
                        </Popconfirm> :  <Popconfirm onConfirm={() => { handleDeleteStaff(id) }} title="Bạn có chắc muốn UnBlock tài khoản này không?">
                            <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary" danger>UnBlock Staff</Button>
                        </Popconfirm>}
                       
                    </div>

                )
            },
        },
    ];
    const handleDeleteStaff = async (id) => {
        try {
           const response = await api.put(`Manager/ToggleUserStatus/${id}`)
            notification.success({
                message: "Thành công!",
                description: response.data.message,
                duration: 5,
            });
            fetchingDataAccount();
        } catch (error) {
            toast.error("error")
        }
    }
    return <div className="manage-account">
        <div className="table-container">
            <Table title={() => "Danh sách khách hàng ( MANAGER )"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>
    </div>;
};

export default ManageCustomer;
