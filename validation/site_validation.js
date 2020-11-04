const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};
    
    data.name = !isEmpty(data.name) ? data.name : '';
    data.information = !isEmpty(data.information) ? data.information : '';
    data.manager = !isEmpty(data.manager) ? data.manager : '';
    data.channel = !isEmpty(data.channel) ? data.channel : '';
    data.configtype = !isEmpty(data.configtype) ? data.configtype : '';
    data.project_term = !isEmpty(data.project_term) ? data.project_term : '';
    data.install_day = !isEmpty(data.install_day) ? data.install_day : '';
    data.test_term = !isEmpty(data.test_term) ? data.test_term : '';
    data.open_day = !isEmpty(data.open_day) ? data.open_day : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (Validator.isEmpty(data.information)) {
        errors.information = 'information field is required';
    }

    if (Validator.isEmpty(data.manager)) {
        errors.manager = 'manager field is required';
    }

    if (Validator.isEmpty(data.channel)) {
        errors.channel = 'channel field is required';
    }

    if (Validator.isEmpty(data.configtype)) {
        errors.configtype = 'configtype field is required';
    }

    if (Validator.isEmpty(data.project_term1)) {
        errors.project_term = 'project_term field is required';
    }
    if (Validator.isEmpty(data.project_term2)) {
        errors.project_term = 'project_term field is required';
    }
    if (Validator.isEmpty(data.install_day)) {
        errors.install_day = 'install_day field is required';
    }
    if (Validator.isEmpty(data.test_term1)) {
        errors.test_term = 'test_term field is required';
    }
    if (Validator.isEmpty(data.test_term2)) {
        errors.test_term = 'test_term field is required';
    }
    if (Validator.isEmpty(data.open_day)) {
        errors.open_day = 'open_day field is required';
    }


    return {
        errors,
        isValid : isEmpty(errors)
    };
    
}