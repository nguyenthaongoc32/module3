import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Dropdown from "./ui/Dropdown";

export const revenueData = [
  { week: "5k", sales: 35, profit: 27 },
  { week: "10k", sales: 60, profit: 50 },
  { week: "15k", sales: 40, profit: 39 },
  { week: "20k", sales: 75, profit: 40 },
  { week: "25k", sales: 50, profit: 20 },
  { week: "30k", sales: 80, profit: 43 },
  { week: "35k", sales: 60, profit: 60 },
  { week: "40k", sales: 100, profit: 70 },
  { week: "45k", sales: 70, profit: 57 },
  { week: "50k", sales: 90, profit: 60 },
  { week: "55k", sales: 60, profit: 80 },
  { week: "60k", sales: 100, profit: 90 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-brand-primary-black text-[1.125rem] font-semibold">
          Revenue
        </h3>
        <Dropdown />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF946D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#BFE8FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#42B6F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#BFE8FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="week" />
          <YAxis domain={[0, 100]} ticks={[20, 40, 60, 80, 100]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="sales" stroke="#F9978A" fill="url(#sales)" fillOpacity={1}/>
          <Area type="monotone" dataKey="profit" stroke="#E3B9FF" fill="url(#profit)" fillOpacity={1}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
