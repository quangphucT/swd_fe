import { Button, Form, Input, Modal, Table } from "antd"
import { useEffect, useState } from "react"
import api from "../../config/api"
import './index.scss'
import { toast } from "react-toastify"
import { useForm } from "antd/es/form/Form"
import { showSuccessToast } from "../../config/configToast"
export type Column = {
    title: string,
    dataIndex: string,
    key: string,
    render?: (value: any) => any
}

export type DashboardTemplateProps = {
    column: Column[],
    buttonAdd: string,
    headingModal: string,
    formItem?: React.ReactElement
}
const DashboardTemplate = ({ column, buttonAdd, headingModal, formItem }: DashboardTemplateProps) => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [form] = useForm();
    const [selectedProductId, setSelectedProductId] = useState(null)
    // fetching data
    const fetchingData = async () => {
        try {
            const response = await api.get("Products")
            setData(response.data)
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    useEffect(() => {
        fetchingData();
    }, [])
    // handle Open modal
    const handleOpenModal = () => {
        setOpen(true)
    }
    // handle Close Modal
    const handleCloseModal = () => {
        setOpen(false)
        form.resetFields();
    }
     // handle open pop up delete 
     const handleOpenPopUpDelete = (id) => {
        setSelectedProductId(id)
        setOpenPopup(true)
     }
    const handleSubmitForm = async (values) => {
        try {
            console.log("values", values)
            await api.post("Products", values)
            toast.success("Thêm sản phẩm mới thành công!!")
            handleCloseModal();
            form.resetFields();
            fetchingData();
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    const handleDeleteProduct = async () => {

        try {
            await api.delete(`Products/${selectedProductId}`)
            showSuccessToast("🎉 Xóa sản phẩm thành công!");
            setOpenPopup(false)
            fetchingData();
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Button onClick={handleOpenModal} type="primary" className="ant-btn-primary">➕ {buttonAdd}</Button>
            </div>
            <Table
                columns={[
                    ...column,
                    {
                        title: 'Hành Động',
                        dataIndex: 'id',
                        key: 'id',
                        render: (id) => (
                            <div className="action-buttons">
                                <Button onClick={() => { handleOpenPopUpDelete(id) }} type="default" danger className="ant-btn-danger">🗑 Xóa</Button>
                                <Button type="default" className="ant-btn-default">✏ Chỉnh Sửa</Button>
                            </div>
                        ),
                    }
                ]}
                dataSource={data}
            />
            <Modal
                open={open}
                onCancel={handleCloseModal}
                title={headingModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal} className="ant-btn-default">
                        ❌ Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => { form.submit() }} className="ant-btn-primary">
                        ✅ OK
                    </Button>
                ]}
            >
                <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmitForm}>
                    {formItem}
                </Form>
            </Modal>
            <Modal
                open={openPopup}
                onCancel={() => setOpenPopup(false)}
                title="Xác Nhận Xóa"
                footer={
                    <div className="modal-footer-delete">
                        <Button key="cancel" onClick={() => setOpenPopup(false)} className="ant-btn-default">
                            ❌ Hủy
                        </Button>
                        <Button onClick={handleDeleteProduct} key="delete" type="primary" danger className="ant-btn-danger">
                            🗑 Xóa
                        </Button>
                    </div>
                }
            >
                <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            </Modal>

        </div>
    );
}

export default DashboardTemplate
