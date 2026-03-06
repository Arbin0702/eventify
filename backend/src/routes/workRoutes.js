const router = require("express").Router();
const workController = require("../controllers/workController");

const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const upload = require("../middleware/upload");

// Public
router.get("/", workController.listWork);

// Admin
router.post("/", auth, requireAdmin, upload.single("image"), workController.createWork);
router.delete("/:id", auth, requireAdmin, workController.deleteWork);

module.exports = router;