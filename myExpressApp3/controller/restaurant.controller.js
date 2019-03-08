var db = require('./../node_modules/datebase/restaurantDB');
const Restaurant = require('./../models/restaurant/restaurant');

function getAll(req, res){
    db.getAllRestaurants(function(data){
        /* console.log(data);*/
         res.send(data);
        });
}

function create(req, res){
    if(req.body.name == undefined || req.body.address == undefined || req.body.phone == undefined || req.body.email == undefined){
        res.send("status: 'Undefined'");
    }
    else{
        let name = req.body.name.trim();
        let address = req.body.address.trim();
        let phone = req.body.phone.trim();
        let email = req.body.email.trim();
        if(name == '' || address == '' || phone == '' || email == ''){
            res.send("status: 'Required'");
        }
        else{
        let date = new Date();
        console.log("date date date "+ date.getFullYear()+"  "+date.getMonth()+"   "+date.getDate());
        let monthMysql = date.getMonth() + 1;
        if(monthMysql.length == 1){
            monthMysql = "0" + monthMysql; 
        }
        let dayMysql = date.getDate();
        if(dayMysql.length == 1){
            dayMysql = "0" + dayMysql;
        }
        let dateMysql = date.getFullYear()+"-"+monthMysql+"-"+dayMysql;
        let restaurant = new Restaurant(name, address, phone, email, dateMysql);
        db.createRestaurant(restaurant, function(date){
            //let st = date.insertId;
            res.send(date);
        })
        }
    }
}

function deleteRestaurant(req, res){
    if(req.body.id == undefined){
        res.send("status : 'Undefined'");
    }
    else{
        let id = req.body.id.trim();
        db.deleteRestaurant(id, function(date){
            res.send(date);
        })  
    } 
}

function update(req, res){
    if(req.body.name == undefined || req.body.address == undefined || req.body.phone == undefined || req.body.email == undefined){
        res.send("status: 'Undefined'");
    }
    else{
        let name = req.body.name.trim();
        let address = req.body.address.trim();
        let phone = req.body.phone.trim();
        let email = req.body.email.trim();
        let created = req.body.created.trim();
        if(name == '' || address == '' || phone == '' || email == ''){
            res.send("status: 'Required'");
        }
        else{
            let restaurant = new Restaurant(name, address, phone, email, created);
            restaurant.id = req.body.id;
            db.updateRestaurant(restaurant, function(date){
                res.send(date);
            })
        }
    }
}

function getRestaurant(req, res) {
    let id = req.params.id;
    db.getRestaurant(id, function(data){
        res.send(data);
    })
}


module.exports = {
    getAll,
    create,
    deleteRestaurant,
    update,
    getRestaurant,
}