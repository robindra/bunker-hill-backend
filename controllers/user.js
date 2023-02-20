const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/Users');


// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  public
exports.register = async (req, res, next) => {
    const { email, password} = req.body;

    //create user
    const user = await User.create({        
        email,
        password
    });

    //create token 
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token: token,
        data:  user
    });
};


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  public
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    //validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //check for user 
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }


    //check if password matches 
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
};


// get token from model, create cookie and send response 
const sendTokenResponse = (user, statusCode, res) => {
    //create token 
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token: token
        });
}


// @desc    Get current logged in user
// @route   POST /api/v1/auth/login
// @access  Private
exports.getMe = async (req, res, next) => {
    console.log('req.user', req)
    const user = await User.findById(req.user.id);
    console.log(user)
    res.status(200).json({
        success: true, 
        data: user
    })
};
