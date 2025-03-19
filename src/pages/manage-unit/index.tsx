import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"


const ManageUnit = () => {
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
    const formItem = <>
    <Form.Item label="Unit name" name={"name"} rules={[{
        required: true,
        message: 'Name must not be blank!!'
    }]}>
        <Input placeholder="Enter unit name"/>
    </Form.Item>
    </>
  return (
    <div>
      <DashboardTemplate columns={columns} apiURI="Units" titleTable="Quản lý đơn vị ( STAFF )" createName="Tạo mới unit" titleModal="Thông tin đơn vị" titleModalUpdate="Cập nhật" formItem={formItem}/>
    </div>
  )
}

export default ManageUnit
