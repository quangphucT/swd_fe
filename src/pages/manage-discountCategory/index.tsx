import { Button, Form, Image, Input, Modal, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { showSuccessToast } from "../../config/configToast";

const ManageDiscountCategory = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [id, setId] = useState("");
    const [form] = useForm();
    const fetchingData = async () => {
        try {
            const response = await api.get("DiscountCategory");
            setData(response.data.items);
        } catch (error) {
            toast.error("Error while fetching data");
        }
    };

    useEffect(() => {
        fetchingData();
    }, []);



    const columns: Column[] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (id, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <button onClick={() => handleOpenDeleteConfirm(id)} className="unblock-btn">
                            Delete
                        </button>
                        <button onClick={() => { setOpen(true); form.setFieldsValue(record) }} className="block-btn">
                            Update
                        </button>
                    </div>
                );
            },
        },
    ];

    const handleOpenDeleteConfirm = (id) => {
        setOpenDeleteModal(true)
        setId(id)
    }
    const handleDelete = async () => {
        try {
            await api.delete(`DiscountCategory/${id}`)
            showSuccessToast("Delete success!!")
            fetchingData();
            setOpenDeleteModal(false)
            setId("")
        } catch (error) {
            toast.error("Error while delete!!")
        }
    }
    const handleSubmit = async (values) => {
        try {
            if (values.id) {
                await api.put(`DiscountCategory/${values.id}`, values)
                showSuccessToast("Update success!!")
                form.resetFields();
                setOpen(false)
                fetchingData();
            } else {
                await api.post("DiscountCategory", {
                        id: 0,
                        name: values.name
                  
                })
                showSuccessToast("Thêm thành công!!")
                form.resetFields();
                setOpen(false)
                fetchingData();
            }
        } catch (error) {
            toast.error("Error")
        }
    }
    return <div className="manage-account">
        <div className="table-container">
            <Button onClick={() => { setOpen(true) }}>Tạo mới mã giảm giá</Button>
            <Table title={() => "Manage Blogs"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>
        <Modal
            title={
                "Tạo discount mới"
            }
            footer={[
                <Button
                    key="cancel"
                    className="cancel-btn"
                    onClick={() => { setOpen(false); form.resetFields() }}
                >
                    ❌ Cancel
                </Button>,
                <Button
                    onClick={() => {
                        form.submit();
                    }}
                    key="submit"
                    htmlType="submit"
                    className="submit-btn"
                    type="primary"
                >
                    ✅ Submit
                </Button>,
            ]}
            onCancel={() => { setOpen(false); form.resetFields() }}
            open={open}
        >
            <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
                <Form.Item name={"id"} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name={"name"} label="Enter name" rules={[{
                    required: true,
                    message: 'Please enter name'
                }]}>
                    <Input placeholder="Enter name" />
                </Form.Item>
              

            </Form>
        </Modal>
        <Modal
            onOk={handleDelete}
            title="Confirm Delete"
            open={openDeleteModal}
            onCancel={() => {
                setOpenDeleteModal(false);
            }}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
        >
            <p style={{ textAlign: "center", fontSize: "15.5px" }}>
                Are you sure you want to delete this blog?
            </p>
        </Modal>
    </div>;
};

export default ManageDiscountCategory;
