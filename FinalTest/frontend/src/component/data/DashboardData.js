import { HiMiniUsers, HiMiniCube } from "react-icons/hi2";
import { BiLineChart } from "react-icons/bi";
import { PiClockCounterClockwiseFill } from "react-icons/pi";

export const dashboardData = [
  {
    stats: [
      {
        title: "Total User",
        value: 40689,
        icon: {
          component: HiMiniUsers, 
          bg: "#8280FF",
        },
        growth: { name: "progress", rate: 8.5, time: "yesterday" },
      },
      {
        title: "Total Order",
        value: 10293,
        icon: { component: HiMiniCube, bg: "#FEC53D" },
        growth: { name: "progress", rate: 1.3, time: "pass week" },
      },
      {
        title: "Total Sales",
        value: 89000,
        icon: { component: BiLineChart, bg: "#4AD991" },
        growth: { name: "regress", rate: 4.3, time: "yesterday" },
      },
      {
        title: "Total Pending",
        value: 2040,
        icon: { component: PiClockCounterClockwiseFill, bg: "#FF9066" },
        growth: { name: "progress", rate: 1.8, time: "yesterday" },
      },
    ],
  },
];
