const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

// validates that fields arent left empty
exports.newConsultation = 
[check('date').isLength({min:1}).trim().withMessage('Date required'),
// dates in the past should not be allowed
check('date').custom((value, {req, loc, path}) => {
    if(new Date(value) <= Date.now()) {
        throw new Error ('Invalid Date selected, please select a future date');
    }
    return true;
}),
check('time').isLength({min:1}).trim().withMessage('Time required'),
check('venue').isLength({min:1}).trim().withMessage('Venue required')];

// validates whether the status of a consultation can be set to complete or not
exports.markAsComplete = 
[check('date').custom((value, {req, loc, path}) => {
    if(new Date(value) > Date.now()) {
        throw new Error ('Error: the schedhuled appointment has not yet occurred.');
    }
    return true;
})];