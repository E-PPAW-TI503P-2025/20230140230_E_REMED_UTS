const Book = require("../models/Book");
const BorrowLog = require("../models/BorrowLog");

exports.borrowBook = async (req, res) => {
  const { bookId, latitude, longitude } = req.body;
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(400).json({
      message: "x-user-id header is required"
    });
  }

  try {
    const book = await Book.findByPk(bookId);

    if (!book || book.stock <= 0) {
      return res.status(400).json({
        message: "Book not available"
      });
    }

    // Kurangi stok
    book.stock -= 1;
    await book.save();

    // Simpan log + lokasi
    const log = await BorrowLog.create({
      userId,
      bookId,
      latitude,
      longitude
    });

    res.json({
      message: "Book borrowed successfully",
      data: log
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
