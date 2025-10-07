import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { executeCode, testCode } from "../controllers/executeCode.controller.js";


const router = express.Router();

// Test code without creating submission
router.post("/test" , authenticate, testCode);

// Submit code and create submission
router.post("/" , authenticate, executeCode);


export default router;