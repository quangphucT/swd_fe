import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/api";
import CardProduct from "../product";
import { Flex, Spin, Button, Row, Col, Card, Avatar } from "antd";
import { toast } from "react-toastify";
import { RightOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [spinning, setSpinning] = useState(true);
    const [images, setImages] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [dataDoctor, setDataDoctor] = useState([]);

    const fetchingData = async () => {
        try {
            setSpinning(true);
            const response = await api.get(`Products?pageNumber=${pageNumber}&pageSize=3`);
            if (response.data.items.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prev) => [...prev, ...response.data.items]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setSpinning(false);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await api.get("Images");
            const imagesMap = {};
            response.data.items.forEach((item) => {
                if (!imagesMap[item.productId]) {
                    imagesMap[item.productId] = item.imageUrl;
                }
            });
            setImages(imagesMap);
        } catch (error) {
            toast.error("Error while fetching data!!");
        }
    };

    const fetchingAllDoctor = async () => {
        try {
            const response = await api.get("Booking/GetAllDoctors");
            setDataDoctor(response.data);
        } catch (error) {
            toast.error("Error while fetching doctors!");
        }
    };

    useEffect(() => {
        fetchingData();
        fetchImages();
    }, [pageNumber]);

    useEffect(() => {
        fetchingAllDoctor();
    }, []);

    const loadMoreProducts = () => {
        setPageNumber(pageNumber + 1);
    };
    const navigate = useNavigate();
    return (
        <div className="list-container">
            <Row gutter={24}>
                {/* Cột hiển thị danh sách bác sĩ */}
                <Col span={8} className="doctor-list">
                    <Button onClick={() => {navigate("/booking-page")}} type="primary" style={{ display: 'flex', height: '45px', fontSize: '16px', fontWeight: '500', borderRadius: '30px', margin: '0 auto', marginBottom: '10px', background: '#1e88e5' }}>Đặt lịch chuyên viên</Button>
                    {dataDoctor.map((doctor) => (
                        <Card key={doctor.id} className="doctor-card">
                            <Avatar size={64} src={doctor.avatar} icon={!doctor.avatar && <UserOutlined />} />
                            <div className="doctor-info">
                                <h3>{doctor.firstName} {doctor.lastName}</h3>
                                <p><MailOutlined /> {doctor.email}</p>
                                <p><PhoneOutlined /> {doctor.phoneNumber}</p>
                            </div>
                        </Card>
                    ))}
                </Col>

                {/* Cột hiển thị danh sách sản phẩm */}
                <Col span={16} className="product-list">
                    <h2>Sản phẩm của chúng tôi</h2>
                    {spinning && products.length === 0 ? (
                        <Flex justify="center" align="center" style={{ height: "50vh", width: "100%" }}>
                            <Spin spinning={spinning} tip="Loading products..." size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Row gutter={[16, 16]}>
                                {products.map((product) => (
                                    <Col span={8} key={product.id}>
                                        <CardProduct imageUrl={images[product.id]} product={product} />
                                    </Col>
                                ))}
                            </Row>
                            {hasMore && (
                                <Flex justify="center" style={{ marginTop: "20px" }}>
                                    <Button className="view-more-btn" onClick={loadMoreProducts} loading={spinning} disabled={!hasMore}>
                                        Xem thêm sản phẩm <RightOutlined className="icon" />
                                    </Button>
                                </Flex>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ListProducts;