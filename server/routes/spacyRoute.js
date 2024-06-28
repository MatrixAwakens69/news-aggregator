import express from "express";
import { analyzeSentiment } from "../controllers/spacyController.js";

const router = express.Router();

router.post("/analyze-sentiment", analyzeSentiment);

export default router;
