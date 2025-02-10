import { Form, Input } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"
import { formatMoneyToVND } from "../../currency/currency"


const ManageProduct = () => {
    const columns: Column[] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <>{formatMoneyToVND(value)}</>
        },

        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
    ]
    const formItem = <>

        <Form.Item label="Tên sản phẩm" name={"name"} rules={[
            {
                required: true,
                message: 'Tên sản phẩm không được bỏ trống'
            }
        ]}>
            <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item name={"description"} label="Mô tả sản phẩm" rules={[
            {
                required: true,
                message: 'Mô tả sản phẩm không được bỏ trống'
            }
        ]}>
            <Input placeholder="Mô tả sản phẩm" />
        </Form.Item>
        <Form.Item name={"price"} label="Giá sản phẩm" rules={[
            {
                required: true,
                message: 'Giá sản phẩm không được bỏ trống'
            }
        ]}>
            <Input type="number" placeholder="Giá sản phẩm" />
        </Form.Item>

        <Form.Item name={"quantity"} label="Số lượng sản phẩm" rules={[
            {
                required: true,
                message: 'Số lượng sản phẩm không được bỏ trống'
            }
        ]}>
            <Input type="number" placeholder="Số lượng sản phẩm" />
        </Form.Item>
    </>
    return (
        <div>
            <DashboardTemplate formItem={formItem} headingModal="Thêm sản phẩm mới" buttonAdd="Thêm sản phẩm" column={columns} />
        </div>
    )
}

export default ManageProduct
