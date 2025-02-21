import { Form, Image, Input, Select } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"
import { useEffect, useState } from "react"

import api from "../../config/api"


const ManageImage = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await api.get("Products");
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {


    fetchData();
  }, []);
  const columns: Column[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'ImageUrl',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (value) => <Image src={value} style={{borderRadius: '10px'}} width={200} height={160}/>
    },
    {
      title: 'ProductId',
      dataIndex: 'productId',
      key: 'productId'
    },



  ]
  const formItem = <>
    <Form.Item label="ImageUrl" name={"imageUrl"}>
      <Input placeholder="Upload imageURL" />
    </Form.Item>


    <Form.Item
      label="Choose Product"
      name="productId"
      rules={[{ required: true, message: "ProductId must not be blank!!" }]}
    >
      <Select>
        {data.map((item) => {
          return (
            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
          )
        })}


      </Select>
    </Form.Item>
  </>
  return (
    <div>
      <DashboardTemplate apiURI="Images" columns={columns} formItem={formItem} titleTable="Image management" createName="Create new image" titleModal="Upload new image here" titleModalUpdate="Update image" />
    </div>
  )
}

export default ManageImage
