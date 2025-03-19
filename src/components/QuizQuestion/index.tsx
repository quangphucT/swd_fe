import React, { useState } from "react";
import { Card, Radio, Button, Space, Typography, message, Modal } from "antd";
import api from "../../config/api";
import "./index.scss";
import RoutineSteps from "../RoutineDisplay";
import { useDispatch } from "react-redux";
import { saveResultQuizId } from "../../redux/feature/resultquizSlice";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const QuizModal = ({ questions, visible, onClose }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultQuiz, setResultQuiz] = useState(0);
  const [stepsData, setStepsData] = useState([]);
  const [showRoutineSteps, setShowRoutineSteps] = useState(false);
  const currentQuestion = questions[currentIndex];
  const [message1, setMessage1] = useState();
  const dispatch = useDispatch();
  
  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [`quiz${currentIndex + 1}`]: e.target.value,
    });
  };

  const handleNext = () => {
    if (!(`quiz${currentIndex + 1}` in userAnswers)) {
      message.warning("Vui lòng chọn một đáp án!");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (Object.keys(userAnswers).length < questions.length) {
      message.warning("Bạn chưa trả lời hết các câu hỏi!");
      return;
    }
    try {
      const response = await api.post("/ResultQuiz", userAnswers);
      setResultQuiz(response.data.data.resultQuizId);
      dispatch(saveResultQuizId(response.data.data.resultQuizId));
      console.log(typeof  response.data.message,response.data.message);
      console.log(response)
      if (response.status === 200 && response.data?.data) {
        const { skinStatus, anceStatus } = response.data.data;
        
        const skinMessages = ["Da thường", "Da dầu", "Da khô", "Da hỗn hợp", "Không xác định"];
        const acneMessages = ["Có mụn", "Không có mụn"];

        setResultData({
          skinStatus: skinMessages[skinStatus] || "Không xác định",
          anceStatus: acneMessages[anceStatus] || "Không rõ",  
        });
        setMessage1(response.data.message);
        
        setResultModalVisible(true);
        message.success(`Tình trạng da của bạn: ${skinMessages[skinStatus]}`);
      }
      
    } catch (error) {
      message.error("Gửi thất bại, vui lòng thử lại!");
      console.error("Lỗi API:", error);
    }
  };

  const handleResult = async () => {
    try {
      const response = await api.get(`RoutineStep/GetRouteStepsByUserIDAsync/${resultQuiz}`);
      if (response.data) {
        setStepsData(response.data);
        setShowRoutineSteps(true);
      } else {
        message.warning("Không có dữ liệu routine steps.");
      }
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu routine steps.");
      console.error(error);
    }
  };
  const handleModalClose = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setResultData(null);
    setResultModalVisible(false);
    setShowRoutineSteps(false);
    onClose();
  };
  return (
    <>
      <Modal title="Bài Quiz" open={visible} onCancel={()=>onClose()} footer={null} width="70vw" centered>
        <Title level={5} style={{ textAlign: "start", marginBottom: 10 }}>{`Câu hỏi ${currentIndex + 1}/${questions.length}`}</Title>
        <Text strong>{currentQuestion.question}</Text>
        <Radio.Group onChange={handleAnswerChange} value={userAnswers[`quiz${currentIndex + 1}`]} style={{ width: "100%", marginTop: 10 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {currentQuestion.options.map((option, index) => (
              <Radio key={index} value={option.value} style={{ display: "block", padding: "8px", borderRadius: "5px" }}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
          <Button disabled={currentIndex === 0} onClick={handlePrev} size="large">Quay lại</Button>
          {currentIndex < questions.length - 1 ? (
            <Button type="primary" onClick={handleNext} size="large">Tiếp tục</Button>
          ) : (
            <Button type="primary" onClick={handleSubmit} size="large">Gửi bài làm</Button>
          )}
        </div>
      </Modal>

      <Modal title="Kết Quả Kiểm Tra" open={resultModalVisible} onCancel={handleModalClose} footer={null} width="50vw" centered>
        {resultData && (
          <>
            <Text strong>Tình trạng da của bạn:</Text>
            <Text style={{ color: "#1890ff", fontSize: "16px" }}>
              {resultData.skinStatus}, {resultData.anceStatus}
            </Text>
            <br />
            {(message1?.trim().toLowerCase() === "success"? (
            <Button type="primary" onClick={handleResult} style={{ marginTop: 20 }} block>
              Xem Routine Steps
            </Button>
          ) : (
            <Button type="default" style={{ marginTop: 20 }} block>
              <Link to="/booking-page">Đặt lịch hẹn bác sĩ</Link>
            </Button>
          ))}
            {showRoutineSteps && (
              <div style={{ marginTop: 20 }}>
                <Text strong>Routine Steps:</Text>
                <RoutineSteps data={stepsData} />
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default QuizModal;