const express = require('express');
const { protect } = require('../middleware/auth');
const {
    getAllMatch,
    getMatch,
    addNewMatch,
    updateMatch
} = require('../controllers/match');

const router = express.Router();

router
    .route('/')
    .get(getAllMatch)
    .post(protect, addNewMatch);


router
    .route('/:id')
    .get(protect, getMatch)
    .put(protect, updateMatch);

module.exports = router;
    