const express = require('express');

const {
    getTeam,
    getTeams,
    addTeam,
    updateTeam,
    deleteTeam,
    getAllTeamByCategory
} = require('../controllers/teams');

const router = express.Router();

router
    .route('/')
    .get(getTeams)
    .post(addTeam);

router
    .route('/:id')
    .get(getTeam)
    .put(updateTeam)
    .delete(deleteTeam);
router
    .route('/category/:id')
    .get(getAllTeamByCategory);


module.exports = router;