import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

function MoneyCard({ title, icon, amount = 0, style, textColor = "", isPrice = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: "0 15px 25px rgba(0,0,0,0.1)" }}
      className={`w-full py-6 px-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 space-y-2`}
    >
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-gray-700">
        <span>{title}</span>
        <span className={`${style} text-2xl`}>{icon}</span>
      </div>
      <div className={`text-2xl font-bold ${textColor}`}>
        {isPrice ? (
          <span>
            Rs.{" "}
            <CountUp
              start={0}
              end={parseFloat(amount)}
              duration={1.2}
              decimals={2}
              separator=","
            />
          </span>
        ) : (
          <span>
            <CountUp
              start={0}
              end={parseFloat(amount)}
              duration={1.2}
              decimals={2}
              suffix="%"
            />
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default MoneyCard;
