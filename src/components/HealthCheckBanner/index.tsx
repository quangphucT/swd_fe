import React, { useState } from "react";
import { Card, Button } from "antd";
import "./index.scss";
import QuizModal from "../QuizQuestion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const quizData = [
  {
    question: "1. Vào mỗi bữa sáng thức dậy, bạn thấy da mình như thế nào?",
    options: [
      {
        label: "A. Bình thường. Không có sự khác biệt so với trước khi ngủ ",
        value: 0,
      },
      { label: "B. Nhiều dầu. Tập trung ở mũi và trán ", value: 1 },
      { label: "C. Khô và nẻ ", value: 2 },
      { label: "D. Tấy đỏ Bong da ", value: 3 },
    ],
  },
  {
    question:
      "2. Thực hiện rửa mặt với sữa rửa mặt của bạn với nước ấm. Từ 20 – 30′ sau, cảm nhận của da bạn là thế nào?",
    options: [
      { label: "A. Tốt ", value: 0 },
      { label: "B. Vẫn còn nhiều dầu ", value: 1 },
      { label: "C. Khô và ráp ", value: 2 },
      { label: "D. Mẫn đỏ", value: 3 },
    ],
  },
  {
    question: "3. Hãy nhìn kỹ xem lỗ chân lông trên da bạn ra sao?",
    options: [
      { label: "A. Nhỏ ", value: 0 },
      { label: "B. Lớn ", value: 1 },
      { label: "C. Khô ", value: 2 },
      { label: "D. Đỏ", value: 3 },
    ],
  },
  {
    question: "4. Từ nào dưới đây có thể miêu tả kết cấu da bạn?",
    options: [
      { label: "A. Mềm mịn ", value: 0 },
      { label: "B. Nhiều dầu ", value: 1 },
      { label: "C.Hơi khô", value: 2 },
      { label: "D. Mỏng, lộ đường mạch máu", value: 3 },
    ],
  },

  {
    question:
      "5. Vào buổi trưa, da bạn ở tình trạng nào? (Không dùng tay, chỉ soi gương để đoán)",
    options: [
      { label: "A. Như buổi sáng ", value: 0 },
      { label: "B. Sáng ", value: 1 },
      { label: "C. Khô ", value: 2 },
      { label: "D. Nhạy Cảm", value: 3 },
    ],
  },
  {
    question: "6. Bạn có thường xuyên nặn mụn trứng cá?",
    options: [
      { label: "A. Thỉnh thoảng ", value: 0 },
      { label: "B. Thường xuyên, đặc biệt vào chu kỳ ", value: 1 },
      { label: "C. Không bao giờ ", value: 2 },
      { label: "D. Chỉ khi trang điểm", value: 3 },
    ],
  },
  {
    question: "7. Da bạn có bị mụn không ?",
    options: [
      { label: "A. Có", value: 0 },
      { label: "B. Không", value: 1 },
    ],
  },
];

const HealthCheckBanner = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((store: RootState) => store.user)
  const handleQuizModalOpen = () => {
    if(!user){
      toast.error('Vui lòng đăng nhập để sử dụng dịch vụ này!')
      return
    }else{
      setIsModalOpen(true); 
    }
  };

  return (
    <div className="health-banner">
      <h2>Kiểm tra sức khỏe da mặt </h2>
      <p>Kết quả đánh giá sẽ cho bạn lời khuyên xử trí phù hợp!</p>

      <div className="quiz-list">
        
          <Card className="quiz-card">
            <p>Bài kiểm tra tình trạng da của bạn </p>
            {/* Modal Quiz */}
            <Button type="primary" onClick={handleQuizModalOpen}>
              Làm bài Quiz
            </Button>
            <QuizModal
              visible={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              questions={quizData}
            />
          </Card>
        
      </div>
    </div>
  );
};

export default HealthCheckBanner;
