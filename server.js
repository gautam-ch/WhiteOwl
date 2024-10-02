const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Startup Management API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Route to collect user and startup details
app.post("/startup", (req, res) => {
  const { userName, startupName, startupDetails } = req.body;

  // Here you can process the data, e.g., save it to a database

  res.json({
    message: "Startup details received successfully",
    data: {
      userName,
      startupName,
      startupDetails,
    },
  });
});
