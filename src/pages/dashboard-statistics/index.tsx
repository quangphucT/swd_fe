import { Card, Row, Col } from "antd";
import { UserOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./index.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";

const DashboardStatistic = () => {
  const [totalCustomer, setTotalCustomer] = useState(0)
  const [totalDoctor, setTotalDoctor] = useState(0)
  const [totalStaff, setTotalStaff] = useState(0)
  // Fake data
  const revenueData = [
    { month: "Jan", revenue: 10000 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 18000 },
    { month: "May", revenue: 20000 },
  ];

  const bookingData = [
    { date: "1/2", booking: 30 },
    { date: "2/2", booking: 25 },
    { date: "3/2", booking: 40 },
    { date: "4/2", booking: 35 },
    { date: "5/2", booking: 50 },
  ];
  const fetchAllCustomer = async () => {
    try {
      const response = await api.get("Accounts/getAllCustomer")
      setTotalCustomer(response.data.total)
    } catch (error) {
      toast.error("error")
    }
  }
  const fetchAllDoctor = async () => {
    try {
      const response = await api.get("Accounts/getAllDoctor")
      setTotalDoctor(response.data.total)
    } catch (error) {
      toast.error("error")
    }
  }
  const fetchAllStaff = async () => {
    try {
      const response = await api.get("Accounts/getAllStaff")
      setTotalStaff(response.data.total)
    } catch (error) {
      toast.error("error")
    }
  }
  useEffect(() => {
    fetchAllStaff();
    fetchAllDoctor();
    fetchAllCustomer();
  }, [])
  return (
    <div className="dashboard-statistic">
      {/* Tổng quan */}
      <Row gutter={16} className="summary-cards">
        <Col span={8}>
          <Card className="stat-card">
            <UserOutlined className="icon user-icon" />
            <div>
              <h3>Total Customer</h3>
              <p>{totalCustomer}</p>
            </div>
          </Card>

        </Col>
        <Col span={8}>
          <Card className="stat-card">
            <UserOutlined className="icon user-icon" />
            <div>
              <h3>Total doctor</h3>
              <p>{totalDoctor}</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card">
            <UserOutlined className="icon user-icon" />
            <div>
              <h3>Total staff</h3>
              <p>{totalStaff}</p>
            </div>
          </Card>
        </Col>
      </Row>
    

      {/* Biểu đồ */}
      <Row gutter={16} className="charts">
        <Col span={12}>
          <Card title="Booking Overview" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="booking" stroke="#1890ff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Revenue Overview" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStatistic;
