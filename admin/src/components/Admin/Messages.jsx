import React, { useEffect, useRef, useState } from "react";
import { server } from "../../server";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Messages = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-shop/${adminInfo?.user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [adminInfo, messages]);

  useEffect(() => {
    if (adminInfo) {
      const userId = adminInfo?.user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [adminInfo]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== adminInfo?.user?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  console.log(currentChat);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: adminInfo?.user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== adminInfo?.user?._id
    );

    socketId.emit("sendMessage", {
      senderId: adminInfo?.user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message, {
            withCredentials: true,
          })
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: adminInfo?.user?._id,
    });
    await axios
      .put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: adminInfo?.user?._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div class="h-[85vh] w-full flex antialiased text-[#000] bg-[#fff] overflow-hidden">
        <div class="flex-1 flex flex-col">
          <main class="flex-grow flex flex-row min-h-0">
            <section class="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
              <div class="header p-4 flex flex-row justify-between items-center flex-none">
                <div class="w-16 h-16 relative flex flex-shrink-0">
                  <img
                    class="rounded-full w-full h-full object-cover"
                    alt="ravisankarchinnam"
                    src="https://avatars3.githubusercontent.com/u/22351907?s=60"
                  />
                </div>
                <p class="text-md font-bold text-[#F66315] md:block group-hover:block">
                  Messenger
                </p>
                <a
                  href="/"
                  class="block rounded-full text-[#000] hover:bg-[#e5e5e5] bg-[#eeeded] w-10 h-10 p-2  md:block group-hover:block"
                >
                  <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
                    <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                  </svg>
                </a>
              </div>
              <div class="search-box p-4 flex-none">
                <form onsubmit="">
                  <div class="relative">
                    <label>
                      <input
                        class="rounded-full py-2 pr-6 pl-10 w-full border border-[#eeeded] focus:border-[#000] bg-[#eeeded] focus:bg-[#e5e5e5] focus:outline-none text-gray-400 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        value=""
                        placeholder="Search Messenger"
                      />
                      <span class="absolute top-0 left-0 mt-2 ml-3 inline-block">
                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                          <path
                            fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </form>
              </div>

              {/* All messages list */}
              {conversations &&
                conversations.map((item, index) => (
                  <MessageList
                    data={item}
                    key={index}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={adminInfo?.user?._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    setActiveStatus={setActiveStatus}
                  />
                ))}
            </section>
            <section class="flex flex-col flex-auto border-l border-gray-800">
              {open && (
                <ShopInbox
                  setOpen={setOpen}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessageHandler={sendMessageHandler}
                  messages={messages}
                  shopId={adminInfo?.user?._id}
                  userData={userData}
                  activeStatus={activeStatus}
                  scrollRef={scrollRef}
                  setMessages={setMessages}
                />
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState([]);
  const handleClick = (id) => {
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);
    console.log(userId);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        {user?.name && (
          <>
            <h1 className="text-[18px]">{user?.name}</h1>
            <p className="text-[16px] text-[#000c]">
              {data?.lastMessageId !== user?._id
                ? "Bạn:"
                : user?.name.split(" ")[0] + ": "}{" "}
              {data?.lastMessage}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const ShopInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  shopId,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#ff6017]">
        <div className="flex text-[#fff]">
          <img
            src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Đang hoạt động" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer text-[#fff]"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex w-full my-2 ${
                  item.sender === shopId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== shopId && (
                  <img
                    src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg"
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}

                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded-xl ${
                        item.sender === shopId ? "bg-[#ff6017]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>
                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <IoSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer text-[#ff6017]"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Messages;
