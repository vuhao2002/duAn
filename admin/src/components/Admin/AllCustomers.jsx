import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { listUser, deleteUser } from "../../Redux/Actions/userActions";

const AllCustomers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(deleteUser(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const dispatch = useDispatch();
  console.log(users);
  let data = [];
  if (users) {
    data = users.map((user) => {
      let address = "";
      if (user.addresses.length > 0) {
        address = `${user?.addresses[0]?.address} ${user?.addresses[0]?.ward}, ${user?.addresses[0]?.district} ${user?.addresses[0]?.city}`;
      }
      return {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address,
      };
    });
  }
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            block
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Button
          onClick={() => {
            setId(record.id);
            showModal();
          }}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];
  return (
    <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <div class="text-center py-4">
        <h1 className="text-[40px] font-[700] text-[#f66315]">
          Tất cả khách hàng
        </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Xóa User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn chắc chắn muốn người dùng này?</p>
      </Modal>
    </div>
  );
};
export default AllCustomers;
