const Match = require('../models/Match');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc GET all match details 
 * @route GET /api/v1/match
 * @access Public 
 */
exports.getAllMatch = async (req, res, next) => {
    try {
        const matches = await Match.find().populate('teams.team1', ['name']).populate('teams.team2', ['name']);
        res.status(200).json({
            status: true, 
            data: matches,
            total: matches.length
        })
    } catch (error) {
        next(new ErrorResponse(`No Record found, Reason: ${error.name}`, 404))
    }
};

/**
 * @desc GET single match details 
 * @route GET /api/v1/match/:id
 * @access Public 
 */
 exports.getMatch = async (req, res, next) => {
    try {
        const matches = await Match.findById(req.params.id).populate('teams.team1', ['name']).populate('teams.team2', ['name']);
        res.status(200).json({
            status: true, 
            data: matches,
            total: matches.length
        })
    } catch (error) {
        next(new ErrorResponse(`No Record found, Reason: ${error.name}`, 404))
    }
};

/**
 * @desc Add match details 
 * @route POST /api/v1/match
 * @access Private 
 */
 exports.addNewMatch = async (req, res, next) => {
    try {
        const payLoad = req.body;
        const match = await Match.create(payLoad);
        res.status(200).json({
            success: true, 
            data: match
        })
    } catch (error) {
        next(new ErrorResponse(`Failed to add new match, Reason: ${error.name}`, 404))
    }
};

exports.updateMatch = async (req, res, next) => {
    try {
        const payLoad = req.body;
        const update = await Match.findByIdAndUpdate(req.params.id, payLoad);
        res.status(200).json({
            status: 'success', 
            data: update
        })
    } catch (error) {
        next(new ErrorResponse(`Failed to update match, Reason: ${error.name}`, 404))
    }
}

