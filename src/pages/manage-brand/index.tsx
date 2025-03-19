import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"
import './index.scss'

const ManageBrand = () => {

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
    <Form.Item label="Brand name" name={"name"} rules={[{
      required: true,
      message: 'Name must not be blank!!'
    }]}>
      <Input placeholder="Enter name" />
    </Form.Item>
  </>

  

  return (
    <div>
      <DashboardTemplate  titleModalUpdate="Cập nhật brand" createName="Tạo mới brand" titleTable="Danh sách brands ( STAFF )" formItem={formItem} titleModal="Add new brand" apiURI="Brands" columns={columns} />
    </div>
  )
}

export default ManageBrand
