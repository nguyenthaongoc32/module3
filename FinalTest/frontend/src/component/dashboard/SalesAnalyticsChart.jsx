import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { year: 2015, productA: 20, productB: 30 },
  { year: 2016, productA: 60, productB: 45 },
  { year: 2017, productA: 45, productB: 35 },
  { year: 2018, productA: 85, productB: 70 },
  { year: 2019, productA: 100, productB: 90 },
];

const SalesAnalyticsChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-brand-primary-black text-[1.125rem] font-semibold mb-2">
        Sales Analytics
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={salesData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            stroke="#9ca3af"
            dy={10}
          />
          <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" dx={-10} />
          <Tooltip />
          <Line type="monotone" dataKey="productA" stroke="#4880FF" strokeWidth={3} />
          <Line type="monotone" dataKey="productB" stroke="#00B69B" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalyticsChart;
