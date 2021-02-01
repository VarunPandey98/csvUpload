var mongoose = require('mongoose');

var csvFiles = new mongoose.Schema({
    name: {
        type: String
    },
    created_date:{
        type: Date,
        default:Date.now
    },
    updated_date:{
        type: Date,
        default:Date.now
    },
    status:{
        type: String,
        default:'ACTIVE'
    },
    is_deleted:{
        type: String,
        default:"NO"
    }
});

module.exports = mongoose.model('files', csvFiles);  