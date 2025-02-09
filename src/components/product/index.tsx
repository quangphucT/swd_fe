import { Image } from 'antd'
import './index.scss'
import { Product } from '../../models/product'
type CardProp = {
    product: Product
}
const CardProduct = ({ product }: CardProp) => {
    return (
        <div className="card__product">
            <div className="image">
                <Image src={product.image} alt='image' />
            </div>
            <div className='name'>
                <p>{product.name}</p>
            </div>
            <div className="description">
                <p>{product.description}</p>
            </div>
            <div className="price">
                <p>{product.price}</p>
            </div>
        </div>
    )
}

export default CardProduct
