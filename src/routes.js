const express = require('express');// biblioteca para criar o servidor 
const routes = express.Router();// é uma parte do express que vai criar os caminhos 
const ProfileController = require('./controllers/ProfileController') //chamando o arquivo da pasta controllers 

const Job = {
  data: [
    //array que armazena os dados vindos do req.body
    {
      id: 1,
      name: "Pizzaria Gulozo",
      "daily-hours": 2,
      "total-hours": 0,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Projexo X",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        // .map() pega cada item no estilo for each e retorna um item novo 
        // ajustes no job
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'  //if ternário para retornar o status 
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })

      return res.render("index", { jobs: updatedJobs })
    },
    create(req, res) {
      return res.render("job")
    },
    save(req, res) {
      // estrutura do dado vindo do req.body => { name: 'asd', 'daily-hours': '0.4', 'total-hours': '3' }
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
      })
      return res.redirect('/')
    },
    show(req, res) {

      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId)) // find() faz a comparação entre os dois IDs e se for igual retorna o conteúdo daquele ID

      if (!job) {
        return res.send('JOB NOT FOUND!')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render("job-edit", { job })
    },
    update(req, res) {
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('JOB NOT FOUND!')
      }

      const updatedJob = {
        ...job, //quando á mais itens precisamos espalhar o conteúdo
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      })
      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)) // filter remove o tal situação acontecer (job.id ser igual jobId)

      return res.redirect('/')
    },
  },
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)// rota para recebimento do post na page job, (SALVAR) button. 
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)// postando atualização do projeto 
routes.post('/job/delete/:id', Job.controllers.delete)// delete project 
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update) // postando atualização do profile 



module.exports = routes;
