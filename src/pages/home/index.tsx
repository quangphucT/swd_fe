
import { useEffect } from 'react'
import Carousel from '../../components/carousel'
import ListProducts from '../../components/ListProducts'
import BlogHomePage from '../blog-homepage'


import './index.scss'
import { toast } from 'react-toastify'
import api from '../../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deposit } from '../../redux/feature/balanceSlice'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userId = useSelector((store: RootState) => store.user?.token)
  const fetchingBalanceAccount = async () => {
    try {
      if (userId) {
        const response = await api.get("Wallet")
        dispatch(deposit(response.data.amountofMoney))
      }
    } catch (error) {
      toast.error("error")
    }
  }
  useEffect(() => {
    fetchingBalanceAccount();
  }, [])
  const balance = useSelector((store: RootState) => store.balance);
  console.log("Current Balance in Redux:", balance);
  return (
    <div className='home'>
      <Carousel />


      <ListProducts />
      <BlogHomePage />
    </div>
  )
}

export default Home
