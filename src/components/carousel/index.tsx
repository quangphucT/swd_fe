
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './index.scss';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Image } from 'antd';


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
                            <img className="image" src='https://c8.alamy.com/comp/2BDN8PW/cosmetics-packages-beauty-products-outline-linear-set-icon-flat-vector-illustration-isolated-on-white-background-2BDN8PW.jpg' alt='image1' />
                            <div className="text-overlay">
                                <h2 className="text-content">Khám Phá Dược Mỹ Phẩm Cao Cấp</h2>
                                <p className="subtext-content">Chăm sóc sắc đẹp và bảo vệ làn da với những sản phẩm chất lượng.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="image-wrapper">
                            <img className="image" src='https://img.freepik.com/premium-vector/fashion-cosmetics-horizontal-background-with-make-up-artist-objects-watercolor-spot-hand-drawn-illustration-with-place-text_198278-187.jpg' alt='image1' />
                            <div className="text-overlay">
                                <h2 className="text-content">Khám Phá Dược Mỹ Phẩm Cao Cấp</h2>
                                <p className="subtext-content">Chăm sóc sắc đẹp và bảo vệ làn da với những sản phẩm chất lượng.</p>
                            </div>
                        </div>
                    </SwiperSlide>


                </Swiper>
                <div className="sub_carousel">
                    <Image preview={false} className='image_above' src='https://images.unsplash.com/photo-1566534268110-74c44e12e34d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='image1' />
                    <Image preview={false} className='image' src='https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/PC_3d7805381e.png' alt='image1' />
                </div>
            </div>
        </div>
    );
}
