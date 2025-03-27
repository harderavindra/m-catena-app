import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import jobRoutes from './routes/jobRoutes.js'

dotenv.config();

const app = express(); 
app.use(cors({ origin: "https://m-catena-app-frontend.vercel.app" }));
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));  

app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend2!" });
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newUser = { id: Date.now(), name };
  res.status(201).json({ message: "User added successfully", user: newUser });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
