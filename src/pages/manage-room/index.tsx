import { toast } from 'react-toastify';
import './index.scss';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
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
            const filteredDoctors = response.data.filter(doctor => doctor.email.includes("bacsi"));
            setDoctors(filteredDoctors);
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
        },
        {
            title: 'Combo Package',
            dataIndex: 'packageName',
            key: 'packageName',
        }
    ];

    const handleCreateRoom = async (values) => {
        try {
            // Truyền trực tiếp values, bao gồm roomName, slotMax, doctorId và packageId
            await api.post("Room/Create", values);
            toast.success("Room created successfully");
            fetchAllRooms();
            setIsModalOpen(false);
            form.resetFields();
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
                title="Tạo phòng"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateRoom}>
                    <Form.Item name="roomName" label="Room Name" rules={[{ required: true, message: 'Please enter room name' }]}> 
                        <Input />
                    </Form.Item>
                    <Form.Item name="slotMax" label="Max Slots" rules={[{ required: true, message: 'Please enter max slots' }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="timeSlot" label="Time Slot" rules={[{ required: true, message: 'Please enter time slot' }]}> 
                        <Input  />
                    </Form.Item>
                    <Form.Item name="doctorId" label="Doctor" rules={[{ required: true, message: 'Please select a doctor' }]}> 
                        <Select>
                            {doctors.map(doctor => (
                                <Select.Option key={doctor.id} value={doctor.id}>{doctor.firstName + " " + doctor.lastName}</Select.Option>
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
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageRoom;
