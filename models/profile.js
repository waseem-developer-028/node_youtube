const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    address: {
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

module.exports = mongoose.model("Profile", profileSchema);
