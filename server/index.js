import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbconnection } from './utills/dbConnection.js';
import authanticationRoute from './routes/authentication.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  })
);


//called api 
app.use('/api/auth', authanticationRoute)


// Routes
app.get('/', (req, res) => {
  res.send('Journal Backend Running');
});


app.use(express.static(path.join(__dirname, '../public_html')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});


// Start server
app.listen(port, () => {
    dbconnection()
  console.log(`Server running on http://localhost:${port}`);
});
