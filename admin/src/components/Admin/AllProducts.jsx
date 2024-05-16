import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct } from "../../Redux/Actions/productActions";

const AllProducts = () => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();
  let data = [];
  if (products) {
    data = products.map((product) => {
      let type;
      if (product.category === "vot") {
        type = "Vợt cầu lông";
      } else if (product.category === "giay") {
        type = "Giày cầu lông";
      } else if (product.category === "balo") {
        type = "Balo cầu lông";
      }
      return {
        id: product._id,
        name: product.name,
        price: `${product.discountPrice}đ`,
        type,
        stock: product.stock,
        sold_out: product.sold_out,
      };
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(id);
    dispatch(deleteProduct(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đã bán",
      dataIndex: "sold_out",
      key: "sold_out",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "preview",
      key: "preview",
      render: (_, record) => (
        <>
          <Link to={`/admin/product/${record.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setId(record.id);
              showModal();
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <div class="text-center py-4">
        <h1 className="text-[40px] font-[700] text-[#f66315]">
          Tất cả sản phẩm
        </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Xóa chi nhánh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn chắc chắn muốn xóa chi nhánh này?</p>
      </Modal>
    </div>
  );
};

export default AllProducts;
