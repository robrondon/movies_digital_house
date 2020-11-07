const {Movie} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    all: async (req,res) =>{
        try {
            const movies = await Movie.findAll();
            res.render('moviesIndex', {movies});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    detail: async (req,res) =>{
        try {
            const {id} = req.params;
            const movie = await Movie.findByPk(id);
            res.render('moviesDetail', {movie})
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    new: async (req,res) =>{
        try {
            const movies = await Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            });
            res.render('moviesNew', {movies});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
        
    },
    recommended: async (req,res) =>{
        try {
            const movies = await Movie.findAll({
                where: {
                    rating: {[Op.gte] : 8}
                }
            });
            res.render('moviesRecommended', {movies});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }

    },
    search: async (req,res) =>{
        try {
            let {search, order} = req.body
            if(order == 'titledesc' ) {
                    let movies = await Movie.findAll({
                     where: {
                        title: {[Op.like] : '%' + search + '%'}
    
                    },
                     order: [
                        ['title', 'DESC']                ]
                })
                res.render('moviesSearch', {movies});
            } else if (order == 'ratingasc'){
                    let movies = await Movie.findAll({
                        where: {
                            title: {[Op.like] : '%' + search + '%'}
        
                        },
                        order: [
                            ['rating', 'ASC']                ]
                    })
                    res.render('moviesSearch', {movies});
            }  else if(order == 'ratingdesc'){
                    let movies = await Movie.findAll({
                          where: {
                            title: {[Op.like] : '%' + search + '%'}
                                    },
                            order: [
                                        ['rating', 'DESC']                ]
                                })
                          res.render('moviesSearch', {movies});
                                    
            }  else{
                    let movies = await Movie.findAll({
                        where: {
                            title: {[Op.like] : '%' + search + '%'}
        
                        },
                        order: [
                            ['title', 'ASC']                ]
                    })
                     {res.render('moviesSearch', {movies});
            }
        }
            console.log(req.body)
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }

    }
};