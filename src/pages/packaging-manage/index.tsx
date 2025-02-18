import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"

const PackagingManage = () => {
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
    <Form.Item label="Packaging name" name={"name"} rules={[{
      required: true,
      message: 'Name must not be blank!!'
    }]}>
      <Input placeholder="Enter name" />
    </Form.Item>
  </>
  return (
    <div>
      <DashboardTemplate titleModal="Add new packaging" formItem={formItem} titleTable="Packaging management" createName="Create new packaging" apiURI="Packagings" columns={columns} />
    </div>
  )
}

export default PackagingManage
