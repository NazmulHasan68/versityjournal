import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["admin", "editor", "sub_editor", "reviewer", "researcher"],
    default: "researcher"
  },
  photo: {
    type: String
  },
  versity: {
    type: String
  },
  category: {
    type: String
  },
  profession: {
    type: String
  },
  previousJob: {
    type: String
  },
  subject: {
    type: String
  },
  country: {
    type: String
  },
  CV: {
    type: String
  },


  
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpiresAt: {
    type: Date
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpiresAt: {
    type: Date
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
