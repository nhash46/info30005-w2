const expressValidator = require('express-validator/check');
const {check} = require('express-validator/check');

exports.addUser = 
[   
    // validates that fields arent left empty
    check('username').isLength({min:1}).trim().withMessage('Username required'),
    check('password').isLength({min:6}).trim().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").
    withMessage('Password should be combination of one uppercase , ' +
        'one lower case, one special char, one digit and min 8 , max 20 char long'),
    // validates password are matching
    check('password2').custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // throw error if passwords do not match
            throw new Error("Passwords do not match");
        } else {
            return value;
        }
    }),
    check('first_name').isLength({min:1}).trim().withMessage('First name is required'),
    check('last_name').isLength({min:1}).trim().withMessage('Last name is required'),
    check('email').isLength({min:1}).trim().withMessage('Email required'),
    // validates email is valid
    check('email').isEmail().trim().withMessage('Email is not valid')
];

exports.changePassword =
    [
        check('password').isLength({min:1}).trim().withMessage('Password required'),
        // validates password are matching
        check('password2').custom((value,{req, loc, path}) => {
            if (value !== req.body.password) {
                // throw error if passwords do not match
                throw new Error("Passwords do not match");
            } else {
                return value;
            }
        })
    ]