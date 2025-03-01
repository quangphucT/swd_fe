
import Carousel from '../../components/carousel'
import ListProducts from '../../components/ListProducts'

import './index.scss'


const Home = () => {
  // const [dataUser, setDataUser] = useState({})
  // const fetchData = async () => {
  //   try {
  //     const response = await api.get("Accounts/GetCurrentAccount")
  //     setDataUser(response.data)
  //     localStorage.setItem("cartId", response.data.cartId)
  //   } catch (error) {
  //     toast.error("error while fetching data")
  //   }
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [])
  return (
    <div className='home'>
      <Carousel />


      <ListProducts />

    </div>
  )
}

export default Home
