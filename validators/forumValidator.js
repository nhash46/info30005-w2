const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

exports.addForum = 
[check('title').isLength({min:1}).trim().withMessage('Title required'),
check('body').isLength({min:1}).trim().withMessage('Body required')];