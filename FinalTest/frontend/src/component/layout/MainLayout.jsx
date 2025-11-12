import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <div className="w-65 fixed top-0 left-0 h-full bg-[#1e2a38] text-white z-50">
        <Sidebar />
      </div>


      <div className="flex-1 ml-64 flex flex-col">

        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <Header />
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
