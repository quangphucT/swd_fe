
import { useEffect, useState } from 'react'
import Carousel from '../../components/carousel'
import ListProducts from '../../components/ListProducts'
import BlogHomePage from '../blog-homepage'
import './index.scss'
import { toast } from 'react-toastify'
import api from '../../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deposit } from '../../redux/feature/balanceSlice'
import { Col, Row } from 'antd'
import HealthCheckBanner from '../../components/HealthCheckBanner'
import RecommendProduct from '../../components/RecommendProduct'

type ProductType = {
  id: number;
  name: string;
  description: string;
  images: { imageUrl: string; productId: number }[];
};
const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userId = useSelector((store: RootState) => store.user?.token)
  //console.log(userId);
  const resultQuizID = useSelector((store: RootState) => store.resultquiz);
  const resultQuizIdUser = useSelector((store: RootState) => store.user?.user.resultQuizID);
  const resultQuizIdFinal =  resultQuizID ? resultQuizID : (resultQuizIdUser !== 0 ? resultQuizIdUser : null);

  console.log(resultQuizIdFinal);
  const [productList, setProductList] = useState<ProductType[]>([]); // State để lưu productList
  //console.log("Product List:", productList);
  const fetchRecommendProducts = async () => {
    try {
      if (resultQuizIdFinal) {
        const response = await api.get(`Products/GetProductsByResultQuizId/${resultQuizIdFinal}`);
        setProductList(response.data);
        console.log("Recommend Products:", response.data);
      }
    } catch (error) {
      toast.error("Không thể tải sản phẩm gợi ý");
    }
  };
  useEffect(() => {
    if (resultQuizIdFinal) {
      fetchRecommendProducts();
    }
  }, [resultQuizIdFinal]);
  
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
  const role = useSelector((store: RootState) => store.user?.user?.roles[0] || null)
  console.log("Current Balance in Redux:", balance);

  return (
    <div className='home'>
      <Carousel />
      <HealthCheckBanner/>
      {resultQuizIdFinal && productList.length > 0 && (
        <RecommendProduct products={productList} />
      )}
      {role !== 'Doctor' && role !== null &&  (
        <ListProducts />
      )}

      <BlogHomePage />
    </div>
  )
}

export default Home
