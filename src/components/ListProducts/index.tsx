import { useEffect, useState } from 'react'
import './index.scss'
import api from '../../config/api'
import CardProduct from '../product'
import { Flex, Spin, Button } from 'antd'
import { toast } from 'react-toastify'
import { RightOutlined } from '@ant-design/icons'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const [spinning, setSpinning] = useState(true)
    const [images, setImages] = useState({})
   const [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(true) // Kiểm tra còn sản phẩm không

    const fetchingData = async () => {
        try {
            setSpinning(true)
            const response = await api.get(`Products?pageNumber=${pageNumber}&pageSize=2`)
            if (response.data.items.length === 0) {
                setHasMore(false) // Không còn sản phẩm để tải thêm
            } else {
                setProducts((prev) => [...prev, ...response.data.items])
            }
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setSpinning(false)
        }
    }

    const fetchImages = async () => {
        try {
            const response = await api.get("Images")
            const imagesMap = {}
            response.data.items.forEach(item => {
                if (!imagesMap[item.productId]) {
                    imagesMap[item.productId] = item.imageUrl
                }
            })
            setImages(imagesMap)
        } catch (error) {
            toast.error("Error while fetching data!!")
        }
    }

    useEffect(() => {
        fetchingData()
        fetchImages()
    }, [pageNumber])

    const loadMoreProducts = () => {
        setPageNumber(pageNumber+1)

    }

    return (
        <div className="card-list">
            <div className="cart-list-name">
                <h1>Sản phẩm của chúng tôi</h1>
            </div>

            {spinning && products.length === 0 ? (
                <Flex justify="center" align="center" style={{ height: '50vh', width: '100%' }}>
                    <Spin spinning={spinning} tip="Loading products..." size="large" />
                </Flex>
            ) : (
                <>
                    {products.map((product) => (
                        <CardProduct imageUrl={images[product.id]} key={product.id} product={product} />
                    ))}
                    {hasMore && (
                        <Flex justify="center" style={{ width: '100%', marginTop: '20px' }}>
                            <Button className="view-more-btn" onClick={loadMoreProducts} loading={spinning} disabled={!hasMore}>
                                Xem thêm sản phẩm <RightOutlined className="icon" />
                            </Button>
                        </Flex>
                    )}
                </>
            )}
        </div>
    )
}

export default ListProducts
