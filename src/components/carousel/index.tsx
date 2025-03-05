
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
                            <img className="image" src='https://bizweb.dktcdn.net/100/309/697/themes/657044/assets/slider_3_image.png?1734410994573' alt='image1' />
                            
                            
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="image-wrapper">
                            <img className="image" src='https://bizweb.dktcdn.net/100/309/697/themes/657044/assets/slider_2_image.png?1734410994573' alt='image1' />
                           
                            
                        </div>
                    </SwiperSlide>
                  


                </Swiper>
               
            </div>
        </div>
    );
}
