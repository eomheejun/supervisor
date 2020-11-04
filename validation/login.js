const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};
    
    data.id = !isEmpty(data.id) ? data.id : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.id)) {
        errors.id = 'id field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
    
}