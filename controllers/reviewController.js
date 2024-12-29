const Review = require('../models/Review');

exports.getReviewsByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const reviews = await Review.find({ bookIsbn: isbn }).populate('userId', 'username');
    if (reviews.length === 0) {
      return res.status(404).json({ message: `No reviews found for ISBN: ${isbn}` });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err });
  }
};

exports.addOrModifyReview = async (req, res) => {
  const { isbn } = req.params;
  const { userId, comment, rating } = req.body;

  try {
    let review = await Review.findOne({ bookIsbn: isbn, userId });
    if (review) {
      review.comment = comment;
      review.rating = rating;
      await review.save();
      return res.status(200).json({ message: 'Review updated successfully', review });
    }

    review = new Review({ bookIsbn: isbn, userId, comment, rating });
    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error saving review', error: err });
  }
};

exports.deleteReview = async (req, res) => {
  const { isbn } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findOneAndDelete({ bookIsbn: isbn, userId });
    if (!review) {
      return res.status(404).json({ message: `No review found for ISBN: ${isbn} by the user` });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err });
  }
};
