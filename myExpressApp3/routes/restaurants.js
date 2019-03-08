var express = require('express');
var router = express.Router();
var db = require('./../node_modules/datebase/restaurantDB');

router.get("/promise", ( req,res, next)=>{
    db.testPromise()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err) 
    })
})


router.get("/", function(req, res, next){

  /* var s = db.sendSome();
   console.log(s);
   */
     db.getAllRestaurants(function(data){
   /* console.log(data);*/
    res.send(data);
   });
   

})

router.get("/offers", function(req, res, next){

    db.getOffersWhereIdrestaurant(function(data){
       
        res.send(data);
    })

})

module.exports = router;