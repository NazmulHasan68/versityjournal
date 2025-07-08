import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbconnection } from './utills/dbConnection.js';

import authanticationRoute from './routes/authentication.route.js';
import thesisRoute from './routes/thesis_route.js';
import thesisAssignRoute from './routes/thesisAssignRoute.js'

// Handle __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ---------------------
// Middleware
// ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for frontend client
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., http://localhost:3000
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

// ---------------------
// API Routes
// ---------------------
app.use('/api/auth', authanticationRoute);
app.use('/api/thesis', thesisRoute);
app.use('/api/assign', thesisAssignRoute);

// ---------------------
// Serve thesis uploads
// ---------------------
// This allows access like http://localhost:5000/thesis/filename.docx
app.use('/public/thesis', express.static(path.join(__dirname, 'public/thesis')));


// ---------------------
// Root Route
// ---------------------
app.get('/', (req, res) => {
  res.send('Journal Backend Running');
});

// ---------------------
// Serve React Frontend (Production Build)
// ---------------------
// This assumes your frontend is built and output to public_html/
app.use(express.static(path.join(__dirname, '../public_html')));


// Catch-all route to serve React app on refresh (except API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});

// ---------------------
// Start Server
// ---------------------
app.listen(port, () => {
  dbconnection(); // Connect to MongoDB
  console.log(`🚀 Server running at http://localhost:${port}`);
});
