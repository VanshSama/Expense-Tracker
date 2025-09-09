import React from "react";
import MoneyCard from "../components/MoneyCard";
import { useAppContext } from "../contexts/AppProvider";
import { motion } from "framer-motion";
import { Wallet, ArrowUpCircle, ArrowDownCircle, Percent } from "lucide-react";
import CustomLineChart from "../components/CustomLineChart"; // New modern line chart
import PieChartComponent from "../components/PieChart";

function Dashboard() {
  const { statistic, yearData } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <MoneyCard
            title="Total Balance"
            amount={statistic.balance}
            icon={<Wallet className="w-6 h-6 text-green-600" />}
            style="bg-gradient-to-r from-green-100 to-green-50 border border-green-200"
            textColor={statistic.balance >= 0 ? "text-green-600" : "text-red-600"}
          />
          <MoneyCard
            title="Monthly Income"
            amount={statistic.income}
            icon={<ArrowUpCircle className="w-6 h-6 text-blue-500" />}
            style="bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200"
            textColor="text-blue-600"
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <MoneyCard
            title="Monthly Expenses"
            amount={statistic.expense}
            icon={<ArrowDownCircle className="w-6 h-6 text-red-600" />}
            style="bg-gradient-to-r from-red-100 to-red-50 border border-red-200"
            textColor="text-red-600"
          />
          <MoneyCard
            title="Savings Rate"
            amount={statistic.savingRate + "%"}
            icon={<Percent className="w-6 h-6 text-purple-500" />}
            isPrice={false}
            style="bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200"
            textColor={statistic.savingRate >= 0 ? "text-green-600" : "text-red-600"}
          />
        </div>
      </div>

      {/* Line Chart + Pie Chart side by side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col xl:flex-row gap-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-md"
      >
        {/* Line Chart */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">Income vs Expenses (Monthly)</h3>
          <CustomLineChart data={yearData} />
        </div>

        {/* Pie Chart */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">Expense Categories</h3>
          <PieChartComponent data={statistic?.categoryBreakdown} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
