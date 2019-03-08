var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var test1 = require('./../node_modules/datebase/testCallback');


router.get("/", function(req, res, next){

    test1.testBack(function(data){
     res.send(data);
    });
     
  
  })
  
  router.get('/call', function(req, res, next){
  
    test.testBack(function(data){
      console.log(data);
      res.send(data);
    });
  
  })

  module.exports = router;