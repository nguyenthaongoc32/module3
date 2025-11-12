import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  const baseClass =
    "flex items-center p-3 my-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200";

  const getLinkClass = ({ isActive }) =>
    `${baseClass} ${isActive ? "bg-gray-700 text-white" : "text-gray-400"}`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#273142] flex-shrink-0 hidden md:flex flex-col h-screen">

      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-2xl font-bold text-white hover:text-orange-500 transition">
          Dash<span className="text-orange-500">Stack</span>
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col px-2 mt-4">
          <NavLink to="/" className={getLinkClass}>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/products" className={getLinkClass}>
            <span>Products</span>
          </NavLink>

          <NavLink to="/favorites" className={getLinkClass}>
            <span>Favorites</span>
          </NavLink>

          <NavLink to="/inbox" className={getLinkClass}>
            <span>Inbox</span>
          </NavLink>

          <NavLink to="/orderLists" className={getLinkClass}>
            <span>Order Lists</span>
          </NavLink>

          <NavLink to="/productStock" className={getLinkClass}>
            <span>Product Stock</span>
          </NavLink>

          <div className="pt-4">
            <span className="ml-4 px-2 text-xs font-semibold uppercase text-gray-500">
              Pages
            </span>
            <div className="mt-2 space-y-2">
              <NavLink to="/pricing" className={getLinkClass}>
                <span>Pricing</span>
              </NavLink>
              <NavLink to="/calendar" className={getLinkClass}>
                <span>Calendar</span>
              </NavLink>
              <NavLink to="/todo" className={getLinkClass}>
                <span>To-Do</span>
              </NavLink>
            </div>
          </div>
        </div>
     </div>
    </aside>
  );
};

export default Sidebar;
