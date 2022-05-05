import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      maxlength: 60,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
