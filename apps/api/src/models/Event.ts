import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["masculino", "feminino", "mista"],
    required: true,
  },
  category: { type: String, required: true },
  slots: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  selected: { type: Boolean, default: false },
});

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    type: { type: String, required: true },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    progress: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    categories: { type: [CategorySchema], default: [] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Event = mongoose.model("Event", EventSchema);
