import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Carousel, Flex, Breadcrumb } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";

import ProductDetailInfo from "../../components/productdetailinfo";
import QuantitySelector from "../../components/button";
import CarouselProductWithThumb from "../../components/carousel-product";
import CarouselProductWithLightbox from "../../components/carousel-product";
import { formatMoneyToVND } from './../../currency/currency';

const ProductDetail = () => {
  const { id } = useParams(); // Extract the order ID from the URL
  const productDetailId = parseInt(id, 10); // Chuyển id thành số
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [idCategory, setIdCategory] = useState(1);
  const [imageProducts, setImageProducts] = useState([]);
  const [category, setCategory] = useState();
  const [solution, setSolution] = useState();

  const handleQuantityChange = (newValue: number) => {
    setQuantity(newValue);
    console.log("Số lượng:", newValue);
  };

  const fetchImageProducts = async () => {
    try {
      //  const response = await api.get(`Images/getImagesByProductId/${id}`);
      const response = await api.get(`Images/getImagesByProductId/${id}`);
      console.log(response.data);
      setImageProducts(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    fetchImageProducts();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`Products/${id}`);
      const idCategory = parseInt(response.data.category.id, 10);
      setIdCategory(idCategory);
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

  const fetchDataCategory = async () => {
    try {
      const responseCategory = await api.get(`Categories/${idCategory}`);
      setCategory(responseCategory.data);
      const responseSolution = await api.get(
        `Solutions/${responseCategory.data.solutionId}`
      );
      setSolution(responseSolution.data);
    } catch (error) {
      toast.error("Lỗi khi gọi API!"); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);

  if (!product || !category || !solution) {
    return <p>Loading...</p>;
  }

  // Gọi hàm fetchDataCategory ngay khi component mount

  const imageList = imageProducts.map((item) => item.imageUrl);
  console.log("imageList", imageList);
  return (
    <div style={{ padding: 40, marginLeft: "10vw", marginRight: "10vw" }}>
      <Breadcrumb
        style={{ paddingLeft: "10%", marginBottom: "2vh", fontSize: "1rem" }}
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          {
            title: <Link to="">{category?.name}</Link>,
          },
          {
            title: <Link to="">{solution?.name}</Link>,
          },
        ]}
      />
      <Row
        gutter={16}
        className="productdetail"
        style={{ marginTop: 10, paddingBottom: 20 }}
      >
        <Col span={8}>
          {/* <CarouselProduct numberOfSlide={1} id={productDetailId} />
          <CarouselProduct numberOfSlide={4} id={productDetailId} /> */}
          <CarouselProductWithLightbox images={imageList} />
        </Col>
        <Col span={16}>
          <Card
            title={
              <span
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  letterSpacing: ".01em",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  marginTop: "10px",
                }}
              >
                {product.name}
              </span>
            }
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              fontSize: "1.5rem",
              lineHeight: "2.25rem",
              letterSpacing: ".01em",
            }}
          >
            <p
              style={{
                fontSize: "2.25rem",
                fontWeight: "600",
                color: "#2c54e6",
                paddingBottom: "3vh",
              }}
            >
              Giá: {formatMoneyToVND(product.price)}
              <span style={{ fontWeight: "400", fontSize: "1.5rem" }}>
                {" "}
                / {product.unit.name}
              </span>
            </p>
            <div className="productdetail-info">
              <p className="productdetail-info__title">Thương Hiệu </p>
              <p className="productdetail-info__name">{product.brand.name}</p>
            </div>
            <div className="productdetail-info">
              <p className="productdetail-info__title">Xuất xứ thương hiệu </p>
              <p className="productdetail-info__name">
                {product.brandOrigin.name}
              </p>
            </div>
            <div className="productdetail-info">
              <p className="productdetail-info__title">Nước sản xuất</p>{" "}
              <p className="productdetail-info__name">
                {product.manufacturedCountry.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Nhà sản xuất</p>
              <p className="productdetail-info__name">
                {product.manufacturer.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Quy cách</p>{" "}
              <p className="productdetail-info__name">
                {product.packaging.name}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Danh mục</p>
              <Link to={`/product`} className="productdetail-info__name">
                {product.category.name}
              </Link>
            </div>

            <div
              className="productdetail-info"
              style={{ display: "flex", alignItems: "" }}
            >
              <p className="productdetail-info__title">Mô tả ngắn</p>
              <p
                className="productdetail-info__name"
                style={{ marginRight: "15%", marginLeft: "8.9vw" }}
              >
                {product.description}
              </p>
            </div>

            <div className="productdetail-info">
              <p className="productdetail-info__title">Dạng</p>
              <p className="productdetail-info__name">{product.unit.name}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <QuantitySelector
                defaultValue={1}
                min={1}
                max={10}
                onChange={handleQuantityChange}
              />
            </div>
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
