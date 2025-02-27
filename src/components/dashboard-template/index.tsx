import { Button, Table, Typography, Tooltip, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { showSuccessToast } from "../../config/configToast";

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  ellipsis?: boolean;
  render?: (value: any) => any;
};

type DashboardTemplateProps = {
  columns: Column[];
  apiURI: string;
  titleModal?: string;
  formItem?: React.ReactElement;
  titleTable: string;
  createName?: string;
  titleModalUpdate?: string;
};

const DashboardTemplate = ({
  columns,
  apiURI,
  titleModal,
  formItem,
  titleTable,
  createName,
  titleModalUpdate,
}: DashboardTemplateProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [showCorrectheadingTextInModal, setshowCorrectheadingTextInModal] =
    useState(false);
  const fetchingData = async () => {
    setLoading(true);
    try {
      const response = await api.get(apiURI);
      console.log("Response:", response.data.items);
      setData(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Open modal
  const handleOpenModal = () => {
    setOpen(true);
  };
  //close modal

  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        await api.put(`${apiURI}/${values.id}`, values);
        showSuccessToast("Update success");
        setOpen(false);
        form.resetFields();
        fetchingData();
      } else {
        await api.post(apiURI, values);
        showSuccessToast("Add success");
        setOpen(false);
        form.resetFields();
        fetchingData();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleOpenDeleteConfirm = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${apiURI}/${id}`);
      showSuccessToast("Delete success!!");
      setId("");
      setOpenDeleteModal(false);
      fetchingData();
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Tiêu đề và nút Create New Brand */}
      <div className="dashboard-header">
        <Typography.Title level={2} className="dashboard-title">
          <span className="text"> {titleTable}</span>
        </Typography.Title>
        <Button
          onClick={() => {
            handleOpenModal();
            setshowCorrectheadingTextInModal(false);
          }}
          size="large"
          className="btn-create"
        >
          <PlusOutlined /> {createName}
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <Table
        loading={loading}
        // columns={[
        //   ...columns.map((col) => ({
        //     ...col,
        //     width: col.width || 150, // Đặt width mặc định cho cột
        //     ellipsis: true, // Rút gọn text
        //     render: (value: any) => (
        //       <Tooltip title={value}>
        //         <div className="truncate-text">{value}</div>
        //       </Tooltip>
        //     ),
        //   })),
        //   {
        //     title: "Action",
        //     dataIndex: "id",
        //     key: "id",
        //     width: 150,
        //     fixed: "right",
        //     render: (id: string, record) => (
        //       <div
        //         style={{ display: "flex", gap: "20px" }}
        //         className="action-buttons"
        //       >
        //         <Button
        //           onClick={() => {
        //             setOpen(true);
        //             form.setFieldsValue(record);
        //             setshowCorrectheadingTextInModal(true);
        //           }}
        //           size="large"
        //           className="btn-update"
        //         >
        //           <EditOutlined /> Update
        //         </Button>
        //         <Button
        //           onClick={() => {
        //             handleOpenDeleteConfirm(id);
        //           }}
        //           danger
        //           size="large"
        //           className="btn-delete"
        //         >
        //           <DeleteOutlined /> Delete
        //         </Button>
        //       </div>
        //     ),
        //   },
        // ]}
        columns={[
          ...columns.map((col) => ({
            ...col,
            width: col.width || 150,
            ellipsis: true,
            render: col.render
              ? col.render
              : (value: any) => {
                  // Nếu value là object, cố gắng lấy thuộc tính 'name'
                  if (typeof value === "object" && value !== null) {
                    return (
                      <Tooltip title={value?.name || JSON.stringify(value)}>
                        <div className="truncate-text">
                          {value?.name || JSON.stringify(value)}
                        </div>
                      </Tooltip>
                    );
                  }
                  return (
                    <Tooltip title={value}>
                      <div className="truncate-text">{value}</div>
                    </Tooltip>
                  );
                },
          })),
          {
            title: "Action",
            dataIndex: "id",
            key: "id",
            width: 150,
            fixed: "right",
            render: (id: string, record) => (
              <div
                style={{ display: "flex", gap: "20px" }}
                className="action-buttons"
              >
                <Button
                  onClick={() => {
                    console.log("record data:", record);
                    setOpen(true);
                    const newRecord = {
                      ...record,
                      brandId: record.brand?.id,
                      brandOriginId: record.brandOrigin?.id,
                      manufacturerId: record.manufacturer?.id,
                      manufacturedCountryId: record.manufacturedCountry?.id,
                      productDetailId: record.productDetail?.id,
                      packagingId: record.packaging?.id,
                      categoryId: record.category?.id,
                      unitId: record.unit?.id,
                    };
                    form.setFieldsValue(newRecord);
                    setshowCorrectheadingTextInModal(true);
                  }}
                  size="large"
                  className="btn-update"
                >
                  <EditOutlined /> Update
                </Button>
                <Button
                  onClick={() => {
                    handleOpenDeleteConfirm(id);
                  }}
                  danger
                  size="large"
                  className="btn-delete"
                >
                  <DeleteOutlined /> Delete
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={data}
        scroll={{ x: "max-content" }} // Cho phép cuộn ngang nếu cần
      />
      {/* modal Update */}
      <Modal
        title={
          showCorrectheadingTextInModal ? "Update information" : titleModal
        }
        footer={[
          <Button
            key="cancel"
            className="cancel-btn"
            onClick={handleCloseModal}
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
        onCancel={handleCloseModal}
        open={open}
      >
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item name={"id"} hidden>
            <Input />
          </Form.Item>
          {formItem}
        </Form>
      </Modal>

      {/* open delete confirm modal */}
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
          Are you sure you want to delete this item?
        </p>
      </Modal>
    </div>
  );
};

export default DashboardTemplate;
