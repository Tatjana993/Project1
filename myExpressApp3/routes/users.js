var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('./../node_modules/datebase/userDB');
const User = require('./../user/user');



/* GET users listing. */
router.get('/', function(req, res, next) {
  
  
  res.sendFile(__dirname + "/" + "addUser.html");
});

/*router.get('/getAllUsers', function(req, res, next){
  console.log("getAll *******");
  db.getAllUsers(function(data){
    res.send(data);
  })
})*/

/*router.post('/addUser', urlencodedParser, function(req, res){

   let first_name = req.body.first_name.trim(); 
   let last_name = req.body.last_name.trim();
   let username = req.body.username.trim();
   let phone = req.body.phone.trim();
   let email = req.body.email.trim();
   let password = req.body.password.trim();

  if(first_name == '' || last_name == '' || username == '' || phone == '' || email == '' || password == ''){
    res.send("{status: 'Required'}");
  }
  else{ 

    let user = new User(first_name, last_name, username, phone, email, password);
 
     db.addUser(user, function(data){
    console.log(data);
    res.send(data);
  });
  } 
})*/

/*router.get('/deleteUser/(:id)', urlencodedParser, function(req, res){
  var id = req.params.id;
  var vel = 'status: NON'
  db.deleteUser(id, function(data){
    var conf = JSON.parse(data);
    if(conf.affectedRows === 1) vel = 'status: Deleted';
    res.send(vel);
  })

})*/


/*router.get('/updateUser/(:id)', function(req, res, next){  // put ?
  var id = req.params.id;
  var vel = 'NON';
  db.updateUser(id, function(data){
    let conf = JSON.parse(data);
    if(conf.affectedRows === 1) vel = 'User Updated';
    res.send(vel);
  });
})  

router.post('/loginUser', urlencodedParser, function(req, res){
  var username = req.body.username.trim();
  var password = req.body.password.trim();
  db.loginUser(username, password, function(data){
    console.log('***********' + data);
    if(data > 0){
      res.send('OK');
    }
    else{
      res.send('NOK');
    }
   
  })
})*/

module.exports = router;
