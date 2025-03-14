import React, { useState } from "react";
import { Card, Radio, Button, Space, Typography, message, Modal } from "antd";
import api from "../../config/api";
import "./index.scss";
import RoutineSteps from "../RoutineDisplay";
const { Text } = Typography;

const QuizModal = ({ questions, visible, onClose }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultQuiz, setResultQuiz] = useState(0);
  const [routineStepsData, setRoutineStepsData] = useState(null); // Lưu dữ liệu routine steps
  const [showRoutineSteps, setShowRoutineSteps] = useState(false); // Điều khiển hiển thị routine steps
  const [stepsData, setStepsData] = useState([]);
  const currentQuestion = questions[currentIndex];

  // Xử lý thay đổi đáp án
  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [`quiz${currentIndex + 1}`]: e.target.value,
    });
  };

  // Chuyển câu hỏi tiếp theo
  const handleNext = () => {
    if (!(`quiz${currentIndex + 1}` in userAnswers)) {
      message.warning("Vui lòng chọn một đáp án!");
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Quay lại câu hỏi trước
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Gửi bài quiz và lấy kết quả
  const handleSubmit = async () => {
    if (Object.keys(userAnswers).length < questions.length) {
      message.warning("Bạn chưa trả lời hết các câu hỏi!");
      return;
    }
    try {
      const response = await api.post("/ResultQuiz", userAnswers);
      setResultQuiz(response.data.data.resultQuizId);
      if (response.status === 200 && response.data?.data) {
        const { skinStatus, anceStatus } = response.data.data;
        let skinMessage = skinStatus === 0 ? "Da khô" : skinStatus === 1 ? "Da dầu" : skinStatus === 2 ? "Da hỗn hợp" : "Da nhạy cảm";
        let acneMessage = anceStatus === 0 ? "Có mụn" : "Không có mụn";
        setResultData({
          skinStatus: skinMessage,
          anceStatus: acneMessage,
          
        });
        setResultModalVisible(true);
        message.success(`Tình trạng da của bạn: ${skinMessage}`);
      }
    } catch (error) {
      message.error("Gửi thất bại, vui lòng thử lại!");
      console.error("Lỗi API:", error);
    }
  };

  // Xử lý hiển thị routine steps
  const handleResult = async () => {
    try {
      const response = await api.get(`RoutineStep/GetRouteStepsByUserIDAsync/${resultQuiz}`);
      console.log(response);
      setStepsData(response.data);
      if (response.data) {
        setRoutineStepsData(response.data); // Lưu dữ liệu routine steps
        setShowRoutineSteps(true); // Hiển thị routine steps ngay trong modal
      } else {
        message.warning("Không có dữ liệu routine steps.");
      }
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu routine steps.");
      console.error(error);
    }
  };



  return (
    <>
      {/* Modal Quiz */}
      <Modal
        title="Bài Quiz"
        open={visible}
        onCancel={onClose}
        footer={null}
        width="80vw"
      >
        <Text strong>{`Câu hỏi ${currentIndex + 1}/${questions.length}`}</Text>
        <p>{currentQuestion.question}</p>
        <Radio.Group
          onChange={handleAnswerChange}
          value={userAnswers[`quiz${currentIndex + 1}`]}
        >
          <Space direction="vertical">
            {currentQuestion.options.map((option, index) => (
              <Radio key={index} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between" }}>
          <Button disabled={currentIndex === 0} onClick={handlePrev}>
            Quay lại
          </Button>
          {currentIndex < questions.length - 1 ? (
            <Button type="primary" onClick={handleNext}>
              Tiếp tục
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit}>
              Gửi bài làm
            </Button>
          )}
        </div>
      </Modal>

      {/* Modal Kết Quả */}
      <Modal
        title="Kết Quả Kiểm Tra"
        open={resultModalVisible}
        onCancel={() => setResultModalVisible(false)}
        footer={null}
        width="50vw"
      >
        {resultData && (
          <>
            <Text strong>Tình trạng da của bạn: </Text>
            <Text style={{ color: "#1890ff" }}>
              {resultData.skinStatus}, {resultData.anceStatus}
            </Text>

            <br/>

            {/* Nút để xem routine steps */}
            <Button type="primary" onClick={handleResult} style={{ marginTop: 20 }}>
              Xem Routine Steps
            </Button>

            {/* Hiển thị routine steps ngay bên dưới */}
            {showRoutineSteps && routineStepsData && (
              <div style={{ marginTop: 20 }}>
                <Text strong>Routine Steps:</Text>
                <RoutineSteps data={stepsData} />;
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default QuizModal;