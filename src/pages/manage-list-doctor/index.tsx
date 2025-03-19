import { Button, Image, notification, Popconfirm, Table } from 'antd'
import './index.scss'
import api from '../../config/api'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
const ManageListDoctor = () => {
    const [doctorData, setDoctorData] = useState([])
    const fetchingData = async () => {
        try {
            const response = await api.get("Booking/GetAllDoctors")
            setDoctorData(response.data)
        } catch (error) {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchingData();
    }, [])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (value) => <Image src={value} width={120} />
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return (
                    <Popconfirm onConfirm={() => { handleDeleteDoctor(id) }} title="Bạn có chắc muốn xóa tài khoản này không?">
                        <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary">Delete Doctor</Button>
                    </Popconfirm>
                )
            }
        },

    ]
    const handleDeleteDoctor = async (id) => {
        try {
            const response = await api.delete(`Staff/DeleteDoctor/${id}`)
            notification.success({
                message: "Thành công!",
                description: "Bạn đã xóa thành công.",
                duration: 5,
            });
            fetchingData();
        } catch (error) {
            toast.error("error")
        }
    }
  return (
    <div> 
        <Table title={() => "Danh sách các chuyên viên ( STAFF )"} columns={columns} dataSource={doctorData} />
    </div>
  )
}

export default ManageListDoctor