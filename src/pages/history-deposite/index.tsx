import { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import api from '../../config/api';
import './index.scss';

const HistoryDeposite = () => {
    const [data, setData] = useState([]);

    // Fetch data từ API
    const fetchDataDepositeHistory = async () => {
        try {
            const response = await api.get("Transaction/UserTransactions");
            setData(response.data);
        } catch (error) {
            message.error("Lỗi khi tải dữ liệu lịch sử giao dịch!");
        }
    };

    useEffect(() => {
        fetchDataDepositeHistory();
    }, []);

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: 'Mã Giao Dịch',
            dataIndex: 'transactionId',
            key: 'transactionId',
            render: (id: number) => <strong>#{id}</strong>,
        },
        {
            title: 'Loại Giao Dịch',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <Tag color={type === "Deposit" ? "green" : "red"}>
                    {type === "Deposit" ? "Nạp Tiền" : "Rút Tiền"}
                </Tag>
            ),
        },
        {
            title: 'Ngân Hàng',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Số Tài Khoản',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
        {
            title: 'Số Tiền (VND)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <strong>{amount.toLocaleString()} đ</strong>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'transactionEnum',
            key: 'transactionEnum',
            render: (status: string) => {
                let color = status === "Completed" ? "blue" : status === "Pending" ? "orange" : "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Ngày Giao Dịch',
            dataIndex: 'createdTransaction',
            key: 'createdTransaction',
            render: (date: string) => new Date(date).toLocaleString(),
        },
    ];

    return (
        <div className="transaction-history">
            <h2>Lịch Sử Nạp Tiền</h2>
            <Table columns={columns} dataSource={data} rowKey="transactionId" pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default HistoryDeposite;
