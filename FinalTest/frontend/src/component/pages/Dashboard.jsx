import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

import PagesTitle from "../dashboard/PagesTitle";
import SalesChart from "../dashboard/SalesChart";
import RevenueChart from "../dashboard/RevenueChart";
import SalesAnalyticsChart from "../dashboard/SalesAnalyticsChart";

const backendUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/products`);
        console.log("API response:", res.data);
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          toast.error("Không thể tải sản phẩm!");
        }
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu sản phẩm!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const featuredProduct = products[featuredIndex];

  return (
    <>
      <PagesTitle />

      {/* Sales Chart */}
      <div className="mt-5">
        <SalesChart />
      </div>

      {/* Products List */}
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-3">Products</h3>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : products.length === 0 ? (
          <p>Không có sản phẩm</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover mb-3"
                />
                <p className="text-lg font-medium">{p.title}</p>
                <p className="text-blue-600">${p.price}</p>
                <p className="text-gray-500 text-sm">{p.reviewCount} reviews</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Product */}
      {products.length > 0 && (
        <div className="mt-5 border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3">Featured Product</h3>
          <div className="relative">
            <img
              src={featuredProduct.image}
              alt={featuredProduct.title}
              className="mx-auto h-40 object-cover"
            />
            <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 px-2">
              <IoChevronBackOutline
                className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 cursor-pointer"
                onClick={prevFeatured}
              />
              <IoChevronForwardOutline
                className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 cursor-pointer"
                onClick={nextFeatured}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-[#282D32] font-medium text-[1.125rem]">
              {featuredProduct.title}
            </p>
            <p className="text-blue-600">${featuredProduct.price}</p>
            <p className="text-gray-500 text-sm">
              {featuredProduct.reviewCount} reviews
            </p>
          </div>
        </div>
      )}

      {/* Other Charts */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        <SalesAnalyticsChart />
        <RevenueChart />
      </div>
    </>
  );
};

export default Dashboard;
