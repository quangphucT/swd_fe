import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Breadcrumb, List, Rate, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/api";
import { formatMoneyToVND } from "../../currency/currency";
import { showSuccessToast } from "../../config/configToast";
import { addProductToCart } from "../../redux/feature/cartSlice";

import CarouselProductWithLightbox from "../../components/carousel-product";
import ProductDetailInfo from "../../components/productdetailinfo";

import "./index.scss";
import { RootState } from "../../redux/store";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [imageProducts, setImageProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [solution, setSolution] = useState(null);
  const [reviews, setReviews] = useState([])
  const user = useSelector((store: RootState) => store.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        const productResponse = await api.get(`Products/${id}`);
        const productData = productResponse.data;
        setProduct(productData);

        const categoryResponse = await api.get(`Categories/${productData.category.id}`);
        setCategory(categoryResponse.data);

        const solutionResponse = await api.get(`Solutions/${categoryResponse.data.solutionId}`);
        setSolution(solutionResponse.data);

        const imagesResponse = await api.get(`Images/getImagesByProductId/${id}`);
        setImageProducts(imagesResponse.data);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu sản phẩm!");
      }
    };
    const fetchingDataFeedbackByProductId = async () => {
      if (user) {
        try {
          const response = await api.get(`reviews/product/${id}`)
          setReviews(response.data.data)
        } catch (error) {
          toast.error("Error while fetching data")
        }
      } else {
        notification.warning({
          message: "Không thể xem đánh giá về sản phẩm này",
          description: "Bạn cần đăng nhập tài khoản.",
          duration: 5,
        });
      }

    }
    fetchingDataFeedbackByProductId();
    fetchProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (user) {
      try {
        const response = await api.post("CartProducts", {
          quantity: 1,
          productId: product.id,
        });
        showSuccessToast("Thêm sản phẩm vào giỏ hàng thành công!");
        dispatch(addProductToCart(response.data));
      } catch (error) {
        toast.error("Lỗi khi thêm vào giỏ hàng!");
      }
    } else {
      notification.warning({
        message: "Không thể thêm sản phẩm này",
        description: "Bạn cần đăng nhập tài khoản.",
        duration: 5,
      });
      navigate("/login")
    }

  };

  if (!product || !category || !solution) {
    return <p className="loading-text">Đang tải...</p>;
  }

  return (
    <div className="product-detail-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="#">{category.name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="#">{solution.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={30} className="product-detail">
        <Col span={10}>
          <CarouselProductWithLightbox images={imageProducts.map(item => item.imageUrl)} />
        </Col>
        <Col span={14}>
          <Card className="product-card" title={<h2 >{product.name}</h2>}>
            <p className="product-price">
              Giá: {formatMoneyToVND(product.price)} / {product.unit.name}
            </p>

            <div className="product-info">
              <p><strong>Thương Hiệu:</strong> {product.brand.name}</p>
              <p><strong>Xuất xứ:</strong> {product.brandOrigin.name}</p>
              <p><strong>Nhà sản xuất:</strong> {product.manufacturer.name}</p>
              <p><strong>Quốc gia:</strong> {product.manufacturedCountry.name}</p>
              <p><strong>Quy cách:</strong> {product.packaging.name}</p>
              <p><strong>Danh mục:</strong> <Link to="/product">{product.category.name}</Link></p>
              <p><strong>Mô tả ngắn:</strong> {product.description}</p>
            </div>

            <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </Card>
        </Col>
      </Row>

      <ProductDetailInfo
        productDescription={product.productDetail?.productDescription || ""}
        ingredient={product.productDetail?.ingredient || ""}
        effect={product.productDetail?.effect || ""}
        howToUse={product.productDetail?.howToUse || ""}
        sideEffect={product.productDetail?.sideEffect || ""}
        note={product.productDetail?.note || ""}
        preserve={product.productDetail?.preserve || ""}
      />



      <div className="review-section feedback-list">
        <h3 style={{ margin: '50px 0', fontSize: '30px', textAlign: 'center', color: '#1e88e5', textDecoration: 'underline' }} className="feedback-title">Đánh giá trước đây</h3>
        <List
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <Card className="feedback-card">
                <div className="feedback-header">
                  <img src={review.avatar} alt={review.userName} className="feedback-avatar" />
                  <strong className="feedback-username">{review.userName}</strong>
                </div>
                <Rate disabled value={review.rating} className="feedback-rate" />
                <p className="feedback-content">{review.content}</p>
                <small className="feedback-date">{new Date(review.reviewDate).toLocaleString()}</small>
              </Card>
            </List.Item>
          )}
        />

      </div>

    </div>
  );
};

export default ProductDetail;
