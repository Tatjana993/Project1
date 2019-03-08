const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('project1', 'root', 'tatjana077', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  const db = {};
 
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
   
  //Models/tables
  db.users = require('./models/user')(sequelize, Sequelize);
   
   
  module.exports = db;