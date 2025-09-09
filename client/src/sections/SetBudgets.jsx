import React, { useState } from "react";
import BudgetCardDisplay from "../components/BudgetCardDisplay";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function SetBudgets() {
  const { addBudget, budgets, expenseCategory, getBudgetUsage, getBudgets } = useAppContext();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !amount) {
      toast.error("Please select a category and enter a budget.");
      return;
    }
    setLoading(true);
    try {
      await addBudget({ category, amount });
      await getBudgets();
      await getBudgetUsage();
      setCategory("");
      setAmount("");
      toast.success("Budget set successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to set budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Budget Form Card */}
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">+</span> Set Monthly Budget
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Select category...</option>
              {expenseCategory.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2.5">Monthly Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "+ Set Budget"}
            </button>
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Monthly Budgets</h3>
        <div className="flex flex-col gap-4">
          {budgets.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <BudgetCardDisplay item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SetBudgets;
