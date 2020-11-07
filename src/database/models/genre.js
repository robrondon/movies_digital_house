const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('Genre',{
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        ranking: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        active: { 
            type: DataTypes.BOOLEAN
        }
    },{
        indexes: [
            {
                unique: true,
                fields: ['ranking']
            }
        ]
    })
    return genre;
}