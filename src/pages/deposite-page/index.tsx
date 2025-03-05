import React, { useEffect, useState } from 'react';
import { Input, Button, message, Modal, Typography, Space, Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import api from '../../config/api';
import './index.scss';
import { useDispatch } from 'react-redux';
import { addBalance } from '../../redux/feature/balanceSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const availableDenominations = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 3000000];

const DepositePage: React.FC = () => {
    const [amount, setAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        const vnpAmount = queryParams.get("vnp_Amount");

        // 🔥 Kiểm tra nếu giao dịch thành công và chưa được xử lý
        if (vnp_ResponseCode === "00" && !localStorage.getItem("Deposite")) {
            setIsSuccessModalVisible(true);
            dispatch(addBalance(Number(vnpAmount) / 100));
            localStorage.setItem("Deposite", 'true')


        }
    }, [location.search, dispatch]);


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleQuickDeposit = (value: number) => {
        setAmount(value);
    };

    const handleDeposit = async () => {

        if (!amount || amount <= 0) {
            message.error('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("Wallet/CreateVNPayPayment", { amount });
            if (response.data?.paymentUrl) {
                window.location.href = response.data.paymentUrl;

            }

        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        } finally {
            setLoading(false);

        }
    };

    const navigate = useNavigate();
    const handleCloseModal = () => {

        setIsSuccessModalVisible(false);
        localStorage.removeItem("Deposite");
        navigate("/")
    };
    return (
        <div className="deposit-container">
            <Card bordered={false} className="deposit-card">
                <Title level={2} className="page-title">Nạp Tiền Vào Tài Khoản</Title>

                <Space direction="vertical" size="middle" className="deposit-content">
                    <Input
                        type="number"
                        value={amount ?? ''}
                        onChange={handleAmountChange}
                        placeholder="Nhập số tiền muốn nạp"
                        className="input-amount"
                    />
                    <Button type="primary" size="large" onClick={handleDeposit} loading={loading} className="deposit-btn">
                        Xác nhận nạp tiền
                    </Button>
                </Space>

                <div className="denominations">
                    <Title level={3} className="denomination-title">Chọn mệnh giá có sẵn:</Title>
                    <div className="denomination-buttons">
                        {availableDenominations.map((denom) => (
                            <Button
                                key={denom}
                                className="denomination-btn"
                                onClick={() => handleQuickDeposit(denom)}
                            >
                                {denom.toLocaleString()} VND
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Modal thông báo thành công */}
            <Modal
                open={isSuccessModalVisible}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                okText="Đóng"
                centered
                className="success-modal"
            >
                <div className="modal-content">
                    <CheckCircleOutlined className="modal-icon" />
                    <Title level={3} className="modal-title">Nạp tiền thành công!</Title>
                    <Text className="modal-message">
                        Cảm ơn bạn đã sử dụng dịch vụ. Số dư tài khoản của bạn đã được cập nhật.
                    </Text>
                </div>
            </Modal>
        </div>
    );
};

export default DepositePage;
