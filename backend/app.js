const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const connectDB = require("./db");
const routes = require("./route");
const mongoose = require("mongoose");
const cors = require('cors');
const Company = require("./models/Company");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

// Session setup
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//     }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );

// MongoDB connection
mongoose
  .connect("mongodb+srv://gautamch:PT%40AZ5sAjLLAap2@cluster0.mmy27.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
// POST endpoint to save company investment details
app.post("/api/companies", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error("Error saving company:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API routes
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
