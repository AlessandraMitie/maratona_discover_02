//para pegar o express:
const express = require('express');
const routes = express.Router()
//express.Router() é uma funcionalidade que vai devolver um objeto para a const routes

const views = __dirname + "/views/"

const profile ={
    name: "Ale",
    avatar:"https://avatars.githubusercontent.com/u/9631647?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

//render é uma função do ejs que entende os caminhos de rotas
//para pegar as rotas:
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile}))
//vai enviar o objeto profile


module.exports = routes;
//foi feita a exportação desta rota para poder usar em outro lugar/arquivo