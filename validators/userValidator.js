const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

exports.addUser = 
[
    check('username').isLength({min:1}).trim().withMessage('Title required'),
    check('password').isLength({min:1}).trim().withMessage('Body required'),
    check('password2').equals('password'),
    check('first_name').isLength({min:1}).trim().withMessage('First name is required'),
    check('last_name').isLength({min:1}).trim().withMessage('Last name is required'),
    check('email').isLength({min:1}).trim().withMessage('Email required'),
    check('email').isEmail('Email is not valid')
];