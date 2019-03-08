module.exports = function(app) {

    var offers = require('./../controller/offer.controller');

    app.get('/restaurants/offer/:id', offers.getOffer);

    app.options('/restaurants/offer/:id', offers.getOffer);

    app.post('/restaurants/offer/order', offers.createOrder);

    app.options('/restaurants/offer/order', offers.createOrder);

    app.get('/restaurants/offerwithid/:id', offers.getOfferWhereId);

    app.options('/restaurants/offerwithid/:id', offers.getOfferWhereId);    

    app.get('/restaurants/sidedish', offers.getSideDishes);

    app.options('/restaurants/sidedish', offers.getSideDishes);

    app.get('/restaurants/offer/bla', offers.getBla);

    app.options('/restaurants/offer/bla', offers.getBla);

    app.get('/restaurants/offerwhereuser/:id', offers.getJSONList);

    app.get('/restaurants/orderswhereuser/:id', offers.getJSONList);

    app.get('/restaurants/jsondata/:id', offers.getJSONList);

    app.get('/restaurants/selectedsidedishes/:id', offers.getSelectedSidedishes);

    app.get('/restaurants/nova/:id', offers.novaFunkcija);
}