const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bookingController = require("../controllers/bookingController");

router.post("/", auth, bookingController.createBooking);
router.get("/me", auth, bookingController.myBookings);
router.get("/all", auth, admin, bookingController.allBookings);

router.get("/:id", auth, bookingController.getBookingById);
router.patch("/:id/status", auth, admin, bookingController.updateBookingStatus);
router.patch("/:id/cancel", auth, bookingController.cancelBooking);

module.exports = router;