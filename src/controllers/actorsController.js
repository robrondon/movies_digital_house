const {Movie, Genre, Actor} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    detail :  async (req,res) => {
        try {
            const {id} = req.params;   
            const actor = await Actor.findByPk(id, {include: ['movies']});
            // res.json(actor);
            res.render('actorDetail', {actor});
        } catch (error) {
            res.send('Oopss direccion equivocada');
            console.log(error);
        }
    }
};