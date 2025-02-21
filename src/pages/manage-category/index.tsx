
import { Form, Image, Input, Select } from "antd"
import DashboardTemplate, { Column } from "../../components/dashboard-template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../config/api"


const ManageCategory = () => {
  const [dataSolution, setDataSolution] = useState([])

  const fetchDataSolution = async() => {
    try {
      const response = await api.get("Solutions")
    
      setDataSolution(response.data.items)
     
    } catch (error) {
      toast.error("Error while fetching data!!")
    }
  }
  useEffect(() => {
    fetchDataSolution();
  }, [])
  console.log("Soltuion:", dataSolution)
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
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (value) => <Image src={value} width={100} height={100} style={{borderRadius: '10px'}}/>
    },
    {
      title: 'SolutionId',
      dataIndex: 'solutionId',
      key: 'solutionId'
    },
  ]
  const formItem = <>
    <Form.Item label="Category name" name={"name"} rules={[{
      required: true,
      message: 'Name must not be blank!!'
    }]}>
      <Input placeholder="Enter category name" />
    </Form.Item>
    <Form.Item label="Image url" name={"image"} rules={[{
      required: true,
      message: 'ImageURL must not be blank!!'
    }]}>
      <Input placeholder="Image url" />
    </Form.Item>
    <Form.Item
      label="Choose solution"
      name="solutionId"
      rules={[{ required: true, message: "Role must not be blank!!" }]}
    >
      <Select>
        {dataSolution.map((item) => {
          return (
            <Select.Option key={item.id}  value={item.id}>{item.name}</Select.Option>
          )
        })}
       
       
      </Select>
    </Form.Item>
  </>
  return (
    <div>
      <DashboardTemplate titleTable="Category Management" createName="Create new category" titleModal="Add new category" formItem={formItem} apiURI="Categories" columns={columns} />
    </div>
  )
}

export default ManageCategory
