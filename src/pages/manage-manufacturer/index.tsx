import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"

const ManageManufacturer = () => {
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
        }
    ]
    const formItem = <>
        <Form.Item name={"name"} label="Manufacturer name" rules={[{
            required: true,
            message: 'Name must not be blank!!'
        }]}>
            <Input placeholder="Enter manufacturer name"/>
        </Form.Item>
    </>
    return (
        <div>
            <DashboardTemplate titleModal="New manufacturer" titleModalUpdate="Update information" formItem={formItem} createName="Add new manufacturer" titleTable="Manufacturer management" apiURI="Manufacturers" columns={columns} />
        </div>
    )
}

export default ManageManufacturer
