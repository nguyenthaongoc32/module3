import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const backendUrl = import.meta.env.VITE_API_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy sản phẩm yêu thích từ API
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products`);
      if (res.data.success) {
        const favs = res.data.data.filter((p) => p.isFavorite);
        setFavorites(favs);
      } else {
        toast.error("Không thể tải sản phẩm yêu thích!");
      }
    } catch (err) {
      toast.error("Lỗi khi lấy dữ liệu!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Toggle yêu thích
  const toggleFavorite = async (id) => {
    try {
      const res = await axios.patch(`${backendUrl}/api/products/${id}/favorite`);
      setFavorites((prev) =>
        prev.map((p) => (p._id === id ? res.data.data : p))
      );
      toast.success("Cập nhật sản phẩm yêu thích!");
      // Nếu sản phẩm vừa bị bỏ yêu thích, remove khỏi list
      setFavorites((prev) => prev.filter((p) => p.isFavorite));
    } catch (err) {
      toast.error("Lỗi khi cập nhật yêu thích!");
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>

      {loading ? (
        <p>Đang tải sản phẩm yêu thích...</p>
      ) : favorites.length === 0 ? (
        <p>Chưa có sản phẩm yêu thích</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {favorites.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded relative flex flex-col items-center"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="font-semibold">{p.title}</p>
              <p className="text-blue-600">${p.price}</p>
              <p className="text-gray-500">{p.reviewCount} reviews</p>

              {/* Favorite Icon */}
              <button
                onClick={() => toggleFavorite(p._id)}
                className="absolute top-2 right-2 text-2xl text-red-500"
              >
                {p.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
