import React from "react";
import { Menu, Dropdown, Card, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Dùng React Router để điều hướng
import "./index.scss";

const categories = [
  {
    key: "cham-soc-da-mat",
    title: "Chăm sóc da mặt",
    link: "/cham-soc-da-mat",
    subcategories: [
      {
        name: "Sữa rửa mặt (Kem, gel, sữa)",
        link: "/cham-soc-da-mat/sua-rua-mat",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Kem chống nắng da mặt",
        link: "/cham-soc-da-mat/kem-chong-nang",
        image: "/images/kem-chong-nang.jpg",
      },
      {
        name: "Dưỡng da mặt",
        link: "/cham-soc-da-mat/duong-da-mat",
        image: "/images/duong-da-mat.jpg",
      },
      {
        name: "Mặt nạ",
        link: "/cham-soc-da-mat/mat-na",
        image: "/images/mat-na.jpg",
      },
      {
        name: "Serum, Essence hoặc Ampoule",
        link: "/cham-soc-da-mat/serum",
        image: "/images/serum.jpg",
      },
      {
        name: "Toner (nước hoa hồng / Lotion)",
        link: "/cham-soc-da-mat/toner",
        image: "/images/toner.jpg",
      },
      {
        name: "Tẩy tế bào chết",
        link: "/cham-soc-da-mat/tay-te-bao-chet",
        image: "/images/tay-te-bao-chet.jpg",
      },
      {
        name: "Xít khoáng (mist)",
        link: "/cham-soc-da-mat/mist",
        image: "/images/toner.jpg",
      },
      {
        name: "Nước tẩy trang ,dầu tẩy trang",
        link: "/cham-soc-da-mat/tay-trang",
        image: "/images/toner.jpg",
      },
    ],
  },
  {
    key: "cham-soc-toc-da-dau",
    title: "Chăm sóc tóc - da đầu",
    link: "/cham-soc-toc-da-dau",
    subcategories: [
      {
        name: "Dầu gội",
        link: "/cham-soc-toc-da-dau/dau-goi",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Dầu xả",
        link: "/cham-soc-toc-da-dau/dau-xa",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Dầu gội trị nấm",
        link: "/cham-soc-toc-da-dau/dau-goi-tri-nam",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Dưỡng tóc, ủ tóc",
        link: "/cham-soc-toc-da-dau/duong-toc",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Đặc trị cho tóc",
        link: "/cham-soc-toc-da-dau/dac-tri-cho-toc",
        image: "/images/sua-rua-mat.jpg",
      },
    ],
  },
  {
    key: "cham-soc-co-the",
    title: "Chăm sóc cơ thể",
    link: "/cham-soc-co-the",
    subcategories: [
      {
        name: "Sữa tắm",
        link: "/cham-soc-co-the/sua-tam",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Chống nắng toàn thân",
        link: "/cham-soc-co-the/chong-nang-toan-than",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Lăn khử mùi, xit khử mùi",
        link: "/cham-soc-co-the/khu-mui",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Sưa dưỡng thể, kem dưỡng thể",
        link: "/cham-soc-co-the/duong-the",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Trị nứt da",
        link: "/cham-soc-co-the/tri-nut-da",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Kem dưỡng chân, tay",
        link: "/cham-soc-co-the/kem-duong-chan-tay",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Chăm sóc ngực",
        link: "/cham-soc-co-the/cham-soc-nguc",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Massage",
        link: "/cham-soc-co-the/massage",
        image: "/images/sua-rua-mat.jpg",
      },
    ],
  },
  {
    key: "my-pham-trang-diem",
    title: "Mỹ phẩm trang điểm",
    link: "/my-pham-trang-diem",
    subcategories: [
      {
        name: "Son môi",
        link: "/my-pham-trang-diem/son-moi",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Trang điểm mắt",
        link: "/my-pham-trang-diem/trang-diem-mat",
        image: "/images/sua-rua-mat.jpg",
      },
    ]
  },
  {
    key: "giai-phap-lan-da",
    title: "Giải pháp làn da",
    link: "/giai-phap-lan-da",
    subcategories: [
      {
        name: "Trị sẹo, mờ vêt thâm",
        link: "/giai-phap-lan-da/tri-seo-mo-tham",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Kem tri mụn, gei tri mụn",
        link: "/giai-phap-lan-da/tri-mun",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Dưỡng da bị khô, thiếu ẩm",
        link: "/giai-phap-lan-da/da-bi-kho-thieu-am",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Kem tri nám, tàn nhang, đốm nâu",
        link: "/giai-phap-lan-da/nam-tan-nhang-dom-nau",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Viêm da cơ địa",
        link: "/giai-phap-lan-da/viem-da-co-dia",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Da bị kích ứng",
        link: "/giai-phap-lan-da/da-bi-kich-ung",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Tái tạo, chống lão hóa",
        link: "/giai-phap-lan-da/tai-tao-chong-lao-hoa",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Da sần, xỉn màu",
        link: "/giai-phap-lan-da/da-sam-xin-mau",
        image: "/images/sua-rua-mat.jpg",
      },
    ]
  },
  {
    key: "cham-soc-da-vung-mat",
    title: "Chăm sóc da vùng mắt",
    link: "/cham-soc-da-vung-mat",
    subcategories: [
      {
        name: "Trị quầng thâm, bọng mắt",
        link: "/cham-soc-da-vung-mat/tri-tham-quang-bong-mat",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Xoá nếp nhăn vùng mắt",
        link: "/cham-soc-da-vung-mat/xoa-nep-nhan-vung-mat",
        image: "/images/sua-rua-mat.jpg",
      },{
        name: "Dưỡng da mắt",
        link: "/cham-soc-da-vung-mat/duong-da-mat",
        image: "/images/sua-rua-mat.jpg",
      },
    ]
  },
  {
    key: "san-pham-tu-thien-nhien",
    title: "Sản phẩm từ thiên nhiên",
    link: "/san-pham-tu-thien-nhien",
    subcategories: [
      {
        name: "Tinh dầu",
        link: "/san-pham-tu-thien-nhien/tinh-dau",
        image: "/images/sua-rua-mat.jpg",
      },
      {
        name: "Dầu dừa",
        link: "/san-pham-tu-thien-nhien/dau-dua",
        image: "/images/sua-rua-mat.jpg",
      },
    ]
  },
];

function MegaMenu() {
  return (
    <Menu className="mega-menu" mode="horizontal" >
      {categories.map((category) => (
        <Dropdown
          key={category.key}
          className="mega-menu-dropdown"
          overlay={
            //chứa Nội dung dropdown (danh mục con).
            <Card className="mega-menu-card" >
              {/* Card chứa các subcategories */}
              <Row gutter={[16, 16]}>
                {/*Cách đều các cột 16px */}
                {category.subcategories.map((sub, index) => (
                  <Col span={12} key={index} className="mega-menu-item">
                    <Link to={sub.link} className="mega-menu-link">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="mega-menu-img"
                      />
                      {sub.name}
                    </Link>
                  </Col>
                ))}
              </Row>
            </Card>
          }
          placement="bottom"
        >
          <Menu.Item className="menu-item">
            <Link to={category.link} className="menu-link">
              {category.title} <DownOutlined className="dropdown-icon" />
            </Link>
          </Menu.Item>
        </Dropdown>
      ))}
    </Menu>
  );
}

export default MegaMenu;
