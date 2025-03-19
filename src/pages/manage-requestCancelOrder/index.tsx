import { Table, Button, Tag, Popconfirm } from "antd";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import api from "../../config/api";
import { formatMoneyToVND } from "../../currency/currency";

const ManageRequestCancelOrder = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get("Order/GetAllOrdersByCancelStatus");
            setData(response.data);
        } catch (error) {
            toast.error(error.response?.data || "Error fetching data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefundOrder = async (orderID: number) => {
        try {
            await api.put(`Order/ConfirmCancelStatusOrder/${orderID}`);
            toast.success("Order has been refunded successfully!");
            fetchData();
        } catch (error) {
            toast.error(error.response?.data || "Error processing refund");
        }
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderID",
            key: "orderID",
        },
        {
            title: "User ID",
            dataIndex: "applicationUserID",
            key: "applicationUserID",
        },
        {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
            render: (value) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (value) => formatMoneyToVND(value),
        },
        {
            title: "Refunded",
            dataIndex: "isRefunded",
            key: "isRefunded",
            render: (isRefunded) => (
                <Tag color={isRefunded ? "green" : "red"}>
                    {isRefunded ? "Refunded" : "Not Refunded"}
                </Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "canceled" ? "orange" : "default"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record) =>
                !record.isRefunded ? (
                    <Popconfirm
                        title="Confirm refund for this order?"
                        onConfirm={() => handleRefundOrder(record.orderID)}
                    >
                        <Button type="primary">Refund Order</Button>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="orderID"
                title={() => "Quản lý đơn hàng yêu cầu hủy ( STAFF )"}
            />
        </div>
    );
};

export default ManageRequestCancelOrder;
