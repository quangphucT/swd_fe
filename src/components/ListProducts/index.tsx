
import { useEffect, useState } from 'react'
import './index.scss'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const fetchingData = async () => {
        const response = await api.get("Products")
        console.log("Response:", response)
    }
    useEffect(() => {
        fetchingData();
    }, [products])
    return (
        <div className='list__products'>

        </div>
    )
}

export default ListProducts
