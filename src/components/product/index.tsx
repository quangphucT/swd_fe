import { motion } from "framer-motion";
import "./index.scss";
import { Product } from "../../models/product";
import { formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router-dom";

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
  const handleAddFoodToCart = () => {
    console.log("Sản phẩm đã được thêm vào giỏ hàng!");
  };
  const navigate = useNavigate();
  const handleNavigateProductDetail = () => {
    navigate("/product/" + product.id);
  };
  return (
    <motion.div
      onClick={handleNavigateProductDetail}
      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="image">
        <img src={imageUrl} alt={"image"} />
      </div>

            <div className="content">
                <h3 className="name">{product.name.substring(0,20)}{product.name.length > 20 && "..."}</h3>
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
};

export default CardProduct;
