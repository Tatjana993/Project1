var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get("/", function(req, res, next){

  /*fs.readFile(path.join(__dirname, 'user.html'), {encoding: 'utf-8'}, function (err, data) {
    if (err) throw err;
    console.log(data);
  });*/

   /* fs.writeFile(path.join(__dirname, 'message.txt'), 'Hello World!', function (err) {
if (err) throw err;
console.log('Writing is done.');
});*/

/*fs.createReadStream(path.join(__dirname, 'user.html')).pipe(process.stdout);*/

   
  
res.sendFile(__dirname + "/" + "index.html");
   

})



router.post("/", function(req, res, next){
  res.send("Hello post request");
})

var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  port: "3300",
  user: "root",
  password: "tatjana077",
  database: "student"

});





router.get("/test", function(req, res, next){
 
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("SELECT * FROM osoba", function (err, result, fields) {
      if (err) throw err;
      var v1 = result;
      var jsonFromSql = JSON.stringify(v1);
      connection.release();
      console.log(jsonFromSql);  // result je array
      res.send(jsonFromSql);
    });
  });
    
})
module.exports = router;
