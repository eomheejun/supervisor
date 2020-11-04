const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SiteSchema = new Schema({

    name: {
        type: String,
        required: true 
    },
    information: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    configtype: {
        type: String,
        required: true
    },
    term: [
        {
            project_term1: {
                type: String,
                required: true
            },
            project_term2: {
                type: String,
                required: true
            },
            install_day: {
                type: String,
                required: true
            },
            test_term1: {
                type: String,
                required: true
            },
            test_term2: {
                type: String,
                required: true
            },
            open_day: {
                type: String,
                required: true
            },
    
        }
    ]
});

module.exports = Site = mongoose.model('site', SiteSchema);