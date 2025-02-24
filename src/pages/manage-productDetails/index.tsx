import { Form, Input } from "antd";
import DashboardTemplate, { Column } from "../../components/dashboard-template";

const ManageProductDetails = () => {
  const columns: Column[] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ProductDescription",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Ingredient",
      dataIndex: "ingredient",
      key: "ingredient",
    },
    {
      title: "Effect",
      dataIndex: "effect",
      key: "effect",
    },
    {
      title: "How To Use",
      dataIndex: "howToUse",
      key: "howToUse",
    },
    {
      title: "Side Effect",
      dataIndex: "sideEffect",
      key: "sideEffect",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Preserve",
      dataIndex: "preserve",
      key: "preserve",
    },
  ];
  const formItem = (
    <>
      {/* product description */}
      <Form.Item
        label="ProductDescription"
        name={"productDescription"}
        rules={[
          {
            required: true,
            message: "ProductDescription must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter productDescription" />
      </Form.Item>

      {/* ingredient */}
      <Form.Item
        label="Ingredient"
        name={"ingredient"}
        rules={[
          {
            required: true,
            message: "Ingredient must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter ingredient" />
      </Form.Item>

      {/* effect */}
      <Form.Item
        label="Effect"
        name={"effect"}
        rules={[
          {
            required: true,
            message: "Effect must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter effect" />
      </Form.Item>

      {/* howToUse */}

      <Form.Item
        label="How To Use"
        name={"howToUse"}
        rules={[
          {
            required: true,
            message: "HowToUse must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter howToUse" />
      </Form.Item>

      {/* sideEffect */}
      <Form.Item
        label="SideEffect"
        name={"sideEffect"}
        rules={[
          {
            required: true,
            message: "SideEffect must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter sideEffect" />
      </Form.Item>

      {/* note */}
      <Form.Item
        label="Note"
        name={"note"}
        rules={[
          {
            required: true,
            message: "Note must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter note" />
      </Form.Item>

      {/* preserve */}
      <Form.Item
        label="Preserve"
        name={"preserve"}
        rules={[
          {
            required: true,
            message: "Preserve must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter preserve" />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate
        formItem={formItem}
        titleModal="ProductDetails Information"
        titleModalUpdate="Update information"
        createName="Add productDetails"
        titleTable="ProductDetails Management"
        apiURI="ProductDetails"
        columns={columns}
      />
    </div>
  );
};

export default ManageProductDetails;
