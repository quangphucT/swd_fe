
import './index.scss'
import { Product } from '../../models/product'
import { formatMoneyToVND } from '../../currency/currency'
type CardProp = {
    product: Product
}
const CardProduct = ({ product }: CardProp) => {
    const handleAddFoodToCart = () => {

    }
    return (
        <div className="card">
            <div className="image">
                <img src="https://production-cdn.pharmacity.io/digital/375x375/plain/e-com/images/ecommerce/20240630025001-0-P26076.jpg" alt='image' />
            </div>
            <div className="wrapper_namePrice">
                <div className="name">
                    {product.name}
                </div>
                <div className="price">
                    {formatMoneyToVND(product.price)}
                </div>

            </div>
            <div className="description">
                {product.description.substring(0, 100)}{product.description.length > 100 && "..."}
            </div>
            <div className="button">
                <button onClick={handleAddFoodToCart} className="btn">Thêm</button>
            </div>
        </div>
    )
}

export default CardProduct
