const router = require("express").Router();
const eventController = require("../controllers/eventController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const uploadEventImage = require("../middleware/uploadEventImage");

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

// Admin only
router.post("/", auth, admin, uploadEventImage.single("image"), eventController.createEvent);
router.patch("/:id", auth, admin, uploadEventImage.single("image"), eventController.updateEvent);
router.delete("/:id", auth, admin, eventController.deleteEvent);

module.exports = router;