module.exports = function(app){

    var users = require('./../controller/user.controller');

    app.post('/users/user', users.create);

    app.get('/users/users', users.getAll);

    app.delete('/users/user/:id', users.deleteUser);

    app.put('/users/user', users.update);

    app.post('/users/login', users.login);

    app.get('/users/user/:id', users.getUser);

    app.options('/users/user', users.create);

    app.options('/users/user/:id', users.getUser);

    app.options('/users/login', users.login);

    app.options('/users/users', users.getAll);


    function verifyToken(req, res, next) {
        console.log('usa u autorizacijuuuuuu');
       // console.log(req.params.token);
       // const bearerHeader = req.query.token;
       /* if(typeof bearerHeader !== 'undefined') {
            
            req.token = bearerHeader;
            next();
            
        } */
        if (1 === 1){
            next();
        }
        else{
            res.sendStatus(403);
        }
    }
}