const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrow.controller");
const role = require("../middleware/roleMiddleware");

// USER only
router.post("/", role("user"), borrowController.borrowBook);

module.exports = router;
