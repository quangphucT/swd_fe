import React from "react";
import "./index.scss";
const RoutineSteps = ({ data }) => {
  // Giả sử data là mảng các bước routine được trả về từ API
  // Chia mảng theo chỉ số:
  // Basic Day: 5 phần tử đầu tiên (index 0 đến 4)
  const basicDay = data.slice(0, 5);
  // Basic Night: 7 phần tử tiếp theo (index 5 đến 11)
  const basicNight = data.slice(5, 12);
  // Advanced Day: 7 phần tử tiếp theo (index 12 đến 18)
  const advancedDay = data.slice(12, 19);
  // Advanced Night: 8 phần tử tiếp theo (index 19 đến 26)
  const advancedNight = data.slice(19, 27);

  return (
    <div className="RoutineSteps_container">
      <h2>Quy trình chăm sóc ban ngày cơ bản </h2>
      <ul>
        {basicDay.map((item) => (
          <li key={item.id}>
            <a
              href={`/product/${item.product.id}`}
              style={{ color: "#1890ff" }}
            >
              {item.product.name}
            </a>
            {" - "}
            {item.category.name}- Bước: {item.step}
          </li>
        ))}
      </ul>

      <h2>Quy trình chăm sóc ban đêm cơ bản</h2>
      <ul>
        {basicNight.map((item) => (
          <li key={item.id}>
            <a
              href={`/product/${item.product.id}`}
              style={{ color: "#1890ff" }}
            >
              {item.product.name}
            </a>
            {" - "}
            {item.category.name}- Bước: {item.step}
          </li>
        ))}
      </ul>

      <h2>Quy trình chăm sóc ban ngày nâng cao </h2>
      <ul>
        {advancedDay.map((item) => (
          <li key={item.id}>
            <a
              href={`/product/${item.product.id}`}
              style={{ color: "#1890ff" }}
            >
              {item.product.name}
            </a>
            {" - "}
            {item.category.name}- Bước: {item.step}
          </li>
        ))}
      </ul>

      <h2>Quy trình chăm sóc ban đêm nâng cao</h2>
      <ul>
        {advancedNight.map((item) => (
          <li key={item.id}>
            <a
              href={`/product/${item.product.id}`}
              style={{ color: "#1890ff" }}
            >
              {item.product.name}
            </a>
            {" - "}
            {item.category.name}- Bước: {item.step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineSteps;
