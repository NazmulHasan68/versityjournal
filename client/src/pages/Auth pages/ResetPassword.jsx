import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";

export default function ResetPassword() {
  const { token } = useParams(); // ✅ GET token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    if (password.length < 6) {
      setPasswordStrength("Password must be at least 6 characters.");
    } else {
      setPasswordStrength("Password looks good.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await resetPassword({ token, password: newPassword }).unwrap(); // ✅ SEND TOKEN
      if (response.success) {
        toast.success("Password reset successful!");
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      } else {
        setErrorMessage(response.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-gray-800 p-6 mx-4 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newpassword" className="block text-sky-600 font-medium">New Password</label>
            <input
              id="newpassword"
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {passwordStrength && <p className="text-xs text-gray-600 mt-2">{passwordStrength}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-sky-600 font-medium">Confirm Password</label>
            <input
              id="confirmpassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {errorMessage && <p className="text-xs text-rose-500 mb-2">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" /> : "Change Password"}
          </button>

          <div className="text-left mt-4">
            <Link to="/auth/login" className="hover:underline text-gray-700 font-medium">
              Go Back
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
