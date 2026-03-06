const Work = require("../models/Work");

exports.listWork = async (req, res, next) => {
  try {
    const items = await Work.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    next(e);
  }
};

exports.createWork = async (req, res, next) => {
  try {
    const { title, category, location, outcome, summary } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image is required" });
    if (!title || !category || !location || !outcome || !summary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = `/uploads/work/${req.file.filename}`;

    const created = await Work.create({
      title,
      category,
      location,
      outcome,
      summary,
      imageUrl
    });

    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

exports.deleteWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Work.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Work item not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};