const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const role = require("../middleware/roleMiddleware");

// PUBLIC
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// ADMIN
router.post("/", role("admin"), bookController.createBook);
router.put("/:id", role("admin"), bookController.updateBook);
router.delete("/:id", role("admin"), bookController.deleteBook);

module.exports = router;
