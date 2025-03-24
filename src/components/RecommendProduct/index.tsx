import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { notification, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addProductToCart } from "../../redux/feature/cartSlice";
import { formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../config/configToast";
import "./index.scss";
import api from "../../config/api";

type Product = {
  id: number;
  name: string;
  price?: number;
  description?: string;
  images: {
    imageUrl: string;
    productId: number;
  }[];
};

type CarouselProps = {
  products: Product[];
};

const RecommendProduct: React.FC<CarouselProps> = ({ products }) => { //const RecommendProduct = ({ products }: CarouselProps) => { ... }
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product: Product) => {
    if (user?.token) {
      try {
        const response = await api.post("CartProducts", {
          quantity: 1,
          productId: product.id,
        });
        showSuccessToast("Thêm vào giỏ hàng thành công!");
        dispatch(addProductToCart(response.data));
      } catch (error) {
        notification.error({
          message: "Thêm vào giỏ hàng thất bại",
        });
      }
    } else {
      notification.error({
        message: "Bạn chưa đăng nhập",
        description: "Hãy đăng nhập để tiếp tục mua hàng!",
      });
    }
  };

  const handleNavigateDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-carousel-container">
      {products.length > 0 ? (
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          grabCursor={true}
        >
          {products.map((product) => {
            const imageUrl = product.images[0]?.imageUrl || "/default-image.png";
            return (
              <SwiperSlide key={product.id}>
                <div className="carousel-card">
                  <div className="image" onClick={() => handleNavigateDetail(product.id)}>
                    <img src={imageUrl} alt={product.name} />
                  </div>
                  <div className="content">
                    <h3 className="name">{product.name}</h3>
                    <p className="price">{formatMoneyToVND(product.price || 100000)}</p>
                    <p className="description">
                      {product.description?.substring(0, 60) || "Không có mô tả"}...
                    </p>
                  </div>
                  <Button type="primary" onClick={() => handleAddToCart(product)} className="btn-cart">
                    Thêm vào giỏ
                  </Button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="no-products">Không có sản phẩm gợi ý.</p>
      )}
    </div>
  );
};

export default RecommendProduct;
