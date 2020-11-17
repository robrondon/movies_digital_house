const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre',{
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        ranking: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        active: { 
            type: DataTypes.INTEGER
        }
    },{
        indexes: [
            {
                unique: true,
                fields: ['ranking']
            }
        ]
    })
    Genre.associate = (models => {
        Genre.hasMany(models.Movie,{
            as: 'Movie'
        })
    })
    return Genre;
}