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
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        const vnpAmount = queryParams.get("vnp_Amount");

        if (vnp_ResponseCode === "00" && !localStorage.getItem("Deposite")) {
            setIsSuccessModalVisible(true);
            dispatch(addBalance(Number(vnpAmount) / 100));
            localStorage.setItem("Deposite", 'true');
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
        navigate("/");
    };

    return (
        <div className="deposit-container">
            <Card bordered={false} className="deposit-card">
                <img src={"data:image/png;base64,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"} alt="VNPay Logo" className="vnpay-logo" />
                <Title level={2} className="page-title">Nạp Tiền Vào Tài Khoản</Title>
               <div>
                 <div className="payment-icons">
                    <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="Visa" />
                    <img src="https://cdn.freebiesupply.com/logos/large/2x/mastercard-4-logo-png-transparent.png" alt="MasterCard" />
                    <img src="https://pngimg.com/d/credit_card_PNG87.png" alt="ATM Card" />
                </div>

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
               </div>

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
