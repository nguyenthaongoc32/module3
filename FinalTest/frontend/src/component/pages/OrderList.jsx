import { useState } from "react";
import OrdersChart from "../dashboard/OrderChart"; 

const orders = [
  { id: "001", name: "Nguyen Van A", address: "123 Đường ABC, Q1, HCM", date: "2025-04-20", type: "Online", status: "Đã giao" },
  { id: "002", name: "Tran Thi B", address: "456 Đường DEF, Q3, HCM", date: "2025-04-21", type: "Tại quầy", status: "Đang xử lý" },
  { id: "003", name: "Le Minh C", address: "789 Đường GHI, Q7, HCM", date: "2025-04-22", type: "Online", status: "Đã hủy" },
  { id: "004", name: "Pham Thi D", address: "101 Đường JKL, Q5, HCM", date: "2025-04-23", type: "Tại quầy", status: "Đã giao" },
  { id: "005", name: "Hoang Van E", address: "202 Đường MNO, Q2, HCM", date: "2025-04-24", type: "Online", status: "Đang xử lý" },
  { id: "006", name: "Vu Thi F", address: "303 Đường PQR, Q9, HCM", date: "2025-04-25", type: "Online", status: "Đã giao" },
  { id: "007", name: "Do Van G", address: "404 Đường STU, Q10, HCM", date: "2025-04-26", type: "Tại quầy", status: "Đang xử lý" },
  { id: "008", name: "Bui Thi H", address: "505 Đường VWX, Q12, HCM", date: "2025-04-27", type: "Online", status: "Đã giao" },
  { id: "009", name: "Nguyen Van I", address: "606 Đường YZ, Bình Thạnh, HCM", date: "2025-04-28", type: "Tại quầy", status: "Đang xử lý" },
  { id: "010", name: "Tran Van N", address: "707 Đường KLM, Gò Vấp, HCM", date: "2025-04-28", type: "Online", status: "Đã hủy" },
];

const OrderList = () => {
  const [data, setData] = useState(orders);

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-2xl font-semibold">Order List</h2>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Address</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 text-sm">{order.id}</td>
                <td className="px-4 py-2 text-sm">{order.name}</td>
                <td className="px-4 py-2 text-sm">{order.address}</td>
                <td className="px-4 py-2 text-sm">{order.date}</td>
                <td className="px-4 py-2 text-sm">{order.type}</td>
                <td className="px-4 py-2 text-sm">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Chart */}
      <OrdersChart data={data} />
    </div>
  );
};

export default OrderList;
