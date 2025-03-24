import { Card, Row, Col, DatePicker, Button, InputNumber } from "antd";
import { UserOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./index.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";

const { RangePicker } = DatePicker;

const DashboardStatistic = () => {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalDoctor, setTotalDoctor] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [bookingStats, setBookingStats] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [profitOrder, setProfitOrder] = useState([])
  const fetchRevenueData = async () => {
    try {
      const response = await api.get(`BookingStatistics/ConfirmedBookingFrequencyByMonth?year=${year}`);
      const formattedData = response.data.labels.map((label, index) => ({
        month: label,
        revenue: response.data.data[index],
      }));
      setRevenueData(formattedData);
    } catch (error) {
      toast.error("Error fetching revenue data");
    }
  };
  useEffect(() => {
    fetchRevenueData();
  }, [year])
  const fetchProfit = async () => {
    try {
      const response = await api.get("Order/getProfit");
      const formattedData = response.data.map((item) => ({
        month: `Tháng ${item.month}`, // Định dạng lại tháng
        revenue: item.revenuePortal,  // Đặt đúng key dữ liệu doanh thu
      }));
      setProfitOrder(formattedData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching profit data");
    }
  };
  
  useEffect(() => {
    fetchProfit();
  }, []);
  
  const fetchAllCustomer = async () => {
    try {
      const response = await api.get("Accounts/getAllCustomer");
      setTotalCustomer(response.data.total);
    } catch (error) {
      toast.error("Error fetching customers");
    }
  };

  const fetchAllDoctor = async () => {
    try {
      const response = await api.get("Accounts/getAllDoctor");
      setTotalDoctor(response.data.total);
    } catch (error) {
      toast.error("Error fetching doctors");
    }
  };

  const fetchAllStaff = async () => {
    try {
      const response = await api.get("Accounts/getAllStaff");
      setTotalStaff(response.data.total);
    } catch (error) {
      toast.error("Error fetching staff");
    }
  };


  const fetchBookingStats = async () => {
    if (!dateRange[0] || !dateRange[1]) {
      toast.warning("Please select a date range");
      return;
    }
    try {
      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");
      const response = await api.get(
        `BookingStatistics/ConfirmedBookingFrequencyByDay?startDate=${startDate}&endDate=${endDate}`
      );
      const formattedData = response.data.labels.map((label, index) => ({
        date: label,
        booking: response.data.data[index],
      }));
      setBookingStats(formattedData);
    } catch (error) {
      toast.error("Failed to fetch booking statistics");
    }
  };

  useEffect(() => {
    // fetchAllStaff();
    // fetchAllDoctor();
    // fetchAllCustomer();

  }, []);

  return (
    <div className="dashboard-statistic">
      <Row gutter={16} className="summary-cards">
        <Col span={6}>
          <Card className="stat-card customer-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total Customer</h3>
              <p>{totalCustomer}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card doctor-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total Doctor</h3>
              <p>{totalDoctor}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card staff-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total Staff</h3>
              <p>{totalStaff}</p>
            </div>
          </Card>
        </Col>
      </Row>


      <Row gutter={16} className="charts">
        <Col span={24} className="date-picker-container">
          <RangePicker value={dateRange} onChange={setDateRange} />
          <Button type="primary" onClick={fetchBookingStats} style={{ marginLeft: 10 }}>
            Load Data
          </Button>

        </Col>

        <Col span={12}>
          <Card title="Booking Overview Following Days" className="chart-card">

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingStats}>
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

          <Card title="Booking Overview Following Years" className="chart-card">

            <ResponsiveContainer width="100%" height={300}>
              <InputNumber

                min={2000}
                max={new Date().getFullYear()}
                value={year}
                onChange={setYear}
                style={{}}
              />
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#52c41a" name={"Total bookings"} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>


        <Col span={12}>

          <Card style={{margin: '20px 0'}} title="Order revenue" className="chart-card">

            <ResponsiveContainer width="100%" height={300}>
              
              <BarChart data={profitOrder}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#ff4500" name={"Tổng doanh thu theo tháng"} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStatistic;
