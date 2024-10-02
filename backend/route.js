const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const authMiddleware = require("./middlewares/auth");
const path = require("path");

const router = express.Router();

// Serve Signup Page
router.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, '../signup.html'));
});

// Serve Login Page
router.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

// Register Route
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    req.session.user = user;

    // Redirect based on user role (optional)
    if (user.role === "funder") {
      res.redirect("/funder-dashboard");
    } else {
      res.redirect("/investor-dashboard");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Funder (Admin) Dashboard Route - Access restricted to funders
router.get("/funder-dashboard", authMiddleware("funder"), (req, res) => {
  res.send("<h1>Welcome Funder to your Dashboard</h1>");
});

// Investor Dashboard Route - Access restricted to investors
router.get("/investor-dashboard", authMiddleware("investor"), (req, res) => {
  res.send("<h1>Welcome Investor to your Dashboard</h1>");
});

// Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login.html");
  });
});

module.exports = router;
