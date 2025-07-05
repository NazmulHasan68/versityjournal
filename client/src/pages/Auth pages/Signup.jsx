import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import SignUpImage from "@/assets/signup.svg";
import { useRegisterUserMutation } from "@/redux/ApiController/authApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!name || !email || !password) {
      setCustomError("All fields are required");
      return;
    }

    const formData = { name, email, password };

    try {
      await registerUser(formData).unwrap();
      navigate("/auth/verify-code");
      setCustomError("");
      toast.success("Sent a verification code to your email");
    } catch (err) {
      console.error("Registration error:", err);
      setCustomError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        className="bg-slate-50 text-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl mx-4 flex-col md:flex-row flex justify-between items-center gap-4"
      >
        <div className="basis-1/2 hidden md:block">
          <img src={SignUpImage} className="w-full h-full object-cover" alt="Sign up" />
        </div>
        <div className="basis-1/2 w-full">
          <h2 className="text-2xl font-bold text-center text-sky-500">Sign Up</h2>
          <h2 className="text-sm font-medium text-center text-sky-600 mb-4">
            Welcome to <span className="text-cyan-500">Journal Publication</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {customError && <p className="text-xs text-rose-500 text-center">{customError}</p>}

            <div>
              <Label htmlFor="name" className="block text-slate-600 mb-1">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-slate-600 mb-1">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-slate-600 mb-1">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-sky-500 hover:bg-sky-600 mt-4">
              {isLoading ? <Loader className="animate-spin mx-auto" /> : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-slate-600 mt-4">
            Already have an account? <Link to="/auth/login" className="text-sky-500 font-medium">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
