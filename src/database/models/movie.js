const {sequelize, DataTypes} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define('Movie', {
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
 //note here this is the guy that you are looking for                   
                get() {
                    return moment(this.getDataValue('release_date')).add(3, 'hours').format('DD/MM/YYYY');
                },
            allowNull:false
        },
        length: DataTypes.INTEGER.UNSIGNED,
        genre_id: DataTypes.INTEGER.UNSIGNED
    })
    return movie;
}