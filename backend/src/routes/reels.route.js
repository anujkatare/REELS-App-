import express from "express";
import { getVideos } from "../controllers/reels.controller.js";

const router = express.Router();

router.get("/", getVideos);

export default router;
