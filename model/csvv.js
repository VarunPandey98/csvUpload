var mongoose = require('mongoose');

var csvSchema = new mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    age: {
        type: Number
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

module.exports = mongoose.model('employeelogin', csvSchema);  