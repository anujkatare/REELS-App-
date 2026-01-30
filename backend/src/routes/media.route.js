import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/", upload.single("media"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file" });
  }

  const isVideo = req.file.mimetype.startsWith("video");

  res.json({
    url: `http://localhost:5000/uploads/${req.file.filename}`,
    type: isVideo ? "video" : "image",
  });
});

export default router;
