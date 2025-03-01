import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import "./index.scss";
import { toast } from "react-toastify";
import api from "../../config/api";

const { Title, Paragraph } = Typography;



const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    const fetchData = async () => {
        try {
            const response = await api.get(`Blogs/${id}`)
            setBlog(response.data)
        } catch (error) {
            toast.error("Error while fetching")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="blog-detail-container">
            <Title className="main-title" level={1}>{blog.title}</Title>
            <div >

                <Card className="blog-card" cover={<img alt={blog.title} src={blog.image} />}>
                    <Title level={2}>{blog.title}</Title>
                    <Paragraph className="blog-date">
                        Ngày đăng: {new Date(blog.publishDate).toLocaleDateString("vi-VN")}
                    </Paragraph>
                    <Paragraph>{blog.content}</Paragraph>
                    <Paragraph>{blog.tags}</Paragraph>
                </Card>
            </div>
            </div >
    );
};

export default BlogDetails;
