const {Movie, Genre, Actor} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    detail: async (req,res) => {
        try {
            const {id} = req.params;   
            const genre = await Genre.findByPk(id, {include: ['Movie']});
            const movies = await Movie.findAll();
            res.render('genreDetail', {genre, movies});
        } catch (error) {
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    }
};