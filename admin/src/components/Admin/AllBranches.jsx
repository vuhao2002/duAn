import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { listBranch, deleteBranch } from "../../Redux/Actions/branchActions.js";

const AllBranches = () => {
  const branchesList = useSelector((state) => state.branchesList);
  const { brands } = branchesList;
  const dispatch = useDispatch();
  let data = [];
  if (brands) {
    data = brands.map((brand) => {
      return {
        id: brand._id,
        name: brand.name,
        hotline: brand.phoneNumber,
        email: brand.email,
        address: brand.address,
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
    dispatch(deleteBranch(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(listBranch());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hotline",
      dataIndex: "hotline",
      key: "hotline",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          Tất cả chi nhánh
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
export default AllBranches;
