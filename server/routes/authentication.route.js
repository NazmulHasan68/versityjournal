import express from "express";
import multer from 'multer'
import path from 'path'
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth, getUsers, updateProfile, getUserById, updateUserRole } from "../controllers/authentication.controller.js";
import  {verifyToken}  from "../middlewares/verifyToken.js";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/thesis"); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get('/check-auth', verifyToken, checkAuth);
router.get('/getusers', verifyToken, getUsers)
router.put(
  "/update-profile",
  verifyToken,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "CV", maxCount: 1 },
  ]),
  updateProfile
);

// GET a single user
router.get("/users/:id", getUserById);

// PATCH role update
router.patch("/users/:userId/role", updateUserRole);





export default router;