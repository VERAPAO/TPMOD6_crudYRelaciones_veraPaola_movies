const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Actors = db.Actor;
const Movies = db.Movie;

const actorsController = {
    
    list: (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', { actors });
            })
            .catch(error => res.send(error));
    },
    detail: (req, res) => {

        db.Actor.findByPk(req.params.id, { include: ['movies'] })
            .then(actor => {
                res.render('actorsDetail.ejs', { actor });
            })
            .catch(error => res.send(error));
    },
    add: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'actorsAdd'));
    },
    create: (req, res) => {

        Actors.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            
        })
        .then(() => {
            res.redirect('/actors');
        })
        .catch(error => res.send(error));
    },
    edit: (req, res) => {
        let actorId = req.params.id;
        let promesaActor = Actors.findByPk(actorId);
        let promesaMovies = Movies.findAll();
        
        Promise
        .all([promesaActor, promesaMovies])
        .then(([actor, allMovies]) => {
            if (!actor) {
                return res.status(404).send('Actor no encontrado');
            }
            return res.render(path.resolve(__dirname, '..', 'views', 'actorsEdit'), { actor, allMovies });
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error);
            return res.status(500).send('Error en el servidor');
        });
    },
    update: (req, res) => {
        let actorId = req.params.id;
        if (!req.body.first_name || !req.body.last_name || !req.body.rating) {
            return res.status(400).send('Todos los campos son requeridos.');
        }

        Actors.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
         
        }, {
            where: { id: actorId }
        })
        .then(() => {
            res.redirect('/actors');
        })
        .catch(error => {
            console.error('Error al actualizar el actor:', error);
            return res.status(500).send('Error al actualizar el actor.');
        });
    },
    delete: (req, res) => {
        let actorId = req.params.id;
        Actors.findByPk(actorId)
            .then(actor => {
                res.render(path.resolve(__dirname, '..', 'views', 'actorsDelete'), { actor });
            })
            .catch(error => res.send(error));
    },
    destroy: (req, res) => {
        let actorId = req.params.id;
        Actors.destroy({ where: { id: actorId }, force: true })
            .then(() => {
                res.redirect('/actors');
            })
            .catch(error => res.send(error));
    }
}

module.exports = actorsController;