
import Carousel from '../../components/carousel'
import Topbestselling from '../../components/top-best-selling'
import './index.scss'
const Home = () => {
  return (
    <div className='home'>
      <Carousel />
      <Topbestselling />
    </div>
  )
}

export default Home
