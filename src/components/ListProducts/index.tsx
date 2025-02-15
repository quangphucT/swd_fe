import { useEffect, useState } from 'react'
import './index.scss'
import api from '../../config/api'
import CardProduct from '../product'
import { Flex, Spin } from 'antd'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const [spinning, setSpinning] = useState(true) // Start with loading state

    const fetchingData = async () => {
        try {
            setSpinning(true) // Show spinner before fetching
            const response = await api.get("Products")
            setProducts(response.data)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setSpinning(false) // Hide spinner after fetching
        }
    }

    useEffect(() => {
        fetchingData();
    }, []) // Run only once when the component mounts

    return (
        <div className="card-list">
            <div className="cart-list-name">
                <h1>Sản phẩm của chúng tôi</h1>
            </div>

            {/* Show Spin if there are no products */}
            {spinning || products.length === 0 ? (
               
               <Flex justify="center" align="center" style={{ height: '50vh', width: '100%' }}>
                <Spin spinning={spinning} tip="Loading products..." size="large" />
            </Flex>
              
            ) : (
                <>
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </>
            )}
        </div>
    )
}

export default ListProducts
