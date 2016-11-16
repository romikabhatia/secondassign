/**
 * Created by ruhi on 2016-11-16.
 */
var mongoose = require('mongoose');
    // defina a schema for the dress model
var dressSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: 'please enter the dress name'
    },
    dressType: {
        type: String,
        required: 'please choose the dress type'
    },
    size: {
        type: Number,
        required: 'please enter the correct size'
    }
});
    // make the class public
    module.exports =  mongoose.model('dress', drinkSchema);

