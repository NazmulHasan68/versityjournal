import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForgotPasswordMutation } from '@/redux/ApiController/authApi';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // RTK Query mutation hook for forgot password API call
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgetPassword({ email }).unwrap(); 
      if (response.success) {
        toast.success('Verification code sent successfully!');
        setTimeout(() => {
          navigate('/auth/verify-forgot-verify-code');
        }, 2000); 
      } else {
        toast.error(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }}   
        exit={{ opacity: 0, y: -20 }}    
        transition={{ duration: 0.5 }} 
        className="bg-slate-50 text-gray-800 p-6 mx-4 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-sky-900 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sky-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              autoComplete="email"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
          <div className='text-left mt-2'>
            <Link to='/auth/login' className='hover:underline text-sky-700 font-medium'>Go to Login</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
