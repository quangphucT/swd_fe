import { useEffect, useState } from 'react';
import { Table, Button, InputNumber, message, Card, Row, Col, Typography, Modal, Select, Popconfirm } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../config/api';
import './index.scss';
import { toast } from 'react-toastify';
import { showSuccessToast } from '../../config/configToast';
import { formatMoneyToVND } from '../../currency/currency';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductInRedux, resetCart } from '../../redux/feature/cartSlice';
import { deposit } from '../../redux/feature/balanceSlice';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const Cart = () => {
    const [dataCart, setDataCart] = useState([]);
    const [listDiscount, setListDiscount] = useState([]);
    const [count, setCount] = useState(1)
    const [seletedDiscount, setSeletectedDiscount] = useState(null)
    const [selectedDiscountPercentage, setSelectedDiscountPercentage] = useState(0)
    const cartId = useSelector((store: RootState) => store.user.user?.cartId)
    const balanceAccount = useSelector((store: RootState) => store.balance)
    const navigate = useNavigate();
    const fetchingDataCart = async () => {
        try {
            const response = await api.get(`cart/${cartId}`);
            setDataCart(response.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    const fetchDiscountList = async () => {
        try {
            const response = await api.get("Discount");
            const discounts = response.data.items
            const filterDiscount = discounts.filter((item) => item.id !== 1)
            setListDiscount(filterDiscount);
        } catch (error) {
            toast.error("Error while fetching data!!");
        }
    };

    useEffect(() => {
        fetchDiscountList();
        fetchingDataCart();
    }, [count]);

    const updateQuantity = async (id, productId, quantity) => {
        // Kiểm tra nếu số lượng không thay đổi thì không gọi API
        setDataCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            return updatedCart;
        });

        try {
            await api.put(`CartProducts/${id}`, { quantity, productId: productId });

            showSuccessToast("Cập nhật số lượng thành công");

            // Không cần gọi fetchingDataCart() ngay lập tức
            setTimeout(fetchingDataCart, 500); // Tránh re-render nhanh quá gây lỗi
        } catch (error) {
            toast.error("Lỗi khi cập nhật số lượng!");
        }
    };
    const fetchingBalanceAccount = async () => {
        try {
            const response = await api.get("Wallet")



            dispatch(deposit(response.data.amountofMoney))

        } catch (error) {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchingBalanceAccount();
    }, [])
    const totalAmount = dataCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountedTotal = totalAmount * (1 - selectedDiscountPercentage / 100);
    const handleOrder = async () => {
        if (balanceAccount < discountedTotal) {
            toast.error("Số dư không đủ");
            navigate("/deposite")
        } else {
            try {
                const response = await api.post("Order", {
                    discountId: seletedDiscount || 1,
                });
                showSuccessToast(response.data.message);
                dispatch(resetCart())
                fetchingBalanceAccount()
                setDataCart([]);
            } catch (error) {
                toast.error("Lỗi khi thanh toán");
            }
        }

    };

    const confirmOrder = () => {
        confirm({
            title: <Title level={2} className="modal-title">Xác nhận đặt hàng</Title>,
            icon: <ExclamationCircleOutlined style={{ fontSize: '28px', color: '#faad14' }} />,
            content: (
                <Text className="modal-content">
                    Bạn có chắc chắn muốn đặt hàng với tổng số tiền <strong>{formatMoneyToVND(discountedTotal)} VND</strong> không?
                </Text>
            ),
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            centered: true,
            width: 500,
            onOk: handleOrder,
        });
    };



    const columns = [
        {
            title: <Text className='text' strong>Sản phẩm</Text>,
            dataIndex: 'product',
            key: 'product',
            render: (product) => <Text className="product-name">{product.name}</Text>
        },
        {
            title: <Text className='text' strong>Mô tả</Text>,
            dataIndex: 'product',
            key: 'description',
            render: (product) => <Text className="product-description">{product.description}</Text>
        },
        {
            title: <Text className='text' strong>Giá</Text>,
            dataIndex: 'product',
            key: 'price',
            render: (product) => <Text className="price">{product.price.toLocaleString()} VND</Text>
        },
        {
            title: <Text className='text' strong>Số lượng</Text>,
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => {
                        if (value !== record.quantity) {
                            updateQuantity(record.id, record.product.id, value);
                        }
                    }}
                />
            )
        },
        {
            title: <Text className='text' strong>Tổng</Text>,
            key: 'total',
            render: (record) => <Text className="total">{(record.product.price * record.quantity).toLocaleString()} VND</Text>
        },
        {
            title: <Text className='text' strong>Hành động</Text>,
            key: 'action',
            render: (record) => (
                <Popconfirm title="Xóa mặt hàng này"
                    description="Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng không?"
                    onConfirm={() => { handleConfirmDelelete(record.id) }}

                    okText="Yes"
                    cancelText="No"> <Button icon={<DeleteOutlined style={{ fontSize: '27px' }} />}>
                        Xóa
                    </Button></Popconfirm>
            )
        }
    ];
    const dispatch = useDispatch()
    const handleConfirmDelelete = async (id) => {
        try {
            await api.delete(`CartProducts/${id}`)
            setCount(count + 1)
            showSuccessToast("Sản phẩm này đã bị xóa khỏi giỏ hàng của bạn!!")

            dispatch(deleteProductInRedux(id))
        } catch (error) {
            toast.error("Error")
        }
    }
    return (
        <div className="cart-container">
            <Row gutter={24}>
                <Col span={18}>
                    <Card bordered={false} className="cart-card">
                        <Title level={3} className="cart-title"><ShoppingCartOutlined /> Giỏ hàng của bạn</Title>
                        <Table
                            dataSource={dataCart}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} className="summary-card">
                        <Title level={3} className="summary-title">Tóm tắt đơn hàng</Title>
                        <Text className="total-amount">Tổng tiền: <strong>{formatMoneyToVND(discountedTotal)} VND</strong></Text>

                        {/* Dropdown chọn discount */}
                        <Select
                            style={{ width: '100%', marginTop: 10 }}
                            placeholder="Chọn mã giảm giá"
                            onChange={(value, option) => {
                                setSeletectedDiscount(value);
                                setSelectedDiscountPercentage(option?.data_percentage || 0);
                            }}
                        >
                            <Option value={null}>KHÔNG ÁP DỤNG MÃ</Option>
                            {listDiscount.map(discount => (
                                <Option key={discount.id} value={discount.id} data_percentage={discount.percentage}>
                                    {`${discount.code} - Giảm ${discount.percentage}%`}
                                </Option>
                            ))}
                        </Select>



                        <Button onClick={confirmOrder} type="primary" block className="checkout-btn" style={{ marginTop: 10 }}>
                            Thanh toán ngay
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;
