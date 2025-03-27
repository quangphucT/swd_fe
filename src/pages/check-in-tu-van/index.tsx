import { useState } from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import './index.scss';
import { toast } from 'react-toastify';
import api from '../../config/api';


const CheckInTuVan = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!phoneNumber) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`Doctor/SearchBookingByPhone?phoneNumber=${phoneNumber}`);
           setBookingData(response.data)
        } catch (error) {
            toast.error('Không tìm thấy lịch tư vấn hoặc có lỗi xảy ra.');
            setBookingData([]);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Mã đặt lịch', dataIndex: 'bookingId', key: 'bookingId' },
        { title: 'Tên khách hàng', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Số điện thoại', dataIndex: 'customerPhone', key: 'customerPhone' },
        { title: 'Thời gian', dataIndex: 'timeSlot', key: 'timeSlot', render: (text) => new Date(text).toLocaleString() },
        { title: 'Chuyên viên tư vấn', dataIndex: 'doctorName', key: 'doctorName' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' }
    ];

    return (
        <div className="checkin-tuvan">
            <h2>Tra cứu lịch tư vấn</h2>
            <div className="search-box">
                <Input
                    placeholder="Nhập số điện thoại..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ width: 200, marginRight: 10 }}
                />
                <Button type="primary" onClick={handleSearch} loading={loading}>
                    Tìm kiếm
                </Button>
            </div>
            {error && <p className="error">{error}</p>}
            <Table dataSource={bookingData} columns={columns} rowKey="bookingId" pagination={false} />
        </div>
    );
};

export default CheckInTuVan;