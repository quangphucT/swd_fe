
import { useEffect, useState } from 'react'
import './index.scss'
import api from '../../config/api'
import CardProduct from '../product'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const fetchingData = async () => {
        const response = await api.get("Products")
        setProducts(response.data)
    }
    useEffect(() => {
        fetchingData();
    }, [products])
    return (
        <div className="card-list">

            <div className="cart-list-name">
                <h1>Sản phẩm của chúng tôi </h1>
            </div>
             {products.map((product) => {
                return (
                    <CardProduct product={product}/>
                )
             })}
        </div>
    )
}

export default ListProducts
