const express = require('express');
const {
    getConfiguration
} = require('../controllers/configs');
const router = express.Router();

router
    .route('/')
    .get(getConfiguration);

module.exports = router;