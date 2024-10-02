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
router.get("/investor-dashboard.html",(req,res)=>{
   res.send(path.join(__dirname, '../investor-dashboard.html'))
})
router.get("/funder-dashboard.html",(req,res)=>{
  res.send(path.join(__dirname, '../funder-dashboard.html'))
})
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    req.session.user = user;

    // Redirect based on user role
    if (user.role === "funder") {
      return res.json({ redirectUrl: "/funder-dashboard.html" });
    } else {
      return res.json({ redirectUrl: "/investor-dashboard.html" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error logging in" });
  }
});

// Funder (Admin) Dashboard Route - Access restricted to funders


// Investor Dashboard Route - Access restricted to investors


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
