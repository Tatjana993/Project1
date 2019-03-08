module.exports = function(app){

    var restaurants = require('./../controller/restaurant.controller');

    app.post('/restaurants/restaurant', restaurants.create);

    app.get('/restaurants/restaurants', restaurants.getAll);

    app.delete('/restaurants/restaurant', restaurants.deleteRestaurant);

    app.put('/restaurants/restaurant', restaurants.update);

    app.options('/restaurants/restaurants', restaurants.getAll);

    app.get('/restaurants/restaurant/:id', restaurants.getRestaurant);

}