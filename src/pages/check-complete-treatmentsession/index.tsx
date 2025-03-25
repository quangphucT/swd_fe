import { toast } from 'react-toastify';
import './index.scss';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { Input, Table, Button, Avatar, Row, Popconfirm, Modal, Form, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

const CheckCompleteTreatmentSection = () => {
    const [data, setData] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [searched, setSearched] = useState(false); // Kiểm tra xem đã tìm kiếm chưa
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [form] = useForm();
    const fetchData = async (phone: string) => {
        setSearched(true); // Đánh dấu là đã tìm kiếm
        try {
            const response = await api.get(`Appointment/GetCustomerScheduleByPhone?phoneNumber=${phone}`);
            if (response.data && response.data.phoneNumber) {
                setData(response.data);
                setNotFound(false);
            } else {
                setData(null);
                setNotFound(true);
            }
        } catch (error) {
            setData(null);
            setNotFound(true);
            toast.error(error.response?.data || "Có lỗi xảy ra khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        setSearched(false); // Không đánh dấu tìm kiếm khi mới load trang
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Khung giờ',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ghi chú của bác sĩ',
            dataIndex: 'descriptionNote',
            key: 'descriptionNote',
            render: (descriptionNote) => {
                if (!descriptionNote) return 'Chưa có ghi chú nào của buổi này';
        
                const truncatedText = descriptionNote.length > 50 
                    ? `${descriptionNote.slice(0, 5)}...` 
                    : descriptionNote;
        
                return (
                    <Tooltip title={descriptionNote}>
                        {truncatedText}
                    </Tooltip>
                );
            },
        },
        
        {
            title: 'Cập nhật',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => {
                return (
                    <div>
                        {record.status === "Completed" ? <Button 
                             
                                style={{ marginLeft: 10, background: '#f39c12', height: '45px' }} 
                                type='primary'
                            >
                             DONE
                            </Button> : <Button onClick={() => handleOpenModel(id)} style={{ background: '#2968a7', height: '45px' }} type='primary'>Cập nhật tiến độ</Button>}
                    </div>
                )
            }
        },
    ];
    const handleOpenModel = async (id) => {
        setId(id);
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false);
        form.resetFields();
    }
    const handleSubmit = async (values) => {
        try {
            await api.put(`Appointment/Update/${id}`, values)
            toast.success("Cập nhật thành công!");
            setOpen(false);
            fetchData(phoneNumber);
            form.resetFields();
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    return (
        <div className="check-treatment">
            <h1>Tìm kiếm lộ trình điều trị cụ thể của khách hàng</h1>
            <div className="search-box">
                <Input
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button type="primary" onClick={() => fetchData(phoneNumber)}>Tìm kiếm</Button>
            </div>

            {/* Chỉ hiển thị nếu đã tìm kiếm và không tìm thấy */}
            {searched && notFound && <p className="not-found">Không tìm thấy số điện thoại này</p>}

            {data && (
                <div className="customer-info">
                    <h2>Thông tin khách hàng</h2>
                    <p><strong>Họ tên:</strong> {data.customerName}</p>
                    <p><strong>Số điện thoại:</strong> {data.phoneNumber}</p>
                    <p><strong>Gói dịch vụ:</strong> {data.packageName}</p>
                    <p><strong>Ngày bắt đầu:</strong> {new Date(data.startDate).toLocaleDateString('vi-VN')}</p>
                </div>
            )}

            {data && (
                <div className="doctor-info">
                    <h2> Bác sĩ phụ trách</h2>
                    <div className="doctor-details">
                        <Avatar
                            src={data.doctorAvatar || 'https://via.placeholder.com/100'}
                            size={100}
                        />
                        <div>
                            <p><strong>Họ tên:</strong> {data.doctorName}</p>
                            <p><strong>Số điện thoại:</strong> {data.doctorPhone}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="treatment-table">
                <Table
                    columns={columns}
                    dataSource={data ? data.treatmentSessions.map(session => ({ ...session, key: session.id })) : []}
                />
                <Modal onOk={() => { form.submit() }} open={open} onCancel={handleCloseModal} title="Cập nhật tiến độ">
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item label="Mô tả tình trạng da" name={"description"} rules={[{
                            required: true,
                            message: "Mô tả là bắt buộc!"
                        }]}>
                            <TextArea rows={4} placeholder='Nhập mô tả tại đây' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default CheckCompleteTreatmentSection;
