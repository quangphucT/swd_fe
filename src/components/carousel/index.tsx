
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './index.scss';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';



export default function Carousel() {
    return (
        <div className='main_wrapper'>
            <div className='wrapper'>
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="carousel"
                >
                   
                
                    <SwiperSlide >
                        <div className="image-wrapper">
                            <img className="image" src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/08/01090228/duoc-my-pham-spa-01-1.png' alt='image1' />
                            <div className="text-overlay">
                                <h2 className="text-content">Khám Phá Dược Mỹ Phẩm Cao Cấp</h2>
                                <p className="subtext-content">Chăm sóc sắc đẹp và bảo vệ làn da với những sản phẩm chất lượng.</p>
                            </div>
                            
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="image-wrapper">
                            <img className="image" src='https://media.hcdn.vn/hsk/campaign/Duocmypham1320x5001685442997.jpg' alt='image1' />
                            <div className="text-overlay">
                                <h2 className="text-content">Khám Phá Dược Mỹ Phẩm Cao Cấp</h2>
                                <p className="subtext-content">Chăm sóc sắc đẹp và bảo vệ làn da với những sản phẩm chất lượng.</p>
                            </div>
                            
                        </div>
                    </SwiperSlide>
                  


                </Swiper>
               
            </div>
        </div>
    );
}
