
import Carousel from '../../components/carousel'
import ListProducts from '../../components/ListProducts'
import Topbestselling from '../../components/top-best-selling'
import './index.scss'
const Home = () => {
  return (
    <div className='home'>
      <Carousel />
      <Topbestselling />
      
      <ListProducts />
    </div>
  )
}

export default Home
