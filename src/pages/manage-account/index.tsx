import { Button, Image, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";

const ManageCustomer = () => {
    const [data, setData] = useState([]);

    const fetchingDataAccount = async () => {
        try {
            const response = await api.get("Accounts/GetAllAccount");
            setData(response.data);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingDataAccount();
    }, []);

    const toggleBlockStatus = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, isBlocked: !item.isBlocked } : item
            )
        );
    };

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
                        {record.isBlocked ? (
                            <button className="unblock-btn" onClick={() => toggleBlockStatus(id)}>
                                Unblock
                            </button>
                        ) : (
                            <button className="block-btn" onClick={() => toggleBlockStatus(id)}>
                                Block Account
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];

    return <div className="manage-account">
        <div className="table-container">
            <Table title={() => "Manage Customer"} columns={columns} dataSource={data}  scroll={{ x: "max-content" }}/>
        </div>
    </div>;
};

export default ManageCustomer;
