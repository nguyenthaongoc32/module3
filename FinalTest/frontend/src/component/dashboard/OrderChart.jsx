import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const orders = [{
  id: "001",
  name: "Nguyen Van A",
  address: "123 Đường ABC, Q1, HCM",
  date: "2025-04-20",
  type: "Online",
  status: "Đã giao",
},
{
  id: "002",
  name: "Tran Thi B",
  address: "456 Đường DEF, Q3, HCM",
  date: "2025-04-21",
  type: "Tại quầy",
  status: "Đang xử lý",
},
{
  id: "003",
  name: "Le Minh C",
  address: "789 Đường GHI, Q7, HCM",
  date: "2025-04-22",
  type: "Online",
  status: "Đã hủy",
},
{
  id: "004",
  name: "Pham Thi D",
  address: "101 Đường JKL, Q5, HCM",
  date: "2025-04-23",
  type: "Tại quầy",
  status: "Đã giao",
},
{
  id: "005",
  name: "Hoang Van E",
  address: "202 Đường MNO, Q2, HCM",
  date: "2025-04-24",
  type: "Online",
  status: "Đang xử lý",
},
{
  id: "006",
  name: "Vu Thi F",
  address: "303 Đường PQR, Q9, HCM",
  date: "2025-04-25",
  type: "Online",
  status: "Đã giao",
},
{
  id: "007",
  name: "Do Van G",
  address: "404 Đường STU, Q10, HCM",
  date: "2025-04-26",
  type: "Tại quầy",
  status: "Đang xử lý",
},
{
  id: "008",
  name: "Bui Thi H",
  address: "505 Đường VWX, Q12, HCM",
  date: "2025-04-27",
  type: "Online",
  status: "Đã giao",
},
{
  id: "009",
  name: "Nguyen Van I",
  address: "606 Đường YZ, Bình Thạnh, HCM",
  date: "2025-04-28",
  type: "Tại quầy",
  status: "Đang xử lý",
},
{
  id: "010",
  name: "Tran Van N",
  address: "707 Đường KLM, Gò Vấp, HCM",
  date: "2025-04-28",
  type: "Online",
  status: "Đã hủy",
},
];
const getChartData = (orders) => {

  const counts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).map((key) => ({ status: key, value: counts[key] }));
};

const OrdersChart = ({ data }) => {
  const chartData = getChartData(data);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Đơn hàng theo trạng thái</h3>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF7A59" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
