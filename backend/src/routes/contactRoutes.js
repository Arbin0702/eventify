const router = require("express").Router();
const contactController = require("../controllers/contactController");

// your existing auth middleware (adjust path if yours is different)
const auth = require("../middleware/auth");

// admin check (new helper below)
const requireAdmin = require("../middleware/requireAdmin");

// Public: submit contact form
router.post("/", contactController.submitContact);

// Admin: list messages
router.get("/", auth, requireAdmin, contactController.listMessages);

// Admin: delete message
router.delete("/:id", auth, requireAdmin, contactController.deleteMessage);

module.exports = router;