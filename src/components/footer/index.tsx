import React from "react";
import "./index.scss";
function Footer() {
  const footerLinks = [
    {
      title: "VỀ CHÚNG TÔI",
      links: [
        { label: "Giới thiệu", href: "/gioi-thieu" },
        { label: "Hệ thống Cửa Hàng", href: "/he-thong-cua-hang" },
        { label: "Chính sách Giao Hàng", href: "/chinh-sach-giao-hang" },
        { label: "Chính sách Thanh Toán", href: "/chinh-sach-thanh-toan" },
        { label: "Chính sách Hủy Đơn Hàng", href: "/chinh-sach-huy-don-hang" },
      ],
    },
    {
      title: "DANH MỤC",
      links: [
        { label: "Dược Mĩ Phẩm", href: "/duoc-my-pham" },
        { label: "Chăm sóc Cá Nhân", href: "/cham-soc-ca-nhan" },
        { label: "Thực Phẩm Chức Năng", href: "/thuc-pham-chuc-nang" },
        { label: "Thuốc", href: "/thuoc" },
      ],
    },
    {
      title: "TÌM HIỂU THÊM",
      links: [
        { label: "Gói Sức Khỏe", href: "/goi-suc-khoe" },
        { label: "Tra Cứu Thuốc", href: "/tra-cuu-thuoc" },
        { label: "Tra Cứu Dược Phẩm", href: "/tra-cuu-duoc-pham" },
        { label: "Tra Cứu Dược Liệu", href: "/tra-cuu-duoc-lieu" },
        { label: "Bệnh Thường Gặp", href: "/benh-thuong-gap" },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer_container">
        {footerLinks.map((section) => (
          <div className="footer__contentlink">
            <ul>
              <h3 className="footer-title"> {section.title}</h3>
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer_column">
        <h3>Tổng Đài</h3>
        <h3>Tư Vấn Mua Hàng</h3>
        <p>1900 633 633 (Nhánh 1)</p>
        <h2> Hỗ Trợ Thanh Toán</h2>
        <img src="/img/vnpay.png" alt="VNPay" />
      </div>
      <div className="footer_column">
        <h3>Kết Nối Với Chúng Tôi</h3>
        <div className="links">
          <img src="/img/facebook.png" alt="Facebook" />
          <img src="/img/zalo.png" alt="Zalo" />
        </div>
      </div>
      <div className="footer_column">
        <h3>Trung Tâm Chăm Sóc Da Chuyên Sâu</h3>
        <p>Địa chỉ: 123 Đường Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh</p>
        <p>Hotline: 0909 123 456</p>
        <p>Email: cskh@chamsocda.com</p>
      </div>
    </footer>
  );
}

export default Footer;
