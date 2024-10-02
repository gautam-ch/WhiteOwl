const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string (replace <db_password> with your actual password)
const uri =
  "mongodb+srv://Excius:Excius@cluster0.6s1bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1); // Exit if unable to connect
  });

// Define a schema for startup details
const startupSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // Ensure this field is required
  },
  startupName: {
    type: String,
    required: true, // Ensure this field is required
  },
  startupDetails: {
    type: String,
    required: true, // Ensure this field is required
  },
});

// Create a model from the schema
const Startup = mongoose.model("Startup", startupSchema);

// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Startup Management API");
});

// Route to collect user and startup details
app.post("/startup", async (req, res) => {
  const { userName, startupName, startupDetails } = req.body;

  const newStartup = new Startup({
    userName,
    startupName,
    startupDetails,
  });

  try {
    // Save the startup to the database
    await newStartup.save();
    res.json({
      message: "Startup details received successfully",
      data: newStartup,
    });
  } catch (error) {
    console.error("Error saving startup details:", error); // Log the error
    res.status(500).json({ message: "Error saving startup details", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
