//para pegar o express:
const express = require('express');
const routes = express.Router();
//express.Router() é uma funcionalidade que vai devolver um objeto para a const routes
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashoboardController')

//render é uma função do ejs que entende os caminhos de rotas
//para pegar as rotas:
routes.get('/', DashboardController.index)
//pegar os dados na requisição:
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
//vai enviar o objeto profile:
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;
//foi feita a exportação desta rota para poder usar em outro lugar/arquivo