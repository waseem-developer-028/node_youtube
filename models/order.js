const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
