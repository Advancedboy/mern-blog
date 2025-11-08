import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import checkAuth from "./utils/checkAuth.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads"),
  filename: (_, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

app.listen(5000, (err) => {
  if (err) return console.error(err);
  console.log("Server running on port 5000");
});
