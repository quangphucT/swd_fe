import React, { useEffect, useState } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons'; // Import icon
import api from '../../config/api';
import './index.scss';

const availableDenominations = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 3000000];

const DepositePage: React.FC = () => {
    const [amount, setAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    useEffect(() => {
        const successDeposit = localStorage.getItem("depositSuccess");
        if (successDeposit) {
            setIsSuccessModalVisible(true);
            localStorage.removeItem("depositSuccess");
        }
    }, []);

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
            const response = await api.post("Wallet/CreateVNPayPayment", { amount }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data?.paymentUrl) {
                localStorage.setItem("depositSuccess", 'true');
                window.location.href = response.data.paymentUrl;
            }

        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-container">
            <h2>Trang Nạp Tiền</h2>
            <div className='wrapper__input'>
                <Input
                    type="number"
                    value={amount ?? ''}
                    onChange={handleAmountChange}
                    placeholder="Nhập số tiền"
                    className="input-amount"
                />
                <Button type="primary" onClick={handleDeposit} loading={loading} className="deposit-btn">
                    Nạp Tiền
                </Button>
            </div>
            <div className="denominations">
    <h3>Hoặc chọn một mệnh giá có sẵn:</h3>
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

            {/* Modal thông báo thành công */}
            <Modal
                title={null} // Ẩn title mặc định
                open={isSuccessModalVisible}
                onOk={() => setIsSuccessModalVisible(false)}
                onCancel={() => setIsSuccessModalVisible(false)}
                okText="Đóng"
                cancelButtonProps={{ style: { display: 'none' } }}
                className="success-modal"
            >
                <div className="modal-content">
                    <CheckCircleOutlined className="modal-icon" />
                    <div className="modal-title">Nạp tiền thành công!</div>
                    <p className="modal-message">Cảm ơn bạn đã sử dụng dịch vụ. Số dư tài khoản của bạn đã được cập nhật.</p>
                </div>
            </Modal>
        </div>
    );
};

export default DepositePage;
