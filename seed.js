const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book'); // Adjust path if necessary

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Seed data
const books = [
  { title: 'The Kite Runner', author: 'Khaled hosseini', isbn: '12345', description: 'A great book about...', price: 20 },
  { title: 'The Setting Sun', author: 'Osamu Dazai', isbn: '67890', description: 'Another great book about...', price: 25 },
  { title: 'No Longer Human', author: 'Osamu Dazai', isbn: '11223', description: 'A sequel to Book One...', price: 30 },
  { title: 'The Metamorphosis', author: 'Franz Kafka', isbn: '11227', description: 'A sequel to Book One...', price: 30 },
  { title: 'Hemlet', author: 'William Shakespear', isbn: '11224', description: 'A sequel to Book One...', price: 30 },
  { title: 'The Book Theif ', author: 'Markus Zusak', isbn: '11222', description: 'A sequel to Book One...', price: 30 }
];

// Insert seed data
const seedBooks = async () => {
  try {
    await Book.deleteMany(); // Clear existing data
    console.log('Old books cleared.');

    const insertedBooks = await Book.insertMany(books);
    console.log('Seed data inserted:', insertedBooks);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting seed data:', err);
    mongoose.connection.close();
  }
};

seedBooks();
