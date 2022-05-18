var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/' , (req,res,next) => {
  var traineeSQL = 'SELECT * FROM  lunch.trainees'
  conn.query(traineeSQL , (err,rows) => {
    if (err) throw err

    res.render('trainees/index', {title : 'Lunxh Boxh - Trainee Page' , data:rows});
  })
  
})

module.exports = router