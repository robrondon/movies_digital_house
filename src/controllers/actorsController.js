const {Actor} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    all: async (req,res) =>{
        try {
            const actors = await Actor.findAll();
            res.render('actorsIndex', {actors});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    detail: async (req,res) =>{
        try {
            const {id} = req.params;
            const actor = await Actor.findByPk(id);
            res.render('actorsDetail', {actor})
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    },
    recommended: async (req,res) =>{
        try {
            const actors = await Actor.findAll({
                where: {
                    rating: {[Op.gte] : 8}
                }
            });
            res.render('actorsRecommended', {actors});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }

    },
    search: async (req,res) =>{
        try {
            const {search} = req.body
            console.log(req.body)
            const actors = await Actor.findAll({
                where: {
                    title: {[Op.like] : '%' + search + '%'}
                }
            });
            res.render('actorsSearch', {actors});
        } catch(error){
            res.send('Oopss direccion equivocada');
            console.log(error);
        }

    }
};