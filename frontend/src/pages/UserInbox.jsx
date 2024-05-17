import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import styles from "../styles/styles";
import { IoSend } from "react-icons/io5";

const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  // const { conversationId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
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
          `${server}/conversation/get-all-conversation-user/${userInfo?.user?._id}`,
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
  }, [userInfo, messages]);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo?.user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [userInfo]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== userInfo?.user?._id
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
      sender: userInfo?.user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== userInfo?.user?._id
    );

    socketId.emit("sendMessage", {
      senderId: userInfo?.user?._id,
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
      lastMessageId: userInfo?.user?._id,
    });
    await axios
      .put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: userInfo?.user?._id,
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
      <Header />
      <div class="h-screen w-full flex antialiased text-[#000] bg-[#fff] overflow-hidden pt-[58px]">
        <div class="flex-1 flex flex-col">
          <main class="flex-grow flex flex-row min-h-0">
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  setCurrentChat={setCurrentChat}
                  me={userInfo?.user?._id}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                />
              ))}
            <section class="flex flex-col flex-auto border-l border-gray-800">
              {userInfo && (
                <ShopInbox
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessageHandler={sendMessageHandler}
                  messages={messages}
                  shopId={userInfo?.user?._id}
                  userData={userData}
                  activeStatus={activeStatus}
                  scrollRef={scrollRef}
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
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setCurrentChat(data) || setUserData(user) || setActiveStatus(online);
  }, []);

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

  return <></>;
};

const ShopInbox = ({
  scrollRef,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  shopId,
  userData,
  activeStatus,
}) => {
  console.log(userData);
  return (
    <>
      {userData && (
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
                <h1 className="text-[18px] font-[600]">Badminton Shop</h1>
                <h1>{activeStatus ? "Đang hoạt động" : ""}</h1>
              </div>
            </div>
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
                            item.sender === shopId
                              ? "bg-[#ff6017]"
                              : "bg-[#38c776]"
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
      )}
    </>
  );
};

export default UserInbox;
