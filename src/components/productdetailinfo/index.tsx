import React from "react";
import { Card, Typography, Row, Col, Tabs } from "antd";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
interface ProductDetailProps {
  productDescription: string;
  ingredient: string;
  effect: string;
  howToUse: string;
  sideEffect: string;
  note: string;
  preserve: string;
}

const ProductDetailInfo: React.FC<ProductDetailProps> = ({
  productDescription,
  ingredient,
  effect,
  howToUse,
  sideEffect,
  note,
  preserve,
}) => {
  return (
    <Card title="Thông tin sản phẩm" bordered={false} style={{ width: "100%" }}>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ display: "flex" }}>
        <TabPane tab="Mô tả sản phẩm" key="1">
          <Text>{productDescription}</Text>
        </TabPane>
        <TabPane tab="Thành phần" key="2">
          <Text>{ingredient}</Text>
        </TabPane>
        <TabPane tab="Công dụng" key="3">
          <Text>{effect}</Text>
        </TabPane>
        <TabPane tab="Cách dùng" key="4">
          <Text>{howToUse}</Text>
        </TabPane>
        <TabPane tab="Tác dụng phụ" key="5">
          <Text>{sideEffect}</Text>
        </TabPane>
        <TabPane tab="Lưu ý" key="6">
          <Text>{note}</Text>
        </TabPane>
        <TabPane tab="Bảo quản" key="7">
          <Text>{preserve}</Text>
        </TabPane>
      </Tabs>
    </Card>
  );
};
export default ProductDetailInfo;
