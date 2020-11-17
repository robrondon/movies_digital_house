const {body} = require('express-validator');
const path = require('path');

module.exports = {
    movies: [
        body('title')
            .notEmpty()
            .withMessage('El campo titulo es obligatorio')
            .bail()
            .isLength({min: 1, max:100})
            .withMessage('Minimo 1 caracter, Maximo 100 caracteres'),
        body('rating')
            .notEmpty()
            .withMessage('El campo rating es obligatorio')
            .bail()
            .isDecimal({min: 1, max:10})
            .withMessage('El minimo rating es 1, el maximo es 10'),
        body('awards')
            .notEmpty()
            .withMessage('El campo premios es obligatorio')
            .bail()
            .isInt({min: 0})
            .withMessage('La cantidad minima de premios es 0'),
        body('release_date')
            .notEmpty()
            .withMessage('El campo fecha de estreno es obligatorio')
            .bail()
            .isDate({format : 'YYYY-MM-DD'})
            .withMessage('La fecha debe ser en formato yyyy-mm-dd'),
        body('length')
            .notEmpty()
            .withMessage('El campo duracion es obligatorio')
            .bail()
            .isFloat({min: 0})
            .withMessage('La duracion debe ser un numero'),
        body('genre_id')
            .isLength({min: 1})
            .withMessage('Debe seleccionar un genero')
            .bail()
            .isInt({max: 1})
            .withMessage('Solo puede seleccionar un genero'),
        body('actors')
            .isLength({min: 1})
            .withMessage('Debe seleccionar al menos un actor')
        // body('images')
        //     .custom((value, {req}) => {
        //         if (req.file != undefined) {
        //             return true
        //         }
        //         return false
        //     })
        //     .withMessage("El campo imagen es obligatorio")
        //     .bail()
        //     .custom((value, {req}) => {
        //         let ext = path.extname(req.file.originalname);
        //         if (ext == '.jpg' || ext == '.jpeg' || ext == '.png') {
        //             return true
        //         } 
        //         return false
        //     })
        //     .withMessage('Los formatos de imagen aceptados son (.jpg, .jpeg y .png)')
        //     .bail()
    ]
}