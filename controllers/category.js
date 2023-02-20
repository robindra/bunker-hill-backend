const ErrorResponse = require('../utils/errorResponse');
const Category = require('../models/Category');
const Team = require('../models/Team');

/**
 * @desc GET team categories 
 * @route GET /api/v1/category
 * @access Public 
 */
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories,
            total: categories.length
        });
    } catch (error) {
        next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
    }    
}

/**
 * @desc GET single category
 * @route GET /api/v1/category/:id
 * @access Public 
 */
 exports.getCategory = async(req, res, next) => {
     try {
        const categoryId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Category id is missing`, 404))
        }
         const category = await Category.findById(categoryId);
         if (category) {
             const teams = await Team.find({ category: req.params.id });
             category.teams = teams;
         }
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
    }
}

/**
 * @desc Create new Category
 * @route POST /api/v1/category
 * @access Private 
 */
exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json({
            success: true,
            data: category
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
exports.updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Category id is missing`, 404))
        }
        const payLoad = req.body;
        const category = await Category.findByIdAndUpdate(categoryId, payLoad, {new: true, runValidators: true});
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.log(error.message)
        next(new ErrorResponse(`Failed to update category with id of ${req.params.id} Reason: ${error.message}`, 404))
    }    
}

/**
 * @desc Delete Category 
 * @route Delete /api/v1/category/:id
 * @access Private 
 */
 exports.deleteCategory = async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        if (!req.params.id) {
            next(new ErrorResponse(`Category id is missing`, 404))
        }        
        const category = await Category.findById(categoryId);
        if (!category) {
            next(new ErrorResponse(`Canot find category with cateogry id ${req.params.id}`), 404);
        }
        category.remove();
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.log(error.message)
        next(new ErrorResponse(`Failed to update category with id of ${req.params.id} Reason: ${error.message}`, 404))
    }    
}



