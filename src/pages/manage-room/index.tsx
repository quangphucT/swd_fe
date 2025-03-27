import { toast } from 'react-toastify';
import './index.scss';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';

const ManageRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [combos, setCombos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();

    const fetchCombos = async () => {
        try {
            const response = await api.get("Package/GetAllPackages");
            setCombos(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch packages");
        }
    };

    const fetchAllDoctors = async () => {
        try {
            const response = await api.get("Booking/GetAllDoctors");
            const formattedDoctors = response.data.map(doctor => ({
                ...doctor,
                displayName: doctor.email.includes("bacsi")
                    ? `DR. ${doctor.firstName} ${doctor.lastName}`
                    : `CV. ${doctor.firstName} ${doctor.lastName}`
            }));
            setDoctors(formattedDoctors);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch doctors");
        }
    };


    const fetchAllRooms = async () => {
        try {
            const response = await api.get("Room/GetAll");
            setRooms(response.data);
        } catch (error) {
            toast.error(error.response?.data || "Failed to fetch rooms");
        }
    };

    useEffect(() => {
        fetchCombos();
        fetchAllDoctors();
        fetchAllRooms();
    }, []);

    const columns = [
        {
            title: 'Room ID',
            dataIndex: 'roomId',
            key: 'roomId',
        },
        {
            title: 'Room Name',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Max Slots',
            dataIndex: 'slotMax',
            key: 'slotMax',
        },
        {
            title: 'Current Slots',
            dataIndex: 'slotNow',
            key: 'slotNow',
        },
        {
            title: 'Time Slot',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctorName',
            key: 'doctorName',
            render: (text, record) => doctors.find(doc => doc.id === record.doctorId)?.displayName || text
        },
        {
            title: 'Combo Package',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Action',
            dataIndex: 'roomId',
            key: 'roomId',
            render: (roomId, record) => {
                return (
                    <div>
                        <Popconfirm title="Bạn có chắc muốn xóa phòng này?" onConfirm={() => {
                            handleConfirmDelete(roomId)
                        }}>  <Button>Delete</Button></Popconfirm>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            form.setFieldsValue({
                                ...record,
                                doctorId: doctors.find(doc => (doc.firstName + " " + doc.lastName) === record.doctorName)?.id,
                                packageId: combos.find(combo => combo.name === record.packageName)?.id
                            });
                        }}>
                            Cập nhật phòng
                        </Button>
                    </div>
                )
            }
        },

    ];
    const handleConfirmDelete = async (id) => {
        try {
            await api.delete(`Room/Delete/${id}`)
            toast.success("Delete success!");
            fetchAllRooms();

        } catch (error) {
            toast.error("Error when delete")
        }
    }
    const handleCreateRoom = async (values) => {
        try {
            if (values.roomId) {
                await api.put(`Room/Update/${values.roomId}`, values);
                toast.success("Room updated successfully");
                fetchAllRooms();
                setIsModalOpen(false);
                form.resetFields();
            } else {
                // Truyền trực tiếp values, bao gồm roomName, slotMax, doctorId và packageId
                await api.post("Room/Create", values);
                toast.success("Room created successfully");
                fetchAllRooms();
                setIsModalOpen(false);
                form.resetFields();
            }

        } catch (error) {
            toast.error(error.response?.data || "Failed to create room");
        }
    };


    return (
        <div className="manage-room">
            <h2>Quản lý phòng</h2>
            <Button style={{ margin: '20px', height: '45px', background: '#1e88e5', fontWeight: '700', fontSize: '16px', color: '#fff' }} onClick={() => { setIsModalOpen(true); }}>Tạo phòng</Button>
            <Table columns={columns} dataSource={rooms} rowKey="roomId" />
            <Modal
                title="Thông tin phòng"
                open={isModalOpen}
                onCancel={() => { setIsModalOpen(false); form.resetFields() }}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateRoom}>
                    <Form.Item name={"roomId"} hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="roomName" label="Room Name" rules={[{ required: true, message: 'Please enter room name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="slotMax" label="Max Slots" rules={[{ required: true, message: 'Please enter max slots' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="timeSlot" label="Time Slot" rules={[{ required: true, message: 'Please enter time slot' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="doctorId" label="Doctor" rules={[{ required: true, message: 'Please select a doctor' }]}>
                        <Select>
                            {doctors.map(doctor => (
                                <Select.Option key={doctor.id} value={doctor.id}>
                                    {doctor.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="packageId" label="Combo Package" rules={[{ required: true, message: 'Please select a combo package' }]}>
                        <Select>
                            {combos.map(combo => (
                                <Select.Option key={combo.id} value={combo.id}>{combo.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Ok</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageRoom;
