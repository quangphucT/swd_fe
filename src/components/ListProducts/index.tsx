import { useEffect, useState } from 'react'
import './index.scss'
import api from '../../config/api'
import CardProduct from '../product'
import { Flex, Spin } from 'antd'
import { toast } from 'react-toastify'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const [spinning, setSpinning] = useState(true) // Start with loading state
    const [images, setImages] = useState({})
    const fetchingData = async () => {
        try {
            setSpinning(true) // Show spinner before fetching
            const response = await api.get("Products")
            setProducts(response.data.items)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setSpinning(false) // Hide spinner after fetching
        }
    }

    // tinh túy nằm ở đây
    const fetchImages = async () => {
        try {
            const response = await api.get("Images")
            const imagesMap = {}
            response.data.items.forEach(item => {
                if (!imagesMap[item.productId]) {
                    imagesMap[item.productId] = item.imageUrl; // Chỉ lấy tấm đầu tiên
                }
            });
            setImages(imagesMap)
        } catch (error) {
            toast.error("Error while fetching data!!")
        }
    }
    useEffect(() => {
        fetchingData();
        fetchImages();
    }, [])
    console.log("Images:", images)
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
                        <CardProduct imageUrl={images[product.id]} key={product.id} product={product} />
                    ))}
                </>
            )}
        </div>
    )
}

export default ListProducts
