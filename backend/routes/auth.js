import express from "express";

import authMiddleware from '../middlewares/authMiddleware.js'
import { login,getMe, getAllUsers} from "../controllers/authController.js";
const router = express.Router();



// Login User
router.post("/login", login);

router.get("/users", getAllUsers);

router.get("/me", getMe)



export default router;
