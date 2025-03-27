import express from "express";

import authMiddleware from '../middlewares/authMiddleware.js'
import { login,getAllUsers} from "../controllers/authController.js";
const router = express.Router();



// Login User
router.post("/login", login);
router.get("/users", getAllUsers);



export default router;
