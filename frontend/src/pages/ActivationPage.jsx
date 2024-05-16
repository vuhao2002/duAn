import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ActivationPage = () => {
  const { activation_token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            toast.success("Xác thực tài khoản thành công!");
            navigate("/login");
          })
          .catch((err) => {
            toast.error("Token đã quá hạn!");
            navigate("/sign-up");
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      haovu
    </div>
  );
};

export default ActivationPage;
