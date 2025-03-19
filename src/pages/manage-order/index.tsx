import { Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { formatMoneyToVND } from "../../currency/currency";


const ManageOrder = () => {
    const [data, setData] = useState([]);

    const fetchingData = async () => {
        try {
            const response = await api.get("Order");
            setData(response.data.items);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingData();
    }, []);



    const columns: Column[] = [
        {
            title: "OrderID",
            dataIndex: "orderID",
            key: "orderID",
        },
        {
            title: "ApplicationUserID",
            dataIndex: "applicationUserID",
            key: "applicationUserID",
        },
        {
            title: "OrderDate",
            dataIndex: "orderDate",
            key: "orderDate",
            render: (value) => dayjs(value).format("DD/MM/YYYY")
        },
        {
            title: "TotalAmount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (value) => formatMoneyToVND(value)
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",

        },
        {
            title: "CartId",
            dataIndex: "cartId",
            key: "cartId",

        },

    ];


    return <div className="manage-account">
        <div className="table-container">

            <Table title={() => "Manage Orders"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>


    </div>;
};

export default ManageOrder;
