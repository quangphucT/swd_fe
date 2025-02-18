// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";

// Import Swiper styles

import "./index.scss";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../../config/api";

// Props
//  numberOfSlide

// Carousel => numberOfSlide = 1 => hiển thị 1 thằng
// Carousel => numberOfSlide = 6 => hiển thị 6 thằng
interface CarouselProductProps {
  //imageURL: string; // url của ảnh sản phẩm
  id: number; // id của sản phẩm (ProductID)
  numberOfSlide: number;
}
export default function CarouselProduct({
  numberOfSlide,
  id,
}: CarouselProductProps) {
  const [imageProducts, setimageProducts] = useState([]);

  const fetchImageProducts = async () => {
    try {
      //  const response = await api.get(`Images/getImagesByProductId/${id}`);
      const response = await api.get("Images");
      console.log(response.data);
      setimageProducts(response.data.items);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImageProducts();
  }, [id]);

  return (
    <>
      <Swiper
        slidesPerView={numberOfSlide}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="carousel"
      >
        {/* movie => SwiperSlide*/}
        {/* cứ mỗi movie trong movies => SwiperSlide*/}
        {imageProducts.map((imageProduct, index) => (
          <SwiperSlide key={imageProduct.id || index}>
            {/* <img src={imageProduct.imageURL} alt="" /> */}
            {imageProduct.imageUrl.startsWith("data:image") ? (
              <img src={imageProduct.imageUrl} alt="product" />
            ) : (
              <img src={imageProduct.imageUrl} alt="product" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
