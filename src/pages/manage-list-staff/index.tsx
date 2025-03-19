import { Button, Image, notification, Popconfirm, Table } from 'antd'
import api from '../../config/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ManageStaffList = () => {
    const [dataStaff, setDataStaff] = useState([])


    const fetchDataStaff = async () => {
        try {
            const response = await api.get("Manager/getAllStaffs")
            setDataStaff(response.data)
        } catch (error) {
            toast.error("error")
        }
    }
    useEffect(() => {
        fetchDataStaff();
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
            render: (id, record) => {
                return (
                    <div>
                        {record.status === "Active" ? <Popconfirm onConfirm={() => { handleDeleteStaff(id) }} title="Bạn có chắc muốn Block tài khoản này không?">
                            <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary">Block Staff</Button>
                        </Popconfirm> : <Popconfirm onConfirm={() => { handleDeleteStaff(id) }} title="Bạn có chắc muốn UnBlock tài khoản này không?">
                            <Button style={{ height: '45px', fontSize: '15px', fontWeight: '500' }} type="primary" danger>UnBlock Staff</Button>
                        </Popconfirm>}

                    </div>

                )
            }
        },

    ]
    const handleDeleteStaff = async (id) => {
        try {
            const response = await api.put(`Manager/ToggleUserStatus/${id}`)
            notification.success({
                message: "Thành công!",
                description: response.data.message,
                duration: 5,
            });

            fetchDataStaff();
        } catch (error) {
            toast.error("error")
        }
    }
  return (
    <div>
          <Table title={() => "Danh sách nhân viên ( MANAGER )"} columns={columns} dataSource={dataStaff} />
    </div>
  )
}

export default ManageStaffList