
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.scss';


import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import { Image } from 'antd';

export default function Subcarousel() {
    return (
        <>
            <div className="text_about_bestselling">
            <h1>Sản phẩm bán chạy của chúng tôi</h1>
            <p>Hàng ngàn phụ nữ giới thiệu sản phẩm của chúng tôi cho quy trình làm đẹp và chăm sóc da tốt nhất</p>
            </div>
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                direction={'vertical'}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination, Autoplay]}
                className="sub__carousel"
            >
                <SwiperSlide>
                    <Image className='image' preview={false} src='https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_04690_0c95c36f49.jpg' alt='image' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image className='image' preview={false} src='https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_04746_0feb134eb7.jpg' alt='image' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image className='image' preview={false} src='https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_04690_0c95c36f49.jpg' alt='image' />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
