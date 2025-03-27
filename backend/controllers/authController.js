import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { ROLES, USER_TYPES,  STATUS, GENDER, DESIGNATIONS } from "../constants/enums.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;



    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict',
      maxAge: 3600000
    });

    res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email, role: user.role } });

  } catch (error) {
    console.error("Login Error:", error); // ✅ Log error for debugging
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, designation, search } = req.query;
    console.log('page', page)

    let filter = {};

    if (role) filter.role = role;
    if (designation) filter.designation = designation;

    // Search by first name or last name
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(filter);

    res.json({
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
