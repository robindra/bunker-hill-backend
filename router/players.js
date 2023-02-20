const express = require('express');
const {
    getPlayer,
    getPlayers,
    addPlayer
} = require('../controllers/players');

const router = express.Router();

router
    .route("/")
    .get(getPlayers)
    .post(addPlayer);

router
    .route('/:id')
    .get(getPlayer);


module.exports = router;