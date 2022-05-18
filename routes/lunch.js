var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/' , (req,res,next) => {
  var lunchSQL = 'SELECT  ln.trainee_id , ln.id , tr.f_nm , tr.l_nm , tr.cohort ,  ml.opt_nm , mc.cat_nm , ln.date FROM  lunch.trainees tr, lunch.meal_options ml , lunch.meal_categories mc, lunch.lunches ln WHERE ln.trainee_id = tr.id AND ln.meal_opt_id = ml.id AND ml.meal_cat_id = mc.id'
  conn.query(lunchSQL , (err,rows) => {
    if (err) throw err

    res.render('lunch/index', {title : 'Lunxh Boxh - Lunch Page' , data:rows});
  })
  
})

router.get('/show/:id' , (req,res,next) => {
  var lunchSQL = 'SELECT ln.trainee_id , ln.id , tr.f_nm , tr.l_nm , tr.cohort ,  ml.opt_nm , mc.cat_nm , ln.date FROM  lunch.trainees tr, lunch.meal_options ml , lunch.meal_categories mc, lunch.lunches ln WHERE ln.trainee_id = tr.id AND ln.meal_opt_id = ml.id AND ml.meal_cat_id = mc.id AND ln.trainee_id = ' + req.params.id
  conn.query(lunchSQL , (err,rows) => {
    if (err) throw err

    res.render('lunch/index', {title : 'Lunxh Boxh - Lunch Page' , data:rows});
  })
  
})

router.get('/edit/:id' , (req,res,next) => {
  var lunchSQL = 'SELECT ln.trainee_id, ln.id , tr.f_nm , tr.l_nm , tr.cohort ,  ml.opt_nm , mc.cat_nm , ln.date FROM  lunch.trainees tr, lunch.meal_options ml , lunch.meal_categories mc, lunch.lunches ln WHERE ln.trainee_id = tr.id AND ln.meal_opt_id = ml.id AND ml.meal_cat_id = mc.id AND ln.id = ' + req.params.id
  conn.query(lunchSQL , (err,rows) => {
    if (err) throw err

    res.render('lunch/lunch-edit', {title : 'Lunxh Boxh - Lunch Page' , data:rows[0]});
  })
  
})

router.post('/update', function(req, res, next) {
  let sqlQuery = "UPDATE lunches SET meal_opt_id ='" + req.body.option + 
                                      "',trainee_id ='" + req.body.traineeId + 
                                      "', date ='" + req.body.date + 
                                      "' WHERE id = " + req.body.lunchId;

  

  conn.query(sqlQuery, function(err,rows)   {

      if(err){
        req.flash('error', err); 
      }else{
             req.flash('success', "Sucessfully updated"); 
             res.redirect('/lunch/show/' + req.body.traineeId)
  }
          });
        
         
     });


     router.get('/delete/:id' , (req,res,next) => {
      var deleteSQL = 'DELETE FROM lunches WHERE id = ' + req.params.id
      conn.query(deleteSQL , (err,rows) => {
        if (err) throw err
        req.flash('success', "Order Successfully Deleted")
        res.redirect('/lunch');
      })
      
    })
    




module.exports = router