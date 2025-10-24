import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String,
});

const Note = mongoose.model("Note", noteSchema);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find().sort({ _id: -1 });
  res.json(notes);
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
    filePath: `https://its2simple-backend.onrender.com/uploads/${req.file.filename}`,
  });
  await newNote.save();
  res.json({ success: true, message: "Note uploaded successfully!" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
