const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');


router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);
//router.get('/movies/recommended', moviesController.recomended);
//router.get('/movies/detail/:id', moviesController.detail);
//Rutas exigidas para la creación del CRUD
router.get('/actors/add', actorsController.add);
// router.post('/actors/create', actorsController.create);
// router.get('/actors/edit/:id', actorsController.edit);
// //router.post('/movies/update/:id', moviesController.update);
// router.put('/actors/update/:id', actorsController.update);
// router.get('/actors/delete/:id', actorsController.delete);
// router.delete('/actors/delete/:id', actorsController.destroy);

module.exports = router;