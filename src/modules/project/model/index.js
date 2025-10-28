import mongoose from "mongoose";

const collectionName = "Project";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed"],
    },
  },
  { timestamps: true }
);

const Model =
  mongoose.models[collectionName] || mongoose.model(collectionName, schema);

export default Model;
