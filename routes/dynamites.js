var express = require('express');
var router = express.Router();


var Dynamite = require('../models/dynamite');


router.get('/', function(req, res, next) {


    Dynamite.find(function(err, dynamites) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'not add dress'});
        }
        else {

            res.render('dynamites', {
                title: 'Dress',
                dynamites: dynamites
            });
        }
    });
});
//get
router.get('/add',function (req,res,next) {
    //load
    res.render('add-dynamite',
        {
            title:'New Dress'
        });
});

//post
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
router.get('/delete/:id', function(req,res,next){
    var_id = req.params._id;

    // use mongoose
    Dynamite.remove( {_id: _id }, function(err){
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/dynamites');
    });
});

module.exports = router;
