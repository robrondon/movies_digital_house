const {Movie, Genre, Actor} = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');

module.exports = {
    all: async (req,res) =>{
        try {
            const movies = await Movie.findAll(
                {include: ['Genre', 'actors']}
                );
            res.render('moviesIndex', {movies});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    detail: async (req,res) =>{
        try {
            const {id} = req.params;
            const movie = await Movie.findByPk(id, {include: ['Genre', 'actors']});
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('moviesDetail', {movie, genres, actors})
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
                        ['title', 'DESC']                
                    ]
                })
                res.render('moviesSearch', {movies});
            } else if (order == 'ratingasc'){
                    let movies = await Movie.findAll({
                        where: {
                            title: {[Op.like] : '%' + search + '%'}
        
                        },
                        order: [
                            ['rating', 'ASC']              
                        ]
                    })
                    res.render('moviesSearch', {movies});
            } else if(order == 'ratingdesc'){
                    let movies = await Movie.findAll({
                          where: {
                            title: {[Op.like] : '%' + search + '%'}
                                    },
                            order: [
                                        ['rating', 'DESC']     
                            ]
                                })
                          res.render('moviesSearch', {movies});          
                                    
            } else if(order == 'dateasc'){
                let movies = await Movie.findAll({
                      where: {
                        title: {[Op.like] : '%' + search + '%'}
                                },
                        order: [
                                    ['release_date', 'ASC']     
                        ]
                            })
                      res.render('moviesSearch', {movies});

            } else if(order == 'datedesc'){
                let movies = await Movie.findAll({
                      where: {
                        title: {[Op.like] : '%' + search + '%'}
                                },
                        order: [
                                    ['release_date', 'DESC']     
                        ]
                            })
                      res.render('moviesSearch', {movies});
            
            } else{
                if(search == ''){
                    res.redirect('/movies');
                } else{
                    let movies = await Movie.findAll({
                        where: {
                            title: {[Op.like] : '%' + search + '%'}
        
                        },
                        order: [
                            ['title', 'ASC']    
                        ]
                    })
                    if(movies.length == 0){
                        res.render('searchNotFound');                   
                    }else{
                     res.render('moviesSearch', {movies});
            }
        } 
    }           
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    create: async (req,res) => {
        try{
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();

            res.render('createMovie', {genres, actors});

        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    store: async (req,res) => {
        try {
            const results = validationResult(req);

            if (results.isEmpty()) {

            const newMovie = await Movie.create({
                ...req.body
                // images : req.file.filename
            });
            await newMovie.addActors(req.body.actors);
            res.redirect('/movies');
            
        } else{
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('createMovie', {genres, actors, errors: results.errors, old: req.body})
        }
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    },
    edit: async (req,res) => {
        try{
            const {id} = req.params;
            const movie = await Movie.findByPk(id, {include: ['Genre', 'actors']});
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('editMovie', {movie, genres, actors});
            
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const results = validationResult(req);

            if (results.isEmpty()) {

            const {id} = req.params;
            const movie = await Movie.findByPk(id, {include: ['Genre', 'actors']});
            await movie.removeActors(movie.actors);
            await movie.addActors(req.body.actors);
            await movie.update({
                ...req.body,
                // images : req.file.filename
            });
            res.redirect('/movies');
            } else{
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('editMovie', {movie, genres, actors, errors: results.errors, old: req.body})
            }
        } catch (error) {
            res.send('Oopss direccion equivocada');
            console.log(error); 
        }
    },
    delete: async (req,res) => {
        try {
            const {id} = req.params;
            const movie = await Movie.findByPk(id, {include: ['actors']});
            await movie.removeActors(movie.actors);
            await movie.destroy();
            res.redirect('/movies')
        } catch (error) {
            res.send('Oopss direccion equivocada');
            console.log(error)
        }
    }
}