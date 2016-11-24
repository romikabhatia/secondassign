var mongoose = require('mongoose');


var dynamiteSchema = new mongoose.Schema({
    dressName: {
        type: String,
        required: 'Please enter the dress name'
    },
    type: {
        type: String,
        required: 'Please enter the dress type'
    },
    size: {
        type: String,
        required: 'No genre entered'
    },
    price: {
        type: Number,
        required: 'No price entered'
    }
});

// make the class definition public as "dynamite"
module.exports = mongoose.model('Dynamite', dynamiteSchema);