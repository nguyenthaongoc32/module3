import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_API_URL;

const Notifications = ({ userId, token }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải thông báo!");
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [userId, token]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi đánh dấu thông báo!");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-full hover:bg-gray-100 transition">
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {notifications.length === 0 ? (
            <p className="p-3 text-gray-500">Không có thông báo</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 border-b flex justify-between items-start ${
                  n.isRead ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="text-sm text-blue-600 hover:underline ml-2"
                  >
                    Đánh dấu
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
