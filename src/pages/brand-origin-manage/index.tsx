
import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"


const ManageBrandOrigin = () => {
    const columns: Column[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
    ]
    const formItem =
        <>
            <Form.Item label="Name" name={"name"} rules={[{
                required: true,
                message: 'Name must not be blank!!'
            }]}>
                <Input placeholder="Enter name" />
            </Form.Item>
        </>
    return (
        <div>
            <DashboardTemplate titleModalUpdate="Cập nhật brandOrigin" titleModal="Add new brandOrigin" formItem={formItem} createName="Tạo mới brandOrigin" titleTable="Quản lý BrandOrigin ( STAFF )" apiURI="BrandOrigins" columns={columns} />
        </div>
    )
}

export default ManageBrandOrigin
