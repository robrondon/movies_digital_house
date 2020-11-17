const express = require('express');
const router = express.Router();
const path = require('path');
// const multer = require('multer');

const moviesController = require('../controllers/moviesController');
const validator = require('../middlewares/validator');

// ---- Multer Storage ---- //
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '../../public/images'));
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });
  
//   var upload = multer({ 
//       storage,
//       fileFilter: (req, file, cb) => {
//           const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
//           const ext = path.extname(file.originalname);

//           if(!acceptedExtensions.includes(ext)){
//               req.file = file;
//           }
//           cb(null, acceptedExtensions.includes(ext));
//       }
//     });

// ---- List all movies --- //
router.get('/', moviesController.all);
// ---- Detail of one movie --- //
router.get('/detail/:id', moviesController.detail);
// ---- List of newest movies --- //
router.get('/new', moviesController.new);
// ---- List of recommended movies --- //
router.get('/recommended', moviesController.recommended);
// ---- List of searched movies --- //
router.post('/search', moviesController.search);
// ---- Show form to create movies --- //
router.get('/create', moviesController.create);
// ---- Send form to create movies --- //
router.post('/create', /* upload.single('images'), */validator.movies, moviesController.store);
// ---- Form to edit movies --- //
router.get('/edit/:id', moviesController.edit);
// ---- Send form to edit movies --- //
router.put('/edit/:id', /* upload.single('images'), */validator.movies, moviesController.update);
// ---- Delete a movie --- //
router.delete('/delete/:id', moviesController.delete);

module.exports = router;
