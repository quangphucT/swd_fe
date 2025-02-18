import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Carousel, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
import CarouselProduct from "../../components/carousel-product";
import ProductDetailInfo from "../../components/productdetailinfo";
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   unitId: number;
//   brandId: number;
//   packagingId: number;
//   categoryId: number;
//   brandOriginId: number;
//   manufacturerId: number;
//   manufacturedCountryId: number;
//   productDetailId: number;
//   imageUrls?: string[];
// }

const ProductDetail = () => {
  const { id } = useParams(); // Extract the order ID from the URL
  const productDetailId = parseInt(id, 10); // Chuyển id thành số
  const [product, setProduct] = useState();
  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`Products/${id}`);
      console.log("Product fetched:", response.data);
      return setProduct(response.data);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      toast.error(error.response.data);
      return null;
    }
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const imageList =
    product.imageUrls &&
    Array.isArray(product.imageUrls) &&
    product.imageUrls.length > 0
      ? product.imageUrls
      : ["https://via.placeholder.com/400"];

  return (
    <div style={{ padding: 20 }} className="productdetail">
      <Row gutter={16}>
        <Col span={10}>
          <CarouselProduct numberOfSlide={1} id={productDetailId} />
          <CarouselProduct numberOfSlide={4} id={productDetailId} />
        </Col>
        <Col span={14}>
          <Card
            title={product.name}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div className="productdetail-info">
              <p className="productdetail-info__title">Thương Hiệu </p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.brand.name}
              </p>
            </div>
            <div className="productdetail-info">
              <p className="productdetail-info__title">Xuất xứ thương hiệu </p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.brandOrigin.name}
              </p>
            </div>
            <div className="productdetail-info">
              <p className="productdetail-info__title">Nước sản xuất</p>{" "}
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.manufacturedCountry.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Nhà sản xuất</p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.manufacturer.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Quy cách</p>{" "}
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.packaging.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Danh mục</p>
              <Link to={`/product`} style={{ fontSize: "16px", color: "#555" }}>
                {product.category.name}
              </Link>
            </div>

            <div
              className="productdetail-info"
              style={{ display: "flex", alignItems: "" }}
            >
              <p className="productdetail-info__title">Mô tả ngắn</p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  marginLeft: "2vw",
                  
                }}
              >
                {product.description}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Dạng</p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                {product.unit.name}
              </p>
            </div>

            <p
              style={{ fontSize: "18px", fontWeight: "bold", color: "#ff4d4f" }}
            >
              Giá: {product.price}đ
            </p>
            <p>Số lượng: {product.quantity}</p>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ borderRadius: "8px" }}
            >
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
    </div>
  );
};

export default ProductDetail;
