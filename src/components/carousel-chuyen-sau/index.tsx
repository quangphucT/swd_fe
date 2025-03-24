
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
                            <img className="image" src='https://phumyhung.vn/wp-content/uploads/2025/02/Web.png' alt='image1' />
                           
                            
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="image-wrapper">
                            <img className="image" src='https://phumyhung.vn/wp-content/uploads/2025/02/CarePlus.jpg' alt='image1' />
                           
                            
                        </div>
                    </SwiperSlide>
                  


                </Swiper>
               
            </div>
        </div>
    );
}
