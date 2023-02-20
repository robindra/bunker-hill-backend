const ErrorResponse = require('../utils/errorResponse');
const Category = require('../models/Category');
const Team = require('../models/Team');
const Players = require('../models/Players');

/**
 * @desc GET team details 
 * @route GET /api/v1/team
 * @access Public 
 */
exports.getTeams = async (req, res, next) => {
    try {
        const team = await Team.find().populate('category', ['title']);
        
        res.status(200).json({
            success: true,
            data: team,
            total: team.length
        });
    } catch (error) {
        next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
    }    
}

exports.getAllTeamByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const team = await Team.find({ category: categoryId }).populate('category', ['title']);        
        res.status(200).json({
            success: true,
            data: team,
            total: team.length
        });
    } catch (error) {
        
    }
}

/**
 * @desc GET single category
 * @route GET /api/v1/team/:id
 * @access Public 
 */
 exports.getTeam = async(req, res, next) => {
     try {
        const teamId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Team id is missing`, 404))
        }
         let results; 
        const team = await Team.findById(teamId).populate('category', ['title', 'description']);
        if (team) {
            const players = await Players.find({ team: req.params.id });            
            results = { ...team._doc }
            results.players = players
         }
        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404))
    }
}

/**
 * @desc Create new team
 * @route POST /api/v1/team
 * @access Private 
 */
exports.addTeam = async (req, res, next) => {
    try {
        const team = await Team.create(req.body);
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        next(new ErrorResponse(`Failed to create new category`, 404))
    }    
}

/**
 * @desc Update Category 
 * @route PUT /api/v1/category/:id
 * @access Private 
 */
exports.updateTeam = async (req, res, next) => {
    try {
        const teamId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Category id is missing`, 404))
        }
        const payLoad = req.body;
        const team = await Team.findByIdAndUpdate(teamId, payLoad, {new: true, runValidators: true});
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        console.log(error.message)
        next(new ErrorResponse(`Failed to update team with id of ${req.params.id} Reason: ${error.message}`, 404))
    }    
}

/**
 * @desc Delete team 
 * @route Delete /api/v1/category/:id
 * @access Private 
 */
 exports.deleteTeam = async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Category id is missing`, 404))
        }        
        const team = await Team.findById(categoryId);
        if (!team) {
            next(new ErrorResponse(`Canot find team with cateogry id ${req.params.id}`), 404);
        }
        team.remove();
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        next(new ErrorResponse(`Failed to update team with id of ${req.params.id} Reason: ${error.message}`, 404))
    }    
}



