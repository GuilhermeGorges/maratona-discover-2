const express = require('express');// biblioteca para criar o servidor 
const routes = express.Router();// é uma parte do express que vai criar os caminhos 
const ProfileController = require('./controllers/ProfileController') //chamando o arquivo da pasta controllers 
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)// rota para recebimento do post na page job, (SALVAR) button. 
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)// postando atualização do projeto 
routes.post('/job/delete/:id', JobController.delete)// delete project 
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update) // postando atualização do profile 



module.exports = routes;
