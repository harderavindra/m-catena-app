const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Enable JSON parsing

// Simple GET route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

// GET route to fetch all users
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json(users);
});

// POST route to add a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newUser = { id: Date.now(), name };
  res.status(201).json({ message: "User added successfully", user: newUser });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
