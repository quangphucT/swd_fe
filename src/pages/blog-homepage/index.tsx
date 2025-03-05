import { Card, Col, Row, Typography, Carousel } from 'antd';
import './index.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;




const BlogHomePage = () => {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate();
    const fetchingData = async () => {
        try {
            const response = await api.get(`Blogs?pageNumber=1&pageSize=3`)
            setBlogs(response.data.items)
        } catch (error) {
            toast.error("Error while fetching data!!")
        }
    }
    useEffect(() => {
        fetchingData();
    }, [])
    const handleNavigateBlogDetails = (id) => {
        navigate(`/blog-details/${id}`)
    }
    return (
        <div className="blog-page">
            <Title style={{color: '#0a488b'}} level={2} className="blog-title">Blog Dược Mỹ Phẩm</Title>
            <Carousel autoplay className="blog-carousel">
                {blogs.map((post) => (
                    <div key={post.id} className="carousel-item">
                        <img src={post.image} alt={post.title} className="carousel-image" />
                        <Title level={3} className="carousel-title">{post.title}</Title>
                    </div>
                ))}
            </Carousel>
            <Row gutter={[16, 16]}>
                {blogs.map((post) => (
                    <Col xs={24} sm={12} md={8} key={post.id}>
                        <Card
                            hoverable
                            cover={<img onClick={() => { handleNavigateBlogDetails(post.id) }} alt={post.title} src={post.image} />}
                            className="blog-card"
                        >
                            <Title className="blog-card-title">{post.title}</Title>
                            <Paragraph className="blog-card-excerpt">  {post.content.substring(0, 100)}{post.content.length > 100 && "..."}</Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BlogHomePage;
