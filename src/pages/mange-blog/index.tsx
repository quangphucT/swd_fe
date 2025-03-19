import { Button, Form, Image, Input, Modal, Table } from "antd";
import { Column } from "../../components/dashboard-template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { showSuccessToast } from "../../config/configToast";

const ManageBlog = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [id, setId] = useState("");
    const [form] = useForm();
    const fetchingData = async () => {
        try {
            const response = await api.get("Blogs");
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
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: (text) => text.length > 100 ? `${text.substring(0, 100)}...` : text, // Giới hạn 100 ký tự
        },
        {
            title: "publishDate",
            dataIndex: "publishDate",
            key: "publishDate",
            render: (value) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags) => {
                if (!tags) return "-";
                const tagArray = tags.split(","); // Giả sử tags là chuỗi cách nhau bởi dấu phẩy
                return tagArray.length > 3 ? `${tagArray.slice(0, 3).join(", ")}...` : tags;
            },
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (value) => <Image src={value} width={200} />,
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
            await api.delete(`Blogs/${id}`)
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
                await api.put(`Blogs/${values.id}`, values)
                showSuccessToast("Update success!!")
                form.resetFields();
                setOpen(false)
                fetchingData();
            } else {
                await api.post("Blogs", values)
                showSuccessToast("Add success!!")
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
            <Button onClick={() => { setOpen(true) }}>Tạo Blog</Button>
            <Table title={() => "Quản lý blogs ( STAFF )"} columns={columns} dataSource={data} scroll={{ x: "max-content" }} />
        </div>
        <Modal
            title={
                "Tạo mới blog"
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
                <Form.Item name={"title"} label="Enter title" rules={[{
                    required: true,
                    message: 'Please enter title'
                }]}>
                    <Input placeholder="Enter title" />
                </Form.Item>
                <Form.Item name={"content"} label="Content" rules={[{
                    required: true,
                    message: 'Please enter content'
                }]}>
                    <Input.TextArea rows={7} placeholder="Enter content" />
                </Form.Item>
                <Form.Item name={"tags"} label="Tags" rules={[{
                    required: true,
                    message: 'Please enter tags'
                }]}>
                    <Input.TextArea rows={7} placeholder="Enter tags" />
                </Form.Item>

                <Form.Item name={"image"} label="Image" rules={[{
                    required: true,
                    message: 'Please provide imageUrl'
                }]}>
                    <Input placeholder="Provide inageUrl" />
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

export default ManageBlog;
