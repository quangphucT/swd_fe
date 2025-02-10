import { motion } from "framer-motion";
import './index.scss';
import { Product } from '../../models/product';
import { formatMoneyToVND } from '../../currency/currency';

type CardProp = {
    product: Product
}

const CardProduct = ({ product }: CardProp) => {
    const handleAddFoodToCart = () => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng!");
    }

    return (
        <motion.div 
            className="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="image">
                <img src="https://production-cdn.pharmacity.io/digital/375x375/plain/e-com/images/ecommerce/P02831.png" alt={product.name} />
            </div>

            <div className="content">
                <h3 className="name">{product.name}</h3>
                <p className="price">{formatMoneyToVND(product.price)}</p>
                <p className="description">
                    {product.description.substring(0, 100)}{product.description.length > 100 && "..."}
                </p>
            </div>

            <motion.button 
                onClick={handleAddFoodToCart} 
                className="btn"
                whileTap={{ scale: 0.95 }}
            >
                Thêm vào giỏ hàng
            </motion.button>
        </motion.div>
    );
}

export default CardProduct;
