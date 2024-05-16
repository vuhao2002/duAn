import React from "react";
import Sidebar from "../../components/Admin/Layout/Sidebar";
import Header from "../../components/Admin/Layout/Header";
import AllCustomers from "../../components/Admin/AllCustomers.jsx";
const AdminCustomersPage = () => {
  return (
    <div>
      <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex-1 p-4 min-h-0 overflow-auto">
            <div className="w-full justify-center flex">
              <AllCustomers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersPage;
