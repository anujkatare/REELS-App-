import cloudinary from "../config/cloudinary.js";

export const getVideos = async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("resource_type:video AND folder:reels")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const videos = result.resources.map((v) => ({
      id: v.public_id,
      url: v.secure_url,
      duration: v.duration,
    }));

    res.json(videos);
  } catch (err) {
    console.error("Cloudinary error:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};
