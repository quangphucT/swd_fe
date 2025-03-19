import { useEffect, useState } from 'react';
import { Button, Table, Tag, Modal, Image, Rate, Input, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import api from '../../config/api';
import './index.scss';
import { formatMoneyToVND } from '../../currency/currency';
import { showSuccessToast } from '../../config/configToast';

const YourOrderList = () => {
    const [data, setData] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = useSelector((store: RootState) => store.user?.user.id);
    const [visible, setVisible] = useState(false)
    const [rating, setRating] = useState(null);
    const [content, setContent] = useState(null);



    const [idOrderDetails, setIdOrderDetails] = useState(null)

    const fetchingDataOrder = async () => {
        try {
            const response = await api.get(`Order/GetAllOrderByCustomerId/${userId}`);
            setData(response.data);
        } catch (error) {
            toast.error("Error fetching orders");
        }
    };

    useEffect(() => {
        fetchingDataOrder();
    }, []);

    const handleDetailOrder = async (orderID) => {
        try {
            const response = await api.get(`OrderDetail/GetOrderDetailsByOrderID/${orderID}`);
            setOrderDetails(response.data);
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Error fetching order details");
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount) => `${amount.toLocaleString()} VND`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const color = status === 'pending' ? 'orange' : 'green';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Discount ID',
            dataIndex: 'discountId',
            key: 'discountId',
            render: (discountId) => (discountId ? discountId : 'N/A'),
        },
        {
            title: "Action",
            dataIndex: "orderID",
            key: "orderID",
            render: (orderID, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    {/* Chỉ hiển thị nút "Hủy đơn" nếu trạng thái không phải "Confirmcanceled" */}
                    {record.status === "Confirmcanceled" || record.status === "canceled" ? null : (
                        <>
                            <Popconfirm
                                title="Bạn có chắc muốn yêu cầu hủy đơn này không?"
                                onConfirm={() => handleRequestCancelOrder(orderID)}
                            >
                                <button className="cancel-btn">Hủy đơn</button>
                            </Popconfirm>
                            <button onClick={() => handleDetailOrder(orderID)} className="detail-btn">
                                Xem chi tiết đơn
                            </button>
                            </>
                    )}



                </div>
            ),
        }

    ];
    const handleNavigateFeedback = (id) => {
        setVisible(true)
        setIdOrderDetails(id)
    }

    const handleOk = async () => {
        try {
            const response = await api.post(`reviews/postreviewbyorderdetail/${idOrderDetails}`, {
                rating: rating,
                content: content
            })
            showSuccessToast("Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi")
            setRating(null)
            setContent(null)
            setVisible(false)
            setIdOrderDetails(null)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
    const handleCloseModalFeedback = () => {
        setContent(null)
        setRating(null)
        setVisible(false)
        setIdOrderDetails(null)
    }
    const handleRequestCancelOrder = async (id) => {
        try {
            await api.put(`Order/CancelStatusOrder/${id}`)
            toast.success("Yêu cầu hủy đơn đã được gửi đến nhân viên của chúng tôi!")
            fetchingDataOrder();
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    return (
        <div className="order-list-container">
            <h2>Your Orders</h2>
            <Table columns={columns} dataSource={data} rowKey="orderID" pagination={{ pageSize: 5 }} />

            <Modal width={800} title="Chi tiết đơn hàng" open={isModalOpen} onCancel={() => { setIsModalOpen(false) }} footer={null}>
                {orderDetails.map((item) => (
                    <div key={item.id} className="order-detail-item">
                        <Image src={item.imagesProduct[0]?.imageUrl} alt="Product" className="order-detail-image" />
                        <div>
                            <p><strong>Số lượng:</strong> {item.quantity}</p>
                            <p><strong>Giá:</strong> {formatMoneyToVND(item.subtotal)} VND</p>
                        </div>
                        <Button onClick={() => { handleNavigateFeedback(item.id) }} className='feedback-button'>Đánh giá sản phẩm</Button>
                    </div>
                ))}
            </Modal>

            <Modal title="Đánh giá sản phẩm" open={visible} onOk={handleOk} onCancel={handleCloseModalFeedback}>
                <div>
                    <p style={{ fontSize: '17px', fontWeight: '400' }}>Chọn số sao:</p>
                    <Rate value={rating} onChange={setRating} />
                </div>
                <div style={{ marginTop: 16 }}>
                    <p style={{ fontSize: '17px', fontWeight: '400' }}>Nhận xét:</p>
                    <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
                </div>
            </Modal>
        </div>
    );
};

export default YourOrderList;
