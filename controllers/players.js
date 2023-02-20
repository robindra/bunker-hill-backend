const Players = require('../models/Players');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc GET all players list  
 * @route GET /api/v1/players
 * @access Public 
 */
exports.getPlayers = async (req, res, next) => {
    try {
        const player = await Players.find().populate('team', ['name']).populate('category', ['title']);
        res.status(200).json({
            status: true, 
            data: player,
            total: player.length
        })
    } catch (error) {
        next(new ErrorResponse(`Failed to fetch data reason: ${error.message}`, 404))
    }
}


/**
 *  @desc GET single player
 *  @route GET /api/v1/players/:id
 *  @access Public 
 */
exports.getPlayer = async (req, res, next) => {
    try {
        const players = await Players.findById(req.params.id).populate('team', ['name']).populate('category', ['title']);
        console.log('players', players)
        if (!players.name) {
            next(new ErrorResponse(`No player found with player id: ${req.params.id}`, 404))
        } else {
            res.status(200).json({
                status: true, 
                data: players,
                total: players.length
            })
        }
        
    } catch (error) {
        next(new ErrorResponse(`No player found Reason: ${error.message}`, 404))
    }
}

exports.addPlayer = async (req, res, next) => {
    try {
        const payLoad = req.body;
        console.log(payLoad)
        const player = await Players.create(payLoad);  
        res.status(200).json({
            status: true, 
            data: player
        })
    } catch (error) {
        next(new ErrorResponse(`Failed to add new player reason: ${error.message}`, 404))
    }
}



