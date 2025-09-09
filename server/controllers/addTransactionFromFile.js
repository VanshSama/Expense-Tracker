import Transaction from "../models/Transaction.js";
import fetch from "node-fetch"; // Ensure node-fetch is installed (npm install node-fetch)
import dotenv from "dotenv";
dotenv.config();

// --- Configure Gemini API Key ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Keep key in .env, not in code!

// Helper: Convert buffer to Base64
const bufferToBase64 = (buffer) => {
  return buffer.toString("base64");
};

export const addTransactionFromFile = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Convert uploaded file to base64
    const fileBuffer = req.file.buffer;
    const base64Data = bufferToBase64(fileBuffer);

    // --- Build Gemini prompt ---
    const prompt = `Analyze this receipt/POS image and extract the following information in a JSON format:
    {
      "storeName": "Name of the store/business",
      "storeAddress": "Full address if available",
      "phoneNumber": "Phone number if available",
      "date": "Date in YYYY-MM-DD format",
      "time": "Time if available",
      "receiptNumber": "Receipt/transaction number",
      "items": [
        {
          "name": "Item name",
          "quantity": "Quantity as number",
          "unitPrice": "Price per unit as number",
          "totalPrice": "Total price for this item as number"
        }
      ],
      "subtotal": "Subtotal amount as number",
      "tax": "Tax amount as number",
      "taxRate": "Tax rate percentage if available",
      "discount": "Discount amount as number",
      "total": "Final total amount as number",
      "paymentMethod": "Payment method used",
      "cashier": "Cashier name if available",
      "category": "Type of business (grocery, restaurant, retail, etc.)"
    }

    Please be as accurate as possible and use null for any fields that cannot be determined from the image. 
    For numbers, provide only the numeric value without currency symbols.`;

    // --- Call Gemini API ---
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: req.file.mimetype,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // --- Parse JSON from Gemini response ---
    let extractedData = null;
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/```json\n(.*?)\n```/s) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        extractedData = JSON.parse(jsonStr);
      }
    }

    if (!extractedData) {
      return res.status(500).json({ message: "Failed to extract structured data from receipt" });
    }

    // --- Create transaction in MongoDB ---
    const transaction = await Transaction.create({
      user: req.user._id,
      description: extractedData.storeName || "POS Upload",
      amount: extractedData.total || 0,
      category,
      type: "Expense",
      date: extractedData.date ? new Date(extractedData.date) : new Date(),
      metadata: extractedData, // Save full extracted JSON for reference
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (err) {
    console.error("Error processing uploaded file:", err);
    res.status(500).json({ message: err.message || "Failed to process file" });
  }
};