import React from "react";
import { useAppContext } from "../contexts/AppProvider";
import MoneyCard from "../components/MoneyCard";
import BudgetCategoryItem from "../components/BudgetCategoryItem";
import { motion } from "framer-motion";
import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

function Budgets() {
  const { budgetUsage } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-12"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MoneyCard
          title="Total Budget"
          amount={budgetUsage.total.totalBudget}
          icon={<Wallet className="w-6 h-6 text-green-600" />}
          style="bg-gradient-to-r from-green-100 to-green-50 border border-green-200"
          textColor="text-green-700"
        />
        <MoneyCard
          title="Total Spent"
          amount={budgetUsage.total.totalSpent}
          icon={<ArrowDownCircle className="w-6 h-6 text-red-600" />}
          style="bg-gradient-to-r from-red-100 to-red-50 border border-red-200"
          textColor="text-red-700"
        />
        <MoneyCard
          title="Remaining"
          amount={budgetUsage.total.remaining}
          icon={<ArrowUpCircle className="w-6 h-6 text-blue-600" />}
          style={`bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200`}
          textColor={
            budgetUsage.total.remaining >= 0 ? "text-blue-700" : "text-red-700"
          }
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Budget Categories
        </h3>
        <div className="space-y-4">
          {budgetUsage.report.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BudgetCategoryItem item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Budgets;
