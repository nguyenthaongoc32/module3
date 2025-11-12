import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const backendUrl = import.meta.env.VITE_API_URL;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    reviewCount: "",
  });
  const [editId, setEditId] = useState(null);


  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products`);
      if (res.data.success) setProducts(res.data.data);
      else toast.error("Không thể tải sản phẩm!");
    } catch (err) {
      toast.error("Lỗi khi lấy dữ liệu!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${backendUrl}/api/products/${editId}`, form);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await axios.post(`${backendUrl}/api/products`, form);
        toast.success("Thêm sản phẩm thành công!");
      }
      setForm({ title: "", image: "", price: "", reviewCount: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Lỗi khi lưu sản phẩm!");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`${backendUrl}/api/products/${id}`);
      toast.success("Xóa sản phẩm thành công!");
      fetchProducts();
    } catch (err) {
      toast.error("Lỗi khi xóa sản phẩm!");
      console.error(err);
    }
  };

  // Chỉnh sửa
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      image: product.image,
      price: product.price,
      reviewCount: product.reviewCount,
    });
    setEditId(product._id);
  };

  const toggleFavorite = async (id) => {
    try {
      const res = await axios.patch(`${backendUrl}/api/products/${id}/favorite`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data.data : p))
      );
      toast.success("Cập nhật sản phẩm yêu thích!");
    } catch (err) {
      toast.error("Lỗi khi cập nhật yêu thích!");
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Product</h2>

   
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Review Count"
          value={form.reviewCount}
          onChange={(e) => setForm({ ...form, reviewCount: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

  
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p>Không có sản phẩm</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p) => (
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

             
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

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

export default Product;
