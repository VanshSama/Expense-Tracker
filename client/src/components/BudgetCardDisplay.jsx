import React, { useState } from "react";
import { SquarePen, X, Save } from "lucide-react";
import { useAppContext } from "../contexts/AppProvider";
import { motion } from "framer-motion";

function BudgetCardDisplay({ item }) {
  const { updateBudget, deleteBudget, getBudgetUsage, getBudgets } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(item.amount);

  const handleSave = async () => {
    try {
      await updateBudget(item._id, {
        category: item.category,
        amount: editedAmount,
      });
      await getBudgetUsage();
      setIsEditing(false);
    } catch (error) {
      return null;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBudget(item._id);
      await getBudgets();
      await getBudgetUsage();
    } catch (error) {
      return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 rounded-2xl"
    >
      <div>
        <p className="font-bold text-xl text-gray-800">{item.category}</p>
        <p className="text-sm text-gray-500">Monthly Budget</p>
      </div>

      <div className="flex items-center justify-between gap-4 mt-3 md:mt-0">
        {isEditing ? (
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span className="text-lg font-bold text-gray-800">
            Rs {item.amount.toFixed(2)}
          </span>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="hover:bg-green-50 text-green-600 p-2 rounded-xl border border-gray-200 hover:border-green-400 transition"
            >
              <Save size={20} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="hover:bg-blue-50 text-blue-500 p-2 rounded-xl border border-gray-200 hover:border-blue-300 transition"
            >
              <SquarePen size={20} />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="hover:bg-red-50 text-red-500 p-2 rounded-xl border border-gray-200 hover:border-red-300 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default BudgetCardDisplay;
