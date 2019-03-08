module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        username: {
            type: sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        }
    })
}