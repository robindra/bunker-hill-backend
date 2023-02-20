const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const { protect } = require('../middleware/auth');
const Category = require('../models/Category');

const router = express.Router();

router
    .route('/')
    .get(getCategories)
    .post(protect, createCategory);

router
    .route('/:id')
    .get(getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;