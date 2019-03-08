const db = require('./sequelize');
const user = db.users;


exports.findAll = (req, res) => {
    user.findAll().then(users => {
        res.send(users);
    })
}