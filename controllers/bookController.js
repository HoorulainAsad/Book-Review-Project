const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
};

// Get book by ISBN
exports.getBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving the book', error: err });
  }
};

// Get books by author (case-insensitive)
exports.getBooksByAuthor = async (req, res) => {
  const { author } = req.params;
  try {
    const books = await Book.find({ author: { $regex: author, $options: 'i' } });
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found by this author' });
    }
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
};

// Get books by title (case-insensitive)
exports.getBooksByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const books = await Book.find({ title: { $regex: title, $options: 'i' } });
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
};
