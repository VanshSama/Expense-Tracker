import React from 'react';
import { CalendarDays } from 'lucide-react';

function TransactionCard({ item }) {
  const isExpense = item.type === 'Expense';

  return (
    <div className="relative flex justify-between items-center bg-white/70 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl px-5 py-4 hover:shadow-lg transition-all">
      
      {/* Side indicator */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${isExpense ? 'bg-red-500' : 'bg-green-500'}`}
      ></div>

      <div className="ml-4 flex flex-col gap-1">
        <h4 className="font-semibold text-lg text-gray-800">{item.description}</h4>
        <p className="text-sm text-gray-500">{item.category}</p>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <CalendarDays size={14} className="mr-1" />
          {new Date(item.date).toLocaleString()}
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-1">
        <p className={`font-bold text-xl ${isExpense ? 'text-red-500' : 'text-green-600'}`}>
          Rs.{parseFloat(item.amount).toFixed(2)}
        </p>
        <span className={`px-2 py-0.5 text-xs rounded-full ${isExpense ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {item.type}
        </span>
      </div>
    </div>
  );
}

export default TransactionCard;
