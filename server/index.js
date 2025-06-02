const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinaryConnect = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const job = require('./cron.js');
require('dotenv').config();

job.start();  // Start the cron job

const port = process.env.PORT || 3000;

// Connect to DB and Cloudinary
connectDB();
cloudinaryConnect();

// Middleware Setup
app.use(express.json());
app.use(cookieParser());

// CORS Configuration - Allow requests from frontend (localhost:5173) with credentials (cookies)
const FRONTEND_URL = process.env.NODE_ENV === 'prod'
  ? process.env.FRONTEND_URL_PROD
  : process.env.FRONTEND_URL_DEV || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// File Upload Middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Import Routes
const userRoutes = require('./routes/User');
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");
const paymentRoutes = require("./routes/Payments");

// Mount Routes with /api/v1 prefix
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/reach', contactRoutes);
app.use('/api/v1/payment', paymentRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, this is Study Notion Backend');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
