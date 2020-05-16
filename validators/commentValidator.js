const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

exports.addComment = 
[check('content').isLength({min:1}).trim().withMessage('Cannot leave comment empty')];