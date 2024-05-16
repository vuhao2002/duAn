import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { branchCreate } from "../../Redux/Actions/branchActions.js";

const CreateBranch = () => {
  const [name, setName] = useState("Badminton Shop");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  console.log(name, phoneNumber, address, email);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      phoneNumber,
      address,
      email,
    };
    dispatch(branchCreate(data));
    // setName("Badminton Shop");
    // setPhoneNumber("");
    // setEmail("");
    // setAddress("");
  };
  return (
    <div className="w-[90%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Branch</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter branch's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Hotline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hotline"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter branch's hotline..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter branch's address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter branch's email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 mx-auto w-[50%] cursor-pointer appearance-none text-center block px-3 h-[35px] border border-[#f66315] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:bg-[#fff] bg-[#F66315] hover:text-[#000] text-[#fff] duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBranch;
