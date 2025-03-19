import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"


const ManageSolution = () => {
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
    <Form.Item label="Solution name" name={"name"} rules={[{
      required: true,
      message: 'Name must not be blank!!'
    }]}>
      <Input placeholder="Enter name" />
    </Form.Item>
  </>
   
  return (
  <div>
    <DashboardTemplate createName="Create new solution" formItem={formItem} titleModal="Add new solution" titleTable="Solution Management" apiURI="Solutions" columns={columns} />
  </div>
)
}

export default ManageSolution
