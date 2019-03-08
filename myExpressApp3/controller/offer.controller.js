var db = require('./../node_modules/datebase/offerDB');
const Restaurant = require('./../models/restaurant/restaurant');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

function getOffer(req, res){
    let id = req.params.id;
    db.getOffersWhereIdrestaurant(id, function(data){
        res.send(data);
    })
}

function createOrder(req, res) {
    console.log(req.headers['authorization']);
    console.log(req.body.selectedOfferList);
    if(req.body.selectedOfferList === undefined || req.body.selectedOfferList[0] === undefined || req.body.selectedOfferList[0].idoffer === undefined || req.body.selectedOfferList[0].iduser === undefined ||
        req.body.selectedOfferList[0].amount === undefined || req.body.selectedOfferList[0].sidedishes === undefined || req.body.selectedOfferList[0].instruction === undefined ||
        req.body.address === undefined) {
             res.send({status: 'List is undefined'}); 
    }
    else {
      /*  console.log(req.body.selectedOfferList[0].idoffer);
        console.log(req.body.selectedOfferList[0].iduser);
        console.log(req.body.selectedOfferList[0].amount);
        console.log(req.body.selectedOfferList[0].sidedishes);
        console.log(req.body.selectedOfferList[0].instruction);
        console.log(req.body.address); */
    if(req.body.selectedOfferList[0].idoffer === '' || req.body.selectedOfferList[0].idoffer === 0 || req.body.selectedOfferList[0].iduser === '' || req.body.selectedOfferList[0].iduser === 0 ||
        req.body.selectedOfferList[0].amount === '' || req.body.selectedOfferList[0].amount === 0 || req.body.selectedOfferList[0].sidedishes === '' || req.body.selectedOfferList[0].sidedishes === [] || req.body.selectedOfferList[0].instruction === '' ||
        req.body.address === '') {
            res.send({status: 'List is empty'});   
    }
    else {
    let token = req.headers['authorization'];
    if( token !== undefined) {
    let stoken = String(token);
    let order =  req.body.selectedOfferList;
    let array = order[0].sidedishes;
    let address = req.body.address;
    console.log(order);
    console.log(array);
        console.log('defined');
        let sstoken = stoken.split(' ')[1];
        console.log(sstoken);
        token = sstoken;
        console.log(token);
        jwt.verify(token, 'secretKey', function(err, authData) {
            if (err) {
                res.sendStatus(403);
            } else {
                db.createOrder(order, address, function(data){
                    console.log(data);
                    console.log('===========================================');
                    res.send({status: 'ok'});
                })
    }
    })
   
    } else {
        res.send({status: 'token undefined'});
    }
}
}
}

function getOfferWhereId(req, res) {
    let id = req.params.id;
    console.log('id', id);
    db.getOffersWhereId(id, function(data){
        res.send(data);
    })
}

function getSideDishes(req, res) {
    console.log('bla bla get sidedish.......');
    db.getSideDishes(function(data) {
        res.send(data);
    })
}

function getBla(req, res) {
    console.log('bla vla vla aaaaaa');
    res.send('blaa');
}

function getOffersWhereUserId(req, res) {
    let id = req.params.id;
   /* window.localStorage.setItem('idUser', id);
    window.localStorage.getItem('idUser'); */
   // console.log(id);
    db.getOffersWhereUserId(id, function(data){
        res.send(data);
    })
}

function getOffersWhereUserIdOrderId(req, res) {
    let id = req.params.id;
    db.getOffersWhereUserIdOrderId(id, function(data){
        res.send(data);
    })


}

function getJSONList(req, res) {
    let id = req.params.id;
    db.createJsonList(id, function(data){
        res.send(data);
    })
}

function getSelectedSidedishes(req, res) {
    let id = req.params.id;
    db.getSelectedSidedishes(id, function(data){
        res.send(data);
    })
}

function novaFunkcija(req, res) {
    let id = req.params.id;
    db.novaFunkcija(id, function(data){
        res.send(data);
    })
}


module.exports = {
    getOffer,
    createOrder,
    getOfferWhereId,
    getSideDishes,
    getOffersWhereUserId,
    getOffersWhereUserIdOrderId,
    getJSONList,
    getSelectedSidedishes,
    novaFunkcija,
    getBla,
}