
import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"


const ManageManufacturedCountries = () => {
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
        <Form.Item name={"name"} label="Manufacturer name" rules={[{
            required: true,
            message: 'Name must not be blank!!'
        }]}>
            <Input placeholder="Enter manufacturer name" />
        </Form.Item>
    </>

    return (
        <div>
            <DashboardTemplate createName="Add new manufacturedCountry " titleTable="ManufacturedCountries management" titleModal="New manufacturedCountries" titleModalUpdate="New information" formItem={formItem} apiURI="ManufacturedCountries" columns={columns} />
        </div>
    )
}

export default ManageManufacturedCountries
