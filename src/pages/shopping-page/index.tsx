import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/api";
import { Flex, Spin, Button, Row, Col } from "antd";
import { toast } from "react-toastify";
import { RightOutlined } from "@ant-design/icons";

import CardProduct from "../../components/product";
import { formatMoneyToVND } from "../../currency/currency";

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterPrice, setFilterPrice] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      // Apply filter conditionally
      if (filterPrice === 100000) {
        response = await api.get(`Products/price-under-100000?pageNumber=${pageNumber}&pageSize=3`);
      } else if (filterPrice === 200000) {
        response = await api.get(`Products/price-over-200000?pageNumber=${pageNumber}&pageSize=3`);
      }
      else if (filterPrice === 400000) {
        response = await api.get(`Products/price-over-400000?pageNumber=${pageNumber}&pageSize=3`);
      }
      else if (filterPrice === 500000) {
        response = await api.get(`Products/price-over-500000?pageNumber=${pageNumber}&pageSize=3`);
      }
      else {
        response = await api.get(`Products?pageNumber=${pageNumber}&pageSize=3`);
      }

      if (response.data.items.length === 0) {
        setHasMore(false);
      } else {
        // Append new products to the existing list
        setProducts((prev) => [...prev, ...response.data.items]);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, filterPrice]); // Call API when pageNumber or filterPrice changes

  useEffect(() => {
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
        toast.error("Lỗi khi lấy hình ảnh sản phẩm!");
      }
    };
    fetchImages();
  }, []);

  const handleFilterChange = (price) => {
    setFilterPrice((prev) => (prev === price ? 0 : price)); // Toggle filter
    setProducts([]); // Reset products when filter changes
    setPageNumber(1);
    setHasMore(true);
  };

  return (
    <div className="shopping-page-container">
      <Row gutter={24}>
        <Col span={8} className="shopping-filter-section">
          <Button type="primary" className="shopping-filter-button">
            Lọc sản phẩm theo giá
          </Button>
          <Button
            key={filterPrice}
            onClick={() => handleFilterChange(100000)}
            className={`shopping-price-filter ${filterPrice === 100000 ? "active" : ""}`}
          >
            Dưới {formatMoneyToVND(100000)}
          </Button>
          <Button
            onClick={() => handleFilterChange(200000)}
            className={`shopping-price-filter ${filterPrice === 200000 ? "active" : ""}`}
          >
            Trên {formatMoneyToVND(200000)}
          </Button>

          <Button
            onClick={() => handleFilterChange(400000)}
            className={`shopping-price-filter ${filterPrice === 400000 ? "active" : ""}`}
          >
            Trên {formatMoneyToVND(400000)}
          </Button>
          <Button
            onClick={() => handleFilterChange(500000)}
            className={`shopping-price-filter ${filterPrice === 500000 ? "active" : ""}`}
          >
            Trên {formatMoneyToVND(500000)}
          </Button>

          {/* <Button
            onClick={() => handleFilterChange(0)}
            className={`shopping-price-filter ${filterPrice === 0 ? "active" : ""}`}
          >
            Bỏ lọc
          </Button> */}
        </Col>
        <Col span={16} className="shopping-product-section">
          <h2>Sản phẩm của chúng tôi</h2>

          {loading && products.length === 0 ? (
            <Flex justify="center" align="center" className="shopping-loading-container">
              <Spin spinning={loading} tip="Loading products..." size="large" />
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
                <Flex justify="center" className="shopping-load-more-container">
                  <Button
                    className="shopping-load-more-btn"
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    loading={loading}
                    disabled={!hasMore}
                  >
                    Xem thêm sản phẩm <RightOutlined />
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

export default ShoppingPage;
