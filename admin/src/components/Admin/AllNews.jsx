import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listNews, deleteNews } from "../../Redux/Actions/newsActions";

const AllNews = () => {
  const newsList = useSelector((state) => state.newsList);
  const { news } = newsList;
  const dispatch = useDispatch();
  let data = [];
  if (news) {
    data = news.map((item) => {
      const date = new Date(item.createdAt);
      const newDate = `${date.getDate()} tháng ${
        date.getMonth() + 1
      }, ${date.getFullYear()}`;
      return {
        id: item._id,
        title: item.title,
        date: newDate,
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
    dispatch(deleteNews(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(listNews());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "preview",
      key: "preview",
      render: (_, record) => (
        <>
          <Link to={`/admin/news/${record.id}`}>
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
          Tất cả tin tức
        </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Xóa tin tức"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn chắc chắn muốn xóa tin tức này?</p>
      </Modal>
    </div>
  );
};

export default AllNews;
