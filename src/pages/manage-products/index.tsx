
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
  skinType:number;
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
  const skinTypeOptions = [
    { value: 0, label: "Da Thường" },
    { value: 1, label: "Da Dầu" },
    { value: 2, label: "Da Khô" },
    { value: 3, label: "Da Hỗn Hợp" },
  ];
  // Hàm chuyển đổi giá trị `skinType` thành dạng chữ
  const getSkinTypeLabel = (value: number) => {
    const skinType = skinTypeOptions.find((item) => item.value === value);
    return skinType ? skinType.label : "Không xác định";
  };
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
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (unit) => unit?.name || "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand?.name || "N/A",
    },
    {
      title: "Packaging",
      dataIndex: "packaging",
      key: "packaging",
      render: (packaging) => packaging?.name || "N/A",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name || "N/A",
    },
    {
      title: "BrandOrigin",
      dataIndex: "brandOrigin",
      key: "brandOrigin",
      render: (brandOrigin) => brandOrigin?.name || "N/A",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (manufacturer) => manufacturer?.name || "N/A",
    },
    {
      title: "ManufacturedCountry",
      dataIndex: "manufacturedCountry",
      key: "manufacturedCountry",
      render: (manufacturedCountry) => manufacturedCountry?.name || "N/A",
    },
    {
      title: "ProductDetail",
      dataIndex: "productDetail",
      key: "productDetail",
      render: (productDetail) => productDetail?.productDescription || "N/A",
    },
    {
      title: "Skin Type",
      dataIndex: "skinType",
      key: "skinType",
      render: (skinType) => getSkinTypeLabel(skinType),
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

      {/* unitId */}
      <Form.Item
        label="Choose unit"
        name="unitId"
        rules={[{ required: true, message: "Unit must not be blank!!" }]}
      >
        <Select>
          {unitData.map((unit) => (
            <Select.Option key={unit?.id} value={unit?.id}>
              {unit?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

        {/* brand */}

      <Form.Item
        label="Choose brand"
        name="brandId"
        rules={[{ required: true, message: "Brand must not be blank!!" }]}
      >
        <Select>
          {brandData.map((brand) => (
            <Select.Option key={brand?.id} value={brand?.id}>
              {brand?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* packaging  */}
      <Form.Item
        label="Choose packaging"
        name="packagingId"
        rules={[{ required: true, message: "Packaging must not be blank!!" }]}
      >
        <Select>
          {packagingData.map((packaging) => (
            <Select.Option key={packaging?.id} value={packaging?.id}>
              {packaging?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

        {/* category */}

      <Form.Item
        label="Choose category"
        name="categoryId"
        rules={[{ required: true, message: "Category must not be blank!!" }]}
      >
        <Select>
          {dataCategories.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

        {/* brandOrigin */}

      <Form.Item
        label="Choose brandOrigin"
        name="brandOriginId"
        rules={[{ required: true, message: "BrandOrigin must not be blank!!" }]}
      >
        <Select>
          {dataBrandOrigin.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
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
          {dataManufacturer.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
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
          {dataManufacturerCountries.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* productdetails */}
      <Form.Item
        label="Choose ProductDetails "
        name="productDetailId"
        rules={[
          { required: true, message: "ProductDetails must not be blank!!" },
        ]}
      >
        <Select>
          {dataProductDetails.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.productDescription}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
            
        {/* skinType */}
        <Form.Item
        label="Loại da"
        name="skinType"
        rules={[{ required: true, message: "Vui lòng chọn loại da!!" }]}
      >
        <Select placeholder="Chọn loại da">
          {skinTypeOptions.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      
    </>

        )
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
