var express = require('express');
var router = express.Router();

router.get('/' , (req,res,next) =>{
    res.render('index', {title : 'Lunxh Boxh - Home Page'});
})

module.exports = router