const {sequelize, DataTypes} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        title: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL.UNSIGNED,
            allowNull: false
        },
        awards: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        release_date: {
                type: DataTypes.DATEONLY,                  
                get() {
                    return moment(this.getDataValue('release_date')).add(3, 'hours').format('YYYY-MM-DD');
                },
            allowNull:false
        },
        length: DataTypes.INTEGER.UNSIGNED,
        genre_id: DataTypes.INTEGER.UNSIGNED,
        // images: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    })

    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie'
        });
    })
    return Movie;
}