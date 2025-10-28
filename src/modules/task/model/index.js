import mongoose from "mongoose";

const collectionName = "Task";

const schema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
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
