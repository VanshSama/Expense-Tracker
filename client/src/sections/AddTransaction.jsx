import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

function AddTransaction() {
  const { addTransaction, getBudgetUsage, addTransactionFromFile } = useAppContext();

  // Local state
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Predefined category options
  const expenseTypes = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Other",
  ];

  const incomeTypes = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other",
  ];

  // Submit manually
  const handleSubmit = async () => {
    if (!category || !amount || !type) {
      toast.error("Please select a type, category and enter an amount.");
      return;
    }

    setLoading(true);

    try {
      await addTransaction({
        category,
        amount,
        type,
        description,
      });

      await getBudgetUsage();

      setCategory("");
      setAmount("");
      setDescription("");
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  // File select
  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  // Parse receipt
  const handleUploadReceipt = async () => {
    if (!file) {
      toast.error("Please choose a file (image or PDF).");
      return;
    }
    if (!category) {
      toast.error("Please select a category before uploading the receipt.");
      return;
    }
    if (type !== "Expense") {
      toast.error("Receipt upload is meant for Expenses. Set Type to Expense.");
      return;
    }

    const maxSize = 8 * 1024 * 1024; // 8MB
    if (file.size > maxSize) {
      toast.error("File too large (max 8MB).");
      return;
    }
    const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG/PNG/PDF files are allowed.");
      return;
    }

    setUploading(true);
    try {
      const data = await addTransactionFromFile({ category, file });

      const tx = data?.transaction;
      let parsedAmount =
        tx?.amount ??
        tx?.metadata?.total ??
        tx?.metadata?.totalPrice ??
        tx?.metadata?.subtotal ??
        null;

      let dsc = tx?.description;
      setDescription(dsc ? dsc : "POS Upload");

      if (parsedAmount) {
        setAmount(String(parsedAmount));
        toast.success("Amount auto-filled from receipt. Verify & submit.");
      } else {
        toast.success("Receipt parsed but no amount found. Fill manually.");
      }

      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Receipt upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 p-8 relative">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">+</span> Add Transaction
        </h1>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex bg-gray-100 rounded-full p-1 w-fit">
              {["Expense", "Income"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    type === item
                      ? item === "Expense"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                      : "text-gray-600"
                  }`}
                  disabled={loading || uploading}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 pr-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading || uploading}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || uploading}
            >
              <option value="">Select category...</option>
              {(type === "Expense" ? expenseTypes : incomeTypes).map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="Transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || uploading}
            />
          </div>

          {/* Receipt Upload */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Receipt</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => document.getElementById("receiptFile")?.click()}
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {file ? file.name : "Click to select file or drag & drop"}
              </p>
              <input
                id="receiptFile"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading || uploading}
              />
            </div>

            <button
              onClick={handleUploadReceipt}
              disabled={!file || uploading || loading}
              className="mt-3 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
            >
              {uploading ? "Parsing..." : "Parse & Fill Amount"}
            </button>
          </div>
        </div>

        {/* Sticky Submit */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition shadow-md ${
              type === "Income"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Saving..." : `+ ${type === "Income" ? "Add Income" : "Add Expense"}`}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AddTransaction;
