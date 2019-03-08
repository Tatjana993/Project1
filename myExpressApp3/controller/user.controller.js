
const User = require('./../user/user');
var db = require('./../node_modules/datebase/userDB');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

 function create(req, res){
    console.log(req.body);
    if(req.body.first_name == undefined || req.body.last_name == undefined || req.body.username == undefined ||
        req.body.phone == undefined || req.body.email == undefined || req.body.password == undefined){
            res.send({status: 'Undefined'});
    }
    else{
    let first_name = req.body.first_name.trim(); 
    let last_name = req.body.last_name.trim();
    let username = req.body.username.trim(); 
    let phone = req.body.phone.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
 
    if(first_name == '' || last_name == '' || username == '' || phone == '' || email == '' || password == ''){
     res.send({status: 'Required'});
    }
    else{ 
 
     let user = new User(first_name, last_name, username, phone, email, password);
  
      db.addUser(user, function(data){
     console.log(data);
     res.send(data);
     });
    }
   } 
}

function getAll(req, res){
    db.getAllUsers(function(data){
        res.send(data);
      })
}

function deleteUser(req, res){
    var id = req.params.id;
    console.log('********************* '+id);
    var vel = 'status: NON'
    db.deleteUser(id, function(data){
      var conf = JSON.parse(data);
      if(conf.affectedRows === 1) vel = 'status: Deleted';
       
      res.send(JSON.stringify(data));
    })
}

function update(req, res){
    console.log(req.headers);
    let token = req.headers['authorization']; 
    console.log(token);
    let stoken = String(token);
    if( token !== undefined) {
        let sstoken = stoken.split(' ')[1];
        console.log(sstoken);
        token = sstoken;
        console.log(token);
        jwt.verify(token, 'secretKey', function(err, authData) {
            if (err) {
                res.sendStatus(403);
            } else {

    if(req.body.first_name == undefined || req.body.last_name == undefined || req.body.username == undefined ||
        req.body.phone == undefined || req.body.email == undefined || req.body.password == undefined || req.body.iduser == undefined){
            res.send({status: 'Undefined'});
    }
    else{
        let id = req.body.iduser;
        let first_name = req.body.first_name.trim();
        let last_name = req.body.last_name.trim();
        let username = req.body.username.trim();
        let phone = req.body.phone.trim();
        let email = req.body.email.trim();
        let password = req.body.password.trim();

        if(first_name == '' || last_name == '' || username == '' || phone == '' || email == '' || password == ''){
            res.send({status: 'Required'});
        }
        else{
            let user = new User(first_name, last_name, username, phone, email, password);
            user.id = id;
            var vel = 'User is not Updated';
            db.updateUser(user, function(data){
                //let conf =  JSON.parse(data);
                if(data.changedRows === 1) vel = 'User is Updated';
                res.send(JSON.stringify(vel));
            })
        }
    }
    }
    })
}
}

function login(req, res){
    console.log(req.headers);
    if(req.body.username == undefined || req.body.password == undefined){
        res.send({status : 'Undefined'});
    }
    else{
        let username = req.body.username.trim();
        let password = req.body.password.trim();
        if(username == '' || password == ''){
            res.send({status : 'Required'});
        }
        else{
            let user = new User('', '', username, '', '', password);
            db.loginUser(user, function(data){
                console.log("da li je ADMIN " + user.role);
                console.log(data.email);
                if(data.iduser !== undefined){
                    var token = jwt.sign({userID: data.iduser}, 'secretKey', {expiresIn: '2h'});
                    console.log(token);
                    var obj = {status: token, iduser: user.iduser, username: user.username, role: user.role};
                    console.log(obj);
                    res.send({obj});
                    
                } else { console.log('error login'); res.send({error: 'Invalid login'})}
                
            })
        }
    }
}

function getUser(req, res) {
    console.log("USAO je u fju getUSer");
    console.log(req.headers);
    let token = req.headers['authorization']; 
    console.log(token);
    let stoken = String(token);
    let id = req.params.id;
    if( token !== undefined) {
        console.log('8888888888888888888888888888 ' + stoken.split(' ')[1]);
        let sstoken = stoken.split(' ')[1];
        console.log(sstoken);
        token = sstoken;
        console.log(token);
        jwt.verify(token, 'secretKey', function(err, authData) {
            if (err) {
                res.sendStatus(403);
            } else {
                db.getUser(id, function(data){
                    let u = JSON.stringify(data);
                   
                    res.send(data);
            
        })
    }
    })
   
    } else{
    res.send({status: 'Token is undefined'});
    }
}

function verifyToken(req) {

}

module.exports = {
    create, 
    getAll,
    deleteUser,
    update,
    login,
    getUser
}