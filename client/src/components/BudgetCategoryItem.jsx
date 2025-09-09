import React from "react";
import { motion } from "framer-motion";

const BudgetCategoryItem = ({ item }) => {
  const getPercentageColor = () => {
    if (100 - item.percentLeft > 100) return "bg-red-500";
    if (100 - item.percentLeft >= 90) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3">
        <div>
          <div className="font-bold text-lg text-gray-800">{item.category}</div>
          <div className="text-gray-500 text-sm">
            Rs.{item.spent.toFixed(2)} of Rs.{item.allocated.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="font-semibold text-sm text-gray-700 mb-1">
            {item.percentLeft}%
          </div>
          <div className="text-sm">
            {item.remaining >= 0 ? (
              <span className="text-green-600">Rs.{item.remaining} left</span>
            ) : (
              <span className="text-red-500">
                Over budget by Rs.{Math.abs(item.remaining)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`${getPercentageColor()} h-full rounded-full`}
          style={{ width: `${100 - parseFloat(item.percentLeft)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${100 - parseFloat(item.percentLeft)}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

export default BudgetCategoryItem;
