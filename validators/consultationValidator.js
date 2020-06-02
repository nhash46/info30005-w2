const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

// validates that fields arent left empty
exports.newConsultation = 
[check('date').isLength({min:1}).trim().withMessage('Date required'),
// check('date').isAfter(Date.now().toString()).withMessage('Invalid Date selected, please select a future date'),
check('time').isLength({min:1}).trim().withMessage('Time required'),
check('venue').isLength({min:1}).trim().withMessage('Venue required')];