const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "uploads", "work");
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".png", ".jpg", ".jpeg", ".webp"].includes(ext) ? ext : ".png";
    cb(null, `work_${Date.now()}_${Math.round(Math.random() * 1e9)}${safeExt}`);
  }
});

function fileFilter(req, file, cb) {
  const ok = ["image/png", "image/jpeg", "image/webp"].includes(file.mimetype);
  if (!ok) return cb(new Error("Only png/jpg/webp images are allowed"));
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB
});

module.exports = upload;