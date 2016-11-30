var express = require('express');
var router = express.Router();


var Dynamite = require('../models/dynamite');
// authentication check
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}



// get handler for dynamites
router.get('/', isLoggedIn, function(req, res, next) {


    Dynamite.find(function(err, dynamites) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'not add dress'});
        }
        else {

            res.render('dynamites', {
                title: 'Dress',
                dynamites: dynamites,
                user: req.user
            });
        }
    });
});
//get dynamites add function
router.get('/add',isLoggedIn,function (req,res,next) {
    //load
    res.render('add-dynamite',
        {
            title:'New Dress',
            user: req.user
        });
});

//post dynamites add function
router.post('/add',function (req,res,next) {
Dynamite.create({
    dressName:req.body.dressName,
    type: req.body.type,
    size: req.body.size,
    price: req.body.price
},function (error,Dynamite) {
        if (err)
        {
            console.log(err);
            res.render('error');
        }
        else
        {
            res.redirect('/dynamites');
        }
    });
});

// delete
router.get('/delete/:id',isLoggedIn, function(req,res,next){
    var_id = req.params._id;

    // use mongoose to remove the dynamite
    Dynamite.remove( {_id: _id }, function(err){
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/dynamites');
    });
});

// edit form
router.get('/:_id', function(req,res,next){
    var_id = req.params._id;

    Dynamite.findById(_id, function(err, dynamite){
        if (error){
            console.log(err);
            res.render('error', {message: 'dynamite not found'});
        }
        else{
            // edit form load
            res.render('edit-dynamite',{
                title: 'Edit Dynamite',
                dynamite: dynamite
            });
        }
    });
});
// save
router.post('/:_id', function(req,res,next) {
    var_id = req.params._id;

    var dynamite = new Dynamite({
        _id: _id,
        dressName: req.body.dressName,
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,

    });

    // updates save
    Dynamite.update({_id: _id}, dynamite, function (err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'not update dynamite'});
        }
        else {
            res.redirect('/dynamites');
        }
    });
});

module.exports = router;
