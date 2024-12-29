const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:isbn', reviewController.getReviewsByISBN);
router.post('/:isbn', reviewController.addOrModifyReview);
router.delete('/:isbn', reviewController.deleteReview);

module.exports = router;
