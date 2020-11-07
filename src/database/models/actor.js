const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const actor = sequelize.define('Actor',{
        first_name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: { 
            type: DataTypes.STRING,
            allowNull: false
        },  
        rating: { 
            type: DataTypes.DECIMAL
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    })
    return actor;
}