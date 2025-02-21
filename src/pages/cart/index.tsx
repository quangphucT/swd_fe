import { Button, Checkbox, InputNumber, Card, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.scss';

const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Sản phẩm A',
            price: 150000,
            image: 'https://via.placeholder.com/80',
            quantity: 1
        },
        {
            id: 2,
            name: 'Sản phẩm B',
            price: 250000,
            image: 'https://via.placeholder.com/80',
            quantity: 2
        }
    ];

    return (
        <div className="cart-container">
            <div className="cart-items">
                <Card title="Giỏ hàng" className="cart-card">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <Checkbox className="cart-checkbox" />
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-info">
                                <h4>{item.name}</h4>
                                <p>{item.price.toLocaleString()}đ</p>
                            </div>
                            <InputNumber min={1} defaultValue={item.quantity} className="cart-quantity" />
                            <Button type="text" danger icon={<DeleteOutlined />} className="cart-delete" />
                        </div>
                    ))}
                </Card>
            </div>
            <div className="cart-summary-container">
                <Card className="cart-summary-card">
                    <h3>Tổng tiền: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}đ</h3>
                    <Button type="primary" size="large">Thanh toán</Button>
                </Card>
            </div>
        </div>
    );
};

export default Cart;
