// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Company = require("./models/Company");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/companyInvestment", {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET route to retrieve all company details
app.get('/api/companies/get', async (req, res) => {
  try {
      const companies = await Company.find();
      res.status(200).json(companies);
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving company details' });
  }
});

// Start server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
