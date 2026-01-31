const Book = require("../models/Book");

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/books (admin)
exports.createBook = async (req, res) => {
  const { title, author, stock } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required"
    });
  }

  try {
    const book = await Book.create({ title, author, stock });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/books/:id (admin)
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/books/:id (admin)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
