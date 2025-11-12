import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import backendUrl from "../../App";

const Header = () => {
  const { user, token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lấy thông báo từ backend
  useEffect(() => {
    if (!user) return;
  
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/notifications/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // ép kiểu an toàn
        const notifs = Array.isArray(res.data) ? res.data : (res.data.notifications || []);
        setNotifications(notifs);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
        setNotifications([]);
      }
    };
  
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user, token]);
  
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 flex justify-end items-center h-16 px-4 sm:px-6 lg:px-8">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </form>

      {/* Notifications & User */}
      <div className="flex items-center gap-4 relative">
        {user && (
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg overflow-hidden z-50">
                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-500 text-sm">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`px-4 py-2 cursor-pointer hover:bg-orange-100 transition ${
                        !n.isRead ? "font-semibold" : "text-gray-600"
                      }`}
                      onClick={() => handleMarkAsRead(n._id)}
                    >
                      <div className="text-sm">{n.title}</div>
                      <div className="text-xs text-gray-500">{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* User avatar */}
        {user && (
          <div className="relative group">
            <img
              src={user.avatar || "https://res.cloudinary.com/dkfvwr5mj/image/upload/v1751794441/admin_bf7zic.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-orange-500 transition"
            />
            <div className="absolute right-0 mt-3 bg-white shadow-lg border rounded w-40 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <a href="/profile" className="block px-4 py-2 hover:bg-orange-100 transition">
                Profile
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-orange-100 transition"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {!user && (
          <div className="flex items-center gap-2 text-gray-700">
            <a href="/login" className="hover:text-orange-500 transition">
              Login
            </a>
            <span>/</span>
            <a href="/register" className="hover:text-orange-500 transition">
              Register
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
