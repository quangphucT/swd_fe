import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Table, Popconfirm, Modal } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/api';
import './index.scss';
import { formatMoneyToVND } from '../../currency/currency';

const ManagePackaging = () => {
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [listDoctor, setListDoctor] = useState([]);
    const [listPackages, setListPackages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // const fetchAllDoctors = async () => {
    //     try {
    //         const response = await api.get('Booking/GetAllDoctors');
    //         setListDoctor(response.data);
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || 'Lỗi khi lấy danh sách bác sĩ');
    //     }
    // };
    const fetchAllDoctors = async () => {
        try {
            const response = await api.get("Booking/GetAllDoctors");
            // Lọc danh sách chỉ lấy chuyên viên có email chứa "chuyenvien"
            const filteredDoctors = response.data.filter(doctor => doctor.email.includes("bacsi"));
            setListDoctor(filteredDoctors);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const fetchAllPackages = async () => {
        try {
            const response = await api.get('Package/GetAllPackages');
            setListPackages(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi lấy danh sách combo');
        }
    };

    useEffect(() => {
        fetchAllDoctors();
        fetchAllPackages();
    }, []);

    const onFinish = async (values) => {
        try {
            await api.post('Package/CreatePackage', values);
            toast.success('Tạo combo thành công!');
            form.resetFields();
            fetchAllPackages();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi tạo combo');
        }
    };

    const handleUpdateCombo = async (values) => {
        try {
            await api.put(`Package/UpdatePackage/${selectedPackage.id}`, values);
            toast.success('Cập nhật combo thành công!');
            setIsModalOpen(false);
            fetchAllPackages();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi cập nhật combo');
        }
    };

    const openUpdateModal = (combo) => {
        setSelectedPackage(combo);
        formUpdate.setFieldsValue({
            ...combo,
            doctorId: combo.doctorId || null, // Đảm bảo giá trị hợp lệ cho Select
        });
        setIsModalOpen(true);
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Combo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'DoctorID',
            dataIndex: 'doctorId',
            key: 'doctorId',
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <p>{formatMoneyToVND(price)}</p>
        },
        {
            title: 'Số Buổi',
            dataIndex: 'sessions',
            key: 'sessions',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: "Giới hạn còn lại",
            dataIndex: 'packageCount',
            key: 'packageCount',
            render: (packageCount) => {
                return (
                    <p>Còn lại {packageCount} slot</p>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button onClick={() => openUpdateModal(record)}>Cập nhật</Button>
                    <Popconfirm onConfirm={() => handleDeleteCombo(id)} title="Bạn có muốn xóa combo này?">
                        <Button>Xóa</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const handleDeleteCombo = async (id) => {
        try {
            await api.delete(`Package/DeletePackage/${id}`);
            toast.success("Xóa thành công!");
            fetchAllPackages();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="manage-packaging">
            <h2>Tạo Combo Chăm Sóc Da ( STAFF)</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item label="Tên Combo" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên combo' }]}>
                    <Input placeholder="Nhập tên combo" />
                </Form.Item>

                <Form.Item label="Giá (VND)" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá combo' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập giá combo" />
                </Form.Item>

                <Form.Item label="Số Buổi" name="sessions" rules={[{ required: true, message: 'Vui lòng nhập số buổi' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số buổi" />
                </Form.Item>

                <Form.Item label="Giới hạn còn lại" name="packageCount" rules={[{ required: true, message: 'Vui lòng nhập số giới hạn' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số giới hạn" />
                </Form.Item>

                <Form.Item label="Bác Sĩ Phụ Trách" name="doctorId" rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}>
                    <Select placeholder="Chọn bác sĩ">
                        {listDoctor.map((doctor) => (
                            <Select.Option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.firstName + " " + doctor.lastName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Tạo Combo</Button>
                </Form.Item>
            </Form>
            <h2>Danh sách Combo ( STAFF)</h2>
            <Table columns={columns} dataSource={listPackages} rowKey="id" />

            <Modal title="Cập nhật Combo" open={isModalOpen} onCancel={() => { setIsModalOpen(false); formUpdate.resetFields() }} footer={null}>
                <Form form={formUpdate} onFinish={handleUpdateCombo} layout="vertical">
                    <Form.Item label="Tên Combo" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên combo' }]}>
                        <Input placeholder="Nhập tên combo" />
                    </Form.Item>
                    <Form.Item label="Giá (VND)" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá combo' }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập giá combo" />
                    </Form.Item>
                    <Form.Item label="Số Buổi" name="sessions" rules={[{ required: true, message: 'Vui lòng nhập số buổi' }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số buổi" />
                    </Form.Item>
                    <Form.Item label="Giới hạn còn lại" name="packageCount" rules={[{ required: true, message: 'Vui lòng nhập số giới hạn' }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số giới hạn còn lại cho combo" />
                    </Form.Item>

                    <Form.Item label="Bác Sĩ Phụ Trách" name="doctorId" rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}>
                        <Select placeholder="Chọn bác sĩ">
                            {listDoctor.map((doctor) => (
                                <Select.Option key={doctor.id} value={doctor.id}>
                                    Dr. {doctor.firstName + " " + doctor.lastName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginTop: '10px' }}>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>


                </Form>
            </Modal>
        </div>
    );
};

export default ManagePackaging;
