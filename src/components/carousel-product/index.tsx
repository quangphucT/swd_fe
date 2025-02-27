import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Kiểu props nhận mảng ảnh
interface CarouselProductWithLightboxProps {
  images: string[];
}

const CarouselProductWithLightbox: React.FC<CarouselProductWithLightboxProps> = ({ images }) => {
  // State cho carousel thumbnail
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // State điều khiển modal fullscreen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Hàm mở modal, nhớ set ảnh đang click làm selectedIndex
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      {/* Carousel chính */}
      <Swiper
        modules={[Navigation, Thumbs]}
        slidesPerView={1}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="mainCarousel"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {/* Khi click ảnh -> mở modal fullscreen */}
            <img
              src={image}
              alt={`Hình ${index}`}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => openModal(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carousel thumbnail hiển thị 4 ảnh */}
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        className="thumbCarousel"
        style={{ marginTop: 10 }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              style={{ width: "100%", cursor: "pointer", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal fullscreen */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)", // phông nền tối
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Nút đóng */}
          <button
            onClick={closeModal}
            style={{
              alignSelf: "flex-end",
              margin: "10px",
              padding: "8px 12px",
              cursor: "pointer",
              background: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Đóng
          </button>

          {/* Bọc Swiper fullscreen */}
          <div style={{ flex: 1, display: "flex" }}>
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              navigation
              initialSlide={selectedIndex} // Hiển thị ảnh đang click
              style={{ width: "100%", height: "100%" }}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  {/* Căn giữa ảnh, hiển thị max 90% màn hình */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Fullscreen ${idx}`}
                      style={{ maxWidth: "90%", height: "90%" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselProductWithLightbox;
