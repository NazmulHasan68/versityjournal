import mongoose from "mongoose";

const thesisAssignmentSchema = new mongoose.Schema(
  {
    thesisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thesis",
      required: true,
    },
     assignedReviewer: {
      type: [mongoose.Schema.Types.ObjectId],  // 🔄 Changed to array
      ref: "User",
      default: [],
    },
    assignedSubEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "submitted",
        "under_review",
        "revision_requested",
        "accepted",
        "rejected",
      ],
      default: "pending",
    },
    notes: {
      type: [
        {
          message: String,
          by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          at: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Export default (recommended)
export default mongoose.model("ThesisAssignment", thesisAssignmentSchema);

// OR named export, if you prefer
// export const ThesisAssign = mongoose.model("ThesisAssignment", thesisAssignmentSchema);
