const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor',{
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
    Actor.associate = (models => {
    Actor.belongsToMany(models.Movie, {
        as: 'movies',
        through: 'actor_movie'
    })
    
    })
    return Actor;
};