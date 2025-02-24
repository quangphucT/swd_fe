
import { Form, Input, Select } from "antd";
import DashboardTemplate, { Column } from "../../components/dashboard-template";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";
interface Entity {
  id: number;
  name: string;
}


interface ProductDetail {
  id: number;
  productDescription: string;
  ingredient: string;
  effect: string;
  howToUse: string;
  sideEffect: string;
  note: string;
  preserve: string;
}
interface Category {
  id: number;
  name: string;
  image: string;
  solutionId: number;
}
interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  brandOrigin: Entity;
  unit: Entity;
  manufacturer: Entity;
  packaging: Entity;
  manufacturedCountry: Entity;
  brand: Entity;
  productDetail: ProductDetail;
  category: Category;
}
const ManageProduct = () => {
  const [dataProduct, setDataProduct] = useState<Product[]>([]);
  const [brandData, setBrandData] = useState<Entity[]>([]);
  const [packagingData, setPackagingData] = useState<Entity[]>([]);
  const [dataCategories, setDataCategories] = useState<Entity[]>([]);
  const [unitData, setUnitData] = useState<Entity[]>([]);
  const [dataBrandOrigin, setDataBrandOrigin] = useState<Entity[]>([]);
  const [dataManufacturer, setDataManufacturer] = useState<Entity[]>([]);
  const [dataProductDetails, setDataProductDetails] = useState<ProductDetail[]>(
    []
  );
  const [dataManufacturerCountries, setDataManufacturerCountries] = useState<
    Entity[]
  >([]);
  const fetchDataBrand = async () => {
    try {
      const response = await api.get("Brands");
      setBrandData(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data!!");
    }
  };
  const fetchPackagingData = async () => {
    try {
      const response = await api.get("Packagings");
      setPackagingData(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  const fetchUnitData = async () => {
    try {
      const response = await api.get("Units");
      setUnitData(response.data.items);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const fetchDataCategories = async () => {
    try {
      const response = await api.get("Categories");
      setDataCategories(response.data.items);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const fetchBrandOrigin = async () => {
    try {
      const response = await api.get("BrandOrigins");
      setDataBrandOrigin(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  const fetchManufacturer = async () => {
    try {
      const response = await api.get("Manufacturers");
      setDataManufacturer(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  const fetchManufacturerCountries = async () => {
    try {
      const response = await api.get("ManufacturedCountries");
      setDataManufacturerCountries(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  const fetchProductDetails = async () => {
    try {
      const response = await api.get("ProductDetails");
      setDataProductDetails(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };
  useEffect(() => {
    fetchProductDetails();
    fetchManufacturerCountries();
    fetchManufacturer();
    fetchBrandOrigin();
    fetchDataBrand();
    fetchPackagingData();
    fetchUnitData();
    fetchDataCategories();
  }, []);
  //product
  const fetchProduct = async () => {
    try {
      const response = await api.get("Products");
      console.log(response.data);
      console.log(response.data.items);
      // const res = response.data.items ;
      // console.log(res.unit.id);
      setDataProduct(response.data.items);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching data");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

<<<<<<<<< Temporary merge branch 1
  const columns: Column[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "UnitId",
      dataIndex: "unitId",
      key: "unitId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "BrandId",
      dataIndex: "brandId",
      key: "brandId",
    },
    {
      title: "PackagingId",
      dataIndex: "packagingId",
      key: "packagingId",
    },
    {
      title: "CategoryId",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "BrandOriginId",
      dataIndex: "brandOriginId",
      key: "brandOriginId",
    },
    {
      title: "ManufacturerId",
      dataIndex: "manufacturerId",
      key: "manufacturerId",
    },
    {
      title: "ManufacturedCountryId",
      dataIndex: "manufacturedCountryId",
      key: "manufacturedCountryId",
    },
    {
      title: "ProductDetailId",
      dataIndex: "productDetailId",
      key: "productDetailId",
    },
  ];
  const formItem = (
    <>
      {/* name */}
      <Form.Item
        name={"name"}
        label="Product name"
        rules={[
          {
=========
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <div>{formatMoneyToVND(value)}</div> 
        },
        {
            title: 'UnitId',
            dataIndex: 'unitId',
            key: 'unitId',

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'BrandId',
            dataIndex: 'brandId',
            key: 'brandId'
        },
        {
            title: 'PackagingId',
            dataIndex: 'packagingId',
            key: 'packagingId'
        },
        {
            title: 'CategoryId',
            dataIndex: 'categoryId',
            key: 'categoryId'
        },
        {
            title: 'BrandOriginId',
            dataIndex: 'brandOriginId',
            key: 'brandOriginId'
        },
        {
            title: 'ManufacturerId',
            dataIndex: 'manufacturerId',
            key: 'manufacturerId'
        },
        {
            title: 'ManufacturedCountryId',
            dataIndex: 'manufacturedCountryId',
            key: 'manufacturedCountryId'
        },
        {
            title: 'ProductDetailId',
            dataIndex: 'productDetailId',
            key: 'productDetailId'
        },


    ]
    const formItem = <>

        {/* name */}
        <Form.Item name={"name"} label="Product name" rules={[{
>>>>>>>>> Temporary merge branch 2
            required: true,
            message: "Name must not be blank!!",
        },
        ]}
        >
            <Input placeholder="Enter product name" />
        </Form.Item>
        {/* description */}
        <Form.Item
            name={"description"}
            label="Product description"
            rules={[
                {
                    required: true,
                    message: "Description must not be blank!!",
                },
            ]}
        >
            <Input placeholder="Enter product description" />
        </Form.Item>

        {/* price */}

      <Form.Item
        name={"price"}
        label="Product price"
        rules={[
          {
            required: true,
            message: "Price must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter product price" />
      </Form.Item>

      {/* unitId */}
      <Form.Item
        label="Choose unitId"
        name="unitId"
        rules={[{ required: true, message: "UnitId must not be blank!!" }]}
      >
        <Select>
          {unitData.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {/* quantity */}
      <Form.Item
        name={"quantity"}
        label="Product quantity"
        rules={[
          {
            required: true,
            message: "Quantity must not be blank!!",
          },
        ]}
      >
        <Input placeholder="Enter product quantity" />
      </Form.Item>

        {/* brand */}

      <Form.Item
        label="Choose brand"
        name="brandId"
        rules={[{ required: true, message: "Brand must not be blank!!" }]}
      >
        <Select>
          {brandData.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {/* packaging  */}
      <Form.Item
        label="Choose packaging"
        name="packagingId"
        rules={[{ required: true, message: "Packaging must not be blank!!" }]}
      >
        <Select>
          {packagingData.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

        {/* category */}

      <Form.Item
        label="Choose category"
        name="categoryId"
        rules={[{ required: true, message: "Category must not be blank!!" }]}
      >
        <Select>
          {dataCategories.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

        {/* brandOrigin */}

      <Form.Item
        label="Choose brandOrigin"
        name="brandOriginId"
        rules={[{ required: true, message: "BrandOrigin must not be blank!!" }]}
      >
        <Select>
          {dataBrandOrigin.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {/* manufacturer */}
      <Form.Item
        label="Choose manufacturer"
        name="manufacturerId"
        rules={[
          { required: true, message: "Manufacturer must not be blank!!" },
        ]}
      >
        <Select>
          {dataManufacturer.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

        {/* manufacturerCountries */}

      <Form.Item
        label="Choose ManufacturedCountries"
        name="manufacturedCountryId"
        rules={[
          {
            required: true,
            message: "ManufacturedCountry must not be blank!!",
          },
        ]}
      >
        <Select>
          {dataManufacturerCountries.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {/* productdetails */}
      <Form.Item
        label="Choose ProductDetails ID"
        name="productDetailId"
        rules={[
          { required: true, message: "ProductDetails ID must not be blank!!" },
        ]}
      >
        <Select>
          {dataProductDetails.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </>


    return (
        <div>
            <DashboardTemplate
                formItem={formItem}
                createName="Create new product"
                titleModal="Add new product"
                titleModalUpdate="Update product information"
                titleTable="Product Management"
                apiURI="Products"
                columns={columns}
            />
        </div>
    );
};

export default ManageProduct;
