import { motion } from "framer-motion";
import "./index.scss";
import { Product } from "../../models/product";
import { formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/api";
import { showSuccessToast } from "../../config/configToast";

type CardProp = {
  product: Product;
  imageUrl: string;
};

const CardProduct = ({ product, imageUrl }: CardProp) => {
  //  const [mainImage, setMainImage] = useState("")
  // const fetchDataCategory = async () => {
  //     try {
  //         const response = await api.get(`Categories/${product}`)
  //         setMainImage(response.data)
  //     } catch (error) {
  //         toast.error("Error")
  //     }
  // }
  // useEffect(() => {
  //     fetchDataCategory();
  // }, [])
  const handleAddFoodToCart = async () => {
    try {
      const response = await api.post("CartProducts", {
        quantity: 1,
        productId: product.id
      })
      showSuccessToast("Thêm sản phẩm vào giỏ hàng thành công!!")
    } catch (error) {
      toast.error("Error while resolving!!")
    }
  };
  const navigate = useNavigate();
  const handleNavigateProductDetail = () => {
    navigate("/product/" + product.id);
  };
  return (
    <motion.div

      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="image" onClick={handleNavigateProductDetail}>
        <img src={imageUrl} alt={"image"} />
      </div>
      <div className="content">
        <h3 className="name">{product.name.substring(0, 20)}{product.name.length > 20 && "..."}</h3>
        <p className="price">{formatMoneyToVND(product.price)}</p>
        <p className="description">
          {product.description.substring(0, 50)}{product.description.length > 50 && "..."}
        </p>
      </div>


      <motion.button
        onClick={handleAddFoodToCart}
        className="btn"
        whileTap={{ scale: 0.95 }}
      >
        Thêm vào giỏ hàng
      </motion.button>
    </motion.div>
  );
}



export default CardProduct;
